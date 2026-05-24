import { Project } from '../models/Project.js';
import { Generation } from '../models/Generation.js';
import { ApiError } from '../utils/apiError.js';

export const createProject = async ({ userId, projectName, repositoryUrl = '' }) => {
  return Project.create({
    userId,
    projectName,
    repositoryUrl,
    sourceType: repositoryUrl ? 'github' : 'manual'
  });
};

export const listProjects = async (userId) => {
  const projects = await Project.find({ userId }).sort({ updatedAt: -1 }).lean();

  const counts = await Generation.aggregate([
    { $match: { userId } },
    { $group: { _id: '$projectId', count: { $sum: 1 }, averageQuality: { $avg: '$qualityScore' } } }
  ]);

  const countMap = new Map(counts.map((item) => [String(item._id), item]));

  return projects.map((project) => ({
    ...project,
    generationCount: countMap.get(String(project._id))?.count || 0,
    averageQuality: Math.round(countMap.get(String(project._id))?.averageQuality || 0)
  }));
};

export const getProjectById = async ({ projectId, userId }) => {
  const project = await Project.findOne({ _id: projectId, userId });
  if (!project) throw new ApiError(404, 'Project not found');
  return project;
};

export const updateProject = async ({ projectId, userId, updates }) => {
  const project = await Project.findOneAndUpdate({ _id: projectId, userId }, updates, {
    new: true,
    runValidators: true
  });

  if (!project) throw new ApiError(404, 'Project not found');
  return project;
};

export const deleteProject = async ({ projectId, userId }) => {
  const project = await Project.findOneAndDelete({ _id: projectId, userId });
  if (!project) throw new ApiError(404, 'Project not found');

  await Generation.deleteMany({ projectId, userId });
  return project;
};
