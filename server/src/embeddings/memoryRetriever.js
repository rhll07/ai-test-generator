import { Embedding } from '../models/Embedding.js';
import { createEmbedding } from './embeddingService.js';
import { rankBySimilarity } from './similaritySearch.js';

export const retrieveSimilarMemories = async ({ projectId, query, limit = 5 }) => {
  const queryEmbedding = createEmbedding(query);
  const memories = await Embedding.find({ projectId }).sort({ createdAt: -1 }).limit(100).lean();

  return rankBySimilarity(queryEmbedding, memories, limit).filter((memory) => memory.score > 0.05);
};
