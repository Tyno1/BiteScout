import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
	IsArray,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	Max,
	Min,
} from "class-validator";
import type { MediaMetadata } from "../interfaces/media.interface";

export class UploadMediaDto {
	@ApiProperty({ type: "string", format: "binary" })
	file: Express.Multer.File;

	@ApiPropertyOptional({ description: "Title for the media" })
	@IsOptional()
	@IsString()
	title?: string;

	@ApiPropertyOptional({ description: "Description for the media" })
	@IsOptional()
	@IsString()
	description?: string;

	@ApiPropertyOptional({ description: "User ID associated with the upload" })
	@IsOptional()
	@IsString()
	userId?: string;

	@ApiPropertyOptional({ description: "Tags for the media", type: [String] })
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	tags?: string[];

	@ApiPropertyOptional({ description: "Custom folder path" })
	@IsOptional()
	@IsString()
	folder?: string;
}

export class UploadResponseDto {
	@ApiProperty({ description: "Media metadata", type: "object" })
	media: MediaMetadata;

	  @ApiProperty({ description: "Media variants", type: "array" })
  variants: Array<{
    size: string;
    url: string;
    width?: number;
    height?: number;
  }>;
}

export class GetMediaDto {
	@ApiPropertyOptional({ description: "User ID to filter media" })
	@IsOptional()
	@IsString()
	userId?: string;

	@ApiPropertyOptional({
		description: "Media type filter",
		enum: ["image", "video"],
	})
	@IsOptional()
	@IsEnum(["image", "video"])
	type?: "image" | "video";

	@ApiPropertyOptional({ description: "Size variant filter" })
	@IsOptional()
	@IsString()
	size?: string;

	@ApiPropertyOptional({ description: "Tags to filter by", type: [String] })
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	tags?: string[];

	@ApiPropertyOptional({
		description: "Number of items to return",
		minimum: 1,
		maximum: 100,
	})
	@IsOptional()
	@IsNumber()
	@Min(1)
	@Max(100)
	limit?: number;

	@ApiPropertyOptional({ description: "Number of items to skip" })
	@IsOptional()
	@IsNumber()
	@Min(0)
	offset?: number;

	  @ApiPropertyOptional({
    description: "Sort field",
    enum: ["createdAt", "fileSize", "title"],
  })
  @IsOptional()
  @IsEnum(["createdAt", "fileSize", "title"])
  sortBy?: "createdAt" | "fileSize" | "title";

	@ApiPropertyOptional({ description: "Sort order", enum: ["asc", "desc"] })
	@IsOptional()
	@IsEnum(["asc", "desc"])
	sortOrder?: "asc" | "desc";
}

export class DeleteMediaDto {
	@ApiProperty({ description: "Media ID to delete" })
	@IsString()
	mediaId: string;

	@ApiPropertyOptional({ description: "User ID for authorization" })
	@IsOptional()
	@IsString()
	userId?: string;
}
