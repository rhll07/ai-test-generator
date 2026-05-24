import mongoose from 'mongoose';

const repositoryFileSchema = new mongoose.Schema(
  {
    path: String,
    language: String,
    size: Number,
    content: String
  },
  { _id: false }
);

const routeSchema = new mongoose.Schema(
  {
    method: String,
    path: String,
    file: String
  },
  { _id: false }
);

const modelSchema = new mongoose.Schema(
  {
    name: String,
    file: String,
    fields: [String]
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    projectName: {
      type: String,
      required: true,
      trim: true
    },
    repositoryUrl: {
      type: String,
      trim: true
    },
    sourceType: {
      type: String,
      enum: ['manual', 'zip', 'github'],
      default: 'manual'
    },
    repositorySummary: {
      type: String,
      default: ''
    },
    architectureSummary: {
      type: String,
      default: ''
    },
    detectedTechnologies: {
      frontend: [String],
      backend: [String],
      database: [String],
      languages: [String],
      tooling: [String]
    },
    detectedRoutes: [routeSchema],
    detectedModels: [modelSchema],
    folderStructure: {
      type: String,
      default: ''
    },
    repositoryFiles: [repositoryFileSchema],
    stats: {
      filesScanned: { type: Number, default: 0 },
      routesDetected: { type: Number, default: 0 },
      modelsDetected: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

export const Project = mongoose.model('Project', projectSchema);
