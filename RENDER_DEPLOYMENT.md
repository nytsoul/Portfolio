# Render Deployment Guide for Portfolio

## 🚀 Quick Start

This guide will help you deploy your portfolio project to Render.com successfully.

---

## ✅ Prerequisites

Before deploying, ensure you have:

1. **GitHub Account** - Repository must be pushed to GitHub
2. **Render Account** - Sign up at https://render.com
3. **MongoDB Atlas** - For database (optional, but recommended)
   - Free tier available: https://www.mongodb.com/cloud/atlas
4. **GitHub Token** - For API access (optional)
   - Create at: https://github.com/settings/tokens

---

## 📋 Step-by-Step Deployment

### Step 1: Prepare Your Repository

Make sure your code is committed and pushed to GitHub:

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### Step 2: Create Render Account & New Service

1. Go to https://render.com
2. Sign up or log in with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository
5. Select your portfolio repository

### Step 3: Configure the Service

Fill in the following settings:

| Setting | Value |
|---------|-------|
| **Name** | `portfolio` |
| **Environment** | `Node` |
| **Region** | Choose closest to your users |
| **Branch** | `main` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm run start` |
| **Plan** | `Free` (or paid if you need better performance) |

### Step 4: Add Environment Variables

Click on **"Environment"** tab and add these variables:

#### Essential Variables:

```
NODE_ENV=production
PORT=10000
NODE_OPTIONS=--max-old-space-size=2048
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
VITE_API_BASE_URL=https://your-service-name.onrender.com/api
GITHUB_TOKEN=github_pat_YOUR_TOKEN_HERE
```

#### Portfolio Information (Copy from .env.render):

```
VITE_GITHUB_USERNAME=nytsoul
VITE_PORTFOLIO_NAME=Neshun R
VITE_PORTFOLIO_LOCATION=Chennai, India
VITE_PORTFOLIO_EMAIL=neshun7413@gmail.com
VITE_PORTFOLIO_WEBSITE=https://neshun.dev
VITE_PORTFOLIO_LINKEDIN=http://www.linkedin.com/in/neshun-r-309b1b37b
VITE_PORTFOLIO_GITHUB=nytsoul
VITE_PORTFOLIO_TAGLINE=Full-stack developer passionate about AI, cybersecurity, and building scalable systems
...
(See .env.render for complete list)
```

### Step 5: Deploy

Click **"Create Web Service"** to start the deployment.

Monitor the build logs. The first deployment usually takes 3-5 minutes.

---

## 🔧 MongoDB Atlas Setup (If Using Database)

### 1. Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new project

### 2. Create a Cluster

1. Click **"Create a Deployment"**
2. Choose **"Shared Clusters"** (free tier)
3. Select your region
4. Click **"Create Cluster"**

### 3. Get Connection String

1. Click **"Connect"** on your cluster
2. Choose **"Drivers"** → **"Node.js"**
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `portfolio`

Your URL should look like:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio
```

### 4. Configure Network Access

1. Go to **"Network Access"**
2. Click **"Add IP Address"**
3. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

---

## 🌐 Custom Domain Setup (Optional)

1. In Render dashboard, go to your service
2. Click **"Settings"** tab
3. Scroll to **"Custom Domain"**
4. Add your domain
5. Follow DNS configuration instructions

---

## 📊 Monitoring & Logs

### View Deployment Logs

1. Go to your service in Render dashboard
2. Click **"Logs"** tab
3. Watch real-time deployment progress

### Common Issues & Solutions

#### Error: "Build failed"
- Check **Build Command** is correct: `npm install && npm run build`
- Check all dependencies are listed in `package.json`
- Check Node version compatibility

#### Error: "Port not available"
- Render uses port `10000` by default
- Do NOT change PORT variable unless needed
- The app should listen on `process.env.PORT`

#### Error: "Out of memory during build"
- This is handled by: `NODE_OPTIONS=--max-old-space-size=2048`
- Already configured in `render.yaml`

#### App crashes after deployment
- Check `/health` endpoint: `https://your-url.onrender.com/health`
- Check environment variables are set correctly
- Check MongoDB connection string is valid

---

## 🔄 Redeployment

### Manual Redeploy

1. Go to your service in Render dashboard
2. Click **"Manual Deploy"** → **"Deploy latest commit"**

### Automatic Redeploy on Push

1. Go to **"Settings"**
2. Toggle **"Auto-Deploy"** to **ON**
3. Now every push to `main` triggers automatic deployment

---

## 🔒 Security Best Practices

1. **Never commit `.env` files** - Already in `.gitignore` ✅

2. **Rotate GitHub Tokens**
   - Create separate tokens for development and production
   - Update every 90 days
   - Go to https://github.com/settings/tokens

3. **MongoDB Security**
   - Use strong passwords
   - Restrict IP access to Render IPs only (if possible)
   - Enable encryption at rest
   - Regular backups enabled

4. **HTTPS Only**
   - Render automatically provides HTTPS certificates
   - All traffic is encrypted by default

---

## 📞 Need Help?

- **Render Support**: https://support.render.com
- **Check Logs**: Service → Logs tab
- **Rebuild Service**: Service → Manual Deploy
- **Verify Health**: Visit `/health` endpoint

---

## ✨ What Happens During Deployment

1. **Install Dependencies**
   - `npm install` installs all packages from `package.json`

2. **Build**
   - `npm run build` compiles TypeScript and bundles frontend with Vite

3. **Start**
   - `npm run start` runs the Express server on port 10000
   - Server serves both API endpoints and frontend static files

4. **Health Check**
   - Render checks if service is responding
   - `/health` endpoint verifies server is running

---

## 🎉 Deployment Complete!

Once deployment succeeds, your portfolio is live at:
```
https://your-service-name.onrender.com
```

Test it:
- Health check: `https://your-service-name.onrender.com/health`
- Your portfolio: `https://your-service-name.onrender.com/`

---

## 📝 Environment Variables Reference

See `.env.render` for the complete list of variables with descriptions.

Key variables:
- `NODE_ENV=production` - Sets Node to production mode
- `PORT=10000` - Render assigns this port
- `MONGODB_URI` - Your MongoDB connection string
- `VITE_*` - Frontend variables (visible in browser)
- `GITHUB_TOKEN` - For GitHub API access (hidden from frontend)

---

Generated: January 14, 2026
