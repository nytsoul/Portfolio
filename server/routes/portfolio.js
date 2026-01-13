import express from 'express';
import mongoose from 'mongoose';
import Profile from '../models/Profile.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Achievement from '../models/Achievement.js';
import GitHubStats from '../models/GitHubStats.js';
import { DEMO_PROJECTS, DEMO_SKILLS, DEMO_ACHIEVEMENTS } from '../demo-data.js';

const router = express.Router();

// Demo user ID for unauthenticated requests
const DEMO_USER_ID = new mongoose.Types.ObjectId('000000000000000000000001');

// Get profile - return demo data if not authenticated
router.get('/profile', async (req, res) => {
  try {
    const userId = req.query.userId || req.user?.id;
    
    if (!userId) {
      // Return null - frontend will use env variables as fallback
      return res.json(null);
    }

    const profile = await Profile.findOne({ userId });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get projects with optional category filter
router.get('/projects', async (req, res) => {
  try {
    const userId = req.query.userId || req.user?.id || DEMO_USER_ID;
    const category = req.query.category;
    const featured = req.query.featured;

    let query = { userId };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (featured !== undefined) {
      query.featured = featured;
    }
    
    const projects = await Project.find(query).sort({ stars: -1 });
    
    // If no projects found in DB and it's the demo user, return demo projects
    if (projects.length === 0 && userId.toString() === DEMO_USER_ID.toString()) {
      let filtered = DEMO_PROJECTS;
      
      if (category && category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
      }
      
      if (featured !== undefined) {
        filtered = filtered.filter(p => p.featured === featured);
      }
      
      return res.json(filtered.sort((a, b) => b.stars - a.stars));
    }
    
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get project categories
router.get('/project-categories', async (req, res) => {
  try {
    const userId = req.query.userId || req.user?.id;

    if (!userId) {
      // Return demo categories
      const categories = new Set(DEMO_PROJECTS.map(p => p.category));
      return res.json(Array.from(categories).sort());
    }

    const categories = await Project.distinct('category', { userId });
    res.json(categories.sort());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get skills with optional category filter
router.get('/skills', async (req, res) => {
  try {
    const userId = req.query.userId || req.user?.id || DEMO_USER_ID;
    const category = req.query.category;

    let query = { userId };
    
    if (category && category !== 'all') {
      query.category = category;
    }

    const skills = await Skill.find(query).sort({ strength: -1 });
    
    // If no skills found in DB and it's the demo user, return demo skills
    if (skills.length === 0 && userId.toString() === DEMO_USER_ID.toString()) {
      let filtered = DEMO_SKILLS;
      
      if (category && category !== 'all') {
        filtered = filtered.filter(s => s.category === category);
      }
      
      return res.json(filtered.sort((a, b) => b.strength - a.strength));
    }
    
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get skill categories
router.get('/skill-categories', async (req, res) => {
  try {
    const userId = req.query.userId || req.user?.id;

    if (!userId) {
      // Return demo categories
      const categories = new Set(DEMO_SKILLS.map(s => s.category));
      return res.json(Array.from(categories).sort());
    }

    const categories = await Skill.distinct('category', { userId });
    res.json(categories.sort());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get achievements
router.get('/achievements', async (req, res) => {
  try {
    const userId = req.query.userId || req.user?.id;

    if (!userId) {
      // Return demo achievements
      return res.json(DEMO_ACHIEVEMENTS.sort((a, b) => a.order - b.order));
    }

    const achievements = await Achievement.find({ userId }).sort({ order: 1 });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get GitHub stats
router.get('/github-stats', async (req, res) => {
  try {
    const userId = req.query.userId || req.user?.id || DEMO_USER_ID;

    const stats = await GitHubStats.findOne({ userId });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upsert profile
router.post('/profile', async (req, res) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const profile = await Profile.findOneAndUpdate(
      { userId },
      req.body,
      { upsert: true, new: true }
    );

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upsert achievement
router.post('/achievement', async (req, res) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const achievement = new Achievement({
      userId,
      ...req.body,
    });

    await achievement.save();
    res.json(achievement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
