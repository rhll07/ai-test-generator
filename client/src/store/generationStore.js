import { create } from 'zustand';
import * as generationApi from '../api/generationApi.js';

export const useGenerationStore = create((set, get) => ({
  generations: [],
  recentGenerations: [],
  loading: false,
  error: '',

  loadProjectGenerations: async (projectId) => {
    set({ loading: true, error: '' });
    try {
      const generations = await generationApi.listProjectGenerations(projectId);
      set({ generations, loading: false });
      return generations;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  loadRecentGenerations: async () => {
    try {
      const recentGenerations = await generationApi.listRecentGenerations();
      set({ recentGenerations });
      return recentGenerations;
    } catch (error) {
      set({ error: error.message });
      return [];
    }
  },

  generate: async (payload) => {
    set({ loading: true, error: '' });
    try {
      const generation = await generationApi.generateTests(payload);
      set({ generations: [generation, ...get().generations], loading: false });
      return generation;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  regenerate: async (generationId, instructions = '') => {
    set({ loading: true, error: '' });
    try {
      const generation = await generationApi.regenerateTests({ generationId, instructions });
      set({ generations: [generation, ...get().generations], loading: false });
      return generation;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  feedback: async (generationId, payload) => {
    const updated = await generationApi.sendFeedback(generationId, payload);
    set({
      generations: get().generations.map((generation) => (generation._id === updated._id ? updated : generation))
    });
    return updated;
  }
}));
