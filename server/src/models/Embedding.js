import mongoose from 'mongoose';

const embeddingSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true
    },
    generationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Generation'
    },
    embedding: {
      type: [Number],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    metadata: {
      generationType: String,
      testingGoal: String,
      rating: Number
    }
  },
  { timestamps: true }
);

embeddingSchema.index({ projectId: 1, createdAt: -1 });

export const Embedding = mongoose.model('Embedding', embeddingSchema);
