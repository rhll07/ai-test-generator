import * as repositoryService from '../services/repositoryService.js';
import { successResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';

export const uploadRepository = async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'Repository ZIP file is required');
  }

  const project = await repositoryService.analyzeUploadedZip({
    userId: req.user._id,
    filePath: req.file.path,
    projectId: req.body.projectId,
    projectName: req.body.projectName
  });

  return successResponse(res, project, 'Repository uploaded and analyzed', 201);
};

export const importGitHubRepository = async (req, res) => {
  const project = await repositoryService.importGitHubRepository({
    userId: req.user._id,
    ...req.body
  });

  return successResponse(res, project, 'GitHub repository imported and analyzed', 201);
};
