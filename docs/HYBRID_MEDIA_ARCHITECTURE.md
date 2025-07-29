# Hybrid Media Architecture

## Overview
This approach keeps the media service as a specialized file processing service while integrating it with the main BiteScout API for media metadata management.

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Main Backend   │    │   Media Service │
│   (Next.js)     │◄──►│   (Express)      │◄──►│   (NestJS)      │
│                 │    │   Port: 5002     │    │   Port: 3002    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │                        │
                              ▼                        ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │   MongoDB       │    │   Cloudinary    │
                       │   (Metadata)    │    │   / AWS S3      │
                       └─────────────────┘    └─────────────────┘
```

## Service Responsibilities

### Main Backend (Express)
- **Media Metadata Management**: CRUD operations for media records
- **Media Associations**: Link media to posts, dishes, restaurants
- **Media Verification**: Moderator verification system
- **User Media**: User's media library management
- **API Compliance**: Follows shared API specifications

### Media Service (NestJS)
- **File Upload Processing**: Handle file uploads and validation
- **Media Optimization**: Create multiple variants (thumbnails, sizes)
- **Cloud Storage**: Manage Cloudinary/AWS S3 uploads
- **File Processing**: Image/video optimization and transcoding
- **Optimized URLs**: Network-aware content delivery

## API Design

### Main Backend Media Endpoints (Shared Specs Compliant)
```typescript
// Main Backend - Express.js
// Base URL: http://localhost:5002/api

// Media Metadata Management
POST   /api/media                    // Create media record
GET    /api/media/:id               // Get media by ID
PUT    /api/media/:id               // Update media
DELETE /api/media/:id               // Delete media
GET    /api/media/associated/:type/:id  // Get media by association
GET    /api/media/user/:userId      // Get user's media
PATCH  /api/media/:id/verify        // Verify media
GET    /api/media/verified          // Get verified media

// Media Upload Integration
POST   /api/media/upload            // Upload file (delegates to media service)
```

### Media Service Endpoints (Specialized)
```typescript
// Media Service - NestJS
// Base URL: http://localhost:3002/api/v1

// File Processing
POST   /api/v1/media/upload         // Upload and process file
POST   /api/v1/media/upload/:provider  // Upload to specific provider
GET    /api/v1/media/:mediaId       // Get processed media
GET    /api/v1/media/:mediaId/optimized  // Get optimized URL
DELETE /api/v1/media/:mediaId       // Delete from storage
GET    /api/v1/media/stats/overview // Get processing statistics
GET    /api/v1/media/health/check   // Health check
```

## Implementation Plan

### Phase 1: Main Backend Media Integration

#### 1.1 Add Media Routes to Main Backend
```typescript
// apps/backend/src/routes/media.ts
import express from 'express';
import { mediaController } from '../controllers/mediaController';

const router = express.Router();

// Media metadata management
router.post('/', mediaController.createMedia);
router.get('/:id', mediaController.getMedia);
router.put('/:id', mediaController.updateMedia);
router.delete('/:id', mediaController.deleteMedia);
router.get('/associated/:type/:id', mediaController.getAssociatedMedia);
router.get('/user/:userId', mediaController.getUserMedia);
router.patch('/:id/verify', mediaController.verifyMedia);
router.get('/verified', mediaController.getVerifiedMedia);

// File upload (delegates to media service)
router.post('/upload', mediaController.uploadFile);

export default router;
```

#### 1.2 Media Controller Implementation
```typescript
// apps/backend/src/controllers/mediaController.ts
import { Request, Response } from 'express';
import { MediaService } from '../services/mediaService';
import { MediaServiceClient } from '../clients/mediaServiceClient';

export class MediaController {
  private mediaService: MediaService;
  private mediaServiceClient: MediaServiceClient;

  constructor() {
    this.mediaService = new MediaService();
    this.mediaServiceClient = new MediaServiceClient();
  }

