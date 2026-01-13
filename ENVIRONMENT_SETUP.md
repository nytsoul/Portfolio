# Environment Variables Setup Guide

This guide explains how to configure environment variables for your portfolio application.

## Quick Start

1. Copy the example file:
```bash
cp .env.example .env.local
```

2. Update the values in `.env.local` with your own information

3. Restart your development server to load the new variables

## Environment Files

- `.env.local` - Your local development environment (NOT committed to git)
- `.env.example` - Template file showing all available variables (committed to git)
- `.env.production` - Production-specific variables (optional)

## Required Variables

These variables are **required** for the application to function:

### Convex Backend
```env
VITE_CONVEX_URL=https://your-deployment.convex.cloud
```
Get this by running `npx convex dev`

### GitHub Integration
```env
VITE_GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=github_pat_YOUR_TOKEN_HERE
```

**How to get a GitHub Token:**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name like "Portfolio App"
4. Select scope: `public_repo` (read-only access to public repositories)
5. Generate and copy the token
6. Add it to your `.env.local`

## Portfolio Configuration

### Basic Information
```env
VITE_PORTFOLIO_NAME="Your Full Name"
VITE_PORTFOLIO_LOCATION="Your City, Country"
VITE_PORTFOLIO_EMAIL=your.email@example.com
VITE_PORTFOLIO_GITHUB=your-github-username
```

### Professional Links
```env
VITE_PORTFOLIO_WEBSITE=https://yourwebsite.com
VITE_PORTFOLIO_LINKEDIN=https://linkedin.com/in/your-profile
```

### About You
```env
VITE_PORTFOLIO_TAGLINE="Your professional tagline"
VITE_PORTFOLIO_BIO="Brief bio about yourself"
```

## Academic Information

```env
VITE_COLLEGE_NAME="Your University Name"
VITE_COLLEGE_LOCATION="City"
VITE_DEGREE="Your Degree Program"
VITE_YEAR="Current Year"
VITE_GPA="Your GPA"
VITE_EXPERIENCE_YEARS="1+"
```

## Competitive Programming (Optional)

If you participate in competitive programming, add your usernames:

```env
VITE_CODEFORCES_USERNAME=your-username
VITE_CODEFORCES_PROBLEMS_SOLVED=300
VITE_LEETCODE_USERNAME=your-username
VITE_CODECHEF_USERNAME=your-username
```

## Feature Flags

Enable or disable features:

```env
VITE_ENABLE_GITHUB_SYNC=true       # Auto-fetch GitHub repos
VITE_ENABLE_ANALYTICS=false        # Google Analytics tracking
VITE_ENABLE_CONTACT_FORM=true      # Contact form functionality
VITE_ENABLE_DARK_MODE=true         # Dark mode (always on by default)
VITE_ENABLE_TYPEWRITER=true        # Typewriter animation in hero
VITE_ENABLE_ANIMATIONS=true        # Framer Motion animations
```

## Analytics Integration (Optional)

