"use client";

import { Button } from "@/components/atoms";
import { Badge } from "@/components/atoms/Badge";
import { Card } from "@/components/organisms";
import { useUserById } from "@/hooks";
import {
  ArrowLeft,
  Building,
  Calendar,
  Edit,
  Mail,
  MapPin,
  Phone,
  Shield,
  Trash2,
  User,
} from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function UserManagementPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const restaurantId = searchParams.get("restaurantId");
  const { data, isLoading, error } = useUserById(
    id as string,
    restaurantId || undefined
  );
  const [isEditing, setIsEditing] = useState(false);

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
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">
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
          <div className="text-gray-500 text-6xl mb-4">👤</div>
          <h1 className="text-2xl font-bold text-gray-600 mb-2">
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

  const user = data.user;

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
              onClick={() => setIsEditing(!isEditing)}
              IconBefore={<Edit size={16} />}
              text={isEditing ? "Cancel Edit" : "Edit User"}
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
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user.imageUrl ? (
              <img
                src={user.imageUrl}
                alt={user.name}
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
                variant="solid"
                color={getUserTypeColor(user.userType || "guest")}
              >
                {user.userType || "guest"}
              </Badge>
              {user.role && user.role !== user.userType && (
                <Badge
                  size="xs"
                  variant="glass"
                  color={getUserTypeColor(user.role)}
                >
                  Restaurant: {user.role}
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-muted-foreground" />
                  <span className="text-card-foreground">{user.phone}</span>
                </div>
              )}
              {user.username && (
                <div className="flex items-center gap-3">
                  <User size={16} className="text-muted-foreground" />
                  <span className="text-gray-700">@{user.username}</span>
                </div>
              )}
              {user.currentCity && (
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-muted-foreground" />
                  <span className="text-gray-700">
                    {user.currentCity}, {user.country}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Restaurant Access Information */}
      <Card
        header={
          <div className="flex items-center gap-2">
            <Building size={20} />
            <h3 className="text-lg font-semibold text-card-foreground">
              Restaurant Access Details
            </h3>
          </div>
        }
      >
        <Card className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card containerClassName="bg-background text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {user.restaurantAccess || 0}
            </div>
            <div className="text-sm text-muted-foreground">Total Access</div>
          </Card>

          <Card containerClassName="bg-background text-center">
            <div className="text-2xl font-bold text-success mb-1">
              {user.activeRestaurants || 0}
            </div>
            <div className="text-sm text-muted-foreground">Active Access</div>
          </Card>

          <Card containerClassName="bg-background text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {user.accessId ? "Yes" : "No"}
            </div>
            <div className="text-sm text-muted-foreground">Has Access ID</div>
          </Card>
        </Card>

        {user.status && (
          <Card containerClassName="bg-background">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-card-foreground">
                Access Status:
              </span>
              <Badge
                size="md"
                variant="solid"
                color={getStatusColor(user.status)}
              >
                {user.status}
              </Badge>
            </div>
          </Card>
        )}
      </Card>

      {/* Additional Details */}
      <Card className="mb-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
          <Shield size={20} />
          Additional Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-card-foreground mb-2">Account Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Verified:</span>
                <span
                  className={
                    user.isVerified ? "text-success" : "text-danger"
                  }
                >
                  {user.isVerified ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created:</span>
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
              {user.address && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Address:</span>
                  <span className="text-card-foreground">{user.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <Card>
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="solid"
            color="primary"
            size="sm"
            IconBefore={<Edit size={16} />}
            text="Edit User Profile"
          />
          <Button
            variant="outline"
            color="secondary"
            size="sm"
            text="Change Role"
          />
          <Button
            variant="outline"
            color="secondary"
            size="sm"
            text="Suspend Access"
          />
          <Button
            variant="outline"
            color="danger"
            size="sm"
            IconBefore={<Trash2 size={16} />}
            text="Delete User"
          />
        </div>
      </Card>
    </main>
  );
}
