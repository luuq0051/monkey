# 🚀 Deployment Guide

Hướng dẫn deploy Monkey AI Server đến các platform khác nhau.

---

## 📋 Table of Contents

- [Pre-Deployment Checklist](#-pre-deployment-checklist)
- [Heroku Deployment](#-heroku-deployment)
- [Vercel Deployment](#-vercel-deployment)
- [Railway Deployment](#-railway-deployment)
- [Docker Deployment](#-docker-deployment)
- [AWS Deployment](#-aws-deployment)
- [Monitoring & Logs](#-monitoring--logs)

---

## ✅ Pre-Deployment Checklist

- [ ] Code committed to git
- [ ] `.env` file created with production values
- [ ] All tests passing
- [ ] No console.log debug statements
- [ ] package.json updated
- [ ] Git history clean
- [ ] README updated

---

## 🎯 Choose Your Platform

| Platform | Ease | Cost | Speed | Recommendation |
|----------|------|------|-------|-----------------|
| Heroku | ⭐⭐⭐⭐⭐ | $ | ⭐⭐⭐ | ✅ Best for beginners |
| Railway | ⭐⭐⭐⭐ | $ | ⭐⭐⭐ | ✅ Modern alternative |
| Vercel | ⭐⭐⭐⭐⭐ | Free | ⭐⭐⭐⭐⭐ | ✅ For serverless |
| Docker | ⭐⭐⭐ | ✓ | ⭐⭐⭐⭐ | ✅ For self-hosting |
| AWS | ⭐⭐ | $$ | ⭐⭐⭐⭐⭐ | ✅ For large scale |

---

## 🚀 Heroku Deployment

### Prerequisites
- Heroku account (free)
- Heroku CLI installed

### Step 1: Install Heroku CLI

```bash
# macOS
brew install heroku/brew/heroku

# Ubuntu/Debian
sudo snap install --classic heroku

# Windows
# Download from https://devcenter.heroku.com/articles/heroku-cli
```

### Step 2: Login

```bash
heroku login
# Opens browser for login
```

### Step 3: Create Heroku App

```bash
heroku create monkey-ai
# OR specify name
heroku create my-monkey-api

# Verify
heroku apps
```

### Step 4: Set Environment Variables

```bash
# Single variable
heroku config:set API=your-api-key
heroku config:set API_URL=https://your-api-url.com

# Multiple variables
heroku config:set API=key URL=https://url.com

# View all variables
heroku config
```

### Step 5: Deploy

```bash
# Deploy from main branch
git push heroku main

# Deploy from different branch
git push heroku feature-branch:main

# View logs
heroku logs --tail
```

### Step 6: Verify Deployment

```bash
# Open app in browser
heroku open

# Test endpoint
curl https://YOUR_APP_NAME.herokuapp.com/api/hello

# Run command on Heroku
heroku run node server.js
```

### Heroku Commands Reference

```bash
# View logs
heroku logs
heroku logs --tail          # Real-time logs
heroku logs --dyno=web     # Web dyno only

# Manage app
heroku ps                   # View dynos
heroku restart              # Restart app
heroku stop                 # Stop app

# Config
heroku config               # View all config
heroku config:unset API    # Remove variable

# Database (if used)
heroku addons:create heroku-postgresql

# Destroy app
heroku apps:destroy --app my-monkey-api
```

---

## 🚀 Railway Deployment

### Prerequisites
- Railway account (free)
- GitHub account

### Step 1: Connect GitHub

1. Go to https://railway.app
2. Click "Login with GitHub"
3. Authorize Railway

### Step 2: Create Project

1. Click "New Project"
2. Select "GitHub Repo"
3. Choose `luuq0051/monkey`

### Step 3: Configure Variables

1. Go to "Variables"
2. Add:
   - `API=your-api-key`
   - `API_URL=your-api-url`
   - `NODE_ENV=production`
   - `PORT=3000`

### Step 4: Deploy

```bash
# Deploy automatically on git push
# OR manually in Railway dashboard
```

### View Logs

```
Dashboard → Logs → View in real-time
```

---

## 🚀 Vercel Deployment

### Prerequisites
- Vercel account
- GitHub connected

### Step 1: Update package.json

```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

### Step 2: Create Vercel Config

```bash
cat > vercel.json << 'EOF'
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
EOF
```

### Step 3: Deploy

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Step 4: Set Environment Variables

```bash
# Via CLI
vercel env add API
vercel env add API_URL
vercel env add NODE_ENV production

# OR via dashboard
# Project Settings → Environment Variables
```

---

## 🐳 Docker Deployment

### Step 1: Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### Step 2: Create .dockerignore

```
node_modules
npm-debug.log
.git
.env
.DS_Store
```

### Step 3: Build Image

```bash
docker build -t monkey-ai:latest .
```

### Step 4: Run Container

```bash
# Local
docker run -p 3000:3000 \
  -e API=your-api-key \
  -e API_URL=your-url \
  monkey-ai:latest

# With .env file
docker run -p 3000:3000 \
  --env-file .env \
  monkey-ai:latest
```

### Step 5: Push to Docker Hub

```bash
# Login
docker login

# Tag image
docker tag monkey-ai:latest username/monkey-ai:latest

# Push
docker push username/monkey-ai:latest
```

### Step 6: Deploy to Docker Registry

```bash
# Deploy to AWS ECR, Google Container Registry, etc.
docker push gcr.io/my-project/monkey-ai
```

---

## ☁️ AWS Deployment

### Option 1: AWS Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli --upgrade --user

# Initialize
eb init -p node.js-18 monkey-ai

# Create environment
eb create monkey-ai-env

# Deploy
eb deploy

# Open app
eb open
```

### Option 2: AWS Lambda + API Gateway

```bash
# Install Serverless Framework
npm install -g serverless

# Create function
serverless create --template aws-nodejs --path monkey-api

# Deploy
serverless deploy
```

---

## 📊 Monitoring & Logs

### Heroku Logs

```bash
# View logs
heroku logs --app monkey-ai
heroku logs --tail --app monkey-ai

# Search logs
heroku logs --grep "error" --app monkey-ai
```

### Railway Logs

```
Dashboard → Logs section
Real-time streaming available
```

### Vercel Logs

```
Dashboard → Deployments → Logs
```

### Docker Logs

```bash
docker logs container_id
docker logs -f container_id  # Follow
```

---

## 🔐 Security Checklist

- [ ] Never commit `.env` to git
- [ ] Use `.gitignore` for sensitive files
- [ ] Set `NODE_ENV=production`
- [ ] Use HTTPS URLs
- [ ] Rotate API keys regularly
- [ ] Enable branch protection
- [ ] Add CORS if needed

---

## 📈 Performance Tips

### Environment

```env
NODE_ENV=production
```

### package.json

```json
{
  "engines": {
    "node": "18.x",
    "npm": "8.x"
  }
}
```

### Scaling

```bash
# Heroku
heroku ps:scale web=2

# Railway
Dashboard → Instance count
```

---

## 🆘 Troubleshooting

### App Crashes After Deploy

```bash
# Check logs
heroku logs --tail

# Check config
heroku config

# Restart
heroku restart
```

### Environment Variables Not Working

```bash
# Verify set
heroku config

# Redeploy after adding vars
git push heroku main
```

### Port Issues

```bash
# Make sure to use process.env.PORT
# Default to 3000 if not set
const PORT = process.env.PORT || 3000;
```

---

## 📚 Resources

- [Heroku Docs](https://devcenter.heroku.com/)
- [Railway Docs](https://docs.railway.app/)
- [Vercel Docs](https://vercel.com/docs)
- [Docker Docs](https://docs.docker.com/)
- [AWS Docs](https://docs.aws.amazon.com/)

---

## 🎯 Recommended Setup

**For Quick Start:**
```
GitHub → Railway → Auto-deploy
```

**For Production:**
```
GitHub → Docker → AWS ECS
```

**For Serverless:**
```
GitHub → Vercel → CDN
```

---

**Deployment Guide Last Updated:** 20/04/2026
