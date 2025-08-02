# Environment Setup Guide

## Overview
This guide explains how to configure environment variables for both local development and Docker deployment to ensure the media service works correctly with the hybrid architecture.

## Architecture

### Hybrid Media Architecture
- **Images**: Upload directly to media service (port 3002) for optimization
- **Media References**: Stored in backend database (port 5002) for linking
- **Optimized URLs**: Retrieved from media service
- **Other Media**: Upload through backend

### Flow
1. **Image Upload**: Frontend → Media Service → Get Media ID
2. **Reference Storage**: Media ID → Backend Database
3. **Optimized URLs**: Frontend → Media Service (using Media ID)
4. **Media Retrieval**: Frontend → Backend Database (for references)

## Environment Variables

### Media Service Configuration

| Variable | Local Dev | Docker Dev | Production | Description |
|----------|-----------|------------|------------|-------------|
| `NEXT_PUBLIC_MEDIA_SERVICE_URL` | `http://localhost:3002/api/v1` | `http://localhost:3002/api/v1` | `https://your-domain.com/api/v1` | Frontend media service URL |
| `MEDIA_SERVICE_URL` | `http://localhost:3002/api/v1` | `http://localhost:3002/api/v1` | `https://your-domain.com/api/v1` | Backend media service URL |

## Local Development Setup

### 1. Media Service (Port 3002)
```bash
cd apps/media-service
yarn dev  # or npm run dev
```

### 2. Web App (Port 3001)
```bash
# No .env file needed - uses defaults
yarn dev
```

### 3. Backend (Port 5002)
```bash
# No .env file needed - uses defaults
yarn dev
```

## Docker Development Setup

### 1. Main Services
```bash
# Uses docker-compose.yml environment variables
docker-compose up -d
```

### 2. Media Service (Separate)
```bash
cd apps/media-service
docker-compose up -d
```

## Environment Variable Priority

The application uses the following priority for environment variables:

1. **Explicit Environment Variables** (highest priority)
   - `NEXT_PUBLIC_MEDIA_SERVICE_URL`
   - `MEDIA_SERVICE_URL`

2. **Docker Compose Variables** (medium priority)
   - Uses `${VARIABLE:-default}` syntax

3. **Code Defaults** (lowest priority)
   - Fallback values in the code

## Configuration Examples

### Local Development (.env.local)
```bash
# Optional - only if you need custom URLs
NEXT_PUBLIC_MEDIA_SERVICE_URL=http://localhost:3002/api/v1
MEDIA_SERVICE_URL=http://localhost:3002/api/v1
```

### Docker Development
```bash
# Set in shell or .env file
export MEDIA_SERVICE_URL=http://localhost:3002/api/v1
export NEXT_PUBLIC_MEDIA_SERVICE_URL=http://localhost:3002/api/v1

# Or use docker-compose with custom .env
docker-compose --env-file .env.docker up -d
```

### Production
```bash
# Set in your deployment platform
NEXT_PUBLIC_MEDIA_SERVICE_URL=https://your-media-service.com/api/v1
MEDIA_SERVICE_URL=https://your-media-service.com/api/v1
```

## Troubleshooting

### Media Service Not Found (404)
1. Check if media service is running: `docker ps | grep media-service`
2. Verify port configuration: Media service should be on port 3000
3. Check environment variables: `echo $NEXT_PUBLIC_MEDIA_SERVICE_URL`

### Port Conflicts
- **Media Service**: Port 3002
- **Web App**: Port 3001
- **Backend**: Port 5002

### Network Issues
- Local development: Services communicate via `localhost`
- Docker development: Services communicate via service names
- Production: Services communicate via domain names

## Best Practices

1. **Never commit .env files** - Use `.env.example` instead
2. **Use environment-specific defaults** - Different defaults for dev/prod
3. **Validate URLs** - Ensure URLs are accessible
4. **Test both environments** - Verify local and Docker work
5. **Document changes** - Update this guide when adding new variables 