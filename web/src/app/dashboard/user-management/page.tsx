"use client";

import UserModal from "@/components/ui/dashboard/Modal";
import React, { useState } from "react";

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

  const handleInputChange = (e: any) => {
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
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">User Management</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add New User
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Hometown</th>
              <th className="p-3 text-left">Current City</th>
              <th className="p-3 text-left">Country</th>
              <th className="p-3 text-left">Disability</th>
              <th className="p-3 text-left">Reviews</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.hometown}</td>
                <td className="p-3">{user.currentCity}</td>
                <td className="p-3">{user.country}</td>
                <td className="p-3">{user.disability}</td>
                <td className="p-3">{user.reviewCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl mb-4">Add New User</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-2">Hometown</label>
            <input
              type="text"
              name="hometown"
              value={newUser.hometown}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-2">Current City</label>
            <input
              type="text"
              name="currentCity"
              value={newUser.currentCity}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-2">Country</label>
            <input
              type="text"
              name="country"
              value={newUser.country}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-2">Disability</label>
            <select
              name="disability"
              value={newUser.disability}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            >
              <option value="">Select disability status</option>
              <option value="None">None</option>
              <option value="Visual Impairment">Visual Impairment</option>
              <option value="Hearing Impairment">Hearing Impairment</option>
              <option value="Mobility Impairment">Mobility Impairment</option>
            </select>
          </div>
          <button
            onClick={addUser}
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Add User
          </button>
        </div>
      </UserModal>
    </div>
  );
};

export default UserManagement;
