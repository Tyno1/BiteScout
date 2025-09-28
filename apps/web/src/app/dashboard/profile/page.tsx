"use client";

import {
	ArrowLeft,
	Building,
	Edit,
	Mail,
	MapPin,
	Phone,
	Shield,
	User,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Suspense, useState } from "react";
import type { AccessRoles } from "shared/types/api/schemas";
import { Button } from "@/components/atoms";
import { Badge } from "@/components/atoms/Badge";
import { Card } from "@/components/organisms";
import { UserEditModal } from "@/components/ui/dashboard/user-management/UserEditModal";
import { useDashboardSession } from "@/contexts/DashboardSessionContext";
import { useUserProfile } from "@/hooks/user-profile";

type ExtendedUser = {
	_id: string;
	name: string;
	email: string;
	username?: string;
	phone?: string;
	bio?: string;
	address?: string;
	hometown?: string;
	currentCity?: string;
	country?: string;
	userType: AccessRoles;
	dietaryPreferences?: string[];
	imageUrl?: string;
	isVerified?: boolean;
	createdAt: string;
	updatedAt: string;
	// Additional fields that the backend controller adds
	lastLoginAt?: string;
	approvedAt?: string;
	accessExpiresAt?: string;
	maxRestaurants?: number;
	accessLevel?: string;
	// Unified permissions based on userType + context
	permissions?: {
		// Platform permissions
		canAccessAdminPanel?: boolean;
		canCreateRestaurants?: boolean;
		canManageAllUsers?: boolean;
		canViewPlatformAnalytics?: boolean;
		// Restaurant permissions
		canEditRestaurant?: boolean;
		canManageUsers?: boolean;
		canViewAnalytics?: boolean;
		canEditMenu?: boolean;
		canDeleteContent?: boolean;
		canManageContent?: boolean;
	};
	// Additional user fields that may exist
	timezone?: string;
	twoFactorEnabled?: boolean;
	failedLoginAttempts?: number;
	isLocked?: boolean;
	lastActivity?: string;
	theme?: string;
	language?: string;
};

