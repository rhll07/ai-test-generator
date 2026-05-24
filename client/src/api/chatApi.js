import { axiosClient } from './axiosClient.js';

export const sendChatMessage = async (payload) => {
  const { data } = await axiosClient.post('/chat', payload);
  return data.data;
};

export const listChats = async (projectId) => {
  const { data } = await axiosClient.get(`/chat/${projectId}`);
  return data.data;
};
