import { runGroqChat } from './groqClient.js';
import { buildChatPrompt } from './promptBuilder.js';

const fallbackAnswer = ({ project, message, recentGenerations }) => {
  const latest = recentGenerations[0];

  return [
    `I can help with "${message}" using the stored project context.`,
    project.architectureSummary ? `Repository summary: ${project.architectureSummary}` : null,
    latest ? `Most recent generation target: ${latest.testingGoal}. Review its assertions for happy path, validation, authorization, and failure-mode coverage.` : 'No generated tests exist yet for this project.',
    'Configure `GROQ_API_KEY` in `server/.env` for a model-generated answer.'
  ]
    .filter(Boolean)
    .join('\n\n');
};

export const answerProjectChat = async (payload) => {
  const prompt = buildChatPrompt(payload);
  const response = await runGroqChat({
    system: prompt.system,
    user: prompt.user,
    temperature: 0.2
  });

  if (response.content) {
    return {
      content: response.content,
      fallback: false
    };
  }

  return {
    content: fallbackAnswer(payload),
    fallback: true
  };
};
