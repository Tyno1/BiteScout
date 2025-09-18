<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

# Media Service - BiteScout

A robust NestJS microservice for uploading, processing, and managing media files (images and videos) for the BiteScout application. Built with NestJS, it supports multiple cloud providers and provides optimized delivery for different network conditions.

## 🚀 Features

- **Multi-Provider Support**: Upload to Cloudinary or AWS S3
- **Automatic Optimization**: Generate multiple size variants for images and videos
- **Network-Aware Delivery**: Optimize content based on network speed
- **RESTful API**: Complete CRUD operations for media management
- **Rate Limiting**: Built-in protection against abuse
- **Security**: Helmet, CORS, and validation middleware
- **Documentation**: Auto-generated Swagger API docs
- **Health Checks**: Service monitoring endpoints
- **Docker Ready**: Production-ready containerization

## 📋 Prerequisites

- Node.js (v18 or higher)
- yarn (recommended)
- MongoDB database
- Cloudinary account (for cloud storage)
- AWS S3 bucket (optional, for alternative storage)

## 🛠️ Installation

### 1. Install Dependencies
```bash
# From the root of the monorepo
yarn install --ignore-engines

# Or from the media-service directory
cd apps/media-service
yarn install --ignore-engines
```

### 2. Environment Setup
Copy the example environment file and configure it:
```bash
cp env.example .env
```

Configure the following environment variables:

```env
# Application Configuration
PORT=3002
NODE_ENV=development

# MongoDB Configuration
MONGODB_CONNECTION_STRING=mongodb://localhost:27017/media-service
MONGODB_DATABASE=media-service

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# AWS S3 Configuration (Optional)
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=your_bucket_name

# Media Processing Configuration
MAX_FILE_SIZE=104857600
RATE_LIMIT_TTL=60
RATE_LIMIT_LIMIT=100

# Security Configuration
ALLOWED_ORIGINS=http://localhost:3001,http://localhost:3000
```

## 🚀 Running the Service

### Development
```bash
# From the root of the monorepo
yarn dev --filter=media-service

# Or from the media-service directory
cd apps/media-service
yarn start:dev
```

### Production
```bash
# Build the application
yarn build

# Start production server
yarn start:prod
```

### Docker
```bash
# Build and run with Docker
docker build -t media-service .
docker run -p 3002:3002 media-service
```

## 📚 API Documentation

Once the service is running, visit:
- **Swagger UI**: http://localhost:3002/api
- **Health Check**: http://localhost:3002/api/v1/media/health/check

## 🔌 API Endpoints

### Media Upload
```http
POST /api/v1/media/upload
Content-Type: multipart/form-data

Body:
- file: Media file (image/video)
- userId: User ID (optional)
- tags: Array of tags (optional)
- folder: Folder path (optional)
```

### Media Retrieval
```http
GET /api/v1/media/:mediaId
GET /api/v1/media/:mediaId?size=medium
```

### Optimized URLs
```http
GET /api/v1/media/:mediaId/optimized?size=medium&networkSpeed=fast
```

### Media Management
```http
GET /api/v1/media?userId=123&tags=food,restaurant
DELETE /api/v1/media/:mediaId
```

### Statistics
```http
GET /api/v1/media/stats/overview
```

### Health Check
```http
GET /api/v1/media/health/check
```

## 🖼️ Supported Media Types

### Images
- JPEG, PNG, WebP, GIF
- Automatic optimization and resizing
- Multiple size variants: thumbnail, small, medium, large, original

### Videos
- MP4, AVI, MOV, WMV, FLV
- Automatic transcoding and optimization
- Multiple quality variants: low, medium, high, original

## 🔧 Configuration

### Image Variants
```typescript
imageVariants: {
  thumbnail: { width: 150, height: 150, quality: 80 },
  small: { width: 300, height: 300, quality: 85 },
  medium: { width: 600, height: 600, quality: 90 },
  large: { width: 1200, height: 1200, quality: 95 },
  original: { quality: 100 },
}
```

### Video Variants
```typescript
videoVariants: {
  low: { bitrate: '500k', resolution: '480p' },
  medium: { bitrate: '1000k', resolution: '720p' },
  high: { bitrate: '2000k', resolution: '1080p' },
  original: { bitrate: '4000k', resolution: 'original' },
}
```

## 🔒 Security Features

- **Rate Limiting**: 100 requests per minute per IP
- **File Type Validation**: Whitelist approach for security
- **File Size Limits**: Configurable maximum file size
- **CORS Protection**: Configurable allowed origins
- **Input Validation**: Comprehensive request validation

## 🧪 Testing

```bash
# Unit tests
yarn test

# E2E tests
yarn test:e2e

# Test coverage
yarn test:cov
```

## 📊 Monitoring

### Health Checks
The service provides health check endpoints for monitoring:
- Service status
- Database connectivity
- External service dependencies

### Logging
- Structured logging with NestJS Logger
- Error tracking and monitoring
- Performance metrics

## 🔄 Integration with BiteScout

### Frontend Integration
```typescript
// Example: Upload restaurant image
const uploadImage = async (file: File, restaurantId: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('userId', userId);
  formData.append('tags', ['restaurant', restaurantId]);
  formData.append('folder', 'restaurants');

  const response = await fetch('http://localhost:3002/api/v1/media/upload', {
    method: 'POST',
    body: formData
  });

  return response.json();
};
```

### Backend Integration
```typescript
// Example: Get optimized image URL
const getOptimizedImage = async (mediaId: string, size: string = 'medium') => {
  const response = await fetch(
    `http://localhost:3002/api/v1/media/${mediaId}/optimized?size=${size}`
  );
  return response.json();
};
```

## 🚀 Deployment

### Docker Deployment
```bash
# Build production image
docker build -t bitescout-media-service .

# Run with environment variables
docker run -d \
  -p 3002:3002 \
  -e NODE_ENV=production \
  -e MONGODB_CONNECTION_STRING=your_mongodb_connection_string \
  -e CLOUDINARY_CLOUD_NAME=your_cloud_name \
  -e CLOUDINARY_API_KEY=your_api_key \
  -e CLOUDINARY_API_SECRET=your_api_secret \
  bitescout-media-service
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=3002
MONGODB_CONNECTION_STRING=your_production_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=your_bucket_name
ALLOWED_ORIGINS=https://yourdomain.com
```

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Check what's using port 3002
   lsof -i :3002
   
   # Kill the process or change the port
   kill -9 <PID>
   ```

2. **MongoDB Connection Issues**
   - Verify MongoDB is running
   - Check connection string format
   - Ensure network connectivity

3. **Cloudinary Configuration**
   - Verify API credentials
   - Check cloud name spelling
   - Ensure account has sufficient credits

4. **File Upload Issues**
   - Check file size limits
   - Verify file type is supported
   - Ensure proper multipart/form-data format

### Logs
```bash
# View service logs
yarn start:dev

# Check Docker logs
docker logs <container_id>
```

## 📈 Performance

### Expected Performance
- **Upload Speed**: 10-50MB/s (depending on network)
- **Processing Time**: 2-10 seconds per file
- **Concurrent Uploads**: 100 requests/minute
- **Storage**: Unlimited (Cloudinary/AWS S3)

### Optimization Tips
- Use appropriate image sizes for different use cases
- Leverage CDN for faster delivery
- Monitor storage usage and costs
- Implement caching strategies

## 🤝 Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Ensure all tests pass
5. Follow the monorepo structure

## 📄 License

This project is part of the BiteScout monorepo and follows the same licensing terms.

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check the main BiteScout documentation
4. Create an issue in the repository
