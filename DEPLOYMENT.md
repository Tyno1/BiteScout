# BiteScout Deployment Guide

## Development vs Production

### Development (Local)
```bash
# Start development environment
npm run docker:dev

# Rebuild and start
npm run docker:dev:build

# View logs
npm run docker:logs

# Stop services
npm run docker:down
```

### Production (Render)

#### Prerequisites
1. GitHub repository with your code
2. Render account
3. MongoDB Atlas database
4. Environment variables ready

#### Deployment Steps

1. **Push to GitHub**
```bash
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

2. **Deploy to Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml`

3. **Set Environment Variables**

**Backend Service:**
- `NODE_ENV` = `production`
- `PORT` = `5001`
- `MONGODB_CONNECTION_STRING` = Your MongoDB Atlas connection string
- `JWT_SECRET` = Your production JWT secret
- `JWT_REFRESH_SECRET` = Your production JWT refresh secret
- `ALLOWED_ORIGINS` = `https://bitescout-web.onrender.com,https://yourdomain.com`

**Media Service:**
- `NODE_ENV` = `production`
- `PORT` = `3002`
- `MONGODB_CONNECTION_STRING` = Your MongoDB Atlas connection string for media service
- `CLOUDINARY_CLOUD_NAME` = Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` = Your Cloudinary API key
- `CLOUDINARY_API_SECRET` = Your Cloudinary API secret
- `AWS_ACCESS_KEY_ID` = Your AWS access key (optional)
- `AWS_SECRET_ACCESS_KEY` = Your AWS secret key (optional)
- `AWS_REGION` = `us-east-1` (or your preferred region)
- `AWS_S3_BUCKET_NAME` = Your S3 bucket name (optional)
- `ALLOWED_ORIGINS` = `https://bitescout-web.onrender.com,https://yourdomain.com`

**Frontend Service:**
- `NODE_ENV` = `production`
- `NEXT_PUBLIC_BACKEND_URL` = `https://bitescout-backend.onrender.com`
- `BACKEND_URL_SERVER` = `https://bitescout-backend.onrender.com`
- `NEXTAUTH_SECRET` = Your production NextAuth secret
- `NEXTAUTH_URL` = `https://bitescout-web.onrender.com`

## Environment Configuration

### Development
- Uses `Dockerfile.dev` files
- Hot reloading enabled
- Development environment variables
- Local MongoDB connection

### Production
- Uses `Dockerfile` files (production optimized)
- No hot reloading
- Production environment variables
- MongoDB Atlas connection

## File Structure
```
├── docker-compose.yml          # Development (default)
├── docker-compose.prod.yml     # Production reference
├── apps/
│   ├── backend/
│   │   ├── Dockerfile          # Production
│   │   └── Dockerfile.dev      # Development
│   ├── media-service/
│   │   ├── Dockerfile          # Production
│   │   └── Dockerfile.dev      # Development
│   └── web/
│       ├── Dockerfile          # Production
│       └── Dockerfile.dev      # Development
├── render.yaml                 # Render deployment config
└── DEPLOYMENT.md              # This file
```

## Troubleshooting

### Common Issues
1. **Build fails**: Check Dockerfile paths and dependencies
2. **Environment variables**: Ensure all required vars are set in Render
3. **Database connection**: Verify MongoDB Atlas connection string
4. **CORS errors**: Check ALLOWED_ORIGINS in backend

### Logs
- **Development**: `npm run docker:logs`
- **Production**: Check Render dashboard logs

## Security Notes
- Never commit production secrets to Git
- Use Render's environment variable system
- Rotate secrets regularly
- Use HTTPS in production 