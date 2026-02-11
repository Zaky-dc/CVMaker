# CV Maker - Professional Resume Builder

A modern, high-performance resume builder built with React, Vite, and Tailwind CSS. Featuring real-time preview, multi-page print optimization, and automatic formatting.

## Features
- **Dynamic Templates**: Choose between Creative, Modern, and Classic designs.
- **Perfect Print Layout**: Optimized for A4 with fixed sidebars and professional multi-page support.
- **Auto-Bullet Points**: Intelligent description editor that handles list formatting automatically.
- **Internationalization**: Full support for Multiple Languages.
- **Cloud Integration**: Image and signature uploads powered by Cloudinary.

## Deployment on Vercel

This project is ready to be deployed on Vercel.

### Steps to Deploy:
1. **Push your code to GitHub** (already done!).
2. **Connect to Vercel**:
   - Go to [Vercel](https://vercel.com) and create a new project.
   - Select your `CVMaker` repository.
3. **Configure Environment Variables**:
   In the Vercel project settings, add the following environment variables (copy them from your local `.env` file):
   - `VITE_CLOUDINARY_CLOUD_NAME`
   - `VITE_CLOUDINARY_UPLOAD_PRESET`
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
4. **Deploy**: Click "Deploy" and Vercel will handle the build and hosting.

### 5. Authorize Domain (CRITICAL)
Firebase Authentication requires you to authorize your Vercel domain. If you see `auth/unauthorized-domain`:
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select your project.
3. Go to **Authentication** > **Settings** > **Authorized domains**.
4. Click **Add domain** and enter your Vercel URL (e.g., `cv-maker-by-zaakir.vercel.app`).
5. Click **Add**.

## Development

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build
```
