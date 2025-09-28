import type { Session } from "next-auth";
import type React from "react";
import type { Restaurant } from "shared/types/api/schemas";
import { Button, Input } from "@/components/atoms";
import { Card } from "@/components/organisms";

type RoleOnboardingFormProps = {
  session: { data?: Session | null };
  restaurantData: Restaurant;
  isSubmitting: boolean;
  message: string;
  apiError: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRoleSelection: (isOwner: boolean) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isOwner: boolean;
};

export function RoleOnboardingForm({
  session,
  restaurantData,
  isSubmitting,
  message,
  apiError,
  handleInputChange,
  handleRoleSelection,
  handleSubmit,
  isOwner,
}: RoleOnboardingFormProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <Card
          padding="lg"
          shadow="lg"
          header={
            <div className="space-y-2">
              <h1 className="text-3xl text-foreground">
                Welcome{" "}
                <span className="font-bold">{session.data?.user?.name}</span>
              </h1>
              <p className="text-muted-foreground">
                Please tell us about your role and restaurant
              </p>
            </div>
          }
        >
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Select your role:
                </h2>
                <div className="flex flex-col sm:flex-row gap-3 w-full">
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

              {isOwner && (
                <Input
                  label="Restaurant Name"
                  name="name"
                  outlineType="round"
                  useLabel
                  value={restaurantData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your restaurant name"
                  type="text"
                  fullWidth
                  labelStyle="text-lg"
                  inputSize="md"
                  errorMessage={apiError}
                />
              )}

              {message && (
                <div className="space-y-2">
                  <p className="text-sm text-green-500">{message}</p>
                </div>
              )}

              {isOwner ? (
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
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
