# Deployment Guide for Vue Frontend and Flask Backend

## Frontend Deployment (Vue)

### Option 1: Vercel (Easiest & Free)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Build your Vue application:
   ```bash
   npm run build
   ```

3. Deploy with Vercel:
   ```bash
   vercel login
   vercel
   ```

### Option 2: Netlify (Easy & Free)

1. Build your Vue application:
   ```bash
   npm run build
   ```

2. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

3. Deploy to Netlify:
   ```bash
   netlify login
   netlify deploy
   ```

## Backend Deployment (Flask)

### Option 1: Railway (Very Easy & Has Free Tier)

1. Create a `requirements.txt` file listing all dependencies
2. Create a `Procfile` with: `web: gunicorn app:app`
3. Sign up on [Railway](https://railway.app/)
4. Connect your GitHub repository and deploy

### Option 2: Render (Easy & Has Free Tier)

1. Create a `requirements.txt` file
2. Add a `gunicorn` dependency
3. Sign up on [Render](https://render.com/)
4. Create a new Web Service pointing to your repository
5. Set build command: `pip install -r requirements.txt`
6. Set start command: `gunicorn app:app`

### Option 3: Heroku (Standard & Has Free Tier)

1. Create a `requirements.txt` file
2. Create a `Procfile` with: `web: gunicorn app:app`
3. Install Heroku CLI and login:
   ```bash
   heroku login
   ```
4. Create and deploy app:
   ```bash
   heroku create my-flask-app
   git push heroku main
   ```

## Connecting Frontend to Backend

1. In your Vue application, update the API base URL in your production environment:

```javascript
// In your API configuration file
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'https://your-backend-url.com',
  headers: {
    'Content-Type': 'application/json'
  }
});
```

2. Set the environment variable during build:
   ```bash
   VUE_APP_API_URL=https://your-backend-url.com npm run build
   ```

## CORS Configuration for Flask Backend

Ensure your Flask backend accepts requests from your frontend domain:

```python
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://your-frontend-url.com"}})

# Your routes here
```

## Quick Setup Files

### backend/Procfile
```
web: gunicorn app:app
```

### backend/requirements.txt
```
Flask==2.0.1
Flask-Cors==3.0.10
gunicorn==20.1.0
# Add your other dependencies
```
