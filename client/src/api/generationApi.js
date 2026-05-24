import { axiosClient } from './axiosClient.js';

export const generateTests = async (payload) => {
  const { data } = await axiosClient.post('/generate/tests', payload);
  return data.data;
};

export const regenerateTests = async (payload) => {
  const { data } = await axiosClient.post('/generate/regenerate', payload);
  return data.data;
};

export const listProjectGenerations = async (projectId) => {
  const { data } = await axiosClient.get(`/generate/project/${projectId}`);
  return data.data;
};

export const listRecentGenerations = async () => {
  const { data } = await axiosClient.get('/generate/recent');
  return data.data;
};

export const sendFeedback = async (generationId, payload) => {
  const { data } = await axiosClient.post(`/generate/${generationId}/feedback`, payload);
  return data.data;
};
