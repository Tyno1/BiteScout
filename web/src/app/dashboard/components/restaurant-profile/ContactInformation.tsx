import { Globe, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

export default function ContactInformation({
  isEditing,
  displayData,
  handleInputChange,
}: any) {
  return (
    <section
      className="bg-white rounded-lg shadow-sm border p-6"
      aria-labelledby="contact-info-heading"
    >
      <div className="mb-4">
        <h2 id="contact-info-heading" className="text-lg font-semibold">
          Contact Information
        </h2>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <label id="address-label" className="text-sm font-medium">
            Address
          </label>
          <div className="relative">
            <MapPin
              className="absolute left-3 top-3 h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="text"
              className="w-full rounded-md border pl-10 pr-3 py-2 disabled:bg-gray-100"
              value={displayData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              disabled={!isEditing}
              aria-labelledby="address-label"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label id="phone-label" className="text-sm font-medium">
              Phone
            </label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
              <input
                type="tel"
                className="w-full rounded-md border pl-10 pr-3 py-2 disabled:bg-gray-100"
                value={displayData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                disabled={!isEditing}
                aria-labelledby="phone-label"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label id="email-label" className="text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
              <input
                type="email"
                className="w-full rounded-md border pl-10 pr-3 py-2 disabled:bg-gray-100"
                value={displayData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={!isEditing}
                aria-labelledby="email-label"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label id="website-label" className="text-sm font-medium">
            Website
          </label>
          <div className="relative">
            <Globe
              className="absolute left-3 top-3 h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="url"
              className="w-full rounded-md border pl-10 pr-3 py-2 disabled:bg-gray-100"
              value={displayData.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              disabled={!isEditing}
              aria-labelledby="website-label"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
