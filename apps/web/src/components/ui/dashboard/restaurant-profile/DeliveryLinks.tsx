import { Alert, Button, Input, Select } from "@/components/atoms";
import { Card } from "@/components/organisms";
import {
  ExternalLink,
  Plus,
  Trash2,
  Truck,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { DeliveryLink } from "shared/types/api/schemas";

type DeliveryLinksProps = {
  isEditing: boolean;
  restaurantId: string;
  links: DeliveryLink[];
  isLoading: boolean;
  onAdd: (data: Partial<DeliveryLink>) => void;
  onDelete: (id: string) => void;
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
    platform: "", // No default needed - Select component handles this
    url: "",
  });

  // Memoize the options to prevent recreation on every render
  const platformOptions = useMemo(() => 
    DELIVERY_PLATFORMS.map((platform: string) => ({
      label: platform,
      value: platform,
    })), []
  );

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newLink.name || !newLink.url || !newLink.platform) {
      return;
    }
    onAdd({
      name: newLink.name,
      url: newLink.url,
      platform: newLink.platform as DeliveryLink["platform"],
      isActive: true,
    });

    setNewLink({ name: "", platform: "" as string, url: "" });
  };

  const handleDelete = async (id: string) => {
    onDelete(id);
  };

  if (isLoading && links.length === 0) {
    return (
      <div className="bg-card rounded-lg border p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-card rounded w-1/3 mb-4" />
          <div className="space-y-3">
            <div className="h-12 bg-card rounded" />
            <div className="h-12 bg-card rounded" />
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
            <Truck className="w-5 h-5 text-secondary" />
            <h2 className="text-lg font-semibold">Delivery Links</h2>
          </div>
          {isEditing && (
            <Alert status="information">
              Boost your reach: Add delivery platform links so customers can
              order from your restaurant through their favorite apps!
            </Alert>
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
              className="flex items-center justify-between p-3 bg-background rounded-lg"
            >
              <div className="flex flex-col items-start gap-2">
                <div className="font-medium text-sm">{link.name}</div>
                <div className="text-xs text-secondary">{link.platform}</div>
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
        <form onSubmit={handleAdd}>
        <div className="border-t pt-4 space-y-4">
          <Alert status="information">
            Add your restaurant&apos;s delivery platform links. Include the
            platform name, link name, and URL.
          </Alert>

          <h3 className="text-md font-medium mb-3">Add New Delivery Link</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <Input
              label="Link Name"
              name="link-name"
              type="text"
              placeholder="Link Name"
              value={newLink.name}
              onChange={(e) =>
                setNewLink((prev) => ({ ...prev, name: e.target.value }))
              }
              disabled={isLoading}
            />
            <Select
              label="Platform"
              name="platform"
              placeholder="Select Platform"
              options={platformOptions}
              value={newLink.platform}
              onChange={(e) => {
                setNewLink((prev) => ({ ...prev, platform: e.target.value }));
              }}
              disabled={isLoading}
            />
            <Input
              label="URL"
              name="url"
              type="url"
              placeholder="https://..."
              value={newLink.url}
              onChange={(e) =>
                setNewLink((prev) => ({ ...prev, url: e.target.value }))
              }
              disabled={isLoading}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            text="Add Delivery Link"
            className="flex items-center space-x-2"
            disabled={isLoading}
            type="submit"
          >
            <Plus className="w-4 h-4" />
            </Button>
          </div>
        </form>
      )}

      {!isEditing && links.length === 0 && (
        <div className="text-center py-8 text-foreground">
          <p>No delivery links added yet.</p>
        </div>
      )}
    </Card>
  );
}
