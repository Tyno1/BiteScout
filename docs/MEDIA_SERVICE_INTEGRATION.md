# Media Service Integration Guide

This guide explains how to integrate the Media Service with other parts of the BiteScout application.

## Overview

The Media Service is a NestJS microservice that handles:
- Image and video uploads
- Media processing and optimization
- Multi-provider storage (Cloudinary/AWS S3)
- Network-aware content delivery

## Service Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Web App       │    │   Media Service  │    │   Cloudinary    │
│   (Next.js)     │◄──►│   (NestJS)       │◄──►│   / AWS S3      │
│   Port: 3001    │    │   Port: 3002     │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌──────────────────┐
│   Backend API   │    │   MongoDB        │
│   (Express)     │    │   (Metadata)     │
│   Port: 5002    │    │                  │
└─────────────────┘    └──────────────────┘
```

## Quick Start

### 1. Start the Media Service

```bash
# From the root of the monorepo
npm run dev --filter=media-service

# Or using Docker
npm run docker:dev
```

### 2. Verify the Service

```bash
# Health check
curl http://localhost:3002/api/v1/media/health/check

# API documentation
open http://localhost:3002/api
```

## Frontend Integration

### Upload Images

```typescript
// Example: Upload restaurant image
const uploadRestaurantImage = async (file: File, restaurantId: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('userId', userId);
  formData.append('tags', ['restaurant', restaurantId]);
  formData.append('folder', 'restaurants');

  try {
    const response = await fetch('http://localhost:3002/api/v1/media/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};
```

### Display Optimized Images

```typescript
// Example: Get optimized image URL
const getOptimizedImageUrl = (mediaId: string, size: string = 'medium') => {
  return `http://localhost:3002/api/v1/media/${mediaId}/optimized?size=${size}`;
};

// Example: React component
const OptimizedImage = ({ mediaId, size = 'medium', alt, className }) => {
  const imageUrl = getOptimizedImageUrl(mediaId, size);
  
  return (
    <img 
      src={imageUrl} 
      alt={alt} 
      className={className}
      loading="lazy"
    />
  );
};
```

### Network-Aware Loading

```typescript
// Example: Adaptive image loading based on network speed
const getAdaptiveImageUrl = (mediaId: string, networkSpeed: 'slow' | 'medium' | 'fast' = 'medium') => {
  const size = networkSpeed === 'slow' ? 'small' : 
               networkSpeed === 'medium' ? 'medium' : 'large';
  
  return `http://localhost:3002/api/v1/media/${mediaId}/optimized?size=${size}&networkSpeed=${networkSpeed}`;
};

// Example: React hook for network detection
const useNetworkSpeed = () => {
  const [networkSpeed, setNetworkSpeed] = useState<'slow' | 'medium' | 'fast'>('medium');

  useEffect(() => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const effectiveType = connection.effectiveType;
      
      if (effectiveType === 'slow-2g' || effectiveType === '2g') {
        setNetworkSpeed('slow');
      } else if (effectiveType === '3g') {
        setNetworkSpeed('medium');
      } else {
        setNetworkSpeed('fast');
      }
    }
  }, []);

  return networkSpeed;
};
```

## Backend Integration

### API Client Setup

```typescript
// Example: Backend API client for media service
class MediaServiceClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:3002/api/v1') {
    this.baseUrl = baseUrl;
  }

  async uploadMedia(file: Buffer, metadata: {
    userId?: string;
    tags?: string[];
    folder?: string;
  }) {
    const formData = new FormData();
    formData.append('file', new Blob([file]));
    
    if (metadata.userId) formData.append('userId', metadata.userId);
    if (metadata.tags) formData.append('tags', JSON.stringify(metadata.tags));
    if (metadata.folder) formData.append('folder', metadata.folder);

    const response = await fetch(`${this.baseUrl}/media/upload`, {
      method: 'POST',
      body: formData
    });

    return response.json();
  }

  async getMedia(mediaId: string, size?: string) {
    const url = size 
      ? `${this.baseUrl}/media/${mediaId}?size=${size}`
      : `${this.baseUrl}/media/${mediaId}`;
    
    const response = await fetch(url);
    return response.json();
  }

  async deleteMedia(mediaId: string, userId?: string) {
    const response = await fetch(`${this.baseUrl}/media/${mediaId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId })
    });

    return response.json();
  }
}
```

### Express.js Integration

```typescript
// Example: Express.js route for media operations
import { MediaServiceClient } from './mediaServiceClient';

const mediaClient = new MediaServiceClient();

// Upload endpoint
app.post('/api/restaurants/:id/upload-image', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;
    const userId = req.user.id;

    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const result = await mediaClient.uploadMedia(file.buffer, {
      userId,
      tags: ['restaurant', id],
      folder: 'restaurants'
    });

    res.json(result);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Get optimized image endpoint
app.get('/api/media/:mediaId/optimized', async (req, res) => {
  try {
    const { mediaId } = req.params;
    const { size, networkSpeed } = req.query;

    const result = await mediaClient.getMedia(mediaId, size as string);
    res.json(result);
  } catch (error) {
    console.error('Media fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch media' });
  }
});
```

## Environment Configuration

### Development Environment

```env
# Media Service
MEDIA_SERVICE_URL=http://localhost:3002/api/v1
MEDIA_SERVICE_TIMEOUT=30000

# Frontend
NEXT_PUBLIC_MEDIA_SERVICE_URL=http://localhost:3002/api/v1

# Backend
MEDIA_SERVICE_URL=http://localhost:3002/api/v1
```

### Production Environment

```env
# Media Service
MEDIA_SERVICE_URL=https://your-media-service-domain.com/api/v1
MEDIA_SERVICE_TIMEOUT=30000

# Frontend
NEXT_PUBLIC_MEDIA_SERVICE_URL=https://your-media-service-domain.com/api/v1

# Backend
MEDIA_SERVICE_URL=https://your-media-service-domain.com/api/v1
```

## Error Handling

### Common Error Responses

```typescript
// 400 Bad Request
{
  "error": "Invalid file type",
  "message": "Only JPEG, PNG, WebP, GIF files are allowed"
}

// 413 Payload Too Large
{
  "error": "File too large",
  "message": "Maximum file size is 100MB"
}

// 429 Too Many Requests
{
  "error": "Rate limit exceeded",
  "message": "Too many requests, please try again later"
}

// 500 Internal Server Error
{
  "error": "Upload failed",
  "message": "Failed to process media file"
}
```

### Error Handling Example

```typescript
const handleMediaUpload = async (file: File) => {
  try {
    const result = await uploadMedia(file);
    return { success: true, data: result };
  } catch (error) {
    if (error.response?.status === 413) {
      return { success: false, error: 'File is too large. Please choose a smaller file.' };
    }
    
    if (error.response?.status === 429) {
      return { success: false, error: 'Too many uploads. Please wait a moment and try again.' };
    }
    
    return { success: false, error: 'Upload failed. Please try again.' };
  }
};
```

## Performance Optimization

### Caching Strategies

```typescript
// Example: React component with image caching
const CachedImage = ({ mediaId, size = 'medium', alt, className }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = getOptimizedImageUrl(mediaId, size);
    
    // Check if image is already cached
    const img = new Image();
    img.onload = () => {
      setImageUrl(url);
      setIsLoading(false);
    };
    img.onerror = () => {
      setIsLoading(false);
    };
    img.src = url;
  }, [mediaId, size]);

  if (isLoading) {
    return <div className="image-skeleton" />;
  }

  return imageUrl ? (
    <img src={imageUrl} alt={alt} className={className} />
  ) : (
    <div className="image-error">Failed to load image</div>
  );
};
```

### Lazy Loading

```typescript
// Example: Intersection Observer for lazy loading
const LazyImage = ({ mediaId, size = 'medium', alt, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imageRef}
      src={isVisible ? getOptimizedImageUrl(mediaId, size) : ''}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
};
```

## Security Considerations

### File Validation

```typescript
// Example: Frontend file validation
const validateFile = (file: File) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const maxSize = 100 * 1024 * 1024; // 100MB

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF files are allowed.');
  }

  if (file.size > maxSize) {
    throw new Error('File is too large. Maximum size is 100MB.');
  }

  return true;
};
```

### Authentication Integration

```typescript
// Example: Authenticated media upload
const uploadWithAuth = async (file: File, metadata: any) => {
  const token = await getAuthToken(); // Your auth method
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('userId', metadata.userId);
  
  const response = await fetch('http://localhost:3002/api/v1/media/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  return response.json();
};
```

## Testing

### Unit Tests

```typescript
// Example: Jest test for media upload
import { uploadMedia } from './mediaService';

describe('Media Service', () => {
  it('should upload image successfully', async () => {
    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    
    const result = await uploadMedia(mockFile, {
      userId: '123',
      tags: ['test']
    });

    expect(result).toHaveProperty('mediaId');
    expect(result).toHaveProperty('url');
  });

  it('should handle upload errors', async () => {
    const mockFile = new File(['test'], 'test.txt', { type: 'text/plain' });
    
    await expect(uploadMedia(mockFile, {})).rejects.toThrow('Invalid file type');
  });
});
```

### Integration Tests

```typescript
// Example: Integration test with supertest
import request from 'supertest';
import app from '../app';

describe('Media API Integration', () => {
  it('should upload and retrieve media', async () => {
    // Upload
    const uploadResponse = await request(app)
      .post('/api/v1/media/upload')
      .attach('file', 'test/fixtures/test-image.jpg')
      .field('userId', '123');

    expect(uploadResponse.status).toBe(201);
    const { mediaId } = uploadResponse.body;

    // Retrieve
    const getResponse = await request(app)
      .get(`/api/v1/media/${mediaId}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toHaveProperty('url');
  });
});
```

## Monitoring and Logging

### Health Checks

```typescript
// Example: Health check integration
const checkMediaServiceHealth = async () => {
  try {
    const response = await fetch('http://localhost:3002/api/v1/media/health/check');
    const health = await response.json();
    
    if (health.status === 'ok') {
      console.log('Media service is healthy');
    } else {
      console.error('Media service health check failed:', health);
    }
  } catch (error) {
    console.error('Media service is unreachable:', error);
  }
};

