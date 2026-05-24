import { axiosClient } from './axiosClient.js';

export const createProject = async (payload) => {
  const { data } = await axiosClient.post('/projects', payload);
  return data.data;
};

export const listProjects = async () => {
  const { data } = await axiosClient.get('/projects');
  return data.data;
};

export const getProject = async (id) => {
  const { data } = await axiosClient.get(`/projects/${id}`);
  return data.data;
};

export const updateProject = async (id, payload) => {
  const { data } = await axiosClient.put(`/projects/${id}`, payload);
  return data.data;
};

export const deleteProject = async (id) => {
  const { data } = await axiosClient.delete(`/projects/${id}`);
  return data.data;
};
