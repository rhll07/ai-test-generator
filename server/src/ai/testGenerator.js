import { env } from '../config/env.js';
import { runGroqChat } from './groqClient.js';
import { buildTestGenerationPrompt } from './promptBuilder.js';

const fallbackTests = ({ project, testingGoal, generationType, codeSnippet }) => {
  const routes = (project.detectedRoutes || []).slice(0, 8);
  const models = (project.detectedModels || []).slice(0, 8);
  const routeLines = routes.length
    ? routes.map((route) => `- ${route.method} ${route.path}: assert success, validation failure, unauthorized access, and malformed input behavior.`).join('\n')
    : '- No API routes were detected. Add route-specific tests after repository analysis finds endpoints.';
  const modelLines = models.length
    ? models.map((model) => `- ${model.name}: validate required fields, invalid field types, and persistence behavior.`).join('\n')
    : '- No data models were detected. Add model tests when schemas are available.';

  return `# Generated ${generationType} Test Plan

## Goal
${testingGoal}

## Repository-Aware Coverage
${routeLines}
${modelLines}

## Suggested Test Cases
- Happy path behavior for the primary function or endpoint.
- Missing required input should return a validation error.
- Invalid input types should be rejected without side effects.
- Unauthorized requests should fail before business logic runs.
- Database or service failures should produce controlled errors.
- Boundary values should be covered for strings, arrays, IDs, and pagination.

## Example Jest/Supertest Skeleton
\`\`\`js
describe('${project.projectName} - ${generationType} tests', () => {
  it('handles the expected success path', async () => {
    // Arrange test data and mocks.
    // Act by calling the function or endpoint.
    // Assert returned status, payload shape, and side effects.
  });

  it('rejects invalid input', async () => {
    // Pass malformed or incomplete input.
    // Assert validation error response and no database writes.
  });
});
\`\`\`

## Input Context Used
${codeSnippet ? 'A direct code snippet was provided and should be mapped into the skeleton above.' : 'Repository context was used because no direct code snippet was provided.'}

_Groq output fallback was used because no valid AI response was available._`;
};

export const generateTestsWithAI = async (payload) => {
  const prompt = buildTestGenerationPrompt(payload);
  const response = await runGroqChat({
    system: prompt.system,
    user: prompt.user,
    temperature: 0.25
  });

  if (response.content) {
    return {
      content: response.content,
      model: env.groqModel,
      fallback: false
    };
  }

  return {
    content: fallbackTests(payload),
    model: 'local-fallback',
    fallback: true
  };
};

export const estimateQualityScore = ({ content, memoriesUsed, routesDetected }) => {
  let score = 50;
  if (content.includes('```')) score += 10;
  if (/edge|boundary|negative|invalid/i.test(content)) score += 10;
  if (/assert|expect|should/i.test(content)) score += 10;
  if (memoriesUsed > 0) score += 10;
  if (routesDetected > 0) score += 10;
  return Math.min(score, 100);
};
