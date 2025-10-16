
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, HeadingLevel } from 'docx';
import { BpuDqeItem } from '../types';

// Helper to download blobs (for DOCX)
const saveAs = (blob: Blob, fileName: string) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
};

const cleanTextForExport = (htmlContent: string): string => {
    return htmlContent.replace(/<br\s*\/?>/gi, '\n').replace(/<\/?[^>]+(>|$)/g, ""); // Basic HTML tag stripping
};

// --- PDF EXPORT ---

export const exportTextReportToPdf = (title: string, content: string) => {
    const doc = new jsPDF();
    const cleanContent = cleanTextForExport(content);

    doc.setFontSize(18);
    doc.text(title, 14, 22);

    doc.setFontSize(11);
    const splitText = doc.splitTextToSize(cleanContent, 180);
    doc.text(splitText, 14, 35);

    doc.save(`${title.replace(/\s/g, '_')}.pdf`);
};

export const exportTableReportToPdf = (title: string, items: BpuDqeItem[]) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(title, 14, 22);
    
    autoTable(doc, {
        startY: 30,
        head: [['N°', 'Désignation', 'Unité', 'Quantité', 'P.U. (HT)', 'Montant (HT)']],
        body: items.map(item => [
            item.number,
            item.designation,
            item.unit,
            item.quantity,
            item.unitPrice?.toLocaleString('fr-DZ') ?? 'N/A',
            item.totalPrice?.toLocaleString('fr-DZ') ?? 'N/A'
        ]),
        styles: { font: 'helvetica', fontSize: 8 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        columnStyles: {
            0: { cellWidth: 15 },
            1: { cellWidth: 'auto' },
            2: { cellWidth: 15 },
            3: { cellWidth: 20, halign: 'right' },
            4: { cellWidth: 25, halign: 'right' },
            5: { cellWidth: 25, halign: 'right' },
        }
    });

    doc.save(`${title.replace(/\s/g, '_')}.pdf`);
};


// --- DOCX EXPORT ---

const parseMarkdownToDocx = (markdown: string): Paragraph[] => {
    const lines = markdown.replace(/<br\s*\/?>/gi, '\n').split('\n');
    const paragraphs: Paragraph[] = [];

    for (const line of lines) {
        if (line.startsWith('### ')) {
            paragraphs.push(new Paragraph({ text: line.substring(4), heading: HeadingLevel.HEADING_3 }));
        } else if (line.startsWith('## ')) {
            paragraphs.push(new Paragraph({ text: line.substring(3), heading: HeadingLevel.HEADING_2 }));
        } else if (line.startsWith('# ')) {
            paragraphs.push(new Paragraph({ text: line.substring(2), heading: HeadingLevel.HEADING_1 }));
        } else if (line.startsWith('* ') || line.startsWith('- ')) {
            paragraphs.push(new Paragraph({ text: line.substring(2), bullet: { level: 0 } }));
        } else {
             // Handle **bold** text
            const parts = line.split('**');
            const runs = parts.map((part, index) => {
                return new TextRun({
                    text: part,
                    bold: index % 2 === 1,
                });
            });
            paragraphs.push(new Paragraph({ children: runs }));
        }
    }
    return paragraphs;
};

export const exportTextReportToDocx = (title: string, content: string) => {
    const paragraphs = [
        new Paragraph({ text: title, heading: HeadingLevel.TITLE }),
        new Paragraph({ text: '' }), // spacer
        ...parseMarkdownToDocx(content)
    ];

    const doc = new Document({
        sections: [{
            properties: {},
            children: paragraphs,
        }],
    });

    Packer.toBlob(doc).then(blob => {
        saveAs(blob, `${title.replace(/\s/g, '_')}.docx`);
    });
};

export const exportTableReportToDocx = (title: string, items: BpuDqeItem[]) => {
    const header = new TableRow({
        children: [
            new TableCell({ children: [new Paragraph({ text: "N°", bold: true })], width: { size: '5%', type: WidthType.PERCENTAGE } }),
            new TableCell({ children: [new Paragraph({ text: "Désignation", bold: true })], width: { size: '45%', type: WidthType.PERCENTAGE } }),
            new TableCell({ children: [new Paragraph({ text: "Unité", bold: true })], width: { size: '10%', type: WidthType.PERCENTAGE } }),
            new TableCell({ children: [new Paragraph({ text: "Quantité", bold: true })], width: { size: '10%', type: WidthType.PERCENTAGE } }),
            new TableCell({ children: [new Paragraph({ text: "P.U. (HT)", bold: true })], width: { size: '15%', type: WidthType.PERCENTAGE } }),
            new TableCell({ children: [new Paragraph({ text: "Montant (HT)", bold: true })], width: { size: '15%', type: WidthType.PERCENTAGE } }),
        ],
    });

    const rows = items.map(item => new TableRow({
        children: [
            new TableCell({ children: [new Paragraph(String(item.number))] }),
            new TableCell({ children: [new Paragraph(item.designation)] }),
            new TableCell({ children: [new Paragraph(item.unit)] }),
            new TableCell({ children: [new Paragraph(String(item.quantity))] }),
            new TableCell({ children: [new Paragraph(item.unitPrice?.toLocaleString('fr-DZ') ?? 'N/A')] }),
            new TableCell({ children: [new Paragraph(item.totalPrice?.toLocaleString('fr-DZ') ?? 'N/A')] }),
        ],
    }));

    const table = new Table({
        rows: [header, ...rows],
        width: {
            size: 100,
            type: WidthType.PERCENTAGE,
        },
    });

    const doc = new Document({
        sections: [{
            children: [
                new Paragraph({ text: title, heading: HeadingLevel.TITLE }),
                new Paragraph({ text: '' }),
                table,
            ],
        }],
    });

    Packer.toBlob(doc).then(blob => {
        saveAs(blob, `${title.replace(/\s/g, '_')}.docx`);
    });
};
