"use client";

import { Button, Input, Spinner, Textarea } from "@/components/atoms";
import { type TabItem, Tabs } from "@/components/molecules/Tabs/Tabs";
import { Modal } from "@/components/organisms/Modal";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { CreateMediaResponse, User } from "shared/types";

import { deleteMedia } from "@/api/media/mutations";
import { useDeleteUser, useUpdateUser } from "@/hooks";
import { MediaFolder, MediaUpload } from "../../media";

interface UserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: Pick<
    User,
    | "_id"
    | "name"
    | "email"
    | "username"
    | "phone"
    | "bio"
    | "address"
    | "hometown"
    | "currentCity"
    | "country"
    | "userType"
    | "dietaryPreferences"
    | "imageUrl"
  >;
  onSave: (userData: Partial<User>) => Promise<void>;
  isSubmitting?: boolean;
}

export function UserEditModal({
  isOpen,
  onClose,
  user,
  onSave,
  isSubmitting = false,
}: UserEditModalProps) {
  const [formData, setFormData] = useState<Partial<User>>({
    name: user.name || "",
    email: user.email || "",
    username: user.username || "",
    phone: user.phone || "",
    bio: user.bio || "",
    address: user.address || "",
    hometown: user.hometown || "",
    currentCity: user.currentCity || "",
    country: user.country || "",
    userType: user.userType || "guest",
    dietaryPreferences: user.dietaryPreferences || [],
    imageUrl: user.imageUrl || "",
  });

  const [newDietaryPreference, setNewDietaryPreference] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  // Profile image state
  const [profileImage, setProfileImage] = useState<CreateMediaResponse | null>(
    user.imageUrl
      ? {
          _id: user._id || "",
          url: user.imageUrl,
          type: "image" as const,
          title: "Profile Image",
          description: "User profile image",
          uploadedBy: { id: "", name: "", username: "", imageUrl: "" },
          associatedWith: { type: "user", id: user._id || "" },
          verified: false,
          fileSize: 0,
          mimeType: "image/jpeg",
          dimensions: { width: 100, height: 100 },
          providerId: "",
          mediaServiceId: "",
          provider: "cloudinary" as const,
          variants: [],
          tags: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      : null
  );

  const { mutate: deleteUser, isPending: isDeleting, isSuccess: isDeleted } = useDeleteUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

  useEffect(() => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      username: user.username || "",
      phone: user.phone || "",
      bio: user.bio || "",
      address: user.address || "",
      hometown: user.hometown || "",
      currentCity: user.currentCity || "",
      country: user.country || "",
      userType: user.userType || "guest",
      dietaryPreferences: user.dietaryPreferences || [],
      imageUrl: user.imageUrl || "",
    });

    // Update profile image state when user changes
    if (user.imageUrl) {
      setProfileImage({
        _id: user._id || "",
        url: user.imageUrl,
        type: "image" as const,
        title: "Profile Image",
        description: "User profile image",
        uploadedBy: { id: "", name: "", username: "", imageUrl: "" },
        associatedWith: { type: "user", id: user._id || "" },
        verified: false,
        fileSize: 0,
        mimeType: "image/jpeg",
        dimensions: { width: 100, height: 100 },
        providerId: "",
        mediaServiceId: "",
        provider: "cloudinary" as const,
        variants: [],
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } else {
      setProfileImage(null);
    }
  }, [user]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  const handleDietaryPreferenceAdd = useCallback(() => {
    if (
      newDietaryPreference.trim() &&
      !formData.dietaryPreferences?.includes(newDietaryPreference.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        dietaryPreferences: [...(prev.dietaryPreferences || []), newDietaryPreference.trim()],
      }));
      setNewDietaryPreference("");
    }
  }, [newDietaryPreference, formData.dietaryPreferences]);

  const handleDietaryPreferenceRemove = useCallback((preference: string) => {
    setFormData((prev) => ({
      ...prev,
      dietaryPreferences: prev.dietaryPreferences?.filter((p) => p !== preference) || [],
    }));
  }, []);

  const [isRemovingImage, setIsRemovingImage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleRemoveProfileImage = useCallback(async () => {
    if (profileImage?._id && profileImage._id !== user._id) {
      setIsRemovingImage(true);
      try {
        // Delete the media from the backend
        await deleteMedia(profileImage._id);
        console.log("Profile image deleted successfully");
      } catch (error) {
        console.error("Failed to delete profile image:", error);
        // Still remove from UI even if backend deletion fails
      } finally {
        setIsRemovingImage(false);
      }
    }

    // Update local state
    setProfileImage(null);
    setFormData((prev) => ({
      ...prev,
      imageUrl: "",
    }));
  }, [profileImage?._id, user._id]);

  const handleSave = useCallback(() => {
    if (user._id) {
      updateUser(
        {
          userId: user._id,
          data: formData,
        },
        {
          onSuccess: () => {
            // Show success message briefly, then close modal
            setShowSuccessMessage(true);
            setTimeout(() => {
              setShowSuccessMessage(false);
              onClose();
            }, 1500); // Show for 1.5 seconds
          },
          onError: (error) => {
            console.error("Failed to update user:", error);
            // You could add error handling here (e.g., show error toast)
          },
        }
      );
    }
  }, [updateUser, user._id, formData, onClose]);

  const handlesDelete = useCallback(() => {
    if (user._id) {
      deleteUser(user._id);
      onClose();
    }
  }, [deleteUser, user._id, onClose]);

  // Tab content components - memoized to prevent re-creation
  const ProfileTab = useCallback(
    () => (
      <div className="space-y-6">
        {/* Basic Information */}
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Basic Information</h3>
          <div className="flex items-center justify-start gap-4 mb-4">
            <div>
              {user?.imageUrl ? (
                <Image
                  src={user?.imageUrl || ""}
                  alt="User Image"
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-[100px] h-[100px] bg-gray-200 rounded-full flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-gray-500" />
                </div>
              )}
            </div>
            <div>
              <Button
                variant="outline"
                size="xs"
                text="Change Image"
                onClick={() => setActiveTab("media")}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="name"
              type="text"
              label="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter full name"
              required
            />
            <Input
              name="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email address"
              required
            />
            <Input
              name="username"
              type="text"
              label="Username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter username"
            />
            <Input
              name="phone"
              type="tel"
              label="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Bio</h3>
          <Textarea
            name="bio"
            label="Bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Tell us about yourself..."
            rows={3}
          />
        </div>

        {/* Location Information */}
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Location Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="address"
              type="text"
              label="Address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter address"
            />
            <Input
              name="hometown"
              type="text"
              label="Hometown"
              value={formData.hometown}
              onChange={handleInputChange}
              placeholder="Enter hometown"
            />
            <Input
              name="currentCity"
              type="text"
              label="Current City"
              value={formData.currentCity}
              onChange={handleInputChange}
              placeholder="Enter current city"
            />
            <Input
              name="country"
              type="text"
              label="Country"
              value={formData.country}
              onChange={handleInputChange}
              placeholder="Enter country"
            />
          </div>
        </div>

        {/* Dietary Preferences */}
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Dietary Preferences</h3>
          <div className="space-y-3">
            <div className="flex gap-2 items-center">
              <Input
                type="text"
                name="newDietaryPreference"
                label="Add Preference"
                value={newDietaryPreference}
                onChange={(e) => setNewDietaryPreference(e.target.value)}
                placeholder="Enter dietary preference"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleDietaryPreferenceAdd();
                  }
                }}
              />
              <Button variant="outline" size="sm" onClick={handleDietaryPreferenceAdd} text="Add" />
            </div>

            {formData.dietaryPreferences && formData.dietaryPreferences.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.dietaryPreferences.map((preference) => (
                  <button
                    key={preference}
                    type="button"
                    className="inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200 px-2 py-0.5 text-xs bg-secondary/10 backdrop-blur-sm border border-secondary/20 text-secondary cursor-pointer hover:bg-destructive/20"
                    onClick={() => handleDietaryPreferenceRemove(preference)}
                  >
                    {preference} ×
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    [
      formData,
      user,
      newDietaryPreference,
      handleDietaryPreferenceAdd,
      handleDietaryPreferenceRemove,
      handleInputChange,
    ]
  );

  const MediaTab = useCallback(
    () => (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Profile Image</h3>
          <div className="flex items-center justify-start gap-4 mb-4">
            <div className="relative">
              {profileImage?.url ? (
                <Image
                  src={profileImage.url}
                  alt="User Image"
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-[100px] h-[100px] bg-gray-200 rounded-full flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-gray-500" />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-muted-foreground">
                {profileImage?.url ? "Current profile image" : "No profile image set"}
              </div>
              {profileImage?.url && (
                <Button
                  variant="outline"
                  size="xs"
                  text={isRemovingImage ? "Removing..." : "Remove Image"}
                  onClick={handleRemoveProfileImage}
                  disabled={isRemovingImage}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                />
              )}
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50">
            <MediaUpload
              uploadMode="auto"
              uploadedFiles={profileImage ? [profileImage] : []}
              onUploadSuccess={(result: CreateMediaResponse | CreateMediaResponse[]) => {
                console.log("Profile image upload success:", result);
                if (Array.isArray(result)) return;

                // Update both the profile image state and form data
                const imageUrl = result.url;
                if (imageUrl) {
                  console.log("Setting new profile image:", imageUrl);
                  setProfileImage(result);
                  setFormData((prev) => ({
                    ...prev,
                    imageUrl: imageUrl,
                  }));
                }
              }}
              onUploadError={(error: string) => {
                console.error("Profile image upload error:", error);
              }}
              onRemoveUploadedFile={handleRemoveProfileImage}
              associatedWith={{
                type: "user",
                id: user._id || "",
              }}
              folder={MediaFolder.USER_PROFILE}
              multiple={false}
              singleUpload={true}
            />

            {/* Upload Status Messages */}
            {isUpdating && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Spinner />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-800">Updating profile...</p>
                  </div>
                </div>
              </div>
            )}

            {showSuccessMessage && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-800">Profile updated successfully!</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    [user, isUpdating, profileImage, handleRemoveProfileImage, isRemovingImage, showSuccessMessage]
  );

  // Define tabs
  const tabs: TabItem[] = [
    {
      key: "profile",
      label: "Profile",
      content: ProfileTab(),
    },
    {
      key: "media",
      label: "Media",
      content: MediaTab(),
    },
  ];

  return (
    <Modal
      isModalOpen={isOpen}
      setIsModalOpen={() => onClose()}
      closeModal={onClose}
      modalTitle="Edit User Profile"
      modalDescription="Update user information and preferences"
      modalActionText="Save Changes"
      modalActionOnClick={handleSave}
      isSubmitting={isSubmitting}
      size="lg"
    >
      <div className="space-y-6">
        {/* Tabs */}
        <Tabs tabs={tabs} selectedTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </Modal>
  );
}
