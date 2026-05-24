import { axiosClient } from './axiosClient.js';

export const uploadRepository = async ({ file, projectId, projectName }) => {
  const formData = new FormData();
  formData.append('repository', file);
  if (projectId) formData.append('projectId', projectId);
  if (projectName) formData.append('projectName', projectName);

  const { data } = await axiosClient.post('/repositories/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return data.data;
};

export const importGitHubRepository = async (payload) => {
  const { data } = await axiosClient.post('/repositories/github', payload);
  return data.data;
};
