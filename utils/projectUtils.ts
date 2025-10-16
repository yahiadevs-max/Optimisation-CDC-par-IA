import { Project } from '../types';

const PROJECTS_STORAGE_KEY = 'ia_soumission_projects';

// Reads all projects from localStorage
export const getProjects = (): Project[] => {
    const projectsJson = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (!projectsJson) return [];
    try {
        const projects = JSON.parse(projectsJson);
        // Sort by creation date, newest first
        return projects.sort((a: Project, b: Project) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (e) {
        console.error("Failed to parse projects from localStorage", e);
        return [];
    }
};

// Saves the entire list of projects
const saveAllProjects = (projects: Project[]) => {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
};

// Gets a single project by ID
export const getProject = (id: string): Project | undefined => {
    return getProjects().find(p => p.id === id);
};

// Creates a new project and saves it
export const createProject = (name: string): Project => {
    const newProject: Project = {
        id: `project-${new Date().getTime()}`,
        name,
        createdAt: new Date().toISOString(),
        cdcAnalysis: null,
        bpuDqeItems: [],
        pricedItems: [],
    };
    const projects = getProjects();
    saveAllProjects([newProject, ...projects]);
    return newProject;
};

// Updates an existing project
export const saveProject = (updatedProject: Project): void => {
    let projects = getProjects();
    const projectIndex = projects.findIndex(p => p.id === updatedProject.id);
    if (projectIndex > -1) {
        projects[projectIndex] = updatedProject;
    } else {
        projects = [updatedProject, ...projects];
    }
    saveAllProjects(projects);
};

// Deletes a project by ID
export const deleteProject = (id: string): void => {
    let projects = getProjects();
    const updatedProjects = projects.filter(p => p.id !== id);
    saveAllProjects(updatedProjects);
};
