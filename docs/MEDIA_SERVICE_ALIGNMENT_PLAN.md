# Media Service Alignment Plan

## Overview
This document outlines the plan to align the media service with the shared BiteScout API specifications.

## Current State vs Target State

### Current Media Service
- **Base URL**: `http://localhost:3002/api/v1`
- **Focus**: File upload and processing
- **Features**: Multi-provider support, optimization, variants
- **Authentication**: None
- **Data Model**: Custom MediaMetadata interface

### Target State (Shared Specs)
- **Base URL**: `http://localhost:3002/api`
- **Focus**: Media metadata management
- **Features**: CRUD operations, associations, verification
- **Authentication**: JWT Bearer tokens
- **Data Model**: Shared Media schema

## Phase 1: API Structure Alignment

### 1.1 Update Controller Structure
```typescript
// Current
@Controller("media")
@UseGuards(ThrottlerGuard)

// Target
@Controller("api/media")
@UseGuards(JwtAuthGuard, ThrottlerGuard)
```

### 1.2 Update Base URL Configuration
```typescript
// main.ts
app.setGlobalPrefix('api'); // Remove /v1
```

### 1.3 Endpoint Mapping

| Current Endpoint | Target Endpoint | Action Required |
|------------------|-----------------|-----------------|
| `POST /api/v1/media/upload` | `POST /api/media` | Change to JSON body |
| `GET /api/v1/media/:mediaId` | `GET /api/media/:id` | Update parameter name |
| `PUT /api/v1/media/:mediaId` | `PUT /api/media/:id` | **NEW** - Add update endpoint |
| `DELETE /api/v1/media/:mediaId` | `DELETE /api/media/:id` | Update parameter name |
| `GET /api/v1/media` | `GET /api/media/user/:userId` | **NEW** - Add user media endpoint |
| N/A | `GET /api/media/associated/:type/:id` | **NEW** - Add associated media endpoint |
| N/A | `PATCH /api/media/:id/verify` | **NEW** - Add verification endpoint |
| N/A | `GET /api/media/verified` | **NEW** - Add verified media endpoint |

## Phase 2: Data Model Alignment

### 2.1 Update Media Schema
```typescript
// Current MediaMetadata
interface MediaMetadata {
  id: string;
  originalName: string;
  mimeType: string;
  fileSize: number;
  width?: number;
  height?: number;
  duration?: number;
  format: string;
  provider: 'cloudinary' | 'aws-s3';
  providerId: string;
  variants: MediaVariant[];
  tags?: string[];
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Target Media Schema (Shared Specs)
interface Media {
  _id: string;
  url: string;
  type: 'image' | 'video' | 'audio';
  title?: string;
  description?: string;
  uploadedBy: string;
  associatedWith?: {
    type: 'post' | 'dish' | 'restaurant';
    id: string;
  };
  verified: boolean;
  fileSize: number;
  mimeType: string;
  dimensions?: {
    width: number;
    height: number;
  };
  createdAt: string;
  updatedAt: string;
}
```

### 2.2 Migration Strategy
```typescript
// Create migration function
async function migrateMediaData() {
  const oldMedia = await MediaMetadata.find({});
  
  for (const media of oldMedia) {
    const newMedia = {
      _id: media.id,
      url: media.variants[0]?.url || '', // Use first variant as primary URL
      type: media.mimeType.startsWith('image/') ? 'image' : 
            media.mimeType.startsWith('video/') ? 'video' : 'audio',
      title: media.originalName,
      description: '',
      uploadedBy: media.userId,
      verified: false,
      fileSize: media.fileSize,
      mimeType: media.mimeType,
      dimensions: media.width && media.height ? {
        width: media.width,
        height: media.height
      } : undefined,
      createdAt: media.createdAt.toISOString(),
      updatedAt: media.updatedAt.toISOString()
    };
    
    await Media.create(newMedia);
  }
}
```

## Phase 3: Authentication Integration

### 3.1 Add JWT Authentication
```typescript
// Install required packages
npm install @nestjs/jwt @nestjs/passport passport passport-jwt

// Create JWT strategy
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}

// Apply to controller
@Controller('api/media')
@UseGuards(JwtAuthGuard)
export class MediaController {
  // ... endpoints
}
```

### 3.2 Update Request DTOs
```typescript
// Create Media DTO
export class CreateMediaDto {
  @ApiProperty({ description: 'URL to the media file' })
  @IsUrl()
  url: string;

  @ApiProperty({ enum: ['image', 'video', 'audio'] })
  @IsEnum(['image', 'video', 'audio'])
  type: 'image' | 'video' | 'audio';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  associatedWith?: {
    type: 'post' | 'dish' | 'restaurant';
    id: string;
  };

  @ApiProperty()
  @IsNumber()
  fileSize: number;

  @ApiProperty()
  @IsString()
  mimeType: string;

  @ApiPropertyOptional()
  @IsOptional()
  dimensions?: {
    width: number;
    height: number;
  };
}
```

## Phase 4: New Endpoint Implementation

### 4.1 Update Media Endpoint
```typescript
@Put(':id')
@ApiOperation({ summary: 'Update media' })
@ApiResponse({ status: 200, description: 'Media updated successfully' })
async updateMedia(
  @Param('id') id: string,
  @Body() updateMediaDto: UpdateMediaDto,
  @Request() req: any
): Promise<Media> {
  // Verify ownership
  const media = await this.mediaService.getMedia(id);
  if (media.uploadedBy !== req.user.userId) {
    throw new UnauthorizedException('Not authorized to update this media');
  }
  
  return this.mediaService.updateMedia(id, updateMediaDto);
}
```

