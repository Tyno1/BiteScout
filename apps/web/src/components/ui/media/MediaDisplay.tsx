"use client";

import type { GetMediaResponse } from "@shared/types";
import { useEffect, useState } from "react";
import { getMedia, getOptimizedUrl } from "../../../utils/mediaApi";

interface MediaDisplayProps {
	mediaId: string;
	size?: string;
	networkSpeed?: "slow" | "medium" | "fast";
	showTitle?: boolean;
	showDescription?: boolean;
	className?: string;
}

export const MediaDisplay = ({
	mediaId,
	size = "medium",
	networkSpeed,
	showTitle = true,
	showDescription = true,
	className = "",
}: MediaDisplayProps) => {
	const [media, setMedia] = useState<GetMediaResponse | null>(null);
	const [optimizedUrl, setOptimizedUrl] = useState<string>("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadMedia = async () => {
			try {
				setLoading(true);
				setError(null);

				// Get media metadata from main backend
				const mediaData = await getMedia(mediaId);
				setMedia(mediaData);

				// Get optimized URL from media service
				try {
					const optimizedData = await getOptimizedUrl(
						mediaId,
						size,
						networkSpeed,
					);
					setOptimizedUrl(optimizedData.url);
				} catch (optimizeError) {
					console.warn(
						"Failed to get optimized URL, using original:",
						optimizeError,
					);
					setOptimizedUrl(mediaData.url);
				}
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load media");
			} finally {
				setLoading(false);
			}
		};

		if (mediaId) {
			loadMedia();
		}
	}, [mediaId, size, networkSpeed]);

	if (loading) {
		return (
			<div className={`animate-pulse ${className}`}>
				        <div className="bg-gray-200 rounded-lg h-64 w-full" />
			</div>
		);
	}

	if (error) {
		return (
			<div
				className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}
			>
				<p className="text-red-600 text-sm">Error loading media: {error}</p>
			</div>
		);
	}

	if (!media) {
		return (
			<div
				className={`bg-gray-50 border border-gray-200 rounded-lg p-4 ${className}`}
			>
				<p className="text-gray-500 text-sm">Media not found</p>
			</div>
		);
	}

	const displayUrl = optimizedUrl || media.url;

	return (
		<div className={`space-y-2 ${className}`}>
			{/* Media Content */}
			<div className="relative">
				{media.type === "image" ? (
					<img
						src={displayUrl}
						alt={media.title || "Media content"}
						className="w-full h-auto rounded-lg"
						loading="lazy"
					/>
				) : (
					<video
						src={displayUrl}
						controls
						className="w-full h-auto rounded-lg"
						preload="metadata"
					>
						<source src={displayUrl} type={media.mimeType} />
						<track kind="captions" src="" label="English" />
						Your browser does not support the video tag.
					</video>
				)}

				{/* Verification Badge */}
				{media.verified && (
					<div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
						✓ Verified
					</div>
				)}
			</div>

			{/* Media Info */}
			{(showTitle || showDescription) && (
				<div className="space-y-1">
					{showTitle && media.title && (
						<h3 className="font-medium text-gray-900">{media.title}</h3>
					)}
					{showDescription && media.description && (
						<p className="text-sm text-gray-600">{media.description}</p>
					)}
				</div>
			)}

			{/* Media Metadata */}
			<div className="text-xs text-gray-500 space-y-1">
				<div className="flex justify-between">
					<span>Type: {media.type}</span>
					{media.fileSize && (
						<span>{(media.fileSize / 1024 / 1024).toFixed(2)} MB</span>
					)}
				</div>
				{media.dimensions && (
					<div className="flex justify-between">
						<span>
							Dimensions: {media.dimensions.width} × {media.dimensions.height}
						</span>
						<span>Size: {size}</span>
					</div>
				)}
			</div>
		</div>
	);
};
