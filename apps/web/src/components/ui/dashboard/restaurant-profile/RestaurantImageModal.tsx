import { Image as ImageIcon } from "lucide-react";
import { useCallback, useState } from "react";
import type { Media } from "shared/types/api/schemas";
import type { RestaurantDetailGetResponse } from "shared/types/restaurant/detail";
import { Alert, Button, Spinner } from "@/components/atoms";
import { type TabItem, Tabs } from "@/components/molecules/Tabs/Tabs";
import { Modal } from "@/components/organisms/Modal";
import { Gallery } from "@/components/ui/dashboard/gallery";
import { MediaUpload } from "@/components/ui/media/media-upload";
import { MediaFolder } from "@/components/ui/media/media-upload/types";
import { useAssignedImages } from "@/hooks/restaurant/useAssignedImages";

interface RestaurantImageModalProps {
	isOpen: boolean;
	onClose: () => void;
	restaurantId: string;
	assignedImages?: RestaurantDetailGetResponse["assignedImages"];
	gallery: Media[];
}

export const RestaurantImageModal: React.FC<RestaurantImageModalProps> = ({
	isOpen,
	onClose,
	restaurantId,
	assignedImages,
	gallery,
}) => {
	const [activeTab, setActiveTab] = useState("upload");
	const { updateLogo, updateProfileImage, isLoading } =
		useAssignedImages(restaurantId);

	const handleLogoChange = useCallback(
		(mediaId: string | null) => {
			updateLogo(mediaId);
		},
		[updateLogo],
	);

	const handleProfileImageChange = useCallback(
		(mediaId: string | null) => {
			updateProfileImage(mediaId);
		},
		[updateProfileImage],
	);

	const handleSave = () => {
		onClose?.();
	};

	// Define tab content components
	const UploadTab = useCallback(() => {
		return (
			<div className="space-y-6">
				<div>
					<h3 className="text-lg font-medium text-card-foreground mb-4">
						Upload New Media
					</h3>
					<p className="text-sm text-muted-foreground mb-4">
						Upload new images to your gallery. They will be automatically added
						to your restaurant's media collection and can then be assigned as
						logo or profile image.
					</p>
					<MediaUpload
						uploadMode="manual"
						uploadedFiles={[]}
						onSelectedFilesChange={(files) => {
							// Files selected - could be used for future functionality
						}}
						onUploadSuccess={(media) => {
							// Switch to gallery tab so user can see the new image
							setActiveTab("gallery");

							// Don't auto-assign - let user manually choose from gallery
						}}
						onUploadError={(error) => {
							console.error("Media upload error:", error);
						}}
						multiple={false}
						singleUpload={true}
						associatedWith={{
							type: "restaurant",
							id: restaurantId,
						}}
						folder={MediaFolder.RESTAURANT}
					/>
				</div>
			</div>
		);
	}, [restaurantId]);

	const GalleryTab = useCallback(() => {
		return (
			<div className="space-y-6">
				<div>
					<h3 className="text-lg font-medium text-card-foreground mb-4">
						Select from Gallery
					</h3>
					<p className="text-sm text-muted-foreground mb-4">
						Choose images from your existing gallery to assign as logo or
						profile image.
					</p>

					{/* Current Assignments */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
						{/* Logo Assignment */}
						<div className="space-y-4">
							<div className="flex items-center gap-2">
								<ImageIcon size={20} className="text-muted-foreground" />
								<h4 className="font-medium text-card-foreground">Logo</h4>
							</div>

							{assignedImages?.logo?.mediaId?.url ? (
								<div className="relative">
									<img
										src={assignedImages.logo.mediaId.url}
										alt="Restaurant Logo"
										className="w-32 h-32 object-cover rounded-lg border"
									/>
									<div className="mt-2 text-sm text-muted-foreground">
										<p>
											Assigned:{" "}
											{assignedImages.logo.assignedAt
												? new Date(
														assignedImages.logo.assignedAt,
													).toLocaleDateString()
												: "Unknown"}
										</p>
										<p>
											By: {assignedImages.logo.assignedBy?.name || "Unknown"}
										</p>
									</div>
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleLogoChange(null)}
										text="Remove Assignment"
										className="mt-2"
									/>
								</div>
							) : (
								<div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-muted-foreground text-sm">
									No logo assigned
								</div>
							)}
						</div>

						{/* Profile Image Assignment */}
						<div className="space-y-4">
							<div className="flex items-center gap-2">
								<ImageIcon size={20} className="text-muted-foreground" />
								<h4 className="font-medium text-card-foreground">
									Profile Image
								</h4>
							</div>

							{assignedImages?.profileImage?.mediaId?.url ? (
								<div className="relative">
									<img
										src={assignedImages.profileImage.mediaId.url}
										alt="Restaurant Profile"
										className="w-32 h-32 object-cover rounded-lg border"
									/>
									<div className="mt-2 text-sm text-muted-foreground">
										<p>
											Assigned:{" "}
											{assignedImages.profileImage.assignedAt
												? new Date(
														assignedImages.profileImage.assignedAt,
													).toLocaleDateString()
												: "Unknown"}
										</p>
										<p>
											By:{" "}
											{assignedImages.profileImage.assignedBy?.name ||
												"Unknown"}
										</p>
									</div>
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleProfileImageChange(null)}
										text="Remove Assignment"
										className="mt-2"
									/>
								</div>
							) : (
								<div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-muted-foreground text-sm">
									No profile image assigned
								</div>
							)}
						</div>
					</div>

					{/* Gallery Selection */}
					<div>
						<h4 className="text-lg font-medium text-card-foreground mb-3">
							Select Images to Assign
						</h4>
						<p className="text-sm text-muted-foreground mb-4">
							Click on any image below to assign it as your logo or profile
							image. Newly uploaded images will appear here automatically.
						</p>
						{isLoading && (
							<Alert status="information" className="mb-4">
								Updating gallery... New images will appear shortly.
							</Alert>
						)}
						<Alert status="information" className="mb-4">
							Quick Tip: Click on any image below to assign it as your profile
							image. This image will be displayed in the hero section of your
							restaurant profile.
						</Alert>
						<Gallery
							restaurantId={restaurantId}
							// images={gallery}
							onImageSelect={(image) => {
								const imageId = image._id || null;
								if (imageId) {
									// Assign to profile image for hero display
									handleProfileImageChange(imageId);
								}
							}}
						/>
					</div>
				</div>
			</div>
		);
	}, [
		assignedImages,
		gallery,
		handleLogoChange,
		handleProfileImageChange,
		restaurantId,
		isLoading,
	]);

	const tabs: TabItem[] = [
		{
			key: "upload",
			label: "Upload New Media",
			content: UploadTab(),
		},
		{
			key: "gallery",
			label: "Select from Gallery",
			content: GalleryTab(),
		},
	];

	return (
		<Modal
			isModalOpen={isOpen}
			setIsModalOpen={() => onClose()}
			closeModal={onClose}
			modalTitle="Manage Restaurant Images"
			modalDescription="Upload new media and assign images from your gallery"
			modalActionText="Done"
			modalActionOnClick={handleSave}
			isSubmitting={false}
		>
			{isLoading && (
				<Alert status="information" className="mt-4">
					Updating assigned images...
				</Alert>
			)}

			<Tabs tabs={tabs} selectedTab={activeTab} onTabChange={setActiveTab} />
		</Modal>
	);
};
