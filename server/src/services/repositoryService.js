import fs from 'fs/promises';
import path from 'path';
import { Project } from '../models/Project.js';
import { ApiError } from '../utils/apiError.js';
import { scanRepositoryFiles } from '../parsing/fileScanner.js';
import { detectTechnologies } from '../parsing/technologyDetector.js';
import { detectRoutes } from '../parsing/routeDetector.js';
import { detectModels } from '../parsing/modelDetector.js';
import { buildFolderStructure, createArchitectureSummary } from '../parsing/architectureSummary.js';
import { cleanupExtractedRepository, extractZipBuffer, extractZipFile } from '../parsing/zipExtractor.js';

const findRepositoryRoot = async (directory) => {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const packageJsonAtRoot = entries.some((entry) => entry.isFile() && entry.name === 'package.json');
  const directories = entries.filter((entry) => entry.isDirectory());

  if (!packageJsonAtRoot && directories.length === 1) {
    return path.join(directory, directories[0].name);
  }

  return directory;
};

export const analyzeRepositoryDirectory = async (directory) => {
  const root = await findRepositoryRoot(directory);
  const files = await scanRepositoryFiles(root);
  const technologies = detectTechnologies(files);
  const routes = detectRoutes(files);
  const models = detectModels(files);
  const folderStructure = buildFolderStructure(files);
  const architectureSummary = createArchitectureSummary({
    files,
    technologies,
    routes,
    models
  });

  return {
    repositoryFiles: files,
    detectedTechnologies: technologies,
    detectedRoutes: routes,
    detectedModels: models,
    folderStructure,
    architectureSummary,
    repositorySummary: architectureSummary,
    stats: {
      filesScanned: files.length,
      routesDetected: routes.length,
      modelsDetected: models.length
    }
  };
};

const upsertAnalyzedProject = async ({ userId, projectId, projectName, repositoryUrl = '', sourceType, analysis }) => {
  if (projectId) {
    const project = await Project.findOneAndUpdate(
      { _id: projectId, userId },
      {
        ...analysis,
        repositoryUrl,
        sourceType
      },
      { new: true, runValidators: true }
    );

    if (!project) throw new ApiError(404, 'Project not found');
    return project;
  }

  return Project.create({
    userId,
    projectName: projectName || 'Imported Repository',
    repositoryUrl,
    sourceType,
    ...analysis
  });
};

export const analyzeUploadedZip = async ({ userId, filePath, projectId, projectName }) => {
  let extractedDir;

  try {
    extractedDir = await extractZipFile(filePath);
    const analysis = await analyzeRepositoryDirectory(extractedDir);
    return upsertAnalyzedProject({
      userId,
      projectId,
      projectName,
      sourceType: 'zip',
      analysis
    });
  } finally {
    await cleanupExtractedRepository(extractedDir);
    await fs.unlink(filePath).catch(() => {});
  }
};

const parseGitHubUrl = (repositoryUrl) => {
  const parsed = new URL(repositoryUrl);
  if (!['github.com', 'www.github.com'].includes(parsed.hostname)) {
    throw new ApiError(400, 'Only GitHub repository URLs are supported');
  }

  const [owner, repo] = parsed.pathname.split('/').filter(Boolean);
  if (!owner || !repo) {
    throw new ApiError(400, 'Invalid GitHub repository URL');
  }

  return { owner, repo: repo.replace(/\.git$/, '') };
};

export const importGitHubRepository = async ({ userId, repositoryUrl, branch = 'main', projectId, projectName }) => {
  const { owner, repo } = parseGitHubUrl(repositoryUrl);
  const downloadUrl = `https://codeload.github.com/${owner}/${repo}/zip/refs/heads/${encodeURIComponent(branch)}`;
  let extractedDir;

  try {
    const response = await fetch(downloadUrl);
    if (!response.ok) {
      throw new ApiError(response.status, `Unable to download GitHub repository for branch "${branch}"`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    extractedDir = await extractZipBuffer(buffer);
    const analysis = await analyzeRepositoryDirectory(extractedDir);

    return upsertAnalyzedProject({
      userId,
      projectId,
      projectName: projectName || repo,
      repositoryUrl,
      sourceType: 'github',
      analysis
    });
  } finally {
    await cleanupExtractedRepository(extractedDir);
  }
};
