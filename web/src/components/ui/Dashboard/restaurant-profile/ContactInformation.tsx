import { Input } from "@/components/atoms";
import { Globe, Mail, MapPin, Phone } from "lucide-react";

export function ContactInformation({
  isEditing,
  displayData,
  handleInputChange,
}: any) {
  return (
    <section
      className="bg-white rounded-lg border-1 border-gray-100 p-6"
      aria-labelledby="contact-info-heading"
    >
      <div className="mb-4">
        <h2 id="contact-info-heading" className="text-lg font-semibold">
          Contact Information
        </h2>
      </div>
      <div className="space-y-6">
        <Input
          icon={<MapPin size={18} className="text-gray-900" />}
          outlineType={isEditing && "round"}
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
            outlineType={isEditing && "round"}
            type="tel"
            name="phone-label"
            label="Phone"
            useLabel
            disabled={!isEditing}
            value={displayData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />

          <Input
            icon={<Mail size={18} className="text-gray-900" />}
            outlineType={isEditing && "round"}
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
          icon={<Globe size={18} className="text-gray-900" />}
          outlineType={isEditing && "round"}
          type="url"
          name="website-label"
          label="Website"
          useLabel
          disabled={!isEditing}
          value={displayData.website}
          onChange={(e) => handleInputChange("website", e.target.value)}
        />
      </div>
    </section>
  );
}
