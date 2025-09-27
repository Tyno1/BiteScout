import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewLink from "./Link";

describe("Link", () => {
  test("renders with required props", () => {
    render(<NewLink text="Test Link" to="/test" />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("Test Link");
    expect(link).toHaveAttribute("href", "/test");
  });

  test("renders with custom className", () => {
    render(<NewLink text="Custom Link" to="/custom" className="custom-class" />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("custom-class");
  });

  test("applies default base styles", () => {
    render(<NewLink text="Styled Link" to="/styled" />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass(
      "px-3",
      "py-2",
      "text-sm",
      "font-medium",
      "hover:border-b-2",
      "hover:border-orange-500",
      "focus:ring-orange-500",
      "focus:outline-none",
      "focus:ring-1",
      "focus:ring-offset-0"
    );
  });

  test("combines base styles with custom className", () => {
    render(<NewLink text="Combined Link" to="/combined" className="text-red-500" />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("text-red-500");
    expect(link).toHaveClass("px-3", "py-2", "text-sm", "font-medium");
  });

  test("renders with different text content", () => {
    const { rerender } = render(<NewLink text="First Link" to="/first" />);
    expect(screen.getByText("First Link")).toBeInTheDocument();

    rerender(<NewLink text="Second Link" to="/second" />);
    expect(screen.getByText("Second Link")).toBeInTheDocument();
  });

  test("renders with different routes", () => {
    const { rerender } = render(<NewLink text="Link" to="/home" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/home");

    rerender(<NewLink text="Link" to="/about" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/about");

    rerender(<NewLink text="Link" to="/contact" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/contact");
  });

  test("renders with complex routes", () => {
    render(<NewLink text="Complex Link" to="/users/123/profile" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/users/123/profile");
  });

  test("renders with query parameters in route", () => {
    render(<NewLink text="Query Link" to="/search?q=test&category=all" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/search?q=test&category=all");
  });

  test("renders with hash in route", () => {
    render(<NewLink text="Hash Link" to="/page#section1" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/page#section1");
  });

  test("renders with external URL", () => {
    render(<NewLink text="External Link" to="https://example.com" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  test("applies hover styles", () => {
    render(<NewLink text="Hover Link" to="/hover" />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("hover:border-b-2", "hover:border-orange-500");
  });

  test("applies focus styles", () => {
    render(<NewLink text="Focus Link" to="/focus" />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass(
      "focus:ring-orange-500",
      "focus:outline-none",
      "focus:ring-1",
      "focus:ring-offset-0"
    );
  });

  test("applies text size and weight", () => {
    render(<NewLink text="Text Link" to="/text" />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("text-sm", "font-medium");
  });

  test("applies padding", () => {
    render(<NewLink text="Padding Link" to="/padding" />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("px-3", "py-2");
  });

  test("renders with empty text", () => {
    render(<NewLink text="" to="/empty" />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("");
  });

  test("renders with whitespace text", () => {
    render(<NewLink text="   " to="/whitespace" />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("");
  });

  test("renders with special characters in text", () => {
    render(<NewLink text="Link & Special! @#$%" to="/special" />);
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("Link & Special! @#$%");
  });

  test("renders with HTML entities in text", () => {
    render(<NewLink text="Link &amp; Entity" to="/entity" />);
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("Link & Entity");
  });

  test("renders with numeric text", () => {
    render(<NewLink text="123" to="/numeric" />);
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("123");
  });

  test("renders with long text", () => {
    const longText = "This is a very long link text that should be handled properly by the component";
    render(<NewLink text={longText} to="/long" />);
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent(longText);
  });

  test("handles multiple custom classes", () => {
    render(<NewLink text="Multi Class" to="/multi" className="text-blue-500 bg-gray-100 rounded" />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("text-blue-500", "bg-gray-100", "rounded");
  });

  test("handles className with spaces", () => {
    render(<NewLink text="Spaced Class" to="/spaced" className="  text-red-500   bg-yellow-100  " />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("text-red-500", "bg-yellow-100");
  });

  test("handles empty className", () => {
    render(<NewLink text="Empty Class" to="/empty" className="" />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass("px-3", "py-2", "text-sm", "font-medium");
  });

  test("handles undefined className", () => {
    render(<NewLink text="Undefined Class" to="/undefined" className={undefined} />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass("px-3", "py-2", "text-sm", "font-medium");
  });

  test("maintains React Router functionality", () => {
    render(<NewLink text="Router Link" to="/router-test" />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    // The link should be a proper React Router Link component
    expect(link.tagName).toBe("A");
  });

  test("applies all base styles consistently", () => {
    render(<NewLink text="Consistent Link" to="/consistent" />);
    const link = screen.getByRole("link");
    
    // Check all base styles are applied
    const expectedClasses = [
      "px-3", "py-2", "text-sm", "font-medium",
      "hover:border-b-2", "hover:border-orange-500",
      "focus:ring-orange-500", "focus:outline-none", "focus:ring-1", "focus:ring-offset-0"
    ];
    
    expectedClasses.forEach(className => {
      expect(link).toHaveClass(className);
    });
  });
});
