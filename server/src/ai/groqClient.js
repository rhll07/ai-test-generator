import { env } from '../config/env.js';
import { createGroqClient } from '../config/groq.js';

const client = createGroqClient();

export const runGroqChat = async ({ system, user, temperature = 0.2 }) => {
  if (!client) {
    return {
      content: null,
      fallback: true
    };
  }

  const completion = await client.chat.completions.create({
    model: env.groqModel,
    temperature,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user }
    ]
  });

  return {
    content: completion.choices?.[0]?.message?.content || '',
    fallback: false
  };
};
