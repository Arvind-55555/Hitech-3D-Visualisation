# Deployment Guide - Hitech City 3D Visualizer

## 🚀 Deploy to Vercel

### Prerequisites
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- GitHub account (optional, for automatic deployments)
- **No API keys required!** The app works completely offline

### Step 1: Prepare Your Repository

1. **Push your code to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Hitech City 3D Visualizer"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

### Step 2: Deploy via Vercel Dashboard

1. **Go to Vercel Dashboard**:
   - Visit [vercel.com/new](https://vercel.com/new)
   - Sign in with your GitHub account

2. **Import Your Project**:
   - Click "Import Project"
   - Select your repository from the list
   - Or paste your repository URL

3. **Configure Project Settings**:
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Environment Variables** (Optional):
   - No environment variables needed!
   - The app uses local AI and free map tiles

5. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete (usually 2-3 minutes)

### Step 3: Deploy via Vercel CLI (Alternative)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? Select your account
   - Link to existing project? **No** (for first deployment)
   - Project name? `hitech-city-3d-visualizer` (or your choice)
   - Directory? `./`
   - Override settings? **No**

4. **Production Deploy**:
   ```bash
   vercel --prod
   ```

### Step 4: Verify Deployment

1. Visit your deployment URL (provided by Vercel)
2. Check that:
   - The 3D map loads correctly
   - Landmarks are visible with hover tooltips
   - Dashboard panels display data
   - AI chat works (local knowledge base)
   - All three tabs work (AI, Map, Data)

### Step 5: Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## 📝 Build Configuration

The project uses the following build settings (configured in `vercel.json`):

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18+ (20+ recommended)

## 🔧 No Configuration Needed!

This application requires **zero configuration**:
- ✅ No API keys
- ✅ No environment variables
- ✅ No external services
- ✅ Works completely offline

## 🐛 Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure Node.js version is 18+ (20+ recommended)
- Review build logs in Vercel dashboard
- Try clearing cache: `npm cache clean --force`

### Map Not Loading
- Check browser console for errors
- Ensure internet connection (needed for tile loading)
- Verify MapLibre CSS is loading correctly

### AI Chat Not Working
- AI uses local knowledge base - no API needed
- Check browser console for any errors
- Verify `services/localAI.ts` is included in build

### Large Bundle Size Warning
- This is normal for 3D mapping applications
- Consider code splitting for future optimizations
- The warning doesn't prevent deployment

## 🔄 Continuous Deployment

Once connected to GitHub, Vercel will automatically:
- Deploy on every push to `main` branch
- Create preview deployments for pull requests
- Run builds automatically

## 📊 Performance Tips

1. **Enable Vercel Analytics** (optional):
   - Go to project settings
   - Enable Analytics
   - Monitor performance metrics

2. **Optimize Images** (if adding custom images):
   - Use WebP format
   - Compress images before upload
   - Use Vercel's Image Optimization

3. **Caching**:
   - Static assets are automatically cached
   - API responses can be cached via headers

## 🎯 Next Steps

After deployment:
1. Share your deployment URL
2. Monitor performance in Vercel dashboard
3. Set up custom domain (optional)
4. Configure analytics (optional)
5. Add more features and redeploy

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Project Issues: Open an issue in your repository
