# Vercel & Render Deployment Environment Variables Guide

## 🎯 Quick Setup

### Frontend (Vercel) - Environment Variables

Add these to your Vercel project settings under **Settings → Environment Variables**

#### Required Variables
```env
# Convex Backend
VITE_CONVEX_URL=https://your-deployment.convex.cloud

# GitHub Integration
VITE_GITHUB_USERNAME=nytsoul
GITHUB_TOKEN=github_pat_YOUR_TOKEN_HERE
```

#### Optional But Recommended
```env
# Portfolio Information
VITE_PORTFOLIO_NAME=Neshun R
VITE_PORTFOLIO_LOCATION=Chennai, India
VITE_PORTFOLIO_EMAIL=neshun7413@gmail.com
VITE_PORTFOLIO_GITHUB=nytsoul
VITE_PORTFOLIO_TAGLINE=Full-stack developer passionate about AI, cybersecurity, and building scalable systems
VITE_PORTFOLIO_BIO=2nd-year CS Engineering student at SSN College of Engineering. Building robust systems and solving real-world problems with a focus on user experience and architectural thinking.

# Academic Information
VITE_COLLEGE_NAME=SSN College of Engineering
VITE_COLLEGE_LOCATION=Chennai
VITE_DEGREE=Computer Science Engineering
VITE_YEAR=2nd Year
VITE_GPA=6.875
VITE_EXPERIENCE_YEARS=1+

# Competitive Programming
VITE_CODEFORCES_USERNAME=your-codeforces-username
VITE_CODEFORCES_PROBLEMS_SOLVED=300
VITE_LEETCODE_USERNAME=your-leetcode-username

# VLY Platform
VITE_VLY_APP_ID=your-vly-app-id
VITE_VLY_MONITORING_URL=https://runtime-monitoring.vly.ai/runtime-error

# GitHub API Configuration
VITE_GITHUB_API_BASE=https://api.github.com
VITE_GITHUB_CACHE_DURATION=3600000
VITE_GITHUB_MAX_REPOS=100

# Feature Flags
VITE_ENABLE_GITHUB_SYNC=true
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_CONTACT_FORM=true
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_TYPEWRITER=true
VITE_ENABLE_ANIMATIONS=true

# SEO & Metadata
VITE_SITE_URL=https://yourdomain.com
VITE_SITE_TITLE=Your Name - Portfolio
VITE_SITE_DESCRIPTION=Brief description for search engines
VITE_SITE_AUTHOR=Your Name
```

---

### Backend (Render) - Environment Variables

Add these to your Render service settings under **Environment**

#### Required Variables
```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# Server Configuration
PORT=10000
NODE_ENV=production

# GitHub Integration
GITHUB_TOKEN=github_pat_YOUR_TOKEN_HERE

# Convex Configuration
CONVEX_DEPLOYMENT=prod:your-deployment
CONVEX_SITE_URL=https://yourdomain.com
```

#### Optional
```env
# CORS Configuration
CORS_ORIGIN=https://yourdomain.com

# API Rate Limiting
API_RATE_LIMIT=100
```

---

## 📋 Step-by-Step Setup Instructions

### 1. Get Your GitHub Token
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes:
   - ✅ `repo` (read-only access)
   - ✅ `user:email`
4. Copy the token and save it securely

### 2. Get Your Convex URL
1. Run: `npx convex dev`
2. Look for deployment URL in terminal output
3. It will look like: `https://your-deployment.convex.cloud`

### 3. MongoDB Atlas Connection String
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a cluster if you haven't already
3. Click "Connect" → "Drivers"
4. Copy connection string: `mongodb+srv://username:password@cluster.mongodb.net/portfolio`
5. Replace `username` and `password` with your credentials

### 4. Vercel Setup
1. Go to https://vercel.com
2. Create a new project from your GitHub repository
3. Go to **Settings → Environment Variables**
4. Add all the variables from the "Frontend" section above
5. Deploy

### 5. Render Setup
1. Go to https://render.com
2. Create a new "Web Service" from your GitHub repository
3. Configure:
   - **Build Command:** `pnpm run build`
   - **Start Command:** `pnpm start`
   - **Environment:** Node
   - **Region:** Choose closest to your users
4. Go to **Environment** tab
5. Add all the variables from the "Backend" section above
6. Deploy

---

## 🔐 Security Best Practices

1. **Never commit `.env` files** - Already in `.gitignore` ✅
2. **Use different tokens for dev/prod** - Create separate GitHub tokens
3. **Rotate tokens regularly** - Update every 90 days
4. **Use MongoDB Atlas IP Whitelist** - Restrict access to your servers
5. **Enable HTTPS only** - All connections should be encrypted

---

## 🚀 Production Checklist

- [ ] Convex URL is correct
- [ ] GitHub token has correct permissions
- [ ] MongoDB connection string is valid
- [ ] All VITE_ variables are set for frontend
- [ ] PORT is set to 10000 (Render default)
- [ ] NODE_ENV=production on Render
- [ ] CORS is configured correctly
- [ ] Frontend deployment points to backend URL
- [ ] Test GitHub sync functionality
- [ ] Check logs for errors

---

## 🆘 Troubleshooting

### "Cannot find module" on Render
- Ensure `pnpm run build` completes successfully
- Check that `node server/server.js` path is correct
- Verify `package.json` has proper `start` script

### GitHub data not syncing
- Check `GITHUB_TOKEN` is correct
- Verify token has `repo` scope
- Check GitHub API rate limits (60 unauthenticated, 5000 authenticated)

### Convex connection issues
- Verify `VITE_CONVEX_URL` matches your deployment
- Ensure Convex backend is running
- Check browser console for CORS errors

### MongoDB connection errors
- Test connection string: `mongosh "your-connection-string"`
- Verify IP whitelist includes Render server
- Check username/password doesn't have special characters (URL encode if needed)

---

## 📚 Useful Links

- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [Convex Deployment](https://docs.convex.dev/production)
- [MongoDB Atlas](https://docs.mongodb.com/atlas/)
- [GitHub Personal Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

