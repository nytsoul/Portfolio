# Portfolio Setup Guide

This portfolio application features automatic GitHub integration, intelligent project categorization, and skill detection.

## Features

### 🔄 Automatic GitHub Integration
- Fetches public repositories from any GitHub username
- Updates GitHub stats (repos, followers, following)
- Automatic data caching to minimize API calls

### 📊 Smart Project Categorization
Projects are automatically categorized based on:
- Repository name
- Description content
- Topics/tags
- Primary language
- Keywords detection

Categories include:
- Web Development
- Backend
- Cybersecurity
- Competitive Programming
- Machine Learning
- Mobile Development
- DevOps
- Blockchain
- Other

### 🎯 Skills Auto-Detection
Skills are extracted from:
- Repository languages
- Topics and tags
- Dependency files

Skill strength is calculated based on:
- Usage frequency (how many projects)
- Recency (when last used)
- Relative comparison (normalized to 0-100)

### 🎨 Dark Mode Theme
- Modern dark blue/cyan color scheme
- Smooth animations with Framer Motion
- Responsive design for mobile and desktop
- Glass morphism effects

## Setup Instructions

### 1. Seed Your Portfolio Data

Run this command to populate with sample data:
```bash
npx convex run seedData:seedPortfolioData
```

### 2. Fetch Real GitHub Data (Optional)

To fetch your actual GitHub repositories and stats:

```bash
npx convex run github:fetchGitHubData '{"username": "YOUR_GITHUB_USERNAME", "userId": "YOUR_USER_ID"}'
```

Replace:
- `YOUR_GITHUB_USERNAME` with your GitHub username
- `YOUR_USER_ID` with your user ID from Convex (get it from the seeded data response)

### 3. Update Profile Information

Edit the profile data by modifying the seed data in `src/convex/seedData.ts` or create a UI admin panel to update:
- Name
- Location
- Bio
- Tagline
- Profile image URL
- Email
- Website
- GitHub username
- LinkedIn profile

### 4. Customize Achievements

Update the achievements in the seed data to reflect your actual:
- Years of experience
- Number of completed projects
- Competitive programming stats (Codeforces, LeetCode, etc.)
- Academic performance (GPA, awards, etc.)

## File Structure

```
src/
├── convex/
│   ├── schema.ts              # Database schema
│   ├── portfolio.ts           # Portfolio queries/mutations
│   ├── github.ts              # GitHub integration action
│   ├── githubMutations.ts     # Internal GitHub mutations
│   └── seedData.ts            # Seed data script
├── components/
│   └── portfolio/
│       ├── Navigation.tsx     # Top navigation bar
│       ├── Hero.tsx          # Hero section with profile & stats
│       ├── About.tsx         # About section with achievements
│       ├── Projects.tsx      # Projects grid with filters
│       ├── Skills.tsx        # Skills with strength bars
│       └── Contact.tsx       # Contact information
└── pages/
    └── Portfolio.tsx         # Main portfolio page

```

## GitHub API Rate Limits

The GitHub API has rate limits:
- **Unauthenticated requests**: 60 requests per hour
- **Authenticated requests**: 5,000 requests per hour (recommended for production)

To avoid rate limits:
1. Cache data in Convex (already implemented)
2. Only refresh GitHub data periodically (e.g., once per day)
3. Use GitHub Personal Access Token for authentication (add to your action)

## Customization

### Change Color Theme
Edit `src/index.css` and modify the CSS variables in the `:root` section.

### Add More Categories
Update the `categorizeProject` function in `src/convex/github.ts` to add more categories.

### Modify Skill Categories
Update the `categorizeSkill` function in `src/convex/github.ts` to customize skill groupings.

## Deployment

1. Deploy Convex backend:
```bash
npx convex deploy
```

2. Build frontend:
```bash
npm run build
```

3. Deploy to your hosting provider (Vercel, Netlify, etc.)

## Support

For issues or questions:
- Check the Convex documentation: https://docs.convex.dev
- Review the GitHub API docs: https://docs.github.com/en/rest
