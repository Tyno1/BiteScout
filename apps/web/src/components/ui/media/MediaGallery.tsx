"use client";

import type { GetMediaResponse, PaginatedResponse } from "@shared/types";
import { useEffect, useState } from "react";
import { getUserMedia, getVerifiedMedia } from "../../../utils/mediaApi";
import { MediaDisplay } from "./MediaDisplay";

interface MediaGalleryProps {
	userId?: string;
	type?: "image" | "video";
	verified?: boolean;
	page?: number;
	limit?: number;
	className?: string;
}

export const MediaGallery = ({
	userId,
	type,
	verified = false,
	page = 1,
	limit = 12,
	className = "",
}: MediaGalleryProps) => {
	const [media, setMedia] = useState<GetMediaResponse[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [pagination, setPagination] = useState({
		currentPage: 1,
		totalPages: 1,
		totalMedia: 0,
		hasNextPage: false,
		hasPrevPage: false,
	});

	useEffect(() => {
		const loadMedia = async () => {
			try {
				setLoading(true);
				setError(null);

				let result: PaginatedResponse<GetMediaResponse>;
				if (userId) {
					result = await getUserMedia(userId, page, limit);
				} else if (verified) {
					result = await getVerifiedMedia(page, limit, type);
				} else {
					// Default to verified media if no specific criteria
					result = await getVerifiedMedia(page, limit, type);
				}

				setMedia(result.data);
				setPagination({
					currentPage: result.pagination.page,
					totalPages: result.pagination.totalPages,
					totalMedia: result.pagination.total,
					hasNextPage: result.pagination.hasNext,
					hasPrevPage: result.pagination.hasPrev,
				});
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load media");
			} finally {
				setLoading(false);
			}
		};

		loadMedia();
	}, [userId, type, verified, page, limit]);

	if (loading) {
		return (
			<div
				className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ${className}`}
			>
				{Array.from({ length: limit }, (_, index) => (
					<div key={`loading-skeleton-${index}-${Date.now()}`} className="animate-pulse">
						<div className="bg-gray-200 rounded-lg h-48 w-full" />
						<div className="mt-2 space-y-2">
							<div className="bg-gray-200 h-4 w-3/4 rounded" />
							<div className="bg-gray-200 h-3 w-1/2 rounded" />
						</div>
					</div>
				))}
			</div>
		);
	}

	if (error) {
		return (
			<div
				className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}
			>
				<p className="text-red-600 text-sm">
					Error loading media gallery: {error}
				</p>
			</div>
		);
	}

	if (media.length === 0) {
		return (
			<div
				className={`bg-gray-50 border border-gray-200 rounded-lg p-8 text-center ${className}`}
			>
				<div className="text-gray-400 mb-4">
					<svg
						className="mx-auto h-12 w-12"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
				</div>
				<h3 className="text-lg font-medium text-gray-900 mb-2">
					No media found
				</h3>
				<p className="text-gray-500">
					{verified
						? "No verified media available at the moment."
						: "No media has been uploaded yet."}
				</p>
			</div>
		);
	}

	return (
		<div className={className}>
			{/* Media Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{media.map((item) => (
					<div key={item._id || `media-${item.url}`} className="space-y-2">
						<MediaDisplay mediaId={item._id || ''} />
						{/* Media Info */}
						<div className="space-y-1">
							{item.title && (
								<h4 className="text-sm font-medium text-gray-900 truncate">
									{item.title}
								</h4>
							)}
							{item.description && (
								<p className="text-xs text-gray-500 line-clamp-2">
									{item.description}
								</p>
							)}
							<div className="flex items-center justify-between text-xs text-gray-400">
								<span>{item.type}</span>
								{item.fileSize && (
									<span>
										{(item.fileSize / 1024 / 1024).toFixed(1)} MB
									</span>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Pagination */}
			{pagination.totalPages > 1 && (
				<div className="mt-8 flex justify-center space-x-2">
					<button
						type="button"
						onClick={() => {
							// Handle previous page
							if (pagination.hasPrevPage) {
								// You would typically update the page state here
								console.log("Previous page");
							}
						}}
						disabled={!pagination.hasPrevPage}
						className="px-3 py-2 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
					>
						Previous
					</button>

					<span className="px-3 py-2 text-sm text-gray-600">
						Page {pagination.currentPage} of {pagination.totalPages}
					</span>

					<button
						type="button"
						onClick={() => {
							// Handle next page
							if (pagination.hasNextPage) {
								// You would typically update the page state here
								console.log("Next page");
							}
						}}
						disabled={!pagination.hasNextPage}
						className="px-3 py-2 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
					>
						Next
					</button>
				</div>
			)}

			{/* Media Count */}
			<div className="mt-4 text-center text-sm text-gray-500">
				Showing {media.length} of {pagination.totalMedia} media items
			</div>
		</div>
	);
};
