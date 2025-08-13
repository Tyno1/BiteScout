import { Input } from "@/components/atoms";
import { Edit, Save, Upload, X } from "lucide-react";
import Image from "next/image";
import type { Restaurant } from "shared/types/api/schemas";

type RestaurantProfileHeroProps = {
	image1: string;
	isEditing: boolean;
	displayData: Restaurant | undefined;
	handleInputChange: (
		field: keyof Restaurant,
		value: Restaurant[keyof Restaurant],
	) => void;
	handleSave: () => void;
	handleEdit: () => void;
	handleCancel: () => void;
	handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function RestaurantProfileHero({
	image1,
	isEditing,
	displayData,
	handleInputChange,
	handleSave,
	handleEdit,
	handleCancel,
	handleImageUpload,
}: RestaurantProfileHeroProps) {
	return (
		<section
			className="relative h-[30vh] w-full bg-black text-white flex flex-col items-start justify-center px-14"
			aria-label="Restaurant header"
		>
			<Image
				src={image1}
				style={{ objectFit: "cover" }}
				alt="hero image"
				fill
				className="absolute inset-0"
			/>

			<div className="absolute inset-0 bg-foreground/80" aria-hidden="true" />
			<div className="z-10 w-full flex items-end justify-between">
				<div>
					<h1 className="text-6xl font-bold">
						{isEditing ? (
							<Input
								fullWidth
								outlineType={isEditing ? "round" : "none"}
								type="text"
								name="restaurant-name"
								label="Restaurant Name"
								disabled={!isEditing}
								value={displayData?.name}
								onChange={(e) => handleInputChange("name", e.target.value)}
								placeholder="Add Restaurant Name here"
								className="text-6xl font-bold bg-transparent"
							/>
						) : (
							displayData?.name
						)}
					</h1>
				</div>
				<div className="flex gap-2" role="toolbar" aria-label="Profile actions">
					{isEditing ? (
						<>
							<button
								type="button"
								onClick={handleSave}
								className="inline-flex items-center justify-center px-4 py-2 border-2  border-white rounded text-white hover:bg-white hover:text-black transition-colors"
								aria-label="Save changes"
							>
								<Save className="w-4 h-4" />
							</button>
							<button
								type="button"
								onClick={handleCancel}
								className="inline-flex items-center justify-center px-4 py-2 border-2  border-white  rounded text-white hover:bg-white hover:text-black transition-colors"
								aria-label="Cancel editing"
							>
								<X className="w-4 h-4" />
							</button>
						</>
					) : (
						<button
							type="button"
							onClick={handleEdit}
							className="inline-flex items-center justify-center px-4 py-2 border-2 border-white rounded text-white hover:bg-white hover:text-black transition-colors"
							aria-label="Edit profile"
						>
							<Edit className="w-4 h-4" />
						</button>
					)}
					<label className="cursor-pointer">
						<button
							type="button"
							className="inline-flex items-center justify-center px-4 py-2 border-2  border-white  rounded text-white hover:bg-white hover:text-black transition-colors"
							aria-label="Upload new cover image"
						>
							<Upload className="w-4 h-4" />
						</button>
						<input
							type="file"
							className="hidden"
							accept="image/*"
							onChange={handleImageUpload}
							aria-label="Upload image"
						/>
					</label>
				</div>
			</div>
		</section>
	);
}