function UserProfilePageContent() {
	const router = useRouter();
	const { session } = useDashboardSession();
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	const {
		data: userData,
		isLoading,
		error,
	} = useUserProfile(session?.user?._id || "");

	const user = userData?.user as ExtendedUser | undefined;

	const handleSaveUser = async (userData: Partial<ExtendedUser>) => {
		// This will be handled by the UserEditModal's internal mutation
		console.log("User data saved:", userData);
	};

	if (isLoading) {
		return (
			<main className="w-full mx-auto px-4 md:px-10 py-10 space-y-6">
				<div className="text-center py-8">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
					<p className="text-muted-foreground">Loading profile...</p>
				</div>
			</main>
		);
	}

	if (error || !user) {
		return (
			<main className="w-full mx-auto px-4 md:px-10 py-10 space-y-6">
				<div className="text-center py-8">
					<p className="text-destructive">
						Error loading profile or user not found
					</p>
					<Button
						variant="outline"
						text="Go Back"
						onClick={() => router.back()}
						className="mt-4"
					/>
				</div>
			</main>
		);
	}

	return (
		<main className="w-full mx-auto px-4 md:px-10 py-10 space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-4">
					<Button
						variant="outline"
						size="sm"
						text="Back"
						onClick={() => router.back()}
						IconBefore={<ArrowLeft size={16} />}
					/>
					<div>
						<h1 className="text-2xl font-bold text-foreground">My Profile</h1>
						<p className="text-muted-foreground">
							Manage your personal information and preferences
						</p>
					</div>
				</div>
				<Button
					variant="solid"
					size="sm"
					text="Edit Profile"
					onClick={() => setIsEditModalOpen(true)}
					IconBefore={<Edit size={16} />}
				/>
			</div>

			{/* Profile Header */}
			<Card className="mb-6">
				<div className="flex items-start gap-6">
					<div className="relative">
						{user.imageUrl ? (
							<Image
								src={user.imageUrl}
								alt={`${user.name}'s profile`}
								width={120}
								height={120}
								className="rounded-full object-cover border-4 border-background shadow-lg"
							/>
						) : (
							<div className="w-30 h-30 bg-muted rounded-full flex items-center justify-center border-4 border-background shadow-lg">
								<User size={48} className="text-muted-foreground" />
							</div>
						)}
					</div>
					<div className="flex-1">
						<div className="flex items-center gap-3 mb-2">
							<h2 className="text-2xl font-bold text-foreground">
								{user.name}
							</h2>
							<Badge
								variant="solid"
								color={user.isVerified ? "success" : "neutral"}
								size="sm"
							>
								{user.isVerified ? "Verified" : "Unverified"}
							</Badge>
						</div>
						<p className="text-muted-foreground mb-4">
							{user.bio || "No bio available"}
						</p>
						<div className="flex items-center gap-4 text-sm text-muted-foreground">
							<div className="flex items-center gap-1">
								<Mail size={16} />
								<span>{user.email}</span>
							</div>
							{user.phone && (
								<div className="flex items-center gap-1">
									<Phone size={16} />
									<span>{user.phone}</span>
								</div>
							)}
							{user.address && (
								<div className="flex items-center gap-1">
									<MapPin size={16} />
									<span>{user.address}</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</Card>

			{/* Personal Information */}
			<Card className="mb-6">
				<h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
					<User size={20} className="text-muted-foreground" />
					Personal Information
				</h3>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<h4 className="font-medium text-card-foreground mb-2">
							Basic Details
						</h4>
						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span className="text-muted-foreground">Full Name:</span>
								<span className="text-card-foreground">{user.name}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">Username:</span>
								<span className="text-card-foreground">
									{user.username || "Not set"}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">Email:</span>
								<span className="text-card-foreground">{user.email}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">Phone:</span>
								<span className="text-card-foreground">
									{user.phone || "Not provided"}
								</span>
							</div>
						</div>
					</div>

					<div>
						<h4 className="font-medium text-card-foreground mb-2">Location</h4>
						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span className="text-muted-foreground">Address:</span>
								<span className="text-card-foreground">
									{user.address || "Not provided"}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">Hometown:</span>
								<span className="text-card-foreground">
									{user.hometown || "Not provided"}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">Current City:</span>
								<span className="text-card-foreground">
									{user.currentCity || "Not provided"}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">Country:</span>
								<span className="text-card-foreground">
									{user.country || "Not provided"}
								</span>
							</div>
						</div>
					</div>
				</div>
			</Card>

			{/* Dietary Preferences */}
			{user.dietaryPreferences && user.dietaryPreferences.length > 0 && (
				<Card className="mb-6">
					<h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
						<Building size={20} className="text-muted-foreground" />
						Dietary Preferences
					</h3>
					<div className="flex flex-wrap gap-2">
						{user.dietaryPreferences.map((preference) => (
							<Badge key={preference} variant="outline" size="sm">
								{preference}
							</Badge>
						))}
					</div>
				</Card>
			)}

			{/* Account Settings */}
			<Card className="mb-6">
				<h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
					<Shield size={20} className="text-muted-foreground" />
					Account Settings
				</h3>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<h4 className="font-medium text-card-foreground mb-2">
							Account Status
						</h4>
						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span className="text-muted-foreground">
									Verification Status:
								</span>
								<span
									className={`${user.isVerified ? "text-success" : "text-muted-foreground"}`}
								>
									{user.isVerified ? "Verified" : "Not Verified"}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">Account Type:</span>
								<span className="text-card-foreground capitalize">
									{user.userType || "Not set"}
								</span>
							</div>
						</div>
					</div>

					<div>
						<h4 className="font-medium text-card-foreground mb-2">
							Account Activity
						</h4>
						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span className="text-muted-foreground">Member Since:</span>
								<span className="text-card-foreground">
									{user.createdAt
										? new Date(user.createdAt).toLocaleDateString()
										: "Unknown"}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">Last Updated:</span>
								<span className="text-card-foreground">
									{user.updatedAt
										? new Date(user.updatedAt).toLocaleDateString()
										: "Unknown"}
								</span>
							</div>
						</div>
					</div>
				</div>
			</Card>

			{/* User Preferences */}
			{(user.theme || user.language) && (
				<Card className="mb-6">
					<h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
						<User size={20} className="text-muted-foreground" />
						User Preferences
					</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h4 className="font-medium text-card-foreground mb-2">
								System Preferences
							</h4>
							<div className="space-y-2 text-sm">
								{user.theme && (
									<div className="flex justify-between">
										<span className="text-muted-foreground">Theme:</span>
										<span className="text-card-foreground capitalize">
											{user.theme}
										</span>
									</div>
								)}
								{user.language && (
									<div className="flex justify-between">
										<span className="text-muted-foreground">Language:</span>
										<span className="text-card-foreground">
											{user.language}
										</span>
									</div>
								)}
							</div>
						</div>
					</div>
				</Card>
			)}

			{/* User Edit Modal */}
			<UserEditModal
				isOpen={isEditModalOpen}
				onClose={() => setIsEditModalOpen(false)}
				user={user}
				onSave={handleSaveUser}
				isSubmitting={false}
			/>
		</main>
	);
}

export default function UserProfilePage() {
	return (
		<Suspense
			fallback={
				<main className="w-full mx-auto px-4 md:px-10 py-10 space-y-6">
					<div className="text-center py-8">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
						<p className="text-muted-foreground">Loading profile...</p>
					</div>
				</main>
			}
		>
			<UserProfilePageContent />
		</Suspense>
	);
}
