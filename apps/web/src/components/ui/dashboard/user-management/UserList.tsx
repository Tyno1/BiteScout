import type { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import type React from "react";
import { useMemo, useState } from "react";
import type { AccessRoles } from "shared/types/api/schemas";
import { Badge } from "@/components/atoms";
import { DataGrid } from "@/components/organisms/DataGrid";
import { DataGridFilter } from "@/components/organisms/DataGridFilter/DataGridFilter";
import { useGetSession } from "@/hooks/useGetSession";
import { UserCard } from "./UserCard";

type UserHeaderType = {
  name: string;
  email: string;
  userType: string;
  status: string;
  accessId: string;
  _id: string;
};

type UserListProps = {
  users: Array<{
    _id?: string;
    name: string;
    email: string;
    userType?: AccessRoles;
    status?: string;
    accessId?: string;
  }>;
  totalUsers?: number;
  onUserClick: (id: string) => void;
  onUserDelete: (id: string) => void;
  onUserEdit: (id: string) => void;
};

const FILTER_OPTIONS = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "userType", label: "User Type" },
  { id: "status", label: "Status" },
];

const columns: ColumnDef<UserHeaderType>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "userType",
    header: "User Type",
    cell: ({ getValue }) => (
      <Badge size="xs" variant="glass" color="primary">
        {getValue() as string}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const color =
        status === "approved"
          ? "success"
          : status === "pending"
            ? "warning"
            : "danger";
      return (
        <Badge size="xs" variant="glass" color={color}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "accessId",
    header: "Access ID",
    cell: ({ getValue }) => (
      <p className="font-mono text-sm">{getValue() as string}</p>
    ),
  },
];

export const UserList: React.FC<UserListProps> = ({
  users,
  totalUsers,
  onUserClick,
  onUserDelete,
  onUserEdit,
}) => {
  const session = useGetSession();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [filterField, setFilterField] = useState("name");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Handle user click with routing logic
  const handleUserClick = (userId: string) => {
    const currentUserId = session?.user?._id;

    if (currentUserId === userId) {
      // Route to profile page for current user
      router.push("/dashboard/profile");
    } else {
      // Route to user management page for other users
      onUserClick(userId);
    }
  };

  // Filter users based on search and filter field
  const filteredUsers = useMemo(() => {
    if (!searchValue.trim()) return users;

    return users.filter((user) => {
      const searchTerm = searchValue.toLowerCase().trim();

      switch (filterField) {
        case "name":
          return user.name?.toLowerCase().includes(searchTerm);
        case "email":
          return user.email?.toLowerCase().includes(searchTerm);
        case "userType":
          return user.userType?.toLowerCase().includes(searchTerm);
        case "status":
          return user.status?.toLowerCase().includes(searchTerm);
        default:
          // Search across all fields if no specific filter
          return (
            user.name?.toLowerCase().includes(searchTerm) ||
            user.email?.toLowerCase().includes(searchTerm) ||
            user.userType?.toLowerCase().includes(searchTerm) ||
            user.status?.toLowerCase().includes(searchTerm)
          );
      }
    });
  }, [users, searchValue, filterField]);

  if (!users || users.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          No users found for this restaurant.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">
        Users{" "}
        <Badge size="xs" variant="glass" color="neutral">
          {totalUsers}
        </Badge>
      </h2>

      {/* DataGridFilter */}
      <DataGridFilter
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterField={filterField}
        onFilterFieldChange={(field) => {
          setFilterField(field);
          setIsPopoverOpen(false);
        }}
        filterOptions={FILTER_OPTIONS}
        isPopoverOpen={isPopoverOpen}
        onPopoverChange={setIsPopoverOpen}
        className="w-full md:w-[60%] lg:w-[40%]"
      />

      {/* Desktop Table */}
      <div className="hidden lg:block">
        <DataGrid
          data={filteredUsers
            .filter((user): user is typeof user & { _id: string } => !!user._id)
            .map((user) => ({
              name: user.name,
              email: user.email,
              userType: user.userType || "Unknown",
              status: user.status || "Unknown",
              accessId: user.accessId || "Unknown",
              _id: user._id,
            }))}
          columns={columns}
          handleRowClick={handleUserClick}
          handleDelete={onUserDelete}
          handleEdit={onUserEdit}
          emptyMessage="No users found."
        />
      </div>

      {/* Mobile/Tablet Cards */}
      <div className="lg:hidden space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              onUserClick={handleUserClick}
              onUserEdit={onUserEdit}
              onUserDelete={onUserDelete}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {searchValue.trim()
                ? "No users match your search."
                : "No users found."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
