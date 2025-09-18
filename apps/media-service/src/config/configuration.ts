export default () => ({
  port: Number.parseInt(process.env.PORT, 10) || 3002,
  environment: process.env.NODE_ENV || 'development',

  // MongoDB Configuration
  mongodb: {
    uri:
      process.env.MONGODB_CONNECTION_STRING ||
      'mongodb://localhost:27017/media-service',
    database: process.env.MONGODB_DATABASE || 'media-service',
  },

  // Cloudinary Configuration
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },

  // AWS S3 Configuration
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1',
    bucketName: process.env.AWS_S3_BUCKET_NAME,
  },

  // Media Processing Configuration
  media: {
    maxFileSize:
      Number.parseInt(process.env.MAX_FILE_SIZE, 10) || 100 * 1024 * 1024, // 100MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    allowedVideoTypes: [
      'video/mp4',
      'video/avi',
      'video/mov',
      'video/wmv',
      'video/flv',
    ],
    imageVariants: {
      thumbnail: { width: 150, height: 150, quality: 80 },
      small: { width: 300, height: 300, quality: 85 },
      medium: { width: 600, height: 600, quality: 90 },
      large: { width: 1200, height: 1200, quality: 95 },
      original: { quality: 100 },
    },
    videoVariants: {
      low: { bitrate: '500k', resolution: '480p' },
      medium: { bitrate: '1000k', resolution: '720p' },
      high: { bitrate: '2000k', resolution: '1080p' },
      original: { bitrate: '4000k', resolution: 'original' },
    },
  },

  // Security Configuration
  security: {
    rateLimit: {
      ttl: Number.parseInt(process.env.RATE_LIMIT_TTL, 10) || 60,
      limit: Number.parseInt(process.env.RATE_LIMIT_LIMIT, 10) || 100,
    },
  },
});
