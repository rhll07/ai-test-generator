import { create } from 'zustand';
import * as authApi from '../api/authApi.js';
import { clearToken, getToken, setToken } from '../utils/token.js';

export const useAuthStore = create((set, get) => ({
  user: null,
  token: getToken(),
  loading: false,
  error: '',
  isAuthenticated: Boolean(getToken()),

  signup: async (payload) => {
    set({ loading: true, error: '' });
    try {
      const data = await authApi.signup(payload);
      setToken(data.token);
      set({ user: data.user, token: data.token, isAuthenticated: true, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  login: async (payload) => {
    set({ loading: true, error: '' });
    try {
      const data = await authApi.login(payload);
      setToken(data.token);
      set({ user: data.user, token: data.token, isAuthenticated: true, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  hydrateUser: async () => {
    if (!get().token) return null;
    set({ loading: true, error: '' });
    try {
      const user = await authApi.getMe();
      set({ user, isAuthenticated: true, loading: false });
      return user;
    } catch {
      clearToken();
      set({ user: null, token: null, isAuthenticated: false, loading: false });
      return null;
    }
  },

  logout: () => {
    clearToken();
    set({ user: null, token: null, isAuthenticated: false });
  }
}));
