"use client";

import { Badge, Button, Input, Select, Textarea } from "@/components/atoms";
import { Modal } from "@/components/organisms/Modal";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { User } from "shared/types";
import type { AccessRoleEnumValues } from "shared/types/api/schemas";
import { MediaFolder, MediaUpload } from "../../media";

interface UserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: Pick<
    User,
	"_id"
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
  onChange: (userData: Partial<User>) => void;
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
  const [showImageUpload, setShowImageUpload] = useState(false);

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
  }, [user]);

  const handleImageUpload = () => {
    setShowImageUpload(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDietaryPreferenceAdd = () => {
    if (
      newDietaryPreference.trim() &&
      !formData.dietaryPreferences?.includes(newDietaryPreference.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        dietaryPreferences: [
          ...(prev.dietaryPreferences || []),
          newDietaryPreference.trim(),
        ],
      }));
      setNewDietaryPreference("");
    }
  };

  const handleDietaryPreferenceRemove = (preference: string) => {
    setFormData((prev) => ({
      ...prev,
      dietaryPreferences:
        prev.dietaryPreferences?.filter((p) => p !== preference) || [],
    }));
  };

  const handleSave = async () => {
    await onSave(formData);
    onClose();
  };

  const userTypeOptions: {
    value: (typeof AccessRoleEnumValues)[keyof typeof AccessRoleEnumValues];
    label: string;
  }[] = [
    { value: "guest", label: "Guest" },
    { value: "user", label: "User" },
    { value: "moderator", label: "Moderator" },
    { value: "admin", label: "Admin" },
    { value: "root", label: "Root" },
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
        {/* Basic Information */}
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            Basic Information
          </h3>
          <div className="flex items-center justify-start gap-4 mb-4">
            <div>
              {user?.imageUrl ? (
                <Image
                  src={user?.imageUrl || ""}
                  alt="User Image"
                  width={100}
                  height={100}
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
                text="Upload Image"
                onClick={() => handleImageUpload()}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="name"
              type="text"
              label="Full Name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter full name"
              required
            />
            <Input
              name="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={(value) => handleInputChange("email", value)}
              placeholder="Enter email address"
              required
            />
            <Input
              name="username"
              type="text"
              label="Username"
              value={formData.username}
              onChange={(value) => handleInputChange("username", value)}
              placeholder="Enter username"
            />
            <Input
              name="phone"
              type="tel"
              label="Phone"
              value={formData.phone}
              onChange={(value) => handleInputChange("phone", value)}
              placeholder="Enter phone number"
            />
          </div>
        </div>

        {/* User Type */}
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            User Type
          </h3>
          <Select
            label="User Type"
            value={formData.userType}
            onValueChange={(value) => handleInputChange("userType", value)}
            options={userTypeOptions}
            placeholder="Select user type"
          />
        </div>

        {/* Bio */}
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            Bio
          </h3>
          <Textarea
            name="bio"
            label="Bio"
            value={formData.bio}
            onChange={(value) => handleInputChange("bio", value)}
            placeholder="Tell us about yourself..."
            rows={3}
          />
        </div>

        {/* Location Information */}
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            Location Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="address"
              type="text"
              label="Address"
              value={formData.address}
              onChange={(value) => handleInputChange("address", value)}
              placeholder="Enter address"
            />
            <Input
              name="hometown"
              type="text"
              label="Hometown"
              value={formData.hometown}
              onChange={(value) => handleInputChange("hometown", value)}
              placeholder="Enter hometown"
            />
            <Input
              name="currentCity"
              type="text"
              label="Current City"
              value={formData.currentCity}
              onChange={(value) => handleInputChange("currentCity", value)}
              placeholder="Enter current city"
            />
            <Input
              name="country"
              type="text"
              label="Country"
              value={formData.country}
              onChange={(value) => handleInputChange("country", value)}
              placeholder="Enter country"
            />
          </div>
        </div>

        {/* Dietary Preferences */}
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            Dietary Preferences
          </h3>
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
              <Button
                variant="outline"
                size="sm"
                onClick={handleDietaryPreferenceAdd}
                text="Add"
              />
            </div>

            {formData.dietaryPreferences.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.dietaryPreferences.map((preference) => (
                  <Badge
                    key={preference}
                    size="xs"
                    variant="glass"
                    color="secondary"
                    className="cursor-pointer hover:bg-destructive/20"
                    onClick={() => handleDietaryPreferenceRemove(preference)}
                  >
                    {preference} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>
          {showImageUpload && (
            <div className="border rounded-lg p-4 bg-gray-50 mb-4">
              <MediaUpload
                onUploadSuccess={(result: any) => {
                  // Update the form data with the new image URL
                  if (result && result.media && result.media.url) {
                    setFormData(prev => ({
                      ...prev,
                      imageUrl: result.media.url
                    }));
                  }
                  setShowImageUpload(false);
                }}
                onUploadError={(error: string) => {
                  console.error("Upload error:", error);
                  setShowImageUpload(false);
                }}
                associatedWith={{
                  type: "user",
                  id: user._id || "",
                }}
                folder={MediaFolder.USER_PROFILE}
                multiple={false}
                uploadMode="auto"
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
