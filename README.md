# My Bento Portfolio

A serverless-on-static developer portfolio built with Astro, React, Tailwind CSS, and GitHub Actions.

## 🚀 Project Overview

This project uses the **Islands Architecture** to deliver a high-performance static site with dynamic capabilities.
- **Frontend**: Astro (Static Generation) + React (Interactive Islands) + Tailwind CSS (Styling)
- **Backend**: GitHub Actions (Cron Jobs) + Serverless Functions (Build-time fetching)
- **Database**: JSON files in `public/data` (Self-healing data store)

## 🛠️ Integration Instructions

### 1. Spotify Integration
To enable the "Now Playing" widget:
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Create an App and get `Client ID` and `Client Secret`.
3. Add `http://localhost:4321` to Redirect URIs.
4. Authorize your app to get the `Refresh Token` (see `src/lib/spotify.ts` comments or use a helper tool).
5. Add the following **Repository Secrets** in GitHub:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
   - `SPOTIFY_REFRESH_TOKEN`

### 2. Instagram Integration
To enable the Photo Feed:
1. Obtain a **Long-Lived Access Token** from the Instagram Basic Display API.
2. Add it as a **Repository Secret**:
   - `INSTAGRAM_ACCESS_TOKEN`
3. The `instagram-cron.yml` workflow will automatically refresh this token before it expires.

### 3. GitHub Stats
To enable Pinned Repositories:
1. Create a **Personal Access Token** (Classic) with `repo` and `read:user` scopes.
2. Add it as a **Repository Secret**:
   - `GITHUB_TOKEN` (Note: This is different from the default `GITHUB_TOKEN` used by Actions. You might need to name it `GH_PAT` and update `astro.config.mjs` or `deploy.yml` accordingly, but the current setup uses the default token for simple read ops if public, or you can inject a PAT).
   *Update*: The current `deploy.yml` passes the default `GITHUB_TOKEN`. If you need to access private repos, use a PAT.

### 4. Deployment
1. Push this repository to GitHub.
2. Go to **Settings > Pages**.
3. Source: **GitHub Actions**.
4. The `deploy.yml` workflow will automatically build and deploy your site.

## 🧪 Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

## ✅ Final Checklist

- [ ] `npm install` runs without errors.
- [ ] `npm run build` generates `dist/` folder.
- [ ] GitHub Repository Secrets are set.
- [ ] workflows are enabled in GitHub Actions tab.
- [ ] `astro.config.mjs` `site` and `base` are updated with your details.
