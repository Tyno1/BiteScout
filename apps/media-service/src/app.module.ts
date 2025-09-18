import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { MediaController } from './controllers/media.controller';
import { AwsS3Provider } from './providers/aws-s3.provider';
import { CloudinaryProvider } from './providers/cloudinary.provider';
import { MediaRepository } from './repositories/media.repository';
import { Media, MediaSchema } from './schemas/media.schema';
import { MediaService } from './services/media.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri:
          process.env.MONGODB_CONNECTION_STRING ||
          'mongodb://localhost:27017/media-service',
      }),
    }),
    MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }]),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 100,
      },
    ]),
  ],
  controllers: [AppController, MediaController],
  providers: [
    AppService,
    MediaService,
    CloudinaryProvider,
    AwsS3Provider,
    MediaRepository,
  ],
})
export class AppModule {}