### 4.2 Associated Media Endpoint
```typescript
@Get('associated/:type/:id')
@ApiOperation({ summary: 'Get media by associated item' })
async getAssociatedMedia(
  @Param('type') type: 'post' | 'dish' | 'restaurant',
  @Param('id') id: string
): Promise<Media[]> {
  return this.mediaService.getMediaByAssociation(type, id);
}
```

### 4.3 User Media Endpoint
```typescript
@Get('user/:userId')
@ApiOperation({ summary: "Get user's media" })
async getUserMedia(
  @Param('userId') userId: string,
  @Query('page') page = 1,
  @Query('limit') limit = 10
): Promise<{ media: Media[]; pagination: PaginationInfo }> {
  return this.mediaService.getUserMedia(userId, { page, limit });
}
```

### 4.4 Verification Endpoints
```typescript
@Patch(':id/verify')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('moderator', 'admin')
@ApiOperation({ summary: 'Verify media' })
async verifyMedia(@Param('id') id: string): Promise<Media> {
  return this.mediaService.verifyMedia(id);
}

@Get('verified')
@ApiOperation({ summary: 'Get verified media' })
async getVerifiedMedia(
  @Query('page') page = 1,
  @Query('limit') limit = 10,
  @Query('type') type?: 'post' | 'dish'
): Promise<{ media: Media[]; pagination: PaginationInfo }> {
  return this.mediaService.getVerifiedMedia({ page, limit, type });
}
```

## Phase 5: File Upload Integration

### 5.1 Hybrid Approach
Keep the current upload functionality but integrate it with the new API:

```typescript
// Keep existing upload endpoint for file processing
@Post('upload')
@UseInterceptors(FileInterceptor('file'))
async uploadFile(
  @UploadedFile() file: Express.Multer.File,
  @Body() uploadDto: UploadMediaDto,
  @Request() req: any
): Promise<UploadResponse> {
  // Process file and create variants
  const uploadResult = await this.mediaService.uploadMedia(file, uploadDto);
  
  // Create media record in new format
  const mediaRecord = {
    url: uploadResult.media.variants[0].url,
    type: uploadResult.media.mimeType.startsWith('image/') ? 'image' : 'video',
    title: uploadDto.title || file.originalname,
    description: uploadDto.description,
    uploadedBy: req.user.userId,
    verified: false,
    fileSize: uploadResult.media.fileSize,
    mimeType: uploadResult.media.mimeType,
    dimensions: uploadResult.media.width && uploadResult.media.height ? {
      width: uploadResult.media.width,
      height: uploadResult.media.height
    } : undefined,
    associatedWith: uploadDto.associatedWith
  };
  
  const savedMedia = await this.mediaService.createMedia(mediaRecord);
  
  return {
    success: true,
    media: savedMedia,
    variants: uploadResult.media.variants // Keep variants for optimization
  };
}
```

## Phase 6: Testing Strategy

### 6.1 Unit Tests
```typescript
describe('MediaController', () => {
  it('should create media', async () => {
    const createMediaDto = {
      url: 'https://example.com/image.jpg',
      type: 'image',
      title: 'Test Image',
      fileSize: 1024,
      mimeType: 'image/jpeg'
    };
    
    const result = await controller.createMedia(createMediaDto, mockRequest);
    expect(result).toHaveProperty('_id');
    expect(result.url).toBe(createMediaDto.url);
  });
});
```

### 6.2 Integration Tests
```typescript
describe('Media API Integration', () => {
  it('should upload file and create media record', async () => {
    const response = await request(app)
      .post('/api/media/upload')
      .attach('file', 'test/fixtures/test-image.jpg')
      .field('title', 'Test Image')
      .expect(201);
    
    expect(response.body).toHaveProperty('media._id');
    expect(response.body).toHaveProperty('variants');
  });
});
```

## Phase 7: Deployment Strategy

### 7.1 Gradual Migration
1. **Week 1**: Deploy new API alongside existing one
2. **Week 2**: Update frontend to use new endpoints
3. **Week 3**: Migrate existing data
4. **Week 4**: Remove old endpoints

### 7.2 Environment Configuration
```env
# Development
MEDIA_SERVICE_URL=http://localhost:3002/api
JWT_SECRET=your-jwt-secret

# Production
MEDIA_SERVICE_URL=https://media-service.yourdomain.com/api
JWT_SECRET=your-production-jwt-secret
```

## Benefits After Alignment

1. **Consistency**: All services follow the same API patterns
2. **Maintainability**: Single source of truth for media operations
3. **Integration**: Easier integration with other BiteScout services
4. **Scalability**: Standardized approach for future features
5. **Documentation**: Unified API documentation

## Timeline Estimate

- **Phase 1-2**: 1-2 weeks (API structure and data model)
- **Phase 3**: 1 week (Authentication)
- **Phase 4**: 1-2 weeks (New endpoints)
- **Phase 5**: 1 week (Upload integration)
- **Phase 6**: 1 week (Testing)
- **Phase 7**: 1 week (Deployment)

**Total**: 6-8 weeks for complete alignment 