<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Photorealistic Wallpaper Mockups

Generate photorealistic mockups for your wallpaper shop using Google Gemini AI.

View your app in AI Studio: https://ai.studio/apps/drive/1ssWa-l2-pPJolCF9siApilHpqxZqqXJ7

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the root directory and set your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. Run the app:
   ```bash
   npm run dev
   ```

## Deploy to Netlify

### Option 1: Deploy via Netlify Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Netlify](https://app.netlify.com) and click "New site from Git"
3. Select your repository
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Add environment variable:
   - Go to Site settings → Environment variables
   - Add `GEMINI_API_KEY` with your API key value
6. Click "Deploy site"

### Option 2: Deploy via Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Initialize and deploy:
   ```bash
   netlify init
   netlify deploy --prod
   ```

4. Set environment variable:
   ```bash
   netlify env:set GEMINI_API_KEY your_api_key_here
   ```

## Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Vercel](https://vercel.com) and click "Add New Project"
3. Import your repository
4. Vercel will automatically detect Vite and configure build settings
5. Add environment variable:
   - Go to Project Settings → Environment Variables
   - Add `GEMINI_API_KEY` with your API key value
   - Select all environments (Production, Preview, Development)
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Set environment variable:
   ```bash
   vercel env add GEMINI_API_KEY
   ```
   (Follow the prompts to set the value)

5. Deploy to production:
   ```bash
   vercel --prod
   ```

### Important Notes

⚠️ **Security Warning:** This app currently uses the API key on the client-side. The API key will be visible in the browser's source code. For production use, consider:
- Using a backend proxy to hide the API key
- Implementing API key restrictions in Google Cloud Console
- Using API key restrictions by domain/IP

The app is configured with:
- `netlify.toml` for Netlify deployment
- `vercel.json` for Vercel deployment
