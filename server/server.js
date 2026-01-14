import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
mongoose.connect(mongoUri)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    // Continue anyway - fallback to demo data
  });

// Routes
import portfolioRoutes from './routes/portfolio.js';
import githubRoutes from './routes/github.js';

app.use('/api/portfolio', portfolioRoutes);
app.use('/api/github', githubRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`
╭──────────────────────────────────────╮
│  Portfolio Backend Server Running    │
│  Port: ${PORT}
│  Host: ${HOST}
│  MongoDB: ${mongoUri}
│  API Base: http://localhost:${PORT}/api
╰──────────────────────────────────────╯
  `);
});

export default app;
