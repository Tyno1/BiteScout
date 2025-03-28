import { Globe, Mail, MapPin, Phone } from "lucide-react";
 
export default function ContactInformation({
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
        <div className="space-y-2">
          <label id="address-label" className="text-sm font-medium text-black">
            Address
          </label>
          <div className="relative">
            <MapPin
              className="absolute left-3 top-3 h-4 w-4 text-gray-900"
              aria-hidden="true"
            />
            <input
              type="text"
              className="w-full rounded-md border border-1 pl-10 pr-3 py-2 text-gray-300 disabled:bg-gray-100/40"
              value={displayData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              disabled={!isEditing}
              aria-labelledby="address-label"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label id="phone-label" className="text-sm font-medium text-black">
              Phone
            </label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-3 h-4 w-4 text-gray-900"
                aria-hidden="true"
              />
              <input
                type="tel"
                className="w-full rounded-md border border-1 pl-10 pr-3 py-2 text-gray-300 disabled:bg-gray-100/40"
                value={displayData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                disabled={!isEditing}
                aria-labelledby="phone-label"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label id="email-label" className="text-sm font-medium text-black">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-3 h-4 w-4 text-gray-900"
                aria-hidden="true"
              />
              <input
                type="email"
                className="w-full rounded-md border border-1 pl-10 pr-3 py-2 text-gray-300 disabled:bg-gray-100/40"
                value={displayData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={!isEditing}
                aria-labelledby="email-label"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label id="website-label" className="text-sm font-medium text-black">
            Website
          </label>
          <div className="relative">
            <Globe
              className="absolute left-3 top-3 h-4 w-4 text-gray-900"
              aria-hidden="true"
            />
            <input
              type="url"
              className="w-full rounded-md border border-1 pl-10 pr-3 py-2 text-gray-300 disabled:bg-gray-100/40"
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
