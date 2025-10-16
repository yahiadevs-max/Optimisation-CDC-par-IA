import React, { useState, useEffect } from 'react';
import { Page, BpuDqeItem, CdcAnalysisResult, Project } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import WorkspaceManager from './components/WorkspaceManager';
import SmartReader from './components/SmartReader';
import CostPredictor from './components/CostPredictor';
import XaiJustifier from './components/XaiJustifier';
import ReportsDashboard from './components/ReportsDashboard';
import { getProject, saveProject } from './utils/projectUtils';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.WORKSPACE);
  const [projectName, setProjectName] = useState<string>('');
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  
  const [cdcAnalysis, setCdcAnalysis] = useState<CdcAnalysisResult | null>(null);
  const [bpuDqeItems, setBpuDqeItems] = useState<BpuDqeItem[]>([]);
  const [pricedItems, setPricedItems] = useState<BpuDqeItem[]>([]);

  // Auto-save project progress
  useEffect(() => {
    if (currentProjectId) {
      const project = getProject(currentProjectId);
      if (project) {
        const updatedProject: Project = {
          ...project,
          name: projectName,
          cdcAnalysis,
          bpuDqeItems,
          pricedItems,
        };
        saveProject(updatedProject);
      }
    }
  // The dependency array intentionally includes projectName to save renames from the header
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProjectId, projectName, cdcAnalysis, bpuDqeItems, pricedItems]);


  const resetState = () => {
    setCurrentProjectId(null);
    setCurrentPage(Page.WORKSPACE);
    setProjectName('');
    setCdcAnalysis(null);
    setBpuDqeItems([]);
    setPricedItems([]);
  };
  
  const loadProject = (projectId: string) => {
    const project = getProject(projectId);
    if (project) {
      setCurrentProjectId(project.id);
      setProjectName(project.name);
      setCdcAnalysis(project.cdcAnalysis);
      setBpuDqeItems(project.bpuDqeItems);
      setPricedItems(project.pricedItems);
      setCurrentPage(Page.SMART_READER);
    } else {
        console.error(`Project with id ${projectId} not found.`);
        resetState();
    }
  };


  const renderContent = () => {
    switch (currentPage) {
      case Page.WORKSPACE:
        return <WorkspaceManager 
                  loadProject={loadProject}
                  currentProjectId={currentProjectId}
                  setProjectName={setProjectName}
               />;
      case Page.SMART_READER:
        return <SmartReader 
                  projectName={projectName}
                  setCdcAnalysis={setCdcAnalysis}
                  setBpuDqeItems={setBpuDqeItems}
                  bpuDqeItems={bpuDqeItems}
                  cdcAnalysis={cdcAnalysis}
                  setCurrentPage={setCurrentPage}
                />;
      case Page.COST_PREDICTOR:
        return <CostPredictor 
                  bpuDqeItems={bpuDqeItems} 
                  setPricedItems={setPricedItems}
                  setCurrentPage={setCurrentPage}
                />;
      case Page.XAI_JUSTIFIER:
        return <XaiJustifier 
                  pricedItems={pricedItems}
                  setCurrentPage={setCurrentPage}
                />;
      case Page.REPORTS:
        return <ReportsDashboard 
                  cdcAnalysis={cdcAnalysis}
                  pricedItems={pricedItems}
                />;
      default:
        return <WorkspaceManager 
                  loadProject={loadProject}
                  currentProjectId={currentProjectId}
                  setProjectName={setProjectName}
               />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} isProjectStarted={!!currentProjectId} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header projectName={projectName} onNewProject={resetState} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50">
          <div className="container mx-auto px-6 py-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
