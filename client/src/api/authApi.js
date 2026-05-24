import { axiosClient } from './axiosClient.js';

export const signup = async (payload) => {
  const { data } = await axiosClient.post('/auth/signup', payload);
  return data.data;
};

export const login = async (payload) => {
  const { data } = await axiosClient.post('/auth/login', payload);
  return data.data;
};

export const getMe = async () => {
  const { data } = await axiosClient.get('/auth/me');
  return data.data.user;
};
