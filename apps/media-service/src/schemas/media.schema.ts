import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { Document } from "mongoose";

export type MediaDocument = Media & Document;

@Schema({ timestamps: true })
export class MediaVariant {
	@Prop({ required: true })
	size: string;

	@Prop({ required: true })
	url: string;

	@Prop()
	width?: number;

	@Prop()
	height?: number;

	@Prop()
	bitrate?: string;

	@Prop()
	resolution?: string;

	@Prop({ required: true })
	fileSize: number;

	@Prop({ required: true })
	format: string;

	@Prop({ required: true, default: Date.now })
	createdAt: Date;
}

@Schema({ timestamps: true })
export class Media {
	@Prop({ required: true })
	providerId: string;

	@Prop({ required: true, enum: ["cloudinary", "aws-s3"] })
	provider: string;

	@Prop({ required: true })
	originalName: string;

	@Prop({ required: true })
	mimeType: string;

	@Prop({ required: true })
	fileSize: number;

	@Prop()
	width?: number;

	@Prop()
	height?: number;

	@Prop({ required: true })
	format: string;

	@Prop({ type: [MediaVariant], required: true })
	variants: MediaVariant[];

	@Prop({ type: [String], default: [] })
	tags: string[];

	@Prop()
	userId?: string;

	@Prop({ required: true, default: Date.now })
	createdAt: Date;

	@Prop({ required: true, default: Date.now })
	updatedAt: Date;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
