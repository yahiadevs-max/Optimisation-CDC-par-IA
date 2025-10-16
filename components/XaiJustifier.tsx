
import React, { useState } from 'react';
import { Page, BpuDqeItem, XaiExplanation } from '../types';
import { generateXaiExplanation } from '../services/geminiService';
import Loader from './Loader';
import DataTable from './DataTable';

interface XaiJustifierProps {
  pricedItems: BpuDqeItem[];
  setCurrentPage: (page: Page) => void;
}

const FactorBar: React.FC<{ label: string; value: number; isPositive: boolean }> = ({ label, value, isPositive }) => {
    const maxValue = 50; // Arbitrary max for scaling
    const width = (Math.abs(value) / maxValue) * 100;
    const color = isPositive ? 'bg-red-400' : 'bg-green-400';

    return (
        <div className="flex items-center space-x-2 text-sm mb-1">
            <div className="w-1/3 truncate" title={label}>{label}</div>
            <div className="w-2/3 bg-slate-200 rounded-full h-4">
                <div className={`${color} h-4 rounded-full`} style={{ width: `${width}%` }}></div>
            </div>
        </div>
    );
};


const XaiJustifier: React.FC<XaiJustifierProps> = ({ pricedItems, setCurrentPage }) => {
  const [selectedItem, setSelectedItem] = useState<BpuDqeItem | null>(null);
  const [explanation, setExplanation] = useState<XaiExplanation | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRowClick = async (item: BpuDqeItem) => {
    if (selectedItem?.id === item.id) {
        setSelectedItem(null);
        setExplanation(null);
        return;
    }
    setSelectedItem(item);
    setIsLoading(true);
    setExplanation(null);
    try {
      const result = await generateXaiExplanation(item);
      setExplanation(result);
    } catch (error) {
      console.error(error);
      setExplanation({
        explanation: "Erreur lors de la récupération de l'explication.",
        positiveFactors: [],
        negativeFactors: [],
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Module de Justification (XAI-Justifier)</h2>
      <p className="text-slate-500 mb-6">Cliquez sur une ligne pour comprendre comment l'IA a déterminé le prix, grâce à des explications transparentes.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
            <h3 className="text-xl font-semibold mb-4">Devis Estimatif Final</h3>
            {pricedItems.length > 0 ? (
                <DataTable items={pricedItems} onRowClick={handleRowClick} selectedItemId={selectedItem?.id} />
            ) : (
                <p className="text-slate-500 text-center py-8">Aucun article tarifé disponible.</p>
            )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
            <h3 className="text-xl font-semibold mb-4">Analyse de la Tarification</h3>
            {isLoading && <Loader message="Génération de l'explication SHAP..." />}
            {!isLoading && !selectedItem && (
                 <div className="flex items-center justify-center h-full text-slate-500">
                    <p>Veuillez sélectionner un article dans le tableau de gauche.</p>
                </div>
            )}
            {explanation && selectedItem && (
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-slate-700">Article : {selectedItem.designation}</h4>
                        <p className="text-sm text-slate-500">Prix Unitaire : <span className="font-bold text-sky-600">{selectedItem.unitPrice?.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' })}</span></p>
                    </div>
                    <div className="prose prose-sm max-w-none text-slate-600">
                       <p>{explanation.explanation}</p>
                    </div>
                    <div>
                        <h5 className="font-semibold mb-2">Facteurs influençant le prix :</h5>
                        <h6 className="text-xs font-bold text-red-600 uppercase mb-1">Impact Positif (Augmente le prix)</h6>
                        {explanation.positiveFactors.map(f => <FactorBar key={f.feature} label={f.feature} value={f.impact} isPositive={true} />)}
                        
                        <h6 className="text-xs font-bold text-green-600 uppercase mt-4 mb-1">Impact Négatif (Diminue le prix)</h6>
                        {explanation.negativeFactors.map(f => <FactorBar key={f.feature} label={f.feature} value={f.impact} isPositive={false} />)}
                    </div>
                </div>
            )}
        </div>
      </div>

       {pricedItems.length > 0 && (
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => setCurrentPage(Page.REPORTS)}
            className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 transition-colors duration-200"
          >
            Finaliser et Voir les Rapports
          </button>
        </div>
      )}
    </div>
  );
};

export default XaiJustifier;
