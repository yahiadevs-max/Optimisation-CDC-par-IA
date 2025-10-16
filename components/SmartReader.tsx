import React, { useState } from 'react';
import { Page, CdcAnalysisResult, BpuDqeItem } from '../types';
import { analyzeCdcDocument, extractBpuDqeData, extractTextFromFile } from '../services/geminiService';
import FileUpload from './FileUpload';
import Loader from './Loader';
import DataTable from './DataTable';
import { CheckCircleIcon, DocumentTextIcon, TableCellsIcon } from './icons';

interface SmartReaderProps {
  projectName: string;
  setCdcAnalysis: (analysis: CdcAnalysisResult) => void;
  setBpuDqeItems: (items: BpuDqeItem[]) => void;
  bpuDqeItems: BpuDqeItem[];
  cdcAnalysis: CdcAnalysisResult | null;
  setCurrentPage: (page: Page) => void;
}

const ReportCard: React.FC<{ title: string; content: string }> = ({ title, content }) => (
    <div className="bg-white p-6 rounded-lg shadow border border-slate-200 h-full">
        <h3 className="text-lg font-semibold text-slate-800 border-b pb-2 mb-4">{title}</h3>
        <div className="prose prose-sm max-w-none text-slate-600" dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
    </div>
);

const SmartReader: React.FC<SmartReaderProps> = ({ projectName, setCdcAnalysis, setBpuDqeItems, bpuDqeItems, cdcAnalysis, setCurrentPage }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [bpuDqeChoice, setBpuDqeChoice] = useState<'bpu' | 'dqe' | null>(null);

  const getFileTextContent = async (file: File): Promise<string> => {
    const textBasedTypes = ['text/plain', 'text/csv', 'text/markdown', 'application/json'];
    if (textBasedTypes.includes(file.type) || file.name.endsWith('.txt')) {
        return file.text();
    }
    setLoadingMessage("Extraction du texte (OCR) en cours...");
    return extractTextFromFile(file);
  }

  const handleCdcUpload = async (file: File) => {
    setIsLoading(true);
    setLoadingMessage("Préparation de l'analyse...");
    setError(null);
    try {
      const text = await getFileTextContent(file);
      setLoadingMessage("Analyse du CDC en cours par l'IA...");
      const result = await analyzeCdcDocument(text);
      setCdcAnalysis(result);
    } catch (err) {
      setError('Erreur lors de l\'analyse du document CDC.');
      console.error(err);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  const handleBpuDqeUpload = async (file: File) => {
    if (!bpuDqeChoice) return;
    setIsLoading(true);
    setLoadingMessage(`Préparation de l'analyse du ${bpuDqeChoice.toUpperCase()}...`);
    setError(null);
    try {
        const text = await getFileTextContent(file);
        setLoadingMessage(`Analyse du ${bpuDqeChoice.toUpperCase()} en cours...`);
        const items = await extractBpuDqeData(text, bpuDqeChoice);
        setBpuDqeItems(items);
    } catch (err) {
        setError(`Erreur lors du traitement du fichier ${bpuDqeChoice.toUpperCase()}.`);
        console.error(err);
    } finally {
        setIsLoading(false);
        setLoadingMessage('');
    }
  };
  
  const canProceed = cdcAnalysis && bpuDqeItems.length > 0;

  return (
    <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Module d'Analyse (Smart-Reader)</h2>
        <p className="text-slate-500 mb-6">Suivez les étapes pour que l'IA analyse vos documents et structure les données.</p>

        {isLoading && <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-50"><Loader message={loadingMessage || "Analyse en cours par l'IA..."} /></div>}
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200 mb-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-slate-800">Étape 1 : Analyse du Cahier des Charges (CDC)</h3>
                {cdcAnalysis && (
                    <span className="flex items-center text-green-600 font-medium text-sm bg-green-50 px-3 py-1 rounded-full">
                        <CheckCircleIcon className="w-5 h-5 mr-2" />
                        Terminé
                    </span>
                )}
            </div>
            {!cdcAnalysis && !isLoading && (
                <FileUpload onFileUpload={handleCdcUpload} acceptedFiles=".pdf, .png, .jpg, .jpeg, .docx, .txt, .md" />
            )}
        </div>

        {cdcAnalysis && (
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-700 mb-4">Résultats de l'analyse du CDC</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <ReportCard title="Rapport de Synthèse" content={cdcAnalysis.synthesis} />
                    <ReportCard title="Rapport d'Audit Juridique" content={cdcAnalysis.legalAudit} />
                    <ReportCard title="Rapport de Mémoire Technique" content={cdcAnalysis.technicalBrief} />
                </div>
            </div>
        )}

        {cdcAnalysis && (
            <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-slate-800">Étape 2 : Analyse du BPU ou DQE</h3>
                    {bpuDqeItems.length > 0 && (
                         <span className="flex items-center text-green-600 font-medium text-sm bg-green-50 px-3 py-1 rounded-full">
                            <CheckCircleIcon className="w-5 h-5 mr-2" />
                            Terminé
                        </span>
                    )}
                </div>

                {!bpuDqeChoice && bpuDqeItems.length === 0 && (
                    <div>
                        <p className="text-slate-600 mb-4">Veuillez choisir le type de document à analyser :</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => setBpuDqeChoice('bpu')} className="flex-1 text-left p-4 border rounded-lg hover:bg-slate-50 hover:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-200">
                                <TableCellsIcon className="w-8 h-8 text-sky-600 mb-2" />
                                <h4 className="font-semibold text-slate-800">Analyser un BPU (Bordereau des Prix Unitaires)</h4>
                                <p className="text-sm text-slate-500">Pour les projets de fournitures. Contient typiquement: N°, Désignation, Unité.</p>
                            </button>
                            <button onClick={() => setBpuDqeChoice('dqe')} className="flex-1 text-left p-4 border rounded-lg hover:bg-slate-50 hover:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-200">
                                <DocumentTextIcon className="w-8 h-8 text-sky-600 mb-2" />
                                <h4 className="font-semibold text-slate-800">Analyser un DQE (Devis Quantitatif Estimatif)</h4>
                                <p className="text-sm text-slate-500">Pour le BTP et autres. Contient typiquement: N°, Désignation, Unité, Quantité.</p>
                            </button>
                        </div>
                    </div>
                )}
                
                {bpuDqeChoice && bpuDqeItems.length === 0 && !isLoading && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-semibold text-slate-700">Importer le {bpuDqeChoice.toUpperCase()}</h4>
                            <button onClick={() => setBpuDqeChoice(null)} className="text-sm font-medium text-sky-600 hover:underline">Changer de type</button>
                        </div>
                        <FileUpload onFileUpload={handleBpuDqeUpload} acceptedFiles=".pdf, .png, .jpg, .jpeg, .docx, .xlsx, .csv, .txt" />
                        <p className="text-xs text-slate-500 mt-2">
                           L'IA peut analyser des fichiers PDF, Images (PNG, JPG), Word, Excel, CSV ou Texte pour en extraire le tableau des prix.
                        </p>
                    </div>
                )}

                {bpuDqeItems.length > 0 && (
                    <DataTable items={bpuDqeItems} />
                )}
            </div>
        )}
        
        {canProceed && (
            <div className="mt-8 flex justify-end">
                <button
                    onClick={() => setCurrentPage(Page.COST_PREDICTOR)}
                    className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 transition-colors duration-200"
                >
                    Continuer vers l'Estimation des Coûts
                </button>
            </div>
        )}
    </div>
  );
};

export default SmartReader;