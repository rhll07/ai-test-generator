import { Project } from '../models/Project.js';
import { Generation } from '../models/Generation.js';
import { Chat } from '../models/Chat.js';
import { ApiError } from '../utils/apiError.js';
import { retrieveSimilarMemories } from '../embeddings/memoryRetriever.js';
import { answerProjectChat } from '../ai/chatAssistant.js';
import { isLikelyPromptInjection } from '../utils/sanitize.js';

export const sendProjectMessage = async ({ userId, projectId, message }) => {
  if (isLikelyPromptInjection(message)) {
    throw new ApiError(400, 'Message contains instructions that look like prompt-injection attempts');
  }

  const project = await Project.findOne({ _id: projectId, userId });
  if (!project) throw new ApiError(404, 'Project not found');

  const memories = await retrieveSimilarMemories({ projectId, query: message, limit: 4 });
  const recentGenerations = await Generation.find({ projectId, userId }).sort({ createdAt: -1 }).limit(5);
  const aiResult = await answerProjectChat({
    project,
    message,
    memories,
    recentGenerations
  });

  const chat = await Chat.create({
    projectId,
    userId,
    userMessage: message,
    assistantMessage: aiResult.content
  });

  return chat;
};

export const listProjectChats = async ({ userId, projectId }) => {
  const project = await Project.findOne({ _id: projectId, userId });
  if (!project) throw new ApiError(404, 'Project not found');

  return Chat.find({ userId, projectId }).sort({ createdAt: 1 }).limit(100);
};
