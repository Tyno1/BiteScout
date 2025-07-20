import { Button } from "@/components/atoms";
import { Card } from "@/components/organisms";
import type { DeliveryLink } from "shared/types/api/schemas";
import { ExternalLink, Plus, Trash2, Truck, Sparkles, Info } from "lucide-react";
import { useState } from "react";

type DeliveryLinksProps = {
  isEditing: boolean;
  restaurantId: string;
  links: DeliveryLink[];
  isLoading: boolean;
  onAdd: (data: Partial<DeliveryLink>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

const DELIVERY_PLATFORMS = [
  "Uber Eats",
  "DoorDash",
  "Grubhub",
  "Postmates",
  "Instacart",
  "Amazon Fresh",
  "Walmart Grocery",
  "Shipt",
  "Custom",
  "Other",
];

export function DeliveryLinks({
  isEditing,
  links,
  isLoading,
  onAdd,
  onDelete,
}: DeliveryLinksProps) {
  const [newLink, setNewLink] = useState({
    name: "",
    platform: "" as string,
    url: "",
  });

  const handleAdd = async () => {
    if (!newLink.name || !newLink.url || !newLink.platform) {
      return;
    }

    try {
      await onAdd({
        name: newLink.name,
        url: newLink.url,
        platform: newLink.platform as DeliveryLink["platform"],
        isActive: true,
      });

      setNewLink({ name: "", platform: "" as string, url: "" });
    } catch (error) {
console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await onDelete(id);
    } catch (error) {
console.log(error);
    }
  };

  if (isLoading && links.length === 0) {
    return (
      <div className="bg-white rounded-lg border p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
          <div className="space-y-3">
            <div className="h-12 bg-gray-200 rounded" />
            <div className="h-12 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card
      header={
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold">Delivery Links</h2>
          </div>
          {isEditing && (
            <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 px-3 py-2 rounded-lg">
              <Sparkles className="w-4 h-4" />
              <span>
                <strong>Boost your reach:</strong> Add delivery platform links so customers can order from your restaurant through their favorite apps!
              </span>
            </div>
          )}
        </div>
      }
    >
      {/* Existing Links */}
      {links.length > 0 && (
        <div className="mb-6 space-y-3">
          {links.map((link) => (
            <div
              key={link._id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <div className="font-medium text-sm">{link.name}</div>
                <div className="text-xs text-gray-500">{link.platform}</div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  color="primary"
                  size="sm"
                  text="Visit Link"
                  onClick={() => window.open(link.url, "_blank")}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
                {isEditing && (
                  <Button
                    variant="outline"
                    color="danger"
                    size="sm"
                    text="Delete Link"
                    onClick={() => handleDelete(link._id || "")}
                    disabled={isLoading}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Link */}
      {isEditing && (
        <div className="border-t pt-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg mb-4">
            <Info className="w-4 h-4" />
            <span>Add your restaurant&apos;s delivery platform links. Include the platform name, link name, and URL.</span>
          </div>
          <h3 className="text-md font-medium mb-3">Add New Delivery Link</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <input
              type="text"
              placeholder="Link Name"
              value={newLink.name}
              onChange={(e) =>
                setNewLink((prev) => ({ ...prev, name: e.target.value }))
              }
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              disabled={isLoading}
            />
            <select
              value={newLink.platform}
              onChange={(e) =>
                setNewLink((prev) => ({ ...prev, platform: e.target.value }))
              }
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              disabled={isLoading}
            >
              <option value="">Select Platform</option>
              {DELIVERY_PLATFORMS.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
            <input
              type="url"
              placeholder="https://..."
              value={newLink.url}
              onChange={(e) =>
                setNewLink((prev) => ({ ...prev, url: e.target.value }))
              }
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              disabled={isLoading}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            text="Add Delivery Link"
            onClick={handleAdd}
            className="flex items-center space-x-2"
            disabled={isLoading}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      )}

      {!isEditing && links.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No delivery links added yet.</p>
        </div>
      )}
    </Card>
  );
}
