import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String
  },
  { _id: false }
);

const generationSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    generationType: {
      type: String,
      enum: ['unit', 'integration', 'api', 'edge-case', 'validation', 'negative', 'mixed'],
      default: 'mixed'
    },
    testingGoal: {
      type: String,
      required: true
    },
    instructions: {
      type: String,
      default: ''
    },
    codeSnippet: {
      type: String,
      default: ''
    },
    generatedContent: {
      type: String,
      required: true
    },
    qualityScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    feedback: {
      type: feedbackSchema,
      default: () => ({ status: 'pending' })
    },
    model: String,
    metadata: {
      memoriesUsed: { type: Number, default: 0 },
      repositoryFilesUsed: { type: Number, default: 0 },
      fallback: { type: Boolean, default: false }
    }
  },
  { timestamps: true }
);

export const Generation = mongoose.model('Generation', generationSchema);
