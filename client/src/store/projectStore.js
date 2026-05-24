import { create } from 'zustand';
import * as projectApi from '../api/projectApi.js';
import * as repositoryApi from '../api/repositoryApi.js';

export const useProjectStore = create((set, get) => ({
  projects: [],
  currentProject: null,
  loading: false,
  error: '',

  loadProjects: async () => {
    set({ loading: true, error: '' });
    try {
      const projects = await projectApi.listProjects();
      set({ projects, loading: false });
      return projects;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  createProject: async (payload) => {
    set({ loading: true, error: '' });
    try {
      const project = await projectApi.createProject(payload);
      set({ projects: [project, ...get().projects], loading: false });
      return project;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  loadProject: async (id) => {
    set({ loading: true, error: '' });
    try {
      const currentProject = await projectApi.getProject(id);
      set({ currentProject, loading: false });
      return currentProject;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  uploadRepository: async (payload) => {
    set({ loading: true, error: '' });
    try {
      const currentProject = await repositoryApi.uploadRepository(payload);
      set({ currentProject, loading: false });
      return currentProject;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  importGitHub: async (payload) => {
    set({ loading: true, error: '' });
    try {
      const currentProject = await repositoryApi.importGitHubRepository(payload);
      set({ currentProject, loading: false });
      return currentProject;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  }
}));