// Run health check every 30 seconds
setInterval(checkMediaServiceHealth, 30000);
```

### Usage Analytics

```typescript
// Example: Track media usage
const trackMediaUsage = async (mediaId: string, action: 'view' | 'download') => {
  try {
    await fetch('http://localhost:3002/api/v1/media/stats/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mediaId,
        action,
        timestamp: new Date().toISOString()
      })
    });
  } catch (error) {
    console.error('Failed to track media usage:', error);
  }
};
```

## Troubleshooting

### Common Issues

1. **Service Not Starting**
   ```bash
   # Check if port is in use
   lsof -i :3002
   
   # Check service logs
   npm run dev --filter=media-service
   ```

2. **Upload Failures**
   - Verify file size and type
   - Check network connectivity
   - Ensure Cloudinary credentials are correct

3. **CORS Errors**
   - Verify ALLOWED_ORIGINS configuration
   - Check if frontend URL is included

4. **Performance Issues**
   - Monitor network speed
   - Use appropriate image sizes
   - Implement caching strategies

### Debug Mode

```typescript
// Enable debug logging
const DEBUG_MODE = process.env.NODE_ENV === 'development';

const debugLog = (message: string, data?: any) => {
  if (DEBUG_MODE) {
    console.log(`[Media Service] ${message}`, data);
  }
};
```

## Best Practices

1. **Always validate files on the frontend before upload**
2. **Use appropriate image sizes for different contexts**
3. **Implement proper error handling and user feedback**
4. **Cache optimized images when possible**
5. **Monitor storage usage and costs**
6. **Use network-aware loading for better UX**
7. **Implement proper security measures**
8. **Test thoroughly in different network conditions**

## Support

For additional support:
- Check the [Media Service README](../apps/media-service/README.md)
- Review the [API Documentation](http://localhost:3002/api)
- Check the main [BiteScout Documentation](../README.md)
- Create an issue in the repository 