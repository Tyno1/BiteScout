# Media Service - Standalone Microservice

## Overview

The Media Service is a **standalone microservice** designed to handle file uploads, processing, and storage independently from the main BiteScout application. It's built with NestJS and provides specialized media handling capabilities.

## Architecture

```
┌─────────────────┐    HTTP API    ┌─────────────────┐
│   Main App      │ ──────────────► │  Media Service  │
│ (Backend/Web)   │                │   (NestJS)      │
└─────────────────┘                └─────────────────┘
                                           │
                                           ▼
                                    ┌─────────────────┐
                                    │   MongoDB       │
                                    │ (Media DB)      │
                                    └─────────────────┘
                                           │
                                           ▼
                                    ┌─────────────────┐
                                    │ Cloud Storage   │
                                    │ (Cloudinary/    │
                                    │  AWS S3)        │
                                    └─────────────────┘
```

## Why Standalone?

- **Resource Isolation**: Heavy file processing doesn't affect main app performance
- **Independent Scaling**: Can be scaled separately based on media processing needs
- **Specialized Dependencies**: FFmpeg, Sharp, AWS SDK, Cloudinary
- **Database Separation**: Dedicated MongoDB for media metadata
- **Deployment Flexibility**: Can be deployed on different infrastructure

## Running the Media Service

### Option 1: Standalone (Recommended)

```bash
# Start media service with its own MongoDB
yarn media:dev

# Or with build
yarn media:dev:build

# View logs
yarn media:logs

# Stop service
yarn media:down
```

### Option 2: Manual Docker Compose

```bash
cd apps/media-service
docker compose up -d
```

### Option 3: Development Mode

```bash
cd apps/media-service
yarn install
yarn start:dev
```

## Configuration

### Environment Variables

Create `.env` file in `apps/media-service/`:

```env
# Service Configuration
NODE_ENV=development
PORT=3002

# Database
MONGODB_URI=mongodb://mongodb:27017/media-service
MONGODB_DATABASE=media-service

# Cloud Storage
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# AWS S3 (Alternative)
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=your_bucket

# Security
ALLOWED_ORIGINS=http://localhost:3001,http://localhost:3000

# Limits
MAX_FILE_SIZE=104857600  # 100MB
RATE_LIMIT_TTL=60
RATE_LIMIT_LIMIT=100
```

## API Endpoints

The media service runs on `http://localhost:3002/api/v1/` and provides:

- `POST /media/upload` - Upload files
- `GET /media/:id` - Get media metadata
- `GET /media/:id/optimized` - Get optimized media URL
- `DELETE /media/:id` - Delete media
- `GET /media/health/check` - Health check

## Integration with Main App

The main backend connects to the media service via HTTP API:

```typescript
// Backend configuration
MEDIA_SERVICE_URL=http://localhost:3002/api/v1
MEDIA_SERVICE_TIMEOUT=30000
```

## Development Workflow

1. **Start Media Service**: `yarn media:dev`
2. **Start Main App**: `yarn dev`
3. **Test Integration**: Upload files through the main app
4. **Monitor Logs**: `yarn media:logs`

## Production Deployment

For production, deploy the media service separately:

```bash
# Build and deploy media service
cd apps/media-service
docker compose -f docker-compose.prod.yml up -d

# Or use the provided script
yarn media:prod:build
```

## Troubleshooting

### Common Issues

1. **Port Conflicts**: Ensure port 3002 is available
2. **MongoDB Connection**: Check MongoDB is running and accessible
3. **Cloud Storage**: Verify API keys and permissions
4. **File Permissions**: Ensure temp directory is writable

### Logs

```bash
# View media service logs
yarn media:logs

# View specific service logs
cd apps/media-service
docker compose logs media-service
```

## Benefits of This Architecture

✅ **Performance**: Heavy file processing isolated from main app  
✅ **Scalability**: Independent scaling based on media needs  
✅ **Reliability**: Service failures don't affect main app  
✅ **Maintenance**: Can update media service without affecting main app  
✅ **Cost**: Can use different infrastructure (e.g., GPU instances for video processing)  
✅ **Security**: Media processing isolated from main application logic 