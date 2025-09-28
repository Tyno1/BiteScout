import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { NotificationBadge } from "./Notification";

// Mock the useNotifications hook
jest.mock("@/hooks/useNotification", () => ({
  useNotifications: jest.fn(),
}));

import { useNotifications } from "@/hooks/useNotification";

const mockUseNotifications = useNotifications as jest.MockedFunction<typeof useNotifications>;

describe("NotificationBadge", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders nothing when userId is undefined", () => {
    mockUseNotifications.mockReturnValue({
      notifications: [],
      unreadCount: 5,
      isLoading: false,
    });

    const { container } = render(<NotificationBadge userId={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  test("renders nothing when userId is null", () => {
    mockUseNotifications.mockReturnValue({
      notifications: [],
      unreadCount: 3,
      isLoading: false,
    });

    const { container } = render(<NotificationBadge userId={null as unknown as string} />);
    expect(container.firstChild).toBeNull();
  });

  test("renders nothing when unreadCount is 0", () => {
    mockUseNotifications.mockReturnValue({
      notifications: [],
      unreadCount: 0,
      isLoading: false,
    });

    const { container } = render(<NotificationBadge userId="user123" />);
    expect(container.firstChild).toBeNull();
  });

  test("renders badge when userId is provided and unreadCount > 0", () => {
    mockUseNotifications.mockReturnValue({
      notifications: [],
      unreadCount: 3,
      isLoading: false,
    });

    render(<NotificationBadge userId="user123" />);
    const badge = screen.getByText("3");
    expect(badge).toBeInTheDocument();
  });

  test("displays correct unread count", () => {
    mockUseNotifications.mockReturnValue({
      notifications: [],
      unreadCount: 7,
      isLoading: false,
    });

    render(<NotificationBadge userId="user123" />);
    expect(screen.getByText("7")).toBeInTheDocument();
  });

  test("displays 99+ when unreadCount exceeds 99", () => {
    mockUseNotifications.mockReturnValue({
      notifications: [],
      unreadCount: 150,
      isLoading: false,
    });

    render(<NotificationBadge userId="user123" />);
    expect(screen.getByText("99+")).toBeInTheDocument();
  });

  test("displays 99+ when unreadCount is exactly 100", () => {
    mockUseNotifications.mockReturnValue({
      notifications: [],
      unreadCount: 100,
      isLoading: false,
    });

    render(<NotificationBadge userId="user123" />);
    expect(screen.getByText("99+")).toBeInTheDocument();
  });

  test("displays actual count when unreadCount is 99 or less", () => {
    mockUseNotifications.mockReturnValue({
      notifications: [],
      unreadCount: 99,
      isLoading: false,
    });

    render(<NotificationBadge userId="user123" />);
    expect(screen.getByText("99")).toBeInTheDocument();
  });

  test("applies correct CSS classes", () => {
    mockUseNotifications.mockReturnValue({
      notifications: [],
      unreadCount: 5,
      isLoading: false,
    });

    render(<NotificationBadge userId="user123" />);
    const badge = screen.getByText("5");
    expect(badge).toHaveClass(
      "absolute",
      "-top-1",
      "-right-1",
      "flex",
      "h-5",
      "w-5",
      "items-center",
      "justify-center",
      "rounded-full",
      "bg-red-500",
      "text-xs",
      "text-white"
    );
  });

  test("calls useNotifications with correct userId", () => {
    mockUseNotifications.mockReturnValue({
      notifications: [],
      unreadCount: 3,
      isLoading: false,
    });

    render(<NotificationBadge userId="test-user-123" />);
    expect(mockUseNotifications).toHaveBeenCalledWith({ userId: "test-user-123" });
  });

  test("handles different userId values", () => {
    const { rerender } = render(<NotificationBadge userId="user1" />);
    expect(mockUseNotifications).toHaveBeenCalledWith({ userId: "user1" });

    rerender(<NotificationBadge userId="user2" />);
    expect(mockUseNotifications).toHaveBeenCalledWith({ userId: "user2" });
  });

  test("renders with single digit count", () => {
    mockUseNotifications.mockReturnValue({
      notifications: [],
      unreadCount: 1,
      isLoading: false,
    });

    render(<NotificationBadge userId="user123" />);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("renders with double digit count", () => {
    mockUseNotifications.mockReturnValue({
      notifications: [],
      unreadCount: 42,
      isLoading: false,
    });

    render(<NotificationBadge userId="user123" />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  test("handles zero count correctly", () => {
    mockUseNotifications.mockReturnValue({
      notifications: [],
      unreadCount: 0,
      isLoading: false,
    });

    const { container } = render(<NotificationBadge userId="user123" />);
    expect(container.firstChild).toBeNull();
  });

  test("handles negative count", () => {
    mockUseNotifications.mockReturnValue({
      notifications: [],
      unreadCount: -1,
      isLoading: false,
    });

    const { container } = render(<NotificationBadge userId="user123" />);
    // Component should render the negative count as it's not 0
    expect(container.firstChild).not.toBeNull();
  });

  test("handles very large count", () => {
    mockUseNotifications.mockReturnValue({
      notifications: [],
      unreadCount: 999999,
      isLoading: false,
    });

    render(<NotificationBadge userId="user123" />);
    expect(screen.getByText("99+")).toBeInTheDocument();
  });

  test("renders consistently across multiple renders", () => {
    mockUseNotifications.mockReturnValue({
      notifications: [],
      unreadCount: 5,
      isLoading: false,
    });

    const { rerender } = render(<NotificationBadge userId="user123" />);
    expect(screen.getByText("5")).toBeInTheDocument();

    rerender(<NotificationBadge userId="user123" />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("updates when unreadCount changes", () => {
    const { rerender } = render(<NotificationBadge userId="user123" />);

    // Initially 3 unread
    mockUseNotifications.mockReturnValue({
      notifications: [],
      unreadCount: 3,
      isLoading: false,
    });
    rerender(<NotificationBadge userId="user123" />);
    expect(screen.getByText("3")).toBeInTheDocument();

    // Now 7 unread
    mockUseNotifications.mockReturnValue({
      notifications: [],
      unreadCount: 7,
      isLoading: false,
    });
    rerender(<NotificationBadge userId="user123" />);
    expect(screen.getByText("7")).toBeInTheDocument();
  });

  test("handles empty string userId", () => {
    mockUseNotifications.mockReturnValue({
      notifications: [],
      unreadCount: 3,
      isLoading: false,
    });

    const { container } = render(<NotificationBadge userId="" />);
    expect(container.firstChild).toBeNull();
  });

  test("handles special characters in userId", () => {
    mockUseNotifications.mockReturnValue({
      notifications: [],
      unreadCount: 2,
      isLoading: false,
    });

    render(<NotificationBadge userId="user@domain.com" />);
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(mockUseNotifications).toHaveBeenCalledWith({ userId: "user@domain.com" });
  });

  test("maintains proper structure", () => {
    mockUseNotifications.mockReturnValue({
      notifications: [],
      unreadCount: 4,
      isLoading: false,
    });

    render(<NotificationBadge userId="user123" />);
    const badge = screen.getByText("4");

    expect(badge).toHaveClass(
      "absolute",
      "-top-1",
      "-right-1",
      "flex",
      "h-5",
      "w-5",
      "items-center",
      "justify-center"
    );
  });

  test("handles loading state", () => {
    mockUseNotifications.mockReturnValue({
      notifications: [],
      unreadCount: 3,
      isLoading: true,
    });

    render(<NotificationBadge userId="user123" />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("handles notifications array", () => {
    const mockNotifications = [
      { id: "1", message: "Test 1", read: false },
      { id: "2", message: "Test 2", read: false },
    ];

    mockUseNotifications.mockReturnValue({
      notifications: mockNotifications,
      unreadCount: 2,
      isLoading: false,
    });

    render(<NotificationBadge userId="user123" />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
