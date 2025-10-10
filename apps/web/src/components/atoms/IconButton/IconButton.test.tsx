import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { IconButton } from "./IconButton";

describe("IconButton", () => {
  const mockIcon = <span data-testid="icon">★</span>;

  test("renders with icon", () => {
    render(<IconButton icon={mockIcon} variant="solid" />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  test("renders with default props", () => {
    render(<IconButton icon={mockIcon} variant="solid" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
    expect(button).not.toBeDisabled();
    expect(button).toHaveClass("px-5", "py-3", "text-base"); // md size
  });

  test("handles click events", () => {
    const handleClick = jest.fn();
    render(<IconButton icon={mockIcon} variant="solid" onClick={handleClick} />);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("applies correct color styles for primary", () => {
    render(<IconButton icon={mockIcon} variant="solid" color="primary" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-primary", "text-primary-foreground");
  });

  test("applies correct color styles for secondary", () => {
    render(<IconButton icon={mockIcon} variant="solid" color="secondary" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-secondary", "text-secondary-foreground");
  });

  test("applies correct color styles for danger", () => {
    render(<IconButton icon={mockIcon} variant="solid" color="danger" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-danger", "text-danger-foreground");
  });

  test("applies correct color styles for success", () => {
    render(<IconButton icon={mockIcon} variant="solid" color="success" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-success", "text-success-foreground");
  });

  test("applies correct color styles for neutral", () => {
    render(<IconButton icon={mockIcon} variant="solid" color="neutral" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-foreground", "text-background");
  });

  test("applies correct variant styles for solid", () => {
    render(<IconButton icon={mockIcon} variant="solid" color="primary" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-primary");
  });

  test("applies correct variant styles for outline", () => {
    render(<IconButton icon={mockIcon} variant="outline" color="primary" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-transparent", "border-primary", "text-primary");
  });

  test("applies correct variant styles for plain", () => {
    render(<IconButton icon={mockIcon} variant="plain" color="primary" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-primary");
  });

  test("applies correct variant styles for glass", () => {
    render(<IconButton icon={mockIcon} variant="glass" color="primary" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-primary/5", "backdrop-blur-lg", "border-primary");
  });

  test("applies correct size styles", () => {
    const { rerender } = render(<IconButton icon={mockIcon} variant="solid" size="xs" />);
    expect(screen.getByRole("button")).toHaveClass("px-2", "py-1", "text-xs");

    rerender(<IconButton icon={mockIcon} variant="solid" size="sm" />);
    expect(screen.getByRole("button")).toHaveClass("px-4", "py-2", "text-sm");

    rerender(<IconButton icon={mockIcon} variant="solid" size="md" />);
    expect(screen.getByRole("button")).toHaveClass("px-5", "py-3", "text-base");

    rerender(<IconButton icon={mockIcon} variant="solid" size="lg" />);
    expect(screen.getByRole("button")).toHaveClass("px-7", "py-3", "text-lg");
  });

  test("applies fullWidth style when fullWidth is true", () => {
    render(<IconButton icon={mockIcon} variant="solid" fullWidth />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("w-full");
  });

  test("applies disabled state correctly", () => {
    render(<IconButton icon={mockIcon} variant="solid" disabled />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50", "disabled:cursor-not-allowed");
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).toHaveAttribute("tabIndex", "-1");
  });

  test("applies custom className", () => {
    render(<IconButton icon={mockIcon} variant="solid" className="custom-class" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  test("applies correct button type", () => {
    const { rerender } = render(<IconButton icon={mockIcon} variant="solid" type="submit" />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");

    rerender(<IconButton icon={mockIcon} variant="solid" type="reset" />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "reset");
  });

  test("applies name and value attributes", () => {
    render(<IconButton icon={mockIcon} variant="solid" name="test-button" value="test-value" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("name", "test-button");
    expect(button).toHaveAttribute("value", "test-value");
  });

  test("applies aria attributes correctly", () => {
    render(
      <IconButton
        icon={mockIcon}
        variant="solid"
        ariaLabel="Custom Label"
        isPressed={true}
        isExpanded={true}
      />
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Custom Label");
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  test("uses name as aria-label when ariaLabel is not provided", () => {
    render(<IconButton icon={mockIcon} variant="solid" name="test-name" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "test-name");
  });

  test("handles focus states", () => {
    render(<IconButton icon={mockIcon} variant="solid" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("focus:outline-none", "focus:ring-2");
  });

  test("applies hover states", () => {
    render(<IconButton icon={mockIcon} variant="solid" color="primary" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("hover:bg-primary/90");
  });

  test("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(<IconButton icon={mockIcon} variant="solid" disabled onClick={handleClick} />);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test("forwards ref correctly", () => {
    const ref = jest.fn();
    render(<IconButton icon={mockIcon} variant="solid" ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  test("forwards additional props", () => {
    render(<IconButton icon={mockIcon} variant="solid" data-testid="custom-button" />);
    expect(screen.getByTestId("custom-button")).toBeInTheDocument();
  });

  test("renders with complex icon", () => {
    const complexIcon = (
      <div data-testid="complex-icon">
        <span>Icon</span>
        <span>Text</span>
      </div>
    );
    render(<IconButton icon={complexIcon} variant="solid" />);
    expect(screen.getByTestId("complex-icon")).toBeInTheDocument();
    expect(screen.getByText("Icon")).toBeInTheDocument();
    expect(screen.getByText("Text")).toBeInTheDocument();
  });

  test("renders with no icon", () => {
    render(<IconButton icon={null} variant="solid" />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toBeEmptyDOMElement();
  });

  test("applies transition classes", () => {
    render(<IconButton icon={mockIcon} variant="solid" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("transition-colors", "duration-200");
  });

  test("applies rounded corners", () => {
    render(<IconButton icon={mockIcon} variant="solid" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("rounded-lg");
  });

  test("applies cursor pointer", () => {
    render(<IconButton icon={mockIcon} variant="solid" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("cursor-pointer");
  });

  test("applies flex layout", () => {
    render(<IconButton icon={mockIcon} variant="solid" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("cursor-pointer");
  });
});
