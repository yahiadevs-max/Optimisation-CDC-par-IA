
import React, { useState, useCallback } from 'react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  acceptedFiles?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, acceptedFiles }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
      setFileName(e.dataTransfer.files[0].name);
    }
  }, [onFileUpload]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <label
      htmlFor="dropzone-file"
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
        isDragActive ? 'border-sky-500 bg-sky-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
      }`}
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <svg className="w-8 h-8 mb-4 text-slate-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
        </svg>
        <p className="mb-2 text-sm text-slate-500">
          <span className="font-semibold">Cliquez pour choisir un fichier</span> ou glissez-déposez
        </p>
        <p className="text-xs text-slate-500">Fichiers acceptés: {acceptedFiles}</p>
        {fileName && <p className="text-sm text-sky-600 mt-2">{fileName}</p>}
      </div>
      <input id="dropzone-file" type="file" className="hidden" accept={acceptedFiles} onChange={handleChange} />
    </label>
  );
};

export default FileUpload;
