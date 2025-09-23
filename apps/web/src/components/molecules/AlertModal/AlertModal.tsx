"use client";

import { X } from "lucide-react";
import type React from "react";
import { useCallback, useEffect } from "react";
import { Button, IconButton } from "@/components/atoms";
import { cn } from "@/lib/utils";

export interface AlertModalProps {
	/** Whether the modal is open */
	isOpen: boolean;
	/** Function to close the modal */
	onClose: () => void;
	/** Title of the alert modal */
	title: string;
	/** Content/message to display */
	children: React.ReactNode;
	/** Text for the primary action button */
	confirmText?: string;
	/** Text for the secondary action button */
	cancelText?: string;
	/** Function called when primary action is clicked */
	onConfirm: () => void;
	/** Function called when secondary action is clicked (defaults to onClose) */
	onCancel?: () => void;
	/** Color variant for the confirm button */
	confirmVariant?: "primary" | "danger" | "success" | "neutral";
	/** Color variant for the cancel button */
	cancelVariant?: "primary" | "secondary" | "danger" | "success" | "neutral";
	/** Whether the confirm action is loading */
	isLoading?: boolean;
	/** Additional CSS classes */
	className?: string;
	/** Disable closing on backdrop click */
	disableBackdropClose?: boolean;
	/** Disable closing on escape key */
	disableEscapeClose?: boolean;
}

export function AlertModal({
	isOpen,
	onClose,
	title,
	children,
	confirmText = "Confirm",
	cancelText = "Cancel",
	onConfirm,
	onCancel,
	confirmVariant = "primary",
	cancelVariant = "neutral",
	isLoading = false,
	className,
	disableBackdropClose = false,
	disableEscapeClose = false,
}: AlertModalProps) {
	// Handle escape key
	useEffect(() => {
		if (!isOpen || disableEscapeClose) return;

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [isOpen, onClose, disableEscapeClose]);

	// Handle backdrop click
	const handleBackdropClick = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			if (event.target === event.currentTarget && !disableBackdropClose) {
				onClose();
			}
		},
		[onClose, disableBackdropClose],
	);

	// Handle cancel action
	const handleCancel = useCallback(() => {
		if (onCancel) {
			onCancel();
		} else {
			onClose();
		}
	}, [onCancel, onClose]);

	// Handle confirm action
	const handleConfirm = useCallback(() => {
		if (!isLoading) {
			onConfirm();
		}
	}, [onConfirm, isLoading]);

	// Prevent body scroll when modal is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<dialog
			open={isOpen}
			className="fixed inset-0 z-50 flex items-center justify-center bg-transparent p-0 m-0 w-screen h-screen max-w-none max-h-none"
			aria-labelledby="alert-modal-title"
			aria-describedby="alert-modal-description"
		>
			{/* Backdrop */}
			<div
				className="fixed inset-0 w-full h-full bg-black/50 backdrop-blur-sm"
				onClick={handleBackdropClick}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						handleBackdropClick(
							e as unknown as React.MouseEvent<HTMLDivElement>,
						);
					}
				}}
				role="button"
				tabIndex={-1}
				aria-hidden="true"
			/>

			{/* Modal */}
			<div
				className={cn(
					"relative bg-card border border-border rounded-lg shadow-xl",
					"w-full max-w-md mx-4 p-6",
					"animate-in fade-in-0 zoom-in-95 duration-200",
					className,
				)}
			>
				{/* Header */}
				<div className="flex items-center justify-between mb-4">
					<h2
						id="alert-modal-title"
						className="text-lg font-semibold text-card-foreground"
					>
						{title}
					</h2>
					{!disableBackdropClose && (
						<IconButton
							variant="plain"
							size="sm"
							color="danger"
							icon={<X size={20} />}
							onClick={onClose}
							aria-label="Close modal"
						/>
					)}
				</div>

				{/* Content */}
				<div
					id="alert-modal-description"
					className="text-foreground mb-6 leading-relaxed"
				>
					{children}
				</div>

				{/* Actions */}
				<div className="flex gap-3 justify-end">
					<Button
						size="sm"
						variant="outline"
						color={cancelVariant}
						text={cancelText}
						onClick={handleCancel}
						disabled={isLoading}
						className="min-w-[80px]"
					/>
					<Button
						size="sm"
						variant="solid"
						color={confirmVariant}
						text={isLoading ? "Loading..." : confirmText}
						onClick={handleConfirm}
						disabled={isLoading}
						className="min-w-[80px]"
					/>
				</div>
			</div>
		</dialog>
	);
}
