
import React, { useState, useEffect } from 'react';
import { Page, BpuDqeItem } from '../types';
import Loader from './Loader';
import DataTable from './DataTable';

interface CostPredictorProps {
  bpuDqeItems: BpuDqeItem[];
  setPricedItems: (items: BpuDqeItem[]) => void;
  setCurrentPage: (page: Page) => void;
}

const CostPredictor: React.FC<CostPredictorProps> = ({ bpuDqeItems, setPricedItems, setCurrentPage }) => {
  const [isPredicting, setIsPredicting] = useState(false);
  const [localPricedItems, setLocalPricedItems] = useState<BpuDqeItem[]>([]);

  const handlePredictPrices = () => {
    setIsPredicting(true);
    // Simulate API call and complex calculation
    setTimeout(() => {
      const predictedItems = bpuDqeItems.map(item => {
        const quantity = typeof item.quantity === 'string' ? parseFloat(item.quantity.replace(',', '.')) : item.quantity;
        const basePrice = Math.random() * 1000 + 50; // Simulate base cost
        const unitPrice = parseFloat((basePrice * (1 - Math.log(quantity > 0 ? quantity : 1) / 10)).toFixed(2));
        const totalPrice = parseFloat((unitPrice * quantity).toFixed(2));
        
        return {
          ...item,
          unitPrice: isNaN(unitPrice) ? 0 : unitPrice,
          totalPrice: isNaN(totalPrice) ? 0 : totalPrice,
        };
      });
      setLocalPricedItems(predictedItems);
      setPricedItems(predictedItems);
      setIsPredicting(false);
    }, 2000);
  };
  
  useEffect(() => {
      if (bpuDqeItems.length > 0 && localPricedItems.length === 0) {
          handlePredictPrices();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bpuDqeItems]);


  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Module d'Estimation Prédictive (Cost-Predictor)</h2>
      <p className="text-slate-500 mb-6">L'IA calcule le Prix de Vente Hors Taxes (PVHT) optimal pour chaque poste.</p>

      {isPredicting && <Loader message="Prédiction des prix optimaux en cours..." />}

      <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Résultats de l'Estimation</h3>
            <button
                onClick={handlePredictPrices}
                disabled={isPredicting}
                className="px-4 py-2 bg-slate-600 text-white font-semibold rounded-md hover:bg-slate-700 transition-colors duration-200 disabled:opacity-50"
            >
                Relancer la Prédiction
            </button>
        </div>
        
        {localPricedItems.length > 0 ? (
            <DataTable items={localPricedItems} />
        ) : (
            !isPredicting && <p className="text-slate-500 text-center py-8">Aucune donnée BPU/DQE à estimer. Veuillez compléter l'étape précédente.</p>
        )}
      </div>

      {localPricedItems.length > 0 && (
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => setCurrentPage(Page.XAI_JUSTIFIER)}
            className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 transition-colors duration-200"
          >
            Continuer vers la Justification
          </button>
        </div>
      )}
    </div>
  );
};

export default CostPredictor;
