"use client";

import { Button } from "@/components/atoms";
import { UserModal } from "@/components/ui/dashboard/Modal";
import { Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface newUserProps {
  name: string;
  email: string;
  hometown: string;
  currentCity: string;
  country: string;
  disability: string;
}
interface userProps extends newUserProps {
  id: number;
  reviewCount: number;
}

const UserManagement = () => {
  const [users, setUsers] = useState<userProps[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      hometown: "New York",
      currentCity: "Chicago",
      country: "USA",
      disability: "None",
      reviewCount: 15,
    },
  ]);

  const [newUser, setNewUser] = useState<newUserProps>({
    name: "",
    email: "",
    hometown: "",
    currentCity: "",
    country: "",
    disability: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addUser = () => {
    const userToAdd = {
      ...newUser,
      id: users.length + 1,
      reviewCount: 0,
    };
    setUsers((prev) => [...prev, userToAdd]);
    setIsModalOpen(false);
    setNewUser({
      name: "",
      email: "",
      hometown: "",
      currentCity: "",
      country: "",
      disability: "",
    });
  };

  return (
    <main className="w-full mx-auto px-4 md:px-10 py-10 space-y-6">
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              User Management
            </h1>
            <p className="text-muted-foreground text-sm mt-2">
              Manage your restaurant&apos;s users and their access permissions
            </p>
          </div>
          <Button
            text="Add User"
            variant="solid"
            color="primary"
            size="sm"
            IconBefore={<Plus size={16} />}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-700">
                Hometown
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-700">
                Current City
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-700">
                Country
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-700">
                Disability
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-700">
                Reviews
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-4 text-sm">{user.name}</td>
                <td className="p-4 text-sm">{user.email}</td>
                <td className="p-4 text-sm">{user.hometown}</td>
                <td className="p-4 text-sm">{user.currentCity}</td>
                <td className="p-4 text-sm">{user.country}</td>
                <td className="p-4 text-sm">{user.disability}</td>
                <td className="p-4 text-sm">{user.reviewCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-6">Add New User</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter email address"
            />
          </div>
          <div>
            <label
              htmlFor="hometown"
              className="block text-sm font-medium mb-2"
            >
              Hometown
            </label>
            <input
              id="hometown"
              type="text"
              name="hometown"
              value={newUser.hometown}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter hometown"
            />
          </div>
          <div>
            <label
              htmlFor="currentCity"
              className="block text-sm font-medium mb-2"
            >
              Current City
            </label>
            <input
              id="currentCity"
              type="text"
              name="currentCity"
              value={newUser.currentCity}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter current city"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium mb-2">
              Country
            </label>
            <input
              id="country"
              type="text"
              name="country"
              value={newUser.country}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter country"
            />
          </div>
          <div>
            <label
              htmlFor="disability"
              className="block text-sm font-medium mb-2"
            >
              Disability
            </label>
            <select
              id="disability"
              name="disability"
              value={newUser.disability}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select disability status</option>
              <option value="None">None</option>
              <option value="Visual Impairment">Visual Impairment</option>
              <option value="Hearing Impairment">Hearing Impairment</option>
              <option value="Mobility Impairment">Mobility Impairment</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              text="Cancel"
              variant="outline"
              color="neutral"
              fullWidth
              onClick={() => setIsModalOpen(false)}
            />
            <Button
              text="Add User"
              variant="solid"
              color="primary"
              fullWidth
              onClick={addUser}
            />
          </div>
        </div>
      </UserModal>
    </main>
  );
};

export default UserManagement;
