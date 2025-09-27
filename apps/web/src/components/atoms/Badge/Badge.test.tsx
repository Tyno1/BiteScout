import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Badge } from "./Badge";

describe("Badge", () => {
  test("renders with children", () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });

  test("renders with default props", () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText("Default");
    expect(badge).toHaveClass("inline-flex", "items-center", "justify-center", "rounded-full");
  });

  test("applies correct color styles for primary", () => {
    render(<Badge color="primary">Primary</Badge>);
    const badge = screen.getByText("Primary");
    expect(badge).toHaveClass("bg-primary", "text-primary-foreground");
  });

  test("applies correct color styles for secondary", () => {
    render(<Badge color="secondary">Secondary</Badge>);
    const badge = screen.getByText("Secondary");
    expect(badge).toHaveClass("bg-secondary", "text-secondary-foreground");
  });

  test("applies correct color styles for danger", () => {
    render(<Badge color="danger">Danger</Badge>);
    const badge = screen.getByText("Danger");
    expect(badge).toHaveClass("bg-danger", "text-danger-foreground");
  });

  test("applies correct color styles for success", () => {
    render(<Badge color="success">Success</Badge>);
    const badge = screen.getByText("Success");
    expect(badge).toHaveClass("bg-success", "text-success-foreground");
  });

  test("applies correct color styles for neutral", () => {
    render(<Badge color="neutral">Neutral</Badge>);
    const badge = screen.getByText("Neutral");
    expect(badge).toHaveClass("bg-neutral", "text-neutral-foreground");
  });

  test("applies correct color styles for warning", () => {
    render(<Badge color="warning">Warning</Badge>);
    const badge = screen.getByText("Warning");
    expect(badge).toHaveClass("bg-yellow-500", "text-white");
  });

  test("applies correct variant styles for solid", () => {
    render(<Badge variant="solid" color="primary">Solid</Badge>);
    const badge = screen.getByText("Solid");
    expect(badge).toHaveClass("bg-primary", "text-primary-foreground");
  });

  test("applies correct variant styles for outline", () => {
    render(<Badge variant="outline" color="primary">Outline</Badge>);
    const badge = screen.getByText("Outline");
    expect(badge).toHaveClass("border", "border-primary", "text-primary");
  });

  test("applies correct variant styles for plain", () => {
    render(<Badge variant="plain" color="primary">Plain</Badge>);
    const badge = screen.getByText("Plain");
    expect(badge).toHaveClass("text-primary");
  });

  test("applies correct variant styles for glass", () => {
    render(<Badge variant="glass" color="primary">Glass</Badge>);
    const badge = screen.getByText("Glass");
    expect(badge).toHaveClass("bg-primary/10", "backdrop-blur-sm", "border", "border-primary/20");
  });

  test("applies correct size styles", () => {
    const { rerender } = render(<Badge size="xs">XS</Badge>);
    expect(screen.getByText("XS")).toHaveClass("px-3", "py-1", "text-xs");

    rerender(<Badge size="sm">SM</Badge>);
    expect(screen.getByText("SM")).toHaveClass("px-4", "py-1", "text-sm");

    rerender(<Badge size="md">MD</Badge>);
    expect(screen.getByText("MD")).toHaveClass("px-3", "py-1.5", "text-sm");
  });

  test("applies fullWidth style when fullWidth is true", () => {
    render(<Badge fullWidth>Full Width</Badge>);
    const badge = screen.getByText("Full Width");
    expect(badge).toHaveClass("flex", "w-full");
  });

  test("applies custom className", () => {
    render(<Badge className="custom-class">Custom</Badge>);
    const badge = screen.getByText("Custom");
    expect(badge).toHaveClass("custom-class");
  });

  test("renders with React nodes as children", () => {
    render(
      <Badge>
        <span data-testid="icon">★</span>
        <span>Star Badge</span>
      </Badge>
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("Star Badge")).toBeInTheDocument();
  });

  test("applies hover states for plain variant", () => {
    render(<Badge variant="plain" color="primary">Hoverable</Badge>);
    const badge = screen.getByText("Hoverable");
    expect(badge).toHaveClass("hover:bg-primary/10");
  });

  test("applies hover states for outline variant", () => {
    render(<Badge variant="outline" color="primary">Hoverable</Badge>);
    const badge = screen.getByText("Hoverable");
    expect(badge).toHaveClass("hover:bg-primary/10");
  });

  test("applies hover states for glass variant", () => {
    render(<Badge variant="glass" color="primary">Hoverable</Badge>);
    const badge = screen.getByText("Hoverable");
    expect(badge).toHaveClass("bg-primary/10", "backdrop-blur-sm", "border-primary/20");
  });

  test("applies transition classes", () => {
    render(<Badge>Transition</Badge>);
    const badge = screen.getByText("Transition");
    expect(badge).toHaveClass("transition-colors", "duration-200");
  });

  test("applies font-medium class", () => {
    render(<Badge>Font Weight</Badge>);
    const badge = screen.getByText("Font Weight");
    expect(badge).toHaveClass("font-medium");
  });

  test("combines multiple props correctly", () => {
    render(
      <Badge 
        color="success" 
        variant="outline" 
        size="md" 
        fullWidth 
        className="custom-class"
      >
        Combined Props
      </Badge>
    );
    const badge = screen.getByText("Combined Props");
    expect(badge).toHaveClass(
      "border",
      "border-success",
      "text-success",
      "px-3",
      "py-1.5",
      "text-sm",
      "flex",
      "w-full",
      "custom-class"
    );
  });

  test("renders with empty children", () => {
    const { container } = render(<Badge>{""}</Badge>);
    const badge = container.querySelector('[class*="inline-flex"]');
    expect(badge).toBeInTheDocument();
  });

  test("renders with number as children", () => {
    render(<Badge>{42}</Badge>);
    expect(screen.getByText("42")).toBeInTheDocument();
  });
});
