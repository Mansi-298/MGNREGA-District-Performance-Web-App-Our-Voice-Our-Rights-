# Deployment Guide - Voice Rights Dashboard

## 🚀 Quick Deployment Steps

### For Render.com (Recommended)

1. **Push your code to GitHub**
2. **Connect to Render:**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select this repository

3. **Configure the service:**
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Environment:** Node.js
   - **Port:** 3000 (or leave default)
   - **Node Version:** 18+ (recommended)

4. **Environment Variables (Optional):**
   - `NODE_ENV=production`
   - `PORT=3000`
   - `MONGO_URI=your_mongodb_connection_string` (optional)

### For Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Configure build settings:**
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

### For Railway

1. **Connect GitHub repository**
2. **Railway will auto-detect Node.js**
3. **Set environment variables if needed**

## 🔧 Build Process

The project uses:
- **Frontend:** Vite build (React app) - production-safe config
- **Backend:** ESBuild (Express server)
- **Output:** Combined in `dist/` directory
- **Dependencies:** All build tools moved to main dependencies

## 📁 Project Structure After Build

```
dist/
├── public/          # Frontend assets
│   ├── index.html
│   └── assets/
└── index.js         # Backend server
```

## ⚠️ Common Issues & Solutions

### Issue: "Cannot find module"
**Solution:** Make sure build command runs successfully
```bash
npm run build
```

### Issue: Port binding errors
**Solution:** Set PORT environment variable
```bash
PORT=3000 npm start
```

### Issue: MongoDB connection
**Solution:** App works without database (uses in-memory cache)

## 🎯 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] `npm run build` works locally
- [ ] Environment variables set (if using database)
- [ ] Port configuration correct
- [ ] Build and start commands configured

## 🚀 Ready to Deploy!

Your app is now configured for deployment. The build process will:
1. Build the React frontend with Vite
2. Bundle the Express backend with ESBuild
3. Create a single `dist/index.js` file that serves both frontend and backend

**The app will work with or without a database!** 🎉
