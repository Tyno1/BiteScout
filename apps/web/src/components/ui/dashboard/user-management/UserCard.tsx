import { Edit, Eye, Trash2 } from "lucide-react";
import type { AccessRoles } from "shared/types/api/schemas";
import { Badge, Button } from "@/components/atoms";
import { Card } from "@/components/organisms";

type UserCardProps = {
  user: {
    _id?: string;
    name: string;
    email: string;
    userType?: AccessRoles;
    status?: string;
    accessId?: string;
  };
  onUserClick: (id: string) => void;
  onUserEdit: (id: string) => void;
  onUserDelete: (id: string) => void;
};

export const UserCard = ({
  user,
  onUserClick,
  onUserEdit,
  onUserDelete,
}: UserCardProps) => {
  return (
    <Card
      header={
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-card-foreground">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          {/* Status Badge */}
          <Badge
            size="xs"
            variant="glass"
            color={
              user.status === "approved"
                ? "success"
                : user.status === "pending"
                  ? "warning"
                  : "danger"
            }
          >
            {user.status || "Unknown"}
          </Badge>
        </div>
      }
      onClick={() => user._id && onUserClick(user._id)}
      padding="md"
      shadow="sm"
    >
      <div className="space-y-3">
        {/* Role and Access ID */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge size="xs" variant="glass" color="primary">
            {user.userType || "Unknown"}
          </Badge>
          <div className="text-xs text-muted-foreground font-mono">
            ID: {user.accessId || "Unknown"}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            color="neutral"
            size="sm"
            IconBefore={<Eye size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              if (user._id) onUserClick(user._id);
            }}
            className="flex-1"
          >
            View
          </Button>
          <Button
            variant="outline"
            color="neutral"
            size="sm"
            IconBefore={<Edit size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              if (user._id) onUserEdit(user._id);
            }}
            className="flex-1"
          >
            Edit
          </Button>
          <Button
            variant="outline"
            color="danger"
            size="sm"
            IconBefore={<Trash2 size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              if (user._id) onUserDelete(user._id);
            }}
            className="flex-1 text-destructive hover:text-destructive"
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};
