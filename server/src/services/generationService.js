import { Project } from '../models/Project.js';
import { Generation } from '../models/Generation.js';
import { Embedding } from '../models/Embedding.js';
import { ApiError } from '../utils/apiError.js';
import { createEmbedding } from '../embeddings/embeddingService.js';
import { retrieveSimilarMemories } from '../embeddings/memoryRetriever.js';
import { estimateQualityScore, generateTestsWithAI } from '../ai/testGenerator.js';
import { isLikelyPromptInjection } from '../utils/sanitize.js';

const getOwnedProject = async ({ projectId, userId }) => {
  const project = await Project.findOne({ _id: projectId, userId });
  if (!project) throw new ApiError(404, 'Project not found');
  return project;
};

const persistGenerationEmbedding = async (generation) => {
  const content = [
    generation.testingGoal,
    generation.instructions,
    generation.generatedContent,
    generation.feedback?.comment || ''
  ].join('\n\n');

  await Embedding.create({
    projectId: generation.projectId,
    generationId: generation._id,
    embedding: createEmbedding(content),
    content: generation.generatedContent,
    metadata: {
      generationType: generation.generationType,
      testingGoal: generation.testingGoal,
      rating: generation.feedback?.rating
    }
  });
};

export const generateTests = async ({ userId, projectId, generationType, testingGoal, codeSnippet, instructions }) => {
  if (isLikelyPromptInjection(`${testingGoal}\n${instructions}`)) {
    throw new ApiError(400, 'Prompt contains instructions that look like prompt-injection attempts');
  }

  const project = await getOwnedProject({ projectId, userId });
  const memories = await retrieveSimilarMemories({
    projectId,
    query: `${testingGoal}\n${instructions}\n${codeSnippet}`,
    limit: 5
  });

  const aiResult = await generateTestsWithAI({
    project,
    testingGoal,
    generationType,
    codeSnippet,
    instructions,
    memories
  });

  const generation = await Generation.create({
    projectId,
    userId,
    generationType,
    testingGoal,
    codeSnippet,
    instructions,
    generatedContent: aiResult.content,
    qualityScore: estimateQualityScore({
      content: aiResult.content,
      memoriesUsed: memories.length,
      routesDetected: project.detectedRoutes?.length || 0
    }),
    model: aiResult.model,
    metadata: {
      memoriesUsed: memories.length,
      repositoryFilesUsed: project.repositoryFiles?.length || 0,
      fallback: aiResult.fallback
    }
  });

  await persistGenerationEmbedding(generation);
  return generation;
};

export const regenerateTests = async ({ userId, generationId, instructions }) => {
  const original = await Generation.findOne({ _id: generationId, userId });
  if (!original) throw new ApiError(404, 'Generation not found');

  return generateTests({
    userId,
    projectId: original.projectId,
    generationType: original.generationType,
    testingGoal: original.testingGoal,
    codeSnippet: original.codeSnippet,
    instructions: [original.instructions, instructions].filter(Boolean).join('\n')
  });
};

export const listGenerationsByProject = async ({ userId, projectId }) => {
  await getOwnedProject({ projectId, userId });
  return Generation.find({ userId, projectId }).sort({ createdAt: -1 });
};

export const getRecentGenerations = async ({ userId, limit = 8 }) => {
  return Generation.find({ userId }).sort({ createdAt: -1 }).limit(limit).populate('projectId', 'projectName');
};

export const updateFeedback = async ({ userId, generationId, feedback }) => {
  const generation = await Generation.findOneAndUpdate(
    { _id: generationId, userId },
    { feedback },
    { new: true, runValidators: true }
  );

  if (!generation) throw new ApiError(404, 'Generation not found');

  await Embedding.findOneAndUpdate(
    { generationId: generation._id },
    {
      content: generation.generatedContent,
      metadata: {
        generationType: generation.generationType,
        testingGoal: generation.testingGoal,
        rating: feedback.rating
      }
    }
  );

  return generation;
};
