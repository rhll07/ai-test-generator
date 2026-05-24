import OpenAI from 'openai';
import { env } from './env.js';

export const createGroqClient = () => {
  if (!env.groqApiKey) return null;

  return new OpenAI({
    apiKey: env.groqApiKey,
    baseURL: env.groqBaseUrl
  });
};
