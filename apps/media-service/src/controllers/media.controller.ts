import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import {
  type DeleteMediaDto,
  type GetMediaDto,
  UploadMediaDto,
  UploadResponseDto,
} from '../dto/upload.dto';
import type {
  MediaMetadata,
  UploadResponse,
} from '../interfaces/media.interface';

// biome-ignore lint/style/useImportType: NestJS DI needs runtime import
import { MediaService } from '../services/media.service';

@ApiTags('Media Management')
@Controller('media')
@UseGuards(ThrottlerGuard)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload media file (image or video)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Media file to upload',
    type: UploadMediaDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Media uploaded successfully',
    type: UploadResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request - invalid file' })
  @ApiResponse({ status: 413, description: 'File too large' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadMedia(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadDto: UploadMediaDto,
  ): Promise<UploadResponse> {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    return await this.mediaService.uploadMedia(
      file,
      uploadDto.userId,
      uploadDto.tags,
      uploadDto.folder,
      'cloudinary', // default provider
      uploadDto.title,
      uploadDto.description,
    );
  }

  @Post('upload/:provider')
  @ApiOperation({
    summary: 'Upload media file to specific provider (cloudinary or aws-s3)',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Media file to upload',
    type: UploadMediaDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Media uploaded successfully',
    type: UploadResponseDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadMediaToProvider(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadDto: UploadMediaDto,
    @Param('provider') provider: 'cloudinary' | 'aws-s3',
  ): Promise<UploadResponse> {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    return await this.mediaService.uploadMedia(
      file,
      uploadDto.userId,
      uploadDto.tags,
      uploadDto.folder,
      provider,
      uploadDto.title,
      uploadDto.description,
    );
  }

  @Get(':mediaId')
  @ApiOperation({ summary: 'Get media by ID' })
  @ApiResponse({
    status: 200,
    description: 'Media retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Media not found' })
  async getMedia(
    @Param('mediaId') mediaId: string,
    @Query('size') size?: string,
  ): Promise<MediaMetadata> {
    return this.mediaService.getMedia(mediaId, size);
  }

  @Get(':mediaId/optimized')
  @ApiOperation({ summary: 'Get optimized media URL based on network speed' })
  @ApiResponse({
    status: 200,
    description: 'Optimized URL retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        url: { type: 'string' },
        size: { type: 'string' },
        networkSpeed: { type: 'string' },
      },
    },
  })
  async getOptimizedUrl(
    @Param('mediaId') mediaId: string,
    @Query('size') size = 'medium',
    @Query('networkSpeed') networkSpeed?: 'slow' | 'medium' | 'fast',
  ): Promise<{ url: string; size: string; networkSpeed?: string }> {
    const url = await this.mediaService.getOptimizedUrl(
      mediaId,
      size,
      networkSpeed,
    );
    return { url, size, networkSpeed };
  }

  @Get()
  @ApiOperation({ summary: 'Get media with filters and pagination' })
  @ApiResponse({
    status: 200,
    description: 'Media list retrieved successfully',
    // type: [MediaMetadata],
  })
  async getMediaList(@Query() query: GetMediaDto): Promise<MediaMetadata[]> {
    return this.mediaService.getMediaByQuery(query);
  }

  @Delete(':mediaId')
  @ApiOperation({ summary: 'Delete media by ID' })
  @ApiResponse({ status: 200, description: 'Media deleted successfully' })
  @ApiResponse({ status: 404, description: 'Media not found' })
  @ApiResponse({
    status: 403,
    description: 'Unauthorized to delete this media',
  })
  async deleteMedia(
    @Param('mediaId') mediaId: string,
    @Body() deleteDto: DeleteMediaDto,
  ): Promise<{ message: string }> {
    await this.mediaService.deleteMedia(mediaId, deleteDto.userId);
    return { message: 'Media deleted successfully' };
  }

  @Get('stats/overview')
  @ApiOperation({ summary: 'Get media statistics' })
  @ApiResponse({
    status: 200,
    description: 'Statistics retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        total: { type: 'number' },
        images: { type: 'number' },
        videos: { type: 'number' },
        totalSize: { type: 'number' },
        byProvider: {
          type: 'object',
          properties: {
            cloudinary: { type: 'number' },
            'aws-s3': { type: 'number' },
          },
        },
      },
    },
  })
  async getMediaStats(): Promise<any> {
    return this.mediaService.getMediaStats();
  }

  @Get('health/check')
  @ApiOperation({ summary: 'Health check for media service' })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('integration/:mediaId')
  @ApiOperation({ summary: 'Get media for integration (backend-to-backend)' })
  @ApiResponse({
    status: 200,
    description: 'Media retrieved successfully for integration',
  })
  @ApiResponse({ status: 404, description: 'Media not found' })
  async getMediaForIntegration(
    @Param('mediaId') mediaId: string,
    @Query('size') size?: string,
  ): Promise<MediaMetadata> {
    return this.mediaService.getMedia(mediaId, size);
  }

  @Delete('integration/:mediaId')
  @ApiOperation({
    summary: 'Delete media for integration (backend-to-backend)',
  })
  @ApiResponse({ status: 200, description: 'Media deleted successfully' })
  @ApiResponse({ status: 404, description: 'Media not found' })
  async deleteMediaForIntegration(
    @Param('mediaId') mediaId: string,
    @Query('userId') userId?: string,
  ): Promise<{ message: string }> {
    await this.mediaService.deleteMedia(mediaId, userId);
    return { message: 'Media deleted successfully' };
  }

  @Get('integration/optimized/:mediaId')
  @ApiOperation({ summary: 'Get optimized URL for integration' })
  @ApiResponse({
    status: 200,
    description: 'Optimized URL retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        url: { type: 'string' },
        size: { type: 'string' },
      },
    },
  })
  async getOptimizedUrlForIntegration(
    @Param('mediaId') mediaId: string,
    @Query('size') size = 'medium',
    @Query('networkSpeed') networkSpeed?: 'slow' | 'medium' | 'fast',
  ): Promise<{ url: string; size: string }> {
    const url = await this.mediaService.getOptimizedUrl(
      mediaId,
      size,
      networkSpeed,
    );
    return { url, size };
  }
}
