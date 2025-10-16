
import React from 'react';
import { PlusCircleIcon } from './icons';

interface HeaderProps {
  projectName: string;
  onNewProject: () => void;
}

const Header: React.FC<HeaderProps> = ({ projectName, onNewProject }) => {
  return (
    <header className="h-16 bg-white shadow-md flex items-center justify-between px-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-700">
          Projet: <span className="text-sky-600">{projectName || 'N/A'}</span>
        </h2>
      </div>
      <div>
        <button 
          onClick={onNewProject}
          className="flex items-center px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" />
          Nouveau Projet
        </button>
      </div>
    </header>
  );
};

export default Header;
