"use client";

import { Button, Input } from "@/components/atoms";
import type { Restaurant } from "shared/types/api/schemas";
import type { Session } from "next-auth";
import type React from "react";

export type FormErrorState = {
  name: string;
  restaurantCount: string;
  submission: string;
};

type RoleOnboardingFormProps = {
  session: { data?: Session | null };
  restaurantData: Restaurant;
  isSubmitting: boolean;
  message: string;
  apiError: string;
  formError: FormErrorState;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRoleSelection: (isOwner: boolean) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export function RoleOnboardingForm({
  session,
  restaurantData,
  isSubmitting,
  message,
  apiError,
  formError,
  handleInputChange,
  handleRoleSelection,
  handleSubmit,
}: RoleOnboardingFormProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
        >
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl text-black">
                Welcome{" "}
                <span className="font-bold">{session.data?.user?.name}</span>
              </h1>
              <p className="text-gray-900">
                Please tell us about your role and restaurant
              </p>
            </div>

            {/* Role Selection */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Select your role:
              </h2>
              <div className="flex gap-3 w-full">
                <Button
                  variant="outline"
                  text="Restaurant Owner"
                  onClick={() => handleRoleSelection(true)}
                  fullWidth
                />
                <Button
                  variant="outline"
                  text="Employee"
                  onClick={() => handleRoleSelection(false)}
                  fullWidth
                />
              </div>
            </div>

            {/* Restaurant Name Input */}
            {restaurantData.owner && (
              <Input
                label="Restaurant Name"
                name="name"
                outlineType="round"
                useLabel
                value={restaurantData.name}
                onChange={handleInputChange}
                id="restaurant-name"
                placeholder="Enter your restaurant name"
                type="text"
                fullWidth
                labelStyle="text-lg"
                inputSize="md"
                errorMessage={formError.name}
              />
            )}

            {message && (
              <div className="space-y-2">
                <p className="text-sm text-green-500">{message}</p>
              </div>
            )}

            {/* Submit Button */}
            {restaurantData.owner ? (
              <Button
                variant="solid"
                type="submit"
                disabled={!restaurantData.name || isSubmitting}
                text={
                  isSubmitting
                    ? "Creating your restaurant"
                    : "Create Restaurant Profile"
                }
                fullWidth
              />
            ) : (
              <Button
                variant="solid"
                type="submit"
                disabled={isSubmitting}
                text={isSubmitting ? "Processing..." : "Find Your Restaurant"}
                fullWidth
              />
            )}

            {/* Error Messages */}
            {apiError && (
              <div className="space-y-2">
                <p className="text-sm text-red-500">{apiError}</p>
              </div>
            )}

            {(formError.submission || formError.restaurantCount) && (
              <div className="space-y-2">
                <p className="text-sm text-red-500">
                  {formError.submission || formError.restaurantCount}
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
