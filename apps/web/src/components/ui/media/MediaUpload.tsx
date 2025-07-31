"use client";

import type { Media, UploadMediaResponse } from "@shared/types";
import { useRef, useState } from "react";
import { uploadFile } from "../../../utils/mediaApi";
import { Button } from "../../atoms/buttons/Button";
import { Input } from "../../atoms/inputs/Input";
import { Textarea } from "../../atoms/inputs/TextArea";

interface MediaUploadProps {
	onUploadSuccess?: (result: UploadMediaResponse) => void;
	onUploadError?: (error: string) => void;
	associatedWith?: Media["associatedWith"];
	folder?: string;
	className?: string;
}

export const MediaUpload = ({
	onUploadSuccess,
	onUploadError,
	associatedWith,
	folder,
	className = "",
}: MediaUploadProps) => {
	const [file, setFile] = useState<File | null>(null);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [tags, setTags] = useState("");
	const [uploading, setUploading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [inputKey, setInputKey] = useState(0); // Add key for resetting input
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];
		if (selectedFile) {
			// Validate file type
			if (
				!selectedFile.type.startsWith("image/") &&
				!selectedFile.type.startsWith("video/")
			) {
				onUploadError?.("Please select an image or video file");
				return;
			}

			// Validate file size (100MB limit)
			if (selectedFile.size > 100 * 1024 * 1024) {
				onUploadError?.("File size must be less than 100MB");
				return;
			}

			setFile(selectedFile);
			if (!title) {
				setTitle(selectedFile.name.replace(/\.[^/.]+$/, "")); // Remove extension
			}
		}
	};

	const handleUpload = async () => {
		if (!file) {
			onUploadError?.("Please select a file to upload");
			return;
		}

		setUploading(true);
		setProgress(0);

		try {
			// Simulate progress
			const progressInterval = setInterval(() => {
				setProgress((prev) => Math.min(prev + 10, 90));
			}, 200);

			const result = await uploadFile(file, {
				title: title || file.name,
				description,
				tags: tags ? tags.split(",").map((tag) => tag.trim()) : undefined,
				folder,
				associatedWith,
			});
 
			clearInterval(progressInterval);
			setProgress(100);

			// Reset form
			setFile(null);
			setTitle("");
			setDescription("");
			setTags("");
			setInputKey((prev) => prev + 1); // Reset input key

			onUploadSuccess?.(result);
		} catch (error) {
			onUploadError?.(error instanceof Error ? error.message : "Upload failed");
		} finally {
			setUploading(false);
			setProgress(0);
		}
	};

	const handleDrop = (event: React.DragEvent) => {
		event.preventDefault();
		const droppedFile = event.dataTransfer.files[0];
		if (droppedFile) {
			const input = fileInputRef.current;
			if (input) {
				input.files = event.dataTransfer.files;
				handleFileSelect({
					target: { files: event.dataTransfer.files },
				} as React.ChangeEvent<HTMLInputElement>);
			}
		}
	};

	const handleDragOver = (event: React.DragEvent) => {
		event.preventDefault();
	};

	return (
		<div className={`space-y-4 ${className}`}>
			{/* File Drop Zone */}
			<div
				className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
					file
						? "border-green-500 bg-green-50"
						: "border-gray-300 hover:border-gray-400"
				}`}
				onDrop={handleDrop}
				onDragOver={handleDragOver}
			>
				<input
					key={inputKey} // Add key to force remount
					ref={fileInputRef}
					type="file"
					accept="image/*,video/*"
					onChange={handleFileSelect}
					className="hidden"
					id="file-input"
				/>

				{!file ? (
					<div>
						<div className="text-gray-500 mb-2">
							<svg
								className="mx-auto h-12 w-12"
								stroke="currentColor"
								fill="none"
								viewBox="0 0 48 48"
								aria-hidden="true"
							>
								<path
									d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
									strokeWidth={2}
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
						<p className="text-sm text-gray-600">
							Drag and drop a file here, or{" "}
							<label
								htmlFor="file-input"
								className="text-blue-600 hover:text-blue-500 font-medium cursor-pointer"
							>
								browse
							</label>
						</p>
						<p className="text-xs text-gray-500 mt-1">
							Supports images and videos up to 100MB
						</p>
					</div>
				) : (
					<div>
						<div className="text-green-600 mb-2">
							<svg
								className="mx-auto h-12 w-12"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
						<p className="text-sm font-medium text-gray-900">{file.name}</p>
						<p className="text-xs text-gray-500">
							{(file.size / 1024 / 1024).toFixed(2)} MB
						</p>
						<button
							type="button"
							onClick={() => {
								setFile(null);
								setInputKey((prev) => prev + 1); // Reset input key
							}}
							className="text-sm text-red-600 hover:text-red-500 mt-2"
						>
							Remove file
						</button>
					</div>
				)}
			</div>

			{/* Upload Form */}
			{file && (
				<div className="space-y-4">
					<Input
						name="title"
						type="text"
						label="Title"
						value={title}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setTitle(e.target.value)
						}
						placeholder="Enter a title for your media"
					/>

					<Textarea
						name="description"
						label="Description"
						value={description}
						onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
							setDescription(e.target.value)
						}
						placeholder="Enter a description (optional)"
						rows={3}
					/>

					<Input
						name="tags"
						type="text"
						label="Tags"
						value={tags}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setTags(e.target.value)
						}
						placeholder="Enter tags separated by commas (optional)"
					/>

					{/* Progress Bar */}
					{uploading && (
						<div className="space-y-2">
							<div className="flex justify-between text-sm text-gray-600">
								<span>Uploading...</span>
								<span>{progress}%</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-2">
								<div
									className="bg-blue-600 h-2 rounded-full transition-all duration-300"
									style={{ width: `${progress}%` }}
								/>
							</div>
						</div>
					)}

					<Button
					variant="solid"
						onClick={handleUpload}
						disabled={uploading}
						className="w-full"
						text={uploading ? "Uploading..." : "Upload Media"}
						/>
				</div>
			)}
		</div>
	);
};
