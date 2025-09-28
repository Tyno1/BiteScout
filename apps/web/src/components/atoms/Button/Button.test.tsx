import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "./Button";

describe("Button", () => {
  test("renders with text", () => {
    render(<Button text="Click me" variant="solid" />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  test("renders with default props", () => {
    render(<Button text="Test" variant="solid" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
    expect(button).not.toBeDisabled();
    expect(button).toHaveClass("px-5", "py-3", "text-base"); // md size
  });

  test("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button text="Click me" variant="solid" onClick={handleClick} />);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("applies correct color styles for primary", () => {
    render(<Button text="Primary" variant="solid" color="primary" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-primary", "text-primary-foreground");
  });

  test("applies correct color styles for secondary", () => {
    render(<Button text="Secondary" variant="solid" color="secondary" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-secondary", "text-secondary-foreground");
  });

  test("applies correct color styles for danger", () => {
    render(<Button text="Danger" variant="solid" color="danger" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-danger", "text-danger-foreground");
  });

  test("applies correct color styles for success", () => {
    render(<Button text="Success" variant="solid" color="success" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-success", "text-success-foreground");
  });

  test("applies correct color styles for neutral", () => {
    render(<Button text="Neutral" variant="solid" color="neutral" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-neutral", "text-neutral-foreground");
  });

  test("applies correct variant styles for solid", () => {
    render(<Button text="Solid" variant="solid" color="primary" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-primary");
  });

  test("applies correct variant styles for outline", () => {
    render(<Button text="Outline" variant="outline" color="primary" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-transparent", "border-primary", "text-primary");
  });

  test("applies correct variant styles for plain", () => {
    render(<Button text="Plain" variant="plain" color="primary" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-primary");
  });

  test("applies correct variant styles for glass", () => {
    render(<Button text="Glass" variant="glass" color="primary" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-primary/5", "backdrop-blur-lg", "border-primary");
  });

  test("applies correct size styles", () => {
    const { rerender } = render(<Button text="XS" variant="solid" size="xs" />);
    expect(screen.getByRole("button")).toHaveClass("px-2", "py-1", "text-xs");

    rerender(<Button text="SM" variant="solid" size="sm" />);
    expect(screen.getByRole("button")).toHaveClass("px-4", "py-2", "text-sm");

    rerender(<Button text="MD" variant="solid" size="md" />);
    expect(screen.getByRole("button")).toHaveClass("px-5", "py-3", "text-base");

    rerender(<Button text="LG" variant="solid" size="lg" />);
    expect(screen.getByRole("button")).toHaveClass("px-7", "py-3", "text-lg");
  });

  test("applies fullWidth style when fullWidth is true", () => {
    render(<Button text="Full Width" variant="solid" fullWidth />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("w-full");
  });

  test("applies disabled state correctly", () => {
    render(<Button text="Disabled" variant="solid" disabled />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50", "disabled:cursor-not-allowed");
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).toHaveAttribute("tabIndex", "-1");
  });

  test("applies custom className", () => {
    render(<Button text="Custom" variant="solid" className="custom-class" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  test("renders with IconBefore", () => {
    const icon = <span data-testid="icon-before">←</span>;
    render(<Button text="With Icon" variant="solid" IconBefore={icon} />);
    expect(screen.getByTestId("icon-before")).toBeInTheDocument();
  });

  test("renders with IconAfter", () => {
    const icon = <span data-testid="icon-after">→</span>;
    render(<Button text="With Icon" variant="solid" IconAfter={icon} />);
    expect(screen.getByTestId("icon-after")).toBeInTheDocument();
  });

  test("renders with both icons", () => {
    const iconBefore = <span data-testid="icon-before">←</span>;
    const iconAfter = <span data-testid="icon-after">→</span>;
    render(
      <Button text="With Icons" variant="solid" IconBefore={iconBefore} IconAfter={iconAfter} />
    );
    expect(screen.getByTestId("icon-before")).toBeInTheDocument();
    expect(screen.getByTestId("icon-after")).toBeInTheDocument();
  });

  test("applies iconStyle to icons", () => {
    const icon = <span data-testid="icon">★</span>;
    render(
      <Button text="Styled Icon" variant="solid" IconBefore={icon} iconStyle="text-yellow-500" />
    );
    const iconElement = screen.getByTestId("icon").parentElement;
    expect(iconElement).toHaveClass("text-yellow-500");
  });

  test("applies correct button type", () => {
    const { rerender } = render(<Button text="Submit" variant="solid" type="submit" />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");

    rerender(<Button text="Reset" variant="solid" type="reset" />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "reset");
  });

  test("applies name and value attributes", () => {
    render(<Button text="Named" variant="solid" name="test-button" value="test-value" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("name", "test-button");
    expect(button).toHaveAttribute("value", "test-value");
  });

  test("applies aria attributes correctly", () => {
    render(
      <Button
        text="Accessible"
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

  test("uses text as aria-label when ariaLabel is not provided", () => {
    render(<Button text="Button Text" variant="solid" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Button Text");
  });

  test("handles focus states", () => {
    render(<Button text="Focusable" variant="solid" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("focus:outline-none", "focus:ring-2");
  });

  test("applies hover states", () => {
    render(<Button text="Hoverable" variant="solid" color="primary" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("hover:bg-primary/90");
  });

  test("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(<Button text="Disabled" variant="solid" disabled onClick={handleClick} />);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test("forwards additional props", () => {
    render(<Button text="Test" variant="solid" data-testid="custom-button" />);
    expect(screen.getByTestId("custom-button")).toBeInTheDocument();
  });
});
