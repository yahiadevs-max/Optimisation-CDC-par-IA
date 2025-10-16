import React from 'react';
import { Page } from '../types';
import { WorkspaceIcon, SmartReaderIcon, CostPredictorIcon, XaiJustifierIcon, ReportsIcon } from './icons';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isProjectStarted: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isProjectStarted }) => {
  const navItems = [
    { id: Page.WORKSPACE, label: 'Espace de Travail', icon: WorkspaceIcon, disabled: false },
    { id: Page.SMART_READER, label: 'Analyse (Smart-Reader)', icon: SmartReaderIcon, disabled: !isProjectStarted },
    { id: Page.COST_PREDICTOR, label: 'Estimation (Cost-Predictor)', icon: CostPredictorIcon, disabled: !isProjectStarted },
    { id: Page.XAI_JUSTIFIER, label: 'Justification (XAI-Justifier)', icon: XaiJustifierIcon, disabled: !isProjectStarted },
    { id: Page.REPORTS, label: 'Rapports Finaux', icon: ReportsIcon, disabled: !isProjectStarted },
  ];

  return (
    <div className="w-64 bg-slate-800 text-white flex flex-col">
      <div className="h-16 flex items-center justify-center bg-slate-900 shadow-md">
        <h1 className="text-xl font-bold tracking-wider">Soumission IA</h1>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => !item.disabled && setCurrentPage(item.id)}
            disabled={item.disabled}
            className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-200 ${
              currentPage === item.id
                ? 'bg-sky-600 text-white'
                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
            } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
