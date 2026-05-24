import * as chatService from '../services/chatService.js';
import { successResponse } from '../utils/apiResponse.js';

export const sendMessage = async (req, res) => {
  const chat = await chatService.sendProjectMessage({
    userId: req.user._id,
    projectId: req.body.projectId,
    message: req.body.message
  });
  return successResponse(res, chat, 'Assistant response created', 201);
};

export const listChats = async (req, res) => {
  const chats = await chatService.listProjectChats({
    userId: req.user._id,
    projectId: req.params.projectId
  });
  return successResponse(res, chats, 'Chat history loaded');
};
