import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  name: String,
  location: String,
  bio: String,
  tagline: String,
  profileImage: String,
  email: String,
  website: String,
  github: String,
  linkedin: String,
  twitter: String,
  resumeUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Profile', profileSchema);
