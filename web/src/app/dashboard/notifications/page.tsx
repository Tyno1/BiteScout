"use client";
import useNotificationStore from "@/stores/notificationStore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Notifications() {
  const { data: session } = useSession();
  const { fetchNotifications, notifications } = useNotificationStore();



  useEffect(() => {
    if (session?.user?._id) {
      fetchNotifications(session.user._id);
    }
  }, [session?.user?._id, fetchNotifications]);

  console.log("Notifications:", notifications);
  
  return (
    <main className="w-full min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <h1 className="text-2xl font-bold">Notifications</h1>
        {/* <NotificationList /> */}
      </div>
    </main>
  );
}
