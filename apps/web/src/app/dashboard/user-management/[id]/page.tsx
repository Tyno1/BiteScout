"use client";

import { Button } from "@/components/atoms";
import { Badge } from "@/components/atoms/Badge";
import { Card } from "@/components/organisms";
import { UserEditModal } from "@/components/ui/dashboard/user-management/UserEditModal";
import { useUserById } from "@/hooks";
import {
  ArrowLeft,
  Building,
  Edit,
  Mail,
  MapPin,
  Phone,
  Shield,
  Trash2,
  User,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { GetUserByIdResponse } from "shared/types";

// Extend the existing User type from the API response
type ExtendedUser = NonNullable<GetUserByIdResponse["user"]> & {
  // Additional fields that the backend controller adds
  lastLoginAt?: string;
  approvedAt?: string;
  accessExpiresAt?: string;
  maxRestaurants?: number;
  accessLevel?: string;
  // User profile fields
  bio?: string;
  dietaryPreferences?: string[];
  address?: string;
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

export default function UserManagementPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const restaurantId = searchParams.get("restaurantId");
  const { data, isLoading, error } = useUserById(
    id as string,
    restaurantId || undefined
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);






  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-foreground">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-muted-foreground text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Error Loading User
          </h1>
          <p className="text-muted-foreground mb-4">{error.message}</p>
          <Button
            variant="outline"
            onClick={() => router.back()}
            IconBefore={<ArrowLeft size={16} />}
            text="Go Back"
          />
        </div>
      </div>
    );
  }

  if (!data?.user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-muted-foreground text-6xl mb-4">👤</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            User Not Found
          </h1>
          <p className="text-muted-foreground mb-4">
            The requested user could not be found.
          </p>
          <Button
            variant="outline"
            onClick={() => router.back()}
            IconBefore={<ArrowLeft size={16} />}
            text="Go Back"
          />
        </div>
      </div>
    );
  }

  const user = data.user as ExtendedUser;

  const handleSaveUser = async (userData: Partial<ExtendedUser>) => {
    try {
      // TODO: Implement API call to update user
      console.log("Saving user data:", userData);

      // You can add toast notification here
    } catch (error) {
      console.error("Error saving user:", error);
      // You can add error handling here
    }
  };

  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case "root":
        return "danger";
      case "admin":
        return "danger";
      case "moderator":
        return "secondary";
      case "user":
        return "primary";
      case "guest":
        return "neutral";
      default:
        return "neutral";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "success";
      case "pending":
        return "secondary";
      case "suspended":
        return "danger";
      case "innactive":
        return "neutral";
      default:
        return "neutral";
    }
  };

  return (
    <main className="w-full mx-auto px-4 md:px-10 py-10 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          IconBefore={<ArrowLeft size={16} />}
          text="Back to Users"
          className="mb-4"
        />
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              User Details
            </h1>
            <p className="text-muted-foreground">
              Manage user details and restaurant access
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditModalOpen(true)}
              IconBefore={<Edit size={16} />}
              text="Edit User"
            />
            <Button
              variant="outline"
              color="danger"
              size="sm"
              IconBefore={<Trash2 size={16} />}
              text="Delete User"
            />
          </div>
        </div>
      </div>

      {/* User Profile Card */}
      <Card>
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 bg-foreground rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
            {user.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt={user.name}
                width={96}
                height={96}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              user.name?.charAt(0)?.toUpperCase() || "U"
            )}
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-bold text-card-foreground">
                {user.name}
              </h2>
              <Badge
                size="xs"
                variant="outline"
                color={getUserTypeColor(user.userType || "guest")}
              >
                {user.userType || "guest"}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">{user.email}</span>
              </div>
            
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-muted-foreground" />
                  <span className="text-card-foreground">{user?.phone || "Not set"}</span>
                </div>
        
                <div className="flex items-center gap-3">
                  <User size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">@{user?.username || "Not set"}</span>
                </div>
              
              
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">{user?.address || "Not set"}</span>
                </div>
              
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {user?.currentCity || "Not set"}, {user?.country || "Not set"}
                  </span>
                </div>
            
            </div>
            
            {/* Bio */}

              <div className="mt-4 p-3 bg-muted/30 rounded-lg">
              <span className="text-sm text-muted-foreground">Bio:</span>
                <p className="text-sm text-muted-foreground">{user?.bio || "Not set"}</p>
              </div>

            
            {/* Dietary Preferences */}
            {user?.dietaryPreferences && user?.dietaryPreferences.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-card-foreground mb-2">Dietary Preferences</h4>
                <div className="flex flex-wrap gap-2">
                  {user?.dietaryPreferences?.map((preference) => (
                    <Badge key={preference} size="xs" variant="glass" color="secondary">
                      {preference}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

        {/* Restaurant Access Information */}
        <Card className="mb-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <Building size={20} className="text-muted-foreground" />
            Restaurant Access Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-card-foreground mb-2">Access Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge
                    size="xs"
                    variant="outline"
                    color={getStatusColor(user.status || 'pending')}
                  >
                    {user.status || 'pending'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Access ID:</span>
                  <span className="text-card-foreground font-mono text-xs">{user.accessId || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Restaurant Access:</span>
                  <span className="text-card-foreground">{user.restaurantAccess || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Restaurants:</span>
                  <span className="text-card-foreground">{user.activeRestaurants || 0}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-card-foreground mb-2">Access Timestamps</h4>
              <div className="space-y-2 text-sm">
                {/* Show approval date if status is approved */}
                {user.status === "approved" && user.approvedAt && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Approved On:</span>
                    <span className="text-card-foreground">
                      {new Date(user.approvedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {user.accessExpiresAt && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Access Expires:</span>
                    <span className="text-card-foreground">
                      {new Date(user.accessExpiresAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

      {/* Account Settings */}
      <Card className="mb-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
          <Shield size={20} className="text-muted-foreground" />
          Account Settings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-card-foreground mb-2">Account Status</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Verification Status:</span>
                <span className={`${user.isVerified ? 'text-success' : 'text-muted-foreground'}`}>
                  {user.isVerified ? 'Verified' : 'Not Verified'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Account Type:</span>
                <span className="text-card-foreground capitalize">{user.userType || 'Not set'}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-card-foreground mb-2">Account Timestamps</h4>
            <div className="space-y-2 text-sm">
              {user.createdAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account Created:</span>
                  <span className="text-card-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              )}
              {user.updatedAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span className="text-card-foreground">
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Location Information */}
      {(user.hometown || user.currentCity || user.country) && (
        <Card className="mb-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <MapPin size={20} className="text-muted-foreground" />
            Location Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-card-foreground mb-2">Location Details</h4>
              <div className="space-y-2 text-sm">
                {user.hometown && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hometown:</span>
                    <span className="text-card-foreground">{user.hometown}</span>
                  </div>
                )}
                {user.currentCity && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current City:</span>
                    <span className="text-card-foreground">{user.currentCity}</span>
                  </div>
                )}
                {user.country && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Country:</span>
                    <span className="text-card-foreground">{user.country}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Account Activity & Security */}
      {(user.lastLoginAt || user.twoFactorEnabled !== undefined || user.isLocked !== undefined) && (
        <Card className="mb-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <Shield size={20} className="text-muted-foreground" />
            Account Activity & Security
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-card-foreground mb-2">Activity</h4>
              <div className="space-y-2 text-sm">
                {user.lastLoginAt && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Login:</span>
                    <span className="text-card-foreground">
                      {new Date(user.lastLoginAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {user.lastActivity && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Activity:</span>
                    <span className="text-card-foreground">
                      {new Date(user.lastActivity).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {user.timezone && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timezone:</span>
                    <span className="text-card-foreground">{user.timezone}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-card-foreground mb-2">Security</h4>
              <div className="space-y-2 text-sm">
                {user.twoFactorEnabled !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Two-Factor Auth:</span>
                    <span className={`${user.twoFactorEnabled ? 'text-success' : 'text-muted-foreground'}`}>
                      {user.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                )}
                {user.isLocked !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account Locked:</span>
                    <span className={`${user.isLocked ? 'text-destructive' : 'text-success'}`}>
                      {user.isLocked ? 'Yes' : 'No'}
                    </span>
                  </div>
                )}
                {user.failedLoginAttempts !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Failed Logins:</span>
                    <span className="text-card-foreground">{user.failedLoginAttempts}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Restaurant Permissions & Access */}
      {user.permissions && (
        <Card className="mb-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <Building size={20} className="text-muted-foreground" />
            Permissions & Access
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-card-foreground mb-2">Platform Permissions</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Admin Panel Access:</span>
                  <span className={`${user.permissions.canAccessAdminPanel ? 'text-success' : 'text-muted-foreground'}`}>
                    {user.permissions.canAccessAdminPanel ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Can Create Restaurants:</span>
                  <span className={`${user.permissions.canCreateRestaurants ? 'text-success' : 'text-muted-foreground'}`}>
                    {user.permissions.canCreateRestaurants ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Can Manage All Users:</span>
                  <span className={`${user.permissions.canManageAllUsers ? 'text-success' : 'text-muted-foreground'}`}>
                    {user.permissions.canManageAllUsers ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Platform Analytics:</span>
                  <span className={`${user.permissions.canViewPlatformAnalytics ? 'text-success' : 'text-muted-foreground'}`}>
                    {user.permissions.canViewPlatformAnalytics ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-card-foreground mb-2">Restaurant Permissions</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Can Edit Restaurant:</span>
                  <span className={`${user.permissions.canEditRestaurant ? 'text-success' : 'text-muted-foreground'}`}>
                    {user.permissions.canEditRestaurant ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Can Manage Users:</span>
                  <span className={`${user.permissions.canManageUsers ? 'text-success' : 'text-muted-foreground'}`}>
                    {user.permissions.canManageUsers ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Can View Analytics:</span>
                  <span className={`${user.permissions.canViewAnalytics ? 'text-success' : 'text-muted-foreground'}`}>
                    {user.permissions.canViewAnalytics ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Can Edit Menu:</span>
                  <span className={`${user.permissions.canEditMenu ? 'text-success' : 'text-muted-foreground'}`}>
                    {user.permissions.canEditMenu ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Can Delete Content:</span>
                  <span className={`${user.permissions.canDeleteContent ? 'text-success' : 'text-muted-foreground'}`}>
                    {user.permissions.canDeleteContent ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* User Preferences */}
      {(user.theme || user.language) && (
        <Card className="mb-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <User size={20} className="text-muted-foreground" />
            User Preferences
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-card-foreground mb-2">System Preferences</h4>
              <div className="space-y-2 text-sm">
                {user.theme && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Theme:</span>
                    <span className="text-card-foreground capitalize">{user.theme}</span>
                  </div>
                )}
                {user.language && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Language:</span>
                    <span className="text-card-foreground">{user.language}</span>
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
