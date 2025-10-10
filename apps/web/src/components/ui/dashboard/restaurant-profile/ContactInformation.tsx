"use client";
import { Globe, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { useId } from "react";
import type { Restaurant } from "shared/types/api/schemas";
import { Alert, Input } from "@/components/atoms";
import { Card } from "@/components/organisms";

type ContactInformationProps = {
  isEditing: boolean;
  displayData: Restaurant | undefined;
  handleInputChange: (field: keyof Restaurant, value: Restaurant[keyof Restaurant]) => void;
};

export function ContactInformation({
  isEditing,
  displayData,
  handleInputChange,
}: ContactInformationProps) {
  const contactInfoHeadingId = useId();
  return (
    <Card
      component="section"
      padding="lg"
      header={
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            <h2 id={contactInfoHeadingId} className="text-lg font-semibold">
              Contact Information
            </h2>
          </div>
          {isEditing && (
            <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 px-3 py-2 rounded-lg">
              <Sparkles className="w-4 h-4" />
              <span>
                <strong>Help customers reach you:</strong> Provide accurate contact details so
                customers can call, email, or visit your website!
              </span>
            </div>
          )}
        </div>
      }
      aria-labelledby="contact-info-heading"
    >
      {isEditing && (
        <Alert status="warning" className="mb-4">
          Fill in your contact details. The more information you provide, the easier it is for
          customers to reach you.
        </Alert>
      )}
      <div className="space-y-6">
        <Input
          placeholder="Enter your address"
          icon={<MapPin size={18} />}
          outlineType={isEditing ? "round" : "none"}
          type="text"
          name="address"
          label="Address"
          useLabel
          disabled={!isEditing}
          value={displayData?.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
        />

        <div className="grid grid-cols-2 gap-6">
          <Input
            icon={<Phone size={18} />}
            outlineType={isEditing ? "round" : "none"}
            type="tel"
            name="phone-label"
            label="Phone"
            useLabel
            disabled={!isEditing}
            value={displayData?.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />

          <Input
            placeholder="Enter your email"
            icon={<Mail size={18} />}
            outlineType={isEditing ? "round" : "none"}
            type="email"
            name="email-label"
            label="Email"
            useLabel
            disabled={!isEditing}
            value={displayData?.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>

        <Input
          placeholder="Enter your website"
          icon={<Globe size={18} />}
          outlineType={isEditing ? "round" : "none"}
          type="url"
          name="website-label"
          label="Website"
          useLabel
          disabled={!isEditing}
          value={displayData?.website}
          onChange={(e) => handleInputChange("website", e.target.value)}
        />
      </div>
    </Card>
  );
}
