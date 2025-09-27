import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RefreshButton } from "./RefreshButton";

// Mock the useForceSignOut hook
jest.mock("@/hooks/useForceSignOut", () => ({
	useForceSignOut: jest.fn(),
}));

// Mock next-auth/react
jest.mock("next-auth/react", () => ({
	signOut: jest.fn(),
}));

// Mock window.location.reload
const mockReload = jest.fn();
Object.defineProperty(window, "location", {
	value: {
		reload: mockReload,
	},
	writable: true,
});

import { useForceSignOut } from "@/hooks/useForceSignOut";

const mockUseForceSignOut = useForceSignOut as jest.MockedFunction<
	typeof useForceSignOut
>;

describe("RefreshButton", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockReload.mockClear();
	});

	test("renders with default props", () => {
		mockUseForceSignOut.mockReturnValue({
			forceSignOut: jest.fn(),
			isSigningOut: false,
		});

		render(<RefreshButton />);
		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent("Refresh Session");
	});

	test("renders with custom text", () => {
		mockUseForceSignOut.mockReturnValue({
			forceSignOut: jest.fn(),
			isSigningOut: false,
		});

		render(<RefreshButton text="Custom Refresh" />);
		const button = screen.getByRole("button");
		expect(button).toHaveTextContent("Custom Refresh");
	});

	test("renders with custom variant", () => {
		mockUseForceSignOut.mockReturnValue({
			forceSignOut: jest.fn(),
			isSigningOut: false,
		});

		render(<RefreshButton variant="solid" />);
		const button = screen.getByRole("button");
		expect(button).toHaveClass("bg-primary", "text-primary-foreground");
	});

	test("renders with custom size", () => {
		mockUseForceSignOut.mockReturnValue({
			forceSignOut: jest.fn(),
			isSigningOut: false,
		});

		render(<RefreshButton size="lg" />);
		const button = screen.getByRole("button");
		expect(button).toHaveClass("px-7", "py-3", "text-lg");
	});

	test("renders with custom className", () => {
		mockUseForceSignOut.mockReturnValue({
			forceSignOut: jest.fn(),
			isSigningOut: false,
		});

		render(<RefreshButton className="custom-class" />);
		const button = screen.getByRole("button");
		expect(button).toHaveClass("custom-class");
	});

	test("calls forceSignOut when clicked", () => {
		const mockForceSignOut = jest.fn();
		mockUseForceSignOut.mockReturnValue({
			forceSignOut: mockForceSignOut,
			isSigningOut: false,
		});

		render(<RefreshButton />);
		const button = screen.getByRole("button");

		fireEvent.click(button);
		expect(mockForceSignOut).toHaveBeenCalledTimes(1);
	});

	test("shows loading state when signing out", () => {
		mockUseForceSignOut.mockReturnValue({
			forceSignOut: jest.fn(),
			isSigningOut: true,
		});

		render(<RefreshButton />);
		const button = screen.getByRole("button");
		expect(button).toHaveTextContent("Refreshing...");
		expect(button).toBeDisabled();
	});

	test("shows normal state when not signing out", () => {
		mockUseForceSignOut.mockReturnValue({
			forceSignOut: jest.fn(),
			isSigningOut: false,
		});

		render(<RefreshButton text="Refresh" />);
		const button = screen.getByRole("button");
		expect(button).toHaveTextContent("Refresh");
		expect(button).not.toBeDisabled();
	});

	test("applies correct default variant", () => {
		mockUseForceSignOut.mockReturnValue({
			forceSignOut: jest.fn(),
			isSigningOut: false,
		});

		render(<RefreshButton />);
		const button = screen.getByRole("button");
		expect(button).toHaveClass(
			"border",
			"border-primary",
			"bg-transparent",
			"text-primary",
		);
	});

	test("applies correct default size", () => {
		mockUseForceSignOut.mockReturnValue({
			forceSignOut: jest.fn(),
			isSigningOut: false,
		});

		render(<RefreshButton />);
		const button = screen.getByRole("button");
		expect(button).toHaveClass("px-5", "py-3", "text-base");
	});

	test("handles multiple clicks correctly", () => {
		const mockForceSignOut = jest.fn();
		mockUseForceSignOut.mockReturnValue({
			forceSignOut: mockForceSignOut,
			isSigningOut: false,
		});

		render(<RefreshButton />);
		const button = screen.getByRole("button");

		fireEvent.click(button);
		fireEvent.click(button);
		fireEvent.click(button);

		expect(mockForceSignOut).toHaveBeenCalledTimes(3);
	});

	test("does not call forceSignOut when disabled", () => {
		const mockForceSignOut = jest.fn();
		mockUseForceSignOut.mockReturnValue({
			forceSignOut: mockForceSignOut,
			isSigningOut: true,
		});

		render(<RefreshButton />);
		const button = screen.getByRole("button");

		fireEvent.click(button);
		expect(mockForceSignOut).not.toHaveBeenCalled();
	});

	test("combines all props correctly", () => {
		mockUseForceSignOut.mockReturnValue({
			forceSignOut: jest.fn(),
			isSigningOut: false,
		});

		render(
			<RefreshButton
				text="Custom Text"
				variant="solid"
				size="sm"
				className="custom-class"
			/>,
		);
		const button = screen.getByRole("button");

		expect(button).toHaveTextContent("Custom Text");
		expect(button).toHaveClass("bg-primary", "text-primary-foreground");
		expect(button).toHaveClass("px-4", "py-2", "text-sm");
		expect(button).toHaveClass("custom-class");
	});

	test("handles empty text prop", () => {
		mockUseForceSignOut.mockReturnValue({
			forceSignOut: jest.fn(),
			isSigningOut: false,
		});

		render(<RefreshButton text="" />);
		const button = screen.getByRole("button");
		expect(button).toHaveTextContent("Refresh Session"); // Should use default
	});

	test("handles undefined text prop", () => {
		mockUseForceSignOut.mockReturnValue({
			forceSignOut: jest.fn(),
			isSigningOut: false,
		});

		render(<RefreshButton text={undefined} />);
		const button = screen.getByRole("button");
		expect(button).toHaveTextContent("Refresh Session"); // Should use default
	});

	test("handles undefined className prop", () => {
		mockUseForceSignOut.mockReturnValue({
			forceSignOut: jest.fn(),
			isSigningOut: false,
		});

		render(<RefreshButton className={undefined} />);
		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
	});

	test("handles empty className prop", () => {
		mockUseForceSignOut.mockReturnValue({
			forceSignOut: jest.fn(),
			isSigningOut: false,
		});

		render(<RefreshButton className="" />);
		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
	});

	test("renders consistently across multiple renders", () => {
		mockUseForceSignOut.mockReturnValue({
			forceSignOut: jest.fn(),
			isSigningOut: false,
		});

		const { rerender } = render(<RefreshButton text="Test" />);
		expect(screen.getByText("Test")).toBeInTheDocument();

		rerender(<RefreshButton text="Test" />);
		expect(screen.getByText("Test")).toBeInTheDocument();
	});

	test("updates text when isSigningOut changes", () => {
		const { rerender } = render(<RefreshButton text="Refresh" />);

		// Initially not signing out
		mockUseForceSignOut.mockReturnValue({
			forceSignOut: jest.fn(),
			isSigningOut: false,
		});
		rerender(<RefreshButton text="Refresh" />);
		expect(screen.getByText("Refresh")).toBeInTheDocument();

		// Now signing out
		mockUseForceSignOut.mockReturnValue({
			forceSignOut: jest.fn(),
			isSigningOut: true,
		});
		rerender(<RefreshButton text="Refresh" />);
		expect(screen.getByText("Refreshing...")).toBeInTheDocument();
	});

	test("maintains button functionality", () => {
		const mockForceSignOut = jest.fn();
		mockUseForceSignOut.mockReturnValue({
			forceSignOut: mockForceSignOut,
			isSigningOut: false,
		});

		render(<RefreshButton />);
		const button = screen.getByRole("button");

		expect(button).toBeInTheDocument();
		expect(button).toHaveAttribute("type", "button");
		expect(button).not.toBeDisabled();
	});

	test("applies disabled state correctly when signing out", () => {
		mockUseForceSignOut.mockReturnValue({
			forceSignOut: jest.fn(),
			isSigningOut: true,
		});

		render(<RefreshButton />);
		const button = screen.getByRole("button");

		expect(button).toBeDisabled();
		expect(button).toHaveAttribute("aria-disabled", "true");
	});
});
