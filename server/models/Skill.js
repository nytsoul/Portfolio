import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: String,
  category: String,
  strength: {
    type: Number,
    default: 50,
  },
  usageCount: {
    type: Number,
    default: 0,
  },
  lastUsed: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

skillSchema.index({ userId: 1 });
skillSchema.index({ userId: 1, category: 1 });

export default mongoose.model('Skill', skillSchema);
