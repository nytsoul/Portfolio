import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: String,
  description: String,
  category: String,
  languages: [String],
  topics: [String],
  stars: {
    type: Number,
    default: 0,
  },
  forks: {
    type: Number,
    default: 0,
  },
  url: String,
  homepage: String,
  featured: {
    type: Boolean,
    default: false,
  },
  githubRepoId: Number,
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

projectSchema.index({ userId: 1 });
projectSchema.index({ userId: 1, category: 1 });
projectSchema.index({ userId: 1, featured: 1 });

export default mongoose.model('Project', projectSchema);
