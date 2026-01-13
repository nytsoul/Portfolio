import mongoose from 'mongoose';

const githubStatsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  username: String,
  publicRepos: {
    type: Number,
    default: 0,
  },
  followers: {
    type: Number,
    default: 0,
  },
  following: {
    type: Number,
    default: 0,
  },
  totalStars: Number,
  totalForks: Number,
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

githubStatsSchema.index({ userId: 1 });

export default mongoose.model('GitHubStats', githubStatsSchema);
