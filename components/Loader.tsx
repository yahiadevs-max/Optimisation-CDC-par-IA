
import React from 'react';

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = "Chargement..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4 bg-white/80 rounded-lg">
      <div className="w-12 h-12 border-4 border-t-sky-600 border-solid rounded-full animate-spin border-slate-200"></div>
      <p className="text-slate-600 font-medium">{message}</p>
    </div>
  );
};

export default Loader;
