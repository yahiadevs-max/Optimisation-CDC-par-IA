
import React, { useState, useRef, useEffect } from 'react';
import { CdcAnalysisResult, BpuDqeItem } from '../types';
import { DownloadIcon, ChevronDownIcon } from './icons';
import { 
    exportTextReportToPdf, 
    exportTableReportToPdf,
    exportTextReportToDocx,
    exportTableReportToDocx
} from '../utils/exportUtils';

interface ReportSectionProps {
  title: string;
  onExportPdf: () => void;
  onExportDocx: () => void;
  children: React.ReactNode;
}

const ReportSection: React.FC<ReportSectionProps> = ({ title, children, onExportPdf, onExportDocx }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);


    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
                <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center text-sm px-3 py-1.5 bg-slate-100 text-slate-600 rounded-md hover:bg-slate-200 transition-colors"
                    >
                        <DownloadIcon className="w-4 h-4 mr-2" />
                        Télécharger
                        <ChevronDownIcon className="w-4 h-4 ml-1" />
                    </button>
                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-slate-200">
                            <ul className="py-1">
                                <li>
                                    <button
                                        onClick={() => { onExportPdf(); setIsOpen(false); }}
                                        className="w-full text-left block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                                    >
                                        Exporter en PDF
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => { onExportDocx(); setIsOpen(false); }}
                                        className="w-full text-left block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                                    >
                                        Exporter en Word (.docx)
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div>{children}</div>
        </div>
    );
}

// FIX: Define ReportsDashboardProps interface to resolve missing type error.
interface ReportsDashboardProps {
  cdcAnalysis: CdcAnalysisResult | null;
  pricedItems: BpuDqeItem[];
}

const ReportsDashboard: React.FC<ReportsDashboardProps> = ({ cdcAnalysis, pricedItems }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Livrables Finaux</h2>
      <p className="text-slate-500 mb-6">Voici l'ensemble des documents générés par l'IA, prêts pour votre soumission.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cdcAnalysis && (
              <>
                <ReportSection 
                    title="Rapport de Synthèse CDC"
                    onExportPdf={() => exportTextReportToPdf("Rapport de Synthèse CDC", cdcAnalysis.synthesis)}
                    onExportDocx={() => exportTextReportToDocx("Rapport de Synthèse CDC", cdcAnalysis.synthesis)}
                >
                    <div className="prose prose-sm max-w-none text-slate-600" dangerouslySetInnerHTML={{ __html: cdcAnalysis.synthesis.replace(/\n/g, '<br />') }} />
                </ReportSection>
                <ReportSection 
                    title="Audit Juridique CDC"
                    onExportPdf={() => exportTextReportToPdf("Audit Juridique CDC", cdcAnalysis.legalAudit)}
                    onExportDocx={() => exportTextReportToDocx("Audit Juridique CDC", cdcAnalysis.legalAudit)}
                >
                    <div className="prose prose-sm max-w-none text-slate-600" dangerouslySetInnerHTML={{ __html: cdcAnalysis.legalAudit.replace(/\n/g, '<br />') }} />
                </ReportSection>
                <ReportSection 
                    title="Mémoire Technique"
                    onExportPdf={() => exportTextReportToPdf("Mémoire Technique", cdcAnalysis.technicalBrief)}
                    onExportDocx={() => exportTextReportToDocx("Mémoire Technique", cdcAnalysis.technicalBrief)}
                >
                    <div className="prose prose-sm max-w-none text-slate-600" dangerouslySetInnerHTML={{ __html: cdcAnalysis.technicalBrief.replace(/\n/g, '<br />') }} />
                </ReportSection>
              </>
          )}

          <div className="md:col-span-2 lg:col-span-3">
            <ReportSection 
                title="BPU / DQE Final Optimisé"
                onExportPdf={() => exportTableReportToPdf("BPU DQE Final Optimisé", pricedItems)}
                onExportDocx={() => exportTableReportToDocx("BPU DQE Final Optimisé", pricedItems)}
            >
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-500">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                            <tr>
                                <th scope="col" className="px-4 py-3">N°</th>
                                <th scope="col" className="px-4 py-3">Désignation</th>
                                <th scope="col" className="px-4 py-3">Unité</th>
                                <th scope="col" className="px-4 py-3 text-right">Quantité</th>
                                <th scope="col" className="px-4 py-3 text-right">Prix Unitaire (HT)</th>
                                <th scope="col" className="px-4 py-3 text-right">Montant (HT)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pricedItems.map((item) => (
                                <tr key={item.id} className="bg-white border-b hover:bg-slate-50">
                                    <td className="px-4 py-2">{item.number}</td>
                                    <td className="px-4 py-2 font-medium text-slate-900">{item.designation}</td>
                                    <td className="px-4 py-2">{item.unit}</td>
                                    <td className="px-4 py-2 text-right">{item.quantity}</td>
                                    <td className="px-4 py-2 text-right font-semibold text-sky-700">{item.unitPrice?.toLocaleString('fr-DZ')}</td>
                                    <td className="px-4 py-2 text-right font-bold text-sky-800">{item.totalPrice?.toLocaleString('fr-DZ')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </ReportSection>
          </div>
      </div>
    </div>
  );
};

export default ReportsDashboard;