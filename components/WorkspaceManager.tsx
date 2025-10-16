import React, { useState, useEffect } from 'react';
import { Page, Project } from '../types';
import { getProjects, createProject, deleteProject, saveProject } from '../utils/projectUtils';
import { FolderPlusIcon, EditIcon, TrashIcon, FolderOpenIcon } from './icons';

interface WorkspaceManagerProps {
  loadProject: (projectId: string) => void;
  currentProjectId: string | null;
  setProjectName: (name: string) => void;
}

const WorkspaceManager: React.FC<WorkspaceManagerProps> = ({ loadProject, currentProjectId, setProjectName }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [inputName, setInputName] = useState('');
  const [renamingProject, setRenamingProject] = useState<Project | null>(null);
  const [renameInput, setRenameInput] = useState('');

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      const newProject = createProject(inputName.trim());
      loadProject(newProject.id);
    }
  };
  
  const handleDeleteProject = (projectId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce projet et toutes ses données ? Cette action est irréversible.")) {
      deleteProject(projectId);
      setProjects(getProjects());
    }
  };
  
  const handleStartRename = (project: Project) => {
    setRenamingProject(project);
    setRenameInput(project.name);
  };
  
  const handleConfirmRename = (e: React.FormEvent) => {
    e.preventDefault();
    if (renamingProject && renameInput.trim()) {
      const updatedProject = { ...renamingProject, name: renameInput.trim() };
      saveProject(updatedProject);
      if (renamingProject.id === currentProjectId) {
        setProjectName(renameInput.trim());
      }
      setProjects(getProjects());
      setRenamingProject(null);
      setRenameInput('');
    }
  };

  return (
    <div className="space-y-8">
      <div className="w-full bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-sky-100">
                <FolderPlusIcon className="h-7 w-7 text-sky-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">
                Créer un Nouvel Espace de Travail
            </h2>
        </div>
        <p className="text-slate-500 mb-6">
          Démarrez un nouveau projet pour commencer l'analyse de vos documents.
        </p>
        <form onSubmit={handleCreateProject} className="flex gap-4">
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Entrez le nom du nouveau projet..."
              className="flex-grow px-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
              required
            />
          <button
            type="submit"
            className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50"
            disabled={!inputName.trim()}
          >
            Créer et Lancer
          </button>
        </form>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Projets Récents</h3>
        {projects.length > 0 ? (
          <div className="space-y-4">
            {projects.map(project => (
              renamingProject?.id === project.id ? (
                <div key={project.id} className="bg-white p-4 rounded-lg shadow border border-sky-400">
                  <form onSubmit={handleConfirmRename} className="flex items-center gap-4">
                    <input
                      type="text"
                      value={renameInput}
                      onChange={(e) => setRenameInput(e.target.value)}
                      className="flex-grow px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                      autoFocus
                    />
                    <div className="flex gap-2">
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-md hover:bg-green-600">Enregistrer</button>
                        <button type="button" onClick={() => setRenamingProject(null)} className="px-4 py-2 bg-slate-200 text-sm font-semibold rounded-md hover:bg-slate-300">Annuler</button>
                    </div>
                  </form>
                </div>
              ) : (
                <div key={project.id} className="bg-white p-4 rounded-lg shadow-md border border-slate-200 flex items-center justify-between transition-shadow hover:shadow-lg">
                  <div>
                    <p className="font-semibold text-slate-800">{project.name}</p>
                    <p className="text-sm text-slate-500">Créé le : {new Date(project.createdAt).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleStartRename(project)} title="Renommer" className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"><EditIcon className="w-5 h-5"/></button>
                    <button onClick={() => handleDeleteProject(project.id)} title="Supprimer" className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"><TrashIcon className="w-5 h-5"/></button>
                    <button onClick={() => loadProject(project.id)} className="flex items-center ml-2 px-4 py-2 bg-sky-600 text-white text-sm font-semibold rounded-md hover:bg-sky-700 transition-colors">
                      <FolderOpenIcon className="w-5 h-5 mr-2"/>
                      Ouvrir
                    </button>
                  </div>
                </div>
              )
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-lg border border-dashed">
            <p className="text-slate-500">Aucun projet récent. Créez-en un pour commencer !</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkspaceManager;
