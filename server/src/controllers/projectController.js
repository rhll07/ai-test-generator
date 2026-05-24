import * as projectService from '../services/projectService.js';
import { successResponse } from '../utils/apiResponse.js';

export const createProject = async (req, res) => {
  const project = await projectService.createProject({
    userId: req.user._id,
    ...req.body
  });
  return successResponse(res, project, 'Project created', 201);
};

export const listProjects = async (req, res) => {
  const projects = await projectService.listProjects(req.user._id);
  return successResponse(res, projects, 'Projects loaded');
};

export const getProject = async (req, res) => {
  const project = await projectService.getProjectById({
    projectId: req.params.id,
    userId: req.user._id
  });
  return successResponse(res, project, 'Project loaded');
};

export const updateProject = async (req, res) => {
  const project = await projectService.updateProject({
    projectId: req.params.id,
    userId: req.user._id,
    updates: req.body
  });
  return successResponse(res, project, 'Project updated');
};

export const deleteProject = async (req, res) => {
  await projectService.deleteProject({
    projectId: req.params.id,
    userId: req.user._id
  });
  return successResponse(res, null, 'Project deleted');
};
