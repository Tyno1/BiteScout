import { Input } from "@/components/atoms";
import { Card } from "@/components/organisms";
import { Restaurant } from "shared/types/api/schemas";
import { Globe, Mail, MapPin, Phone, Sparkles, Info } from "lucide-react";

type ContactInformationProps = {
  isEditing: boolean;
  displayData: Restaurant;
  handleInputChange: (field: keyof Restaurant, value: Restaurant[keyof Restaurant]) => void;
};

export function ContactInformation({
  isEditing,
  displayData,
  handleInputChange,
}: ContactInformationProps) {
  return (
    <Card
      Component="section"
      padding="lg"
      header={
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-gray-600" />
            <h2 id="contact-info-heading" className="text-lg font-semibold">
              Contact Information
            </h2>
          </div>
          {isEditing && (
            <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 px-3 py-2 rounded-lg">
              <Sparkles className="w-4 h-4" />
              <span>
                <strong>Help customers reach you:</strong> Provide accurate contact details so customers can call, email, or visit your website!
              </span>
            </div>
          )}
        </div>
      }
      aria-labelledby="contact-info-heading"
    >
      {isEditing && (
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg mb-4">
          <Info className="w-4 h-4" />
          <span>Fill in your contact details. The more information you provide, the easier it is for customers to reach you.</span>
        </div>
      )}
      <div className="space-y-6">
        <Input
          placeholder="Enter your address"
          icon={<MapPin size={18} className="text-gray-900" />}
          outlineType={isEditing ? "round" : "none"}
          type="text"
          name="address"
          label="Address"
          useLabel
          disabled={!isEditing}
          value={displayData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
        />

        <div className="grid grid-cols-2 gap-6">
          <Input
            icon={<Phone size={18} className="text-gray-900" />}
            outlineType={isEditing ? "round" : "none"}
            type="tel"
            name="phone-label"
            label="Phone"
            useLabel
            disabled={!isEditing}
            value={displayData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />

          <Input
            placeholder="Enter your email"
            icon={<Mail size={18} className="text-gray-900" />}
            outlineType={isEditing ? "round" : "none"}
            type="email"
            name="email-label"
            label="Email"
            useLabel
            disabled={!isEditing}
            value={displayData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>

        <Input
          placeholder="Enter your website"
          icon={<Globe size={18} className="text-gray-900" />}
          outlineType={isEditing ? "round" : "none"}
          type="url"
          name="website-label"
          label="Website"
          useLabel
          disabled={!isEditing}
          value={displayData.website}
          onChange={(e) => handleInputChange("website", e.target.value)}
        />
      </div>
    </Card>
  );
}
