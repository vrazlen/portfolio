# 🔐 Project Setup Guide: The Information Phase

This guide covers **Phase 1: Information Gathering** of your project. You must complete these steps to get the API keys (Secrets) required for the "Serverless on Static" architecture to work.

---

## 🎵 Part 1: Spotify Integration (The "Now Playing" Widget)

**Goal**: Get 3 secrets: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`.

### 1. Create the App
1.  Log in to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2.  Click **"Create app"**.
3.  **App Name**: `My Bento Portfolio` (or anything you like).
4.  **App Description**: `Personal portfolio website`.
5.  **Redirect URI**: 
    *   Enter: `http://127.0.0.1:4321`
    *   **Troubleshooting "Not Secure"**: 
        *   Ensure you are **NOT** using `https://`. It must be `http://`.
        *   We are using `127.0.0.1` instead of `localhost` to avoid some browser/OS specific issues.
6.  Click **Save**.

### 2. Get ID & Secret
1.  In your App's dashboard, click **Settings**.
2.  Copy the **Client ID**. -> *Save this for later.*
3.  Click "View client secret" and copy the **Client Secret**. -> *Save this for later.*

### 3. Generate the Refresh Token (The Tricky Part)
We need to authorize your app once to get a token that lasts forever (until revoked).

1.  **Construct the Authorization URL**:
    Replace `YOUR_CLIENT_ID` in the URL below with the ID you just copied:
    ```text
    https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://127.0.0.1:4321&scope=user-read-currently-playing%20user-read-recently-played
    ```
2.  **Authorize**:
    *   Paste that URL into your browser.
    *   Log in to Spotify and click "Agree".
    *   You will be redirected to a page that looks like an error (or your local site if running). **This is normal.**
3.  **Get the Code**:
    *   Look at the URL in your browser address bar. It will look like:
        `http://127.0.0.1:4321/?code=AQCx..._very_long_string_...`
    *   Copy everything after `code=` (stop before `&` if there are other parameters). This is your **Authorization Code**.
4.  **Exchange for Refresh Token**:
    *   You need to run a command to swap this code for the token.
    *   **Option A (Terminal/Curl)**:
        Fill in your details and run this in your terminal:
        ```bash
        curl -H "Authorization: Basic $(echo -n 'YOUR_CLIENT_ID:YOUR_CLIENT_SECRET' | base64)" -d grant_type=authorization_code -d code=YOUR_AUTH_CODE -d redirect_uri=http://127.0.0.1:4321 https://accounts.spotify.com/api/token
        ```
    *   **Option B (No Terminal)**:
        Use a trusted helper tool like [Get Spotify Refresh Token](https://get-spotify-refresh-token.vercel.app/) (Select "Custom Client" and enter your ID/Secret).
5.  **Save the Result**:
    *   The response will contain a `refresh_token`. -> *Save this for later.*

---

## 📸 Part 2: Photography Showcase (Manual Curation)

**Update**: The *Instagram Basic Display API* was deprecated in late 2024. To keep your portfolio "Zero Cost" and maintenance-free, we have switched this to a **Curated Gallery**.

Instead of an API token, you will simply add the image URLs you want to feature directly into a file.

1.  Open `public/data/instagram-feed.json`.
2.  You will see a list of photo objects.
3.  Replace the `media_url` with direct links to your photos (hosted on GitHub, Unsplash, or anywhere public).
4.  Update the `permalink` to point to your Instagram post or portfolio page.
5.  Update the `caption`.

*This ensures your site never breaks due to API changes and gives you full control over which photos appear.*

---

## 🐙 Part 3: GitHub Integration (Pinned Repos)

**Goal**: Get 1 secret: `GITHUB_TOKEN`.

1.  Go to [GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens).
2.  Click **"Generate new token (classic)"**.
3.  **Note**: `Portfolio Access`.
4.  **Expiration**: `No expiration` (or set a reminder to rotate it).
5.  **Scopes**: Check `repo` (for private repos), `workflow` (CRITICAL for deploying), and `read:user`.
6.  Click **Generate token**.
7.  Copy the token immediately. -> *Save this for later.*

---

## ✏️ Part 4: Personalization

Now that you have the keys, let's make the site yours.

### 1. Update Config
Open `astro.config.mjs`:
*   Change `site: 'https://username.github.io'` to your actual GitHub Pages URL.
*   Change `base: '/my-portfolio'` to your repository name (e.g., `/portfolio` or `/`).

### 2. Update Content
Open `src/pages/index.astro`:
*   **Name**: Find `Hello, I'm <span class="text-accent">Dev</span>` and replace "Dev".
*   **Bio**: Update the paragraph below the name.
*   **Location**: Update "San Francisco, CA".
*   **Stack**: Update the list `['React', 'Astro', ...]`.

### 3. Update Social Links
Open `src/components/SocialLinks.astro`:
*   Replace the `href` values with your actual profile URLs.

---

## 🚀 Part 5: Final Deployment

1.  Go to your GitHub Repository.
2.  Click **Settings** > **Secrets and variables** > **Actions**.
3.  Click **New repository secret**.
4.  Add the following secrets using the values you saved:
    *   `SPOTIFY_CLIENT_ID`
    *   `SPOTIFY_CLIENT_SECRET`
    *   `SPOTIFY_REFRESH_TOKEN`
    *   `GITHUB_TOKEN`
5.  Push your code to GitHub!
    ```bash
    git add .
    git commit -m "feat: configure portfolio"
    git push origin main
    ```

The `deploy.yml` workflow will start, build your site using these secrets, and deploy it to GitHub Pages.
