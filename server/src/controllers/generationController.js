import * as generationService from '../services/generationService.js';
import { successResponse } from '../utils/apiResponse.js';

export const generateTests = async (req, res) => {
  const generation = await generationService.generateTests({
    userId: req.user._id,
    ...req.body
  });
  return successResponse(res, generation, 'Tests generated', 201);
};

export const regenerateTests = async (req, res) => {
  const generation = await generationService.regenerateTests({
    userId: req.user._id,
    ...req.body
  });
  return successResponse(res, generation, 'Tests regenerated', 201);
};

export const listByProject = async (req, res) => {
  const generations = await generationService.listGenerationsByProject({
    userId: req.user._id,
    projectId: req.params.projectId
  });
  return successResponse(res, generations, 'Generations loaded');
};

export const recentGenerations = async (req, res) => {
  const generations = await generationService.getRecentGenerations({
    userId: req.user._id
  });
  return successResponse(res, generations, 'Recent generations loaded');
};

export const updateFeedback = async (req, res) => {
  const generation = await generationService.updateFeedback({
    userId: req.user._id,
    generationId: req.params.id,
    feedback: req.body
  });
  return successResponse(res, generation, 'Feedback saved');
};