  // Create media record
  async createMedia(req: Request, res: Response) {
    try {
      const mediaData = req.body;
      const media = await this.mediaService.createMedia(mediaData);
      res.status(201).json(media);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Upload file (delegates to media service)
  async uploadFile(req: Request, res: Response) {
    try {
      // Upload file to media service
      const uploadResult = await this.mediaServiceClient.uploadFile(req.file);
      
      // Create media record in main backend
      const mediaRecord = {
        url: uploadResult.media.variants[0].url,
        type: uploadResult.media.mimeType.startsWith('image/') ? 'image' : 'video',
        title: req.body.title || req.file.originalname,
        description: req.body.description,
        uploadedBy: req.user.id,
        verified: false,
        fileSize: uploadResult.media.fileSize,
        mimeType: uploadResult.media.mimeType,
        dimensions: uploadResult.media.width && uploadResult.media.height ? {
          width: uploadResult.media.width,
          height: uploadResult.media.height
        } : undefined,
        associatedWith: req.body.associatedWith
      };
      
      const media = await this.mediaService.createMedia(mediaRecord);
      
      res.status(201).json({
        media,
        variants: uploadResult.media.variants
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get media by ID
  async getMedia(req: Request, res: Response) {
    try {
      const media = await this.mediaService.getMedia(req.params.id);
      if (!media) {
        return res.status(404).json({ error: 'Media not found' });
      }
      res.json(media);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update media
  async updateMedia(req: Request, res: Response) {
    try {
      const media = await this.mediaService.getMedia(req.params.id);
      if (!media) {
        return res.status(404).json({ error: 'Media not found' });
      }
      
      if (media.uploadedBy !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized' });
      }
      
      const updatedMedia = await this.mediaService.updateMedia(req.params.id, req.body);
      res.json(updatedMedia);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete media
  async deleteMedia(req: Request, res: Response) {
    try {
      const media = await this.mediaService.getMedia(req.params.id);
      if (!media) {
        return res.status(404).json({ error: 'Media not found' });
      }
      
      if (media.uploadedBy !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized' });
      }
      
      // Delete from media service
      await this.mediaServiceClient.deleteMedia(req.params.id);
      
      // Delete from main backend
      await this.mediaService.deleteMedia(req.params.id);
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get associated media
  async getAssociatedMedia(req: Request, res: Response) {
    try {
      const { type, id } = req.params;
      const media = await this.mediaService.getAssociatedMedia(type, id);
      res.json(media);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get user's media
  async getUserMedia(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { page = 1, limit = 10 } = req.query;
      const result = await this.mediaService.getUserMedia(userId, { page, limit });
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Verify media
  async verifyMedia(req: Request, res: Response) {
    try {
      const media = await this.mediaService.verifyMedia(req.params.id);
      res.json(media);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get verified media
  async getVerifiedMedia(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10, type } = req.query;
      const result = await this.mediaService.getVerifiedMedia({ page, limit, type });
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export const mediaController = new MediaController();
```

#### 1.3 Media Service Client
```typescript
// apps/backend/src/clients/mediaServiceClient.ts
import axios from 'axios';

export class MediaServiceClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.MEDIA_SERVICE_URL || 'http://localhost:3002/api/v1';
  }

  async uploadFile(file: Express.Multer.File, metadata?: any) {
    const formData = new FormData();
    formData.append('file', file.buffer, file.originalname);
    
    if (metadata) {
      Object.keys(metadata).forEach(key => {
        formData.append(key, metadata[key]);
      });
    }

    const response = await axios.post(`${this.baseUrl}/media/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  }

  async getMedia(mediaId: string, size?: string) {
    const response = await axios.get(`${this.baseUrl}/media/${mediaId}`, {
      params: { size }
    });
    return response.data;
  }

  async deleteMedia(mediaId: string) {
    await axios.delete(`${this.baseUrl}/media/${mediaId}`);
  }

  async getOptimizedUrl(mediaId: string, size?: string, networkSpeed?: string) {
    const response = await axios.get(`${this.baseUrl}/media/${mediaId}/optimized`, {
      params: { size, networkSpeed }
    });
    return response.data;
  }
}
```

### Phase 2: Media Service Integration

#### 2.1 Update Media Service for Integration
```typescript
// apps/media-service/src/controllers/media.controller.ts
// Add integration endpoints

@Get('integration/:mediaId')
@ApiOperation({ summary: 'Get media for integration' })
async getMediaForIntegration(
  @Param('mediaId') mediaId: string,
  @Query('size') size?: string,
): Promise<MediaMetadata> {
  return this.mediaService.getMedia(mediaId, size);
}

@Delete('integration/:mediaId')
@ApiOperation({ summary: 'Delete media for integration' })
async deleteMediaForIntegration(
  @Param('mediaId') mediaId: string,
): Promise<{ message: string }> {
  await this.mediaService.deleteMedia(mediaId);
  return { message: 'Media deleted successfully' };
}
```

### Phase 3: Frontend Integration

#### 3.1 Update Frontend API Client
```typescript
// apps/web/src/utils/api.ts
class MediaAPI {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5002';
  }

  // Upload file (goes through main backend)
  async uploadFile(file: File, metadata: any) {
    const formData = new FormData();
    formData.append('file', file);
    
    Object.keys(metadata).forEach(key => {
      formData.append(key, metadata[key]);
    });

    const response = await fetch(`${this.baseUrl}/api/media/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });

    return response.json();
  }

  // Get media metadata (from main backend)
  async getMedia(mediaId: string) {
    const response = await fetch(`${this.baseUrl}/api/media/${mediaId}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    return response.json();
  }

  // Get optimized URL (from media service)
  async getOptimizedUrl(mediaId: string, size?: string, networkSpeed?: string) {
    const mediaServiceUrl = process.env.NEXT_PUBLIC_MEDIA_SERVICE_URL || 'http://localhost:3002/api/v1';
    const response = await fetch(`${mediaServiceUrl}/media/${mediaId}/optimized?size=${size}&networkSpeed=${networkSpeed}`);
    return response.json();
  }

  // Get user's media
  async getUserMedia(userId: string, page = 1, limit = 10) {
    const response = await fetch(`${this.baseUrl}/api/media/user/${userId}?page=${page}&limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    return response.json();
  }

  // Get associated media
  async getAssociatedMedia(type: string, id: string) {
    const response = await fetch(`${this.baseUrl}/api/media/associated/${type}/${id}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    return response.json();
  }
}

export const mediaAPI = new MediaAPI();
```

## Benefits of Hybrid Approach

### 1. **API Compliance**
- ✅ Main backend follows shared API specifications
- ✅ Consistent with other BiteScout services
- ✅ Single entry point for media operations

### 2. **Specialized Processing**
- ✅ Media service retains advanced features
- ✅ Optimized file processing and variants
- ✅ Multi-provider support maintained

### 3. **Clear Separation of Concerns**
- ✅ Main backend: Metadata management, associations, verification
- ✅ Media service: File processing, optimization, storage

### 4. **Scalability**
- ✅ Media service can scale independently
- ✅ Main backend handles business logic
- ✅ Easy to add new media processing features

### 5. **Integration Simplicity**
- ✅ Frontend only needs to know main backend API
- ✅ Media service is transparent to frontend
- ✅ Consistent authentication and authorization

## Implementation Timeline

### Week 1: Main Backend Media Integration
- Add media routes and controller to main backend
- Implement media service client
- Add media model and service

### Week 2: Media Service Updates
- Add integration endpoints to media service
- Update error handling for integration
- Add health checks and monitoring

### Week 3: Frontend Integration
- Update frontend API client
- Implement media upload components
- Add media display components

### Week 4: Testing and Deployment
- Integration testing
- Performance testing
- Deployment and monitoring

## Configuration

### Environment Variables
```env
# Main Backend
MEDIA_SERVICE_URL=http://localhost:3002/api/v1

# Frontend
NEXT_PUBLIC_BACKEND_URL=http://localhost:5002
NEXT_PUBLIC_MEDIA_SERVICE_URL=http://localhost:3002/api/v1

# Media Service
ALLOWED_ORIGINS=http://localhost:5002,http://localhost:3001
```

### Docker Configuration
```yaml
# docker-compose.yml
services:
  backend:
    # ... existing config
    environment:
      - MEDIA_SERVICE_URL=http://media-service:3002/api/v1
    depends_on:
      - media-service

  media-service:
    # ... existing config
    environment:
      - ALLOWED_ORIGINS=http://backend:5002,http://web:3001
```

## Conclusion

The hybrid approach provides the best balance between:
- **API consistency** with shared specifications
- **Specialized functionality** for media processing
- **Clear architecture** with proper separation of concerns
- **Easy integration** for frontend and other services

This approach allows you to maintain the advanced features of the media service while ensuring consistency with the rest of the BiteScout ecosystem. 