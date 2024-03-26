"use client";
import { getNotifications } from "@/actions/notification";
import { updateNotification } from "@/actions/update-notification";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Notification() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const [isShowing, setIsShowing] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  let unRead: INotification[] = [];
  if (notifications && notifications.length > 0) {
    unRead = notifications.filter((notification) => !notification.read);
  }

  const fetchNotifications = async () => {
    const data: INotification[] = await getNotifications();
    setNotifications(data);
  };

  const handleUpdateRead = (id: number) => {
    updateNotification(id);
    setNotifications(
      notifications.map((notification) => {
        if (notification.id === id) {
          return {
            ...notification,
            read: true,
          };
        }
        return notification;
      })
    );
    setIsShowing(false);
    user?.userType === "business"
      ? router.push("/business/job-posts")
      : router.push("/worker/applied-jobs");
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  return (
    <div className="relative ">
      {unRead.length > 0 && (
        <div className="absolute -right-1 -top-2 z-10  rounded-full bg-indigo-700 p-2 w-5 h-5 flex items-center justify-center text-xs font-bold  text-white">
          {unRead.length}
        </div>
      )}
      <div className="hover:shadow-around-md w-8 h-8 rounded-full duration-150">
        <button onClick={() => setIsShowing(!isShowing)}>
          <Bell className="absolute top-1 right-1" size={25} />
        </button>
      </div>

      <ul
        role="list"
        className={cn(
          "absolute right-0 mt-2 w-60 border border-gray-200 shadow-md rounded-md bg-white transition-opacity duration-300",
          {
            "opacity-100": isShowing,
            "opacity-0 pointer-events-none": !isShowing,
          }
        )}
      >
        {notifications.length > 0 &&
          notifications.map((notification) => (
            <li
              onClick={handleUpdateRead.bind(null, notification.id)}
              className={cn(
                "text-sm bg-gray-200 text-blue-700 px-5 py-3 hover:bg-gray-100 first:rounded-t-md last:rounded-b-md cursor-pointer",
                notification.read && "text-gray-400 bg-white"
              )}
            >
              {notification.message}
            </li>
          ))}
        {notifications.length === 0 && (
          <li className="text-center py-6">No new notifications</li>
        )}
      </ul>
    </div>
  );
}
