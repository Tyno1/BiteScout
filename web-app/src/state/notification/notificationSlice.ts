import { Notification } from "@/types/notification";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const serverApi = import.meta.env.VITE_BACKEND_SERVER;

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  status: "idle",
  error: null,
};

// Async thunk to fetch notifications
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (
    { userId, token }: { userId: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `${serverApi}/api/notifications/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch notifications"
      );
    }
  }
);
// Async thunk to mark notification as read
export const markNotificationAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (
    {
      notificationId,
      userId,
      token,
    }: { notificationId: string; userId: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(
        `${serverApi}/api/notifications/${userId}/${notificationId}/read`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to mark notification as read"
      );
    }
  }
);

// Async thunk to mark all notifications as read
export const markAllNotificationsAsRead = createAsyncThunk(
  "notifications/markAllAsRead",
  async (
    { userId, token }: { userId: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      await axios.patch(`${serverApi}/api/notifications/${userId}/read-all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return true;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to mark all notifications as read"
      );
    }
  }
);

const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification(state, action) {
      state.notifications.unshift(action.payload);
      // Increment unread count if notification is not read
      if (!action.payload.read) {
        state.unreadCount += 1;
      }
    },

    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchNotifications
      .addCase(fetchNotifications.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter(
          (item: Notification) => !item.read
        ).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // Handle markNotificationAsRead
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const updatedNotification = action.payload;

        // Find and update the notification in the state
        const index = state.notifications.findIndex(
          (item) => item._id === updatedNotification._id
        );
        if (index !== -1) {
          // If it was previously unread, decrement the counter
          if (!state.notifications[index].read && updatedNotification.read) {
            state.unreadCount -= 1;
          }
          state.notifications[index] = updatedNotification;
        }
      })

      // Handle markAllNotificationsAsRead
      .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
        // Mark all notifications as read
        state.notifications.forEach((item) => {
          item.read = true;
        });
        state.unreadCount = 0;
      });
  },
});

export const { addNotification, clearNotifications } =
  NotificationSlice.actions;

export default NotificationSlice.reducer;
