import { Project } from '../models/Project.js';
import { Generation } from '../models/Generation.js';
import { ApiError } from '../utils/apiError.js';

export const getExportPayload = async ({ userId, projectId }) => {
  const project = await Project.findOne({ _id: projectId, userId }).lean();
  if (!project) throw new ApiError(404, 'Project not found');

  const generations = await Generation.find({ projectId, userId }).sort({ createdAt: -1 }).lean();
  return { project, generations };
};

export const toMarkdown = ({ project, generations }) => {
  const routeLines = (project.detectedRoutes || [])
    .map((route) => `- ${route.method} ${route.path} (${route.file})`)
    .join('\n');
  const modelLines = (project.detectedModels || [])
    .map((model) => `- ${model.name} (${model.file})`)
    .join('\n');
  const generationSections = generations
    .map((generation) => {
      return [
        `## ${generation.generationType} - ${generation.testingGoal}`,
        `Quality score: ${generation.qualityScore}`,
        `Feedback: ${generation.feedback?.status || 'pending'}${generation.feedback?.rating ? ` (${generation.feedback.rating}/5)` : ''}`,
        generation.generatedContent
      ].join('\n\n');
    })
    .join('\n\n---\n\n');

  return [
    `# ${project.projectName}`,
    project.architectureSummary || project.repositorySummary || '',
    '## Detected Routes',
    routeLines || 'No routes detected.',
    '## Detected Models',
    modelLines || 'No models detected.',
    '## Folder Structure',
    '```txt',
    project.folderStructure || 'No folder structure available.',
    '```',
    generationSections || 'No generations available.'
  ].join('\n\n');
};
