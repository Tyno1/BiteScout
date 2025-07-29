# Hybrid Media Implementation Guide

## Overview
This guide explains how to use the hybrid media architecture that integrates the main backend with the specialized media service.

## Architecture Flow

```
Frontend → Main Backend → Media Service → Cloud Storage
    ↑           ↓              ↓
    └─── Metadata ←─── File Processing
```

## Quick Start

### 1. Start the Services

```bash
# Start all services with Docker
docker-compose up

# Or start individually
cd apps/backend && npm run dev      # Port 5002
cd apps/media-service && npm run start:dev  # Port 3002
cd apps/web && npm run dev          # Port 3001
```

### 2. Test the Integration

#### Health Check
```bash
# Check media service health
curl http://localhost:3002/api/v1/media/health/check

# Expected response:
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### Upload a File
```bash
# Upload through main backend (hybrid approach)
curl -X POST http://localhost:5002/api/media/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@/path/to/image.jpg" \
  -F "title=My Image" \
  -F "description=Test upload" \
  -F "tags=[\"food\",\"restaurant\"]"

# Expected response:
{
  "media": {
    "id": "media_id_here",
    "url": "https://cloudinary.com/...",
    "title": "My Image",
    "description": "Test upload",
    "uploadedBy": "user_id_here",
    "verified": false,
    "fileSize": 123456,
    "mimeType": "image/jpeg",
    "dimensions": {
      "width": 1920,
      "height": 1080
    }
  },
  "variants": [
    {
      "size": "thumbnail",
      "url": "https://cloudinary.com/...",
      "width": 150,
      "height": 150
    },
    {
      "size": "medium",
      "url": "https://cloudinary.com/...",
      "width": 800,
      "height": 600
    }
  ]
}
```

## API Endpoints

### Main Backend (Port 5002)

#### Media Management
```typescript
// Create media record
POST /api/media
{
  "title": "My Media",
  "description": "Description",
  "url": "https://...",
  "type": "image",
  "associatedWith": {
    "type": "post",
    "id": "post_id"
  }
}

// Get media by ID
GET /api/media/:id

// Update media
PUT /api/media/:id
{
  "title": "Updated Title",
  "description": "Updated description"
}

// Delete media
DELETE /api/media/:id

// Get user's media
GET /api/media/user/:userId?page=1&limit=10

// Get associated media
GET /api/media/associated/:type/:id

// Verify media (moderator only)
PATCH /api/media/:id/verify

// Get verified media
GET /api/media/verified?page=1&limit=10&type=image
```

#### File Upload (Hybrid)
```typescript
// Upload file (delegates to media service)
POST /api/media/upload
Content-Type: multipart/form-data

Form data:
- file: File (required)
- title: string (optional)
- description: string (optional)
- tags: string[] (optional)
- folder: string (optional)
- associatedWith: object (optional)
```

### Media Service (Port 3002)

#### Direct Access (Advanced)
```typescript
// Upload to specific provider
POST /api/v1/media/upload/cloudinary
POST /api/v1/media/upload/aws-s3

// Get optimized URL
GET /api/v1/media/:mediaId/optimized?size=medium&networkSpeed=fast

// Get media statistics
GET /api/v1/media/stats/overview

// Health check
GET /api/v1/media/health/check
```

## Frontend Integration

### Upload Component Example
```typescript
// apps/web/src/components/MediaUpload.tsx
import { useState } from 'react';

export const MediaUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', 'My Upload');
      formData.append('description', 'Uploaded via frontend');

      const response = await fetch('/api/media/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
        },
        body: formData,
      });

      const result = await response.json();
      console.log('Upload successful:', result);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};
```

### Media Display Component
```typescript
// apps/web/src/components/MediaDisplay.tsx
import { useState, useEffect } from 'react';

interface Media {
  id: string;
  url: string;
  title: string;
  type: 'image' | 'video';
  dimensions?: {
    width: number;
    height: number;
  };
}

export const MediaDisplay = ({ mediaId }: { mediaId: string }) => {
  const [media, setMedia] = useState<Media | null>(null);
  const [optimizedUrl, setOptimizedUrl] = useState<string>('');

  useEffect(() => {
    // Get media metadata from main backend
    fetch(`/api/media/${mediaId}`)
      .then(res => res.json())
      .then(setMedia);

    // Get optimized URL from media service
    fetch(`http://localhost:3002/api/v1/media/${mediaId}/optimized?size=medium`)
      .then(res => res.json())
      .then(data => setOptimizedUrl(data.url));
  }, [mediaId]);

  if (!media) return <div>Loading...</div>;

  return (
    <div>
      <h3>{media.title}</h3>
      {media.type === 'image' ? (
        <img src={optimizedUrl || media.url} alt={media.title} />
      ) : (
        <video controls src={optimizedUrl || media.url} />
      )}
    </div>
  );
};
```

## Environment Configuration

### Backend (.env)
```env
# Media Service Integration
MEDIA_SERVICE_URL=http://localhost:3002/api/v1
MEDIA_SERVICE_TIMEOUT=30000

# Database
MONGODB_CONNECTION_STRING=mongodb://localhost:27017/bitescout

# JWT
JWT_SECRET=your-secret-key
```

### Media Service (.env)
```env
# Storage Providers
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=your_bucket

# CORS
ALLOWED_ORIGINS=http://localhost:5002,http://localhost:3001

# File Limits
MAX_FILE_SIZE=104857600
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5002
NEXT_PUBLIC_MEDIA_SERVICE_URL=http://localhost:3002/api/v1
```

## Error Handling

### Common Issues

1. **Media Service Unavailable**
   ```typescript
   // Backend will return error if media service is down
   {
     "error": "Media service upload failed: connect ECONNREFUSED"
   }
   ```

2. **File Too Large**
   ```typescript
   {
     "error": "File size exceeds maximum limit of 104857600 bytes"
   }
   ```

3. **Invalid File Type**
   ```typescript
   {
     "error": "File type application/pdf is not supported"
   }
   ```

### Graceful Degradation
```typescript
// apps/backend/src/controllers/mediaController.ts
export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Try media service first
    const uploadResult = await mediaServiceClient.uploadFile(req.file);
    
    if (!uploadResult.success) {
      // Fallback: store file locally or use different provider
      console.warn('Media service failed, using fallback');
      // Implement fallback logic here
    }
    
    // Continue with normal flow...
  } catch (error) {
    return next(error);
  }
};
```

## Monitoring and Debugging

### Health Checks
```bash
# Check all services
curl http://localhost:5002/api/health
curl http://localhost:3002/api/v1/media/health/check
```

### Logs
```bash
# Backend logs
docker-compose logs backend

# Media service logs
docker-compose logs media-service
```

### Metrics
```bash
# Media service statistics
curl http://localhost:3002/api/v1/media/stats/overview
```

## Benefits of This Approach

1. **API Consistency**: Frontend only needs to know main backend API
2. **Specialized Processing**: Media service handles complex file operations
3. **Scalability**: Media service can scale independently
4. **Fallback Support**: Can handle media service outages gracefully
5. **Clear Separation**: Business logic vs file processing

## Next Steps

1. **Add Caching**: Implement Redis for media metadata caching
2. **CDN Integration**: Add CDN for global media delivery
3. **Video Processing**: Enhance video transcoding capabilities
4. **AI Features**: Add image/video analysis and tagging
5. **Batch Operations**: Support bulk media operations 