### Google Analytics
```env
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### Hotjar
```env
VITE_HOTJAR_ID=your-hotjar-id
```

### PostHog
```env
VITE_POSTHOG_KEY=your-posthog-key
```

## Contact Form Services (Optional)

### Formspree
Free contact form service: https://formspree.io/

```env
VITE_FORMSPREE_ID=your-form-id
```

### EmailJS
Email service: https://www.emailjs.com/

```env
VITE_EMAILJS_SERVICE_ID=your-service-id
VITE_EMAILJS_TEMPLATE_ID=your-template-id
VITE_EMAILJS_PUBLIC_KEY=your-public-key
```

## SEO & Metadata

```env
VITE_SITE_URL=https://yourdomain.com
VITE_SITE_TITLE="Your Name - Portfolio"
VITE_SITE_DESCRIPTION="Your description for SEO"
VITE_SITE_KEYWORDS="portfolio,developer,keywords"
VITE_SITE_AUTHOR="Your Name"
VITE_SITE_IMAGE=/og-image.jpg
```

## Social Media Links (Optional)

```env
VITE_TWITTER_HANDLE=@your_twitter
VITE_INSTAGRAM_HANDLE=@your_instagram
VITE_YOUTUBE_CHANNEL=your-channel-url
VITE_MEDIUM_USERNAME=@your_medium
VITE_DEV_TO_USERNAME=your_devto
```

## Resume/CV

```env
VITE_RESUME_URL=/resume.pdf
VITE_CV_LAST_UPDATED=2024-01-15
```

Place your resume PDF in the `public` folder as `resume.pdf`

## GitHub API Configuration

Fine-tune GitHub API behavior:

```env
VITE_GITHUB_API_BASE=https://api.github.com
VITE_GITHUB_CACHE_DURATION=3600000  # 1 hour in milliseconds
VITE_GITHUB_MAX_REPOS=100           # Maximum repos to fetch
```

## Development Settings

```env
NODE_ENV=development
VITE_APP_VERSION=1.0.0
VITE_BUILD_DATE=2024-01-15
VITE_DEBUG_MODE=false
```

## Performance Optimization

```env
VITE_ENABLE_SERVICE_WORKER=false    # PWA service worker
VITE_CACHE_IMAGES=true              # Cache images locally
VITE_LAZY_LOAD_IMAGES=true          # Lazy load images
```

## Theme Configuration

```env
VITE_DEFAULT_THEME=dark
VITE_ENABLE_THEME_TOGGLE=false      # Light/dark mode toggle
VITE_PRIMARY_COLOR=#06b6d4          # Cyan
VITE_ACCENT_COLOR=#8b5cf6           # Purple
```

## Using Environment Variables in Code

Import the helper:

```typescript
import { env } from '@/lib/env';

// Access variables
const name = env.portfolio.name;
const email = env.portfolio.email;
const isDev = env.isDevelopment;

// Check features
if (env.features.githubSync) {
  // Fetch GitHub data
}
```

## Security Best Practices

### ✅ DO:
- Keep `.env.local` in `.gitignore` (already configured)
- Use `VITE_` prefix for client-side variables
- Keep sensitive tokens (like `GITHUB_TOKEN`) without `VITE_` prefix
- Commit `.env.example` with dummy values

### ❌ DON'T:
- Commit `.env.local` to git
- Share your GitHub tokens publicly
- Use production credentials in development
- Put API keys in variables starting with `VITE_`

## Troubleshooting

### Variables not loading?
1. Restart your dev server after changing `.env.local`
2. Make sure variable names start with `VITE_` for client-side access
3. Check for typos in variable names

### GitHub sync not working?
1. Verify `VITE_GITHUB_USERNAME` is correct
2. Check `GITHUB_TOKEN` has proper permissions
3. Ensure token hasn't expired

### Build errors?
1. Run `npm run build` to check for missing variables
2. Ensure all required variables are set
3. Check TypeScript errors with `npx tsc -b --noEmit`

## Production Deployment

### Vercel
Add variables in: Project Settings → Environment Variables

### Netlify
Add variables in: Site Settings → Build & deploy → Environment

### General
Make sure to set all variables from `.env.example` in your hosting platform's environment variable settings.

## Getting Help

If you encounter issues:
1. Check this documentation
2. Review `.env.example` for correct format
3. Verify all required variables are set
4. Check console for error messages (if `VITE_DEBUG_MODE=true`)

## Variable Reference Table

| Variable | Required | Type | Default | Description |
|----------|----------|------|---------|-------------|
| `VITE_CONVEX_URL` | ✅ | string | - | Convex deployment URL |
| `VITE_GITHUB_USERNAME` | ✅ | string | - | Your GitHub username |
| `GITHUB_TOKEN` | ⚠️ | string | - | GitHub API token (for higher rate limits) |
| `VITE_PORTFOLIO_NAME` | ❌ | string | "Neshun R" | Your name |
| `VITE_PORTFOLIO_EMAIL` | ❌ | string | - | Contact email |
| `VITE_ENABLE_GITHUB_SYNC` | ❌ | boolean | true | Auto-fetch GitHub repos |
| `VITE_ENABLE_ANIMATIONS` | ❌ | boolean | true | Enable animations |

Legend:
- ✅ Required
- ⚠️ Recommended
- ❌ Optional
