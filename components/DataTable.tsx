
import React from 'react';
import { BpuDqeItem } from '../types';

interface DataTableProps {
  items: BpuDqeItem[];
  onRowClick?: (item: BpuDqeItem) => void;
  selectedItemId?: string | null;
}

const DataTable: React.FC<DataTableProps> = ({ items, onRowClick, selectedItemId }) => {
  const hasPricing = items[0] && items[0].unitPrice !== undefined;

  return (
    <div className="overflow-x-auto max-h-[500px]">
      <table className="w-full text-sm text-left text-slate-500">
        <thead className="text-xs text-slate-700 uppercase bg-slate-100 sticky top-0">
          <tr>
            <th scope="col" className="px-4 py-3">N°</th>
            <th scope="col" className="px-4 py-3">Désignation</th>
            <th scope="col" className="px-4 py-3">Unité</th>
            <th scope="col" className="px-4 py-3 text-right">Quantité</th>
            {hasPricing && (
              <>
                <th scope="col" className="px-4 py-3 text-right">P.U. (HT)</th>
                <th scope="col" className="px-4 py-3 text-right">Montant (HT)</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              onClick={() => onRowClick?.(item)}
              className={`border-b ${
                onRowClick ? 'cursor-pointer hover:bg-sky-50' : ''
              } ${selectedItemId === item.id ? 'bg-sky-100' : 'bg-white'}`}
            >
              <td className="px-4 py-2">{item.number}</td>
              <td className="px-4 py-2 font-medium text-slate-900 min-w-[250px]">{item.designation}</td>
              <td className="px-4 py-2">{item.unit}</td>
              <td className="px-4 py-2 text-right">{item.quantity}</td>
              {hasPricing && (
                <>
                  <td className="px-4 py-2 text-right font-semibold text-sky-700">{item.unitPrice?.toLocaleString('fr-DZ')}</td>
                  <td className="px-4 py-2 text-right font-bold text-sky-800">{item.totalPrice?.toLocaleString('fr-DZ')}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
