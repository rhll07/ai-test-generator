import { create } from 'zustand';
import * as chatApi from '../api/chatApi.js';

export const useChatStore = create((set, get) => ({
  chats: [],
  loading: false,
  error: '',

  loadChats: async (projectId) => {
    set({ loading: true, error: '' });
    try {
      const chats = await chatApi.listChats(projectId);
      set({ chats, loading: false });
      return chats;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  sendMessage: async ({ projectId, message }) => {
    set({ loading: true, error: '' });
    try {
      const chat = await chatApi.sendChatMessage({ projectId, message });
      set({ chats: [...get().chats, chat], loading: false });
      return chat;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  }
}));
