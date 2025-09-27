import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import NewLink from "./Link";

// Helper component to wrap Link with Router
const LinkWithRouter = (props: { text: string; to: string; className?: string }) => (
  <BrowserRouter>
    <NewLink {...props} />
  </BrowserRouter>
);

describe("Link", () => {
  test("renders with required props", () => {
    render(<LinkWithRouter text="Test Link" to="/test" />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("Test Link");
    expect(link).toHaveAttribute("href", "/test");
  });

  test("renders with custom className", () => {
    render(<LinkWithRouter text="Custom Link" to="/custom" className="custom-class" />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("custom-class");
  });

  test("applies default base styles", () => {
    render(<LinkWithRouter text="Styled Link" to="/styled" />);
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
    render(<LinkWithRouter text="Combined Link" to="/combined" className="text-red-500" />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("text-red-500");
    expect(link).toHaveClass("px-3", "py-2", "text-sm", "font-medium");
  });

  test("renders with different text content", () => {
    const { rerender } = render(<LinkWithRouter text="First Link" to="/first" />);
    expect(screen.getByText("First Link")).toBeInTheDocument();

    rerender(<LinkWithRouter text="Second Link" to="/second" />);
    expect(screen.getByText("Second Link")).toBeInTheDocument();
  });

  test("renders with different routes", () => {
    const { rerender } = render(<LinkWithRouter text="Link" to="/home" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/home");

    rerender(<LinkWithRouter text="Link" to="/about" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/about");

    rerender(<LinkWithRouter text="Link" to="/contact" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/contact");
  });

  test("renders with complex routes", () => {
    render(<LinkWithRouter text="Complex Link" to="/users/123/profile" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/users/123/profile");
  });

  test("renders with query parameters in route", () => {
    render(<LinkWithRouter text="Query Link" to="/search?q=test&category=all" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/search?q=test&category=all");
  });

  test("renders with hash in route", () => {
    render(<LinkWithRouter text="Hash Link" to="/page#section1" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/page#section1");
  });

  test("renders with external URL", () => {
    render(<LinkWithRouter text="External Link" to="https://example.com" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  test("applies hover styles", () => {
    render(<LinkWithRouter text="Hover Link" to="/hover" />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("hover:border-b-2", "hover:border-orange-500");
  });

  test("applies focus styles", () => {
    render(<LinkWithRouter text="Focus Link" to="/focus" />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass(
      "focus:ring-orange-500",
      "focus:outline-none",
      "focus:ring-1",
      "focus:ring-offset-0"
    );
  });

  test("applies text size and weight", () => {
    render(<LinkWithRouter text="Text Link" to="/text" />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("text-sm", "font-medium");
  });

  test("applies padding", () => {
    render(<LinkWithRouter text="Padding Link" to="/padding" />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("px-3", "py-2");
  });

  test("renders with empty text", () => {
    render(<LinkWithRouter text="" to="/empty" />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("");
  });

  test("renders with whitespace text", () => {
    render(<LinkWithRouter text="   " to="/whitespace" />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("");
  });

  test("renders with special characters in text", () => {
    render(<LinkWithRouter text="Link & Special! @#$%" to="/special" />);
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("Link & Special! @#$%");
  });

  test("renders with HTML entities in text", () => {
    render(<LinkWithRouter text="Link &amp; Entity" to="/entity" />);
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("Link & Entity");
  });

  test("renders with numeric text", () => {
    render(<LinkWithRouter text="123" to="/numeric" />);
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("123");
  });

  test("renders with long text", () => {
    const longText = "This is a very long link text that should be handled properly by the component";
    render(<LinkWithRouter text={longText} to="/long" />);
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent(longText);
  });

  test("handles multiple custom classes", () => {
    render(<LinkWithRouter text="Multi Class" to="/multi" className="text-blue-500 bg-gray-100 rounded" />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("text-blue-500", "bg-gray-100", "rounded");
  });

  test("handles className with spaces", () => {
    render(<LinkWithRouter text="Spaced Class" to="/spaced" className="  text-red-500   bg-yellow-100  " />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("text-red-500", "bg-yellow-100");
  });

  test("handles empty className", () => {
    render(<LinkWithRouter text="Empty Class" to="/empty" className="" />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass("px-3", "py-2", "text-sm", "font-medium");
  });

  test("handles undefined className", () => {
    render(<LinkWithRouter text="Undefined Class" to="/undefined" className={undefined} />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass("px-3", "py-2", "text-sm", "font-medium");
  });

  test("maintains React Router functionality", () => {
    render(<LinkWithRouter text="Router Link" to="/router-test" />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    // The link should be a proper React Router Link component
    expect(link.tagName).toBe("A");
  });

  test("applies all base styles consistently", () => {
    render(<LinkWithRouter text="Consistent Link" to="/consistent" />);
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
