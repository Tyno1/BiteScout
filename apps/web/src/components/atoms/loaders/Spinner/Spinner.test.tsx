import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Spinner } from "./Spinners";

describe("Spinner", () => {
  test("renders spinner component", () => {
    render(<Spinner />);
    const container = screen.getByTestId("spinner-container");
    expect(container).toBeInTheDocument();
  });

  test("renders with correct container classes", () => {
    render(<Spinner />);
    const container = screen.getByTestId("spinner-container");
    expect(container).toHaveClass("flex", "items-center", "justify-center", "p-4");
  });

  test("renders Loader2 icon", () => {
    render(<Spinner />);
    const icon = screen.getByTestId("spinner-container").querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  test("applies correct icon classes", () => {
    render(<Spinner />);
    const icon = screen.getByTestId("spinner-container").querySelector("svg");
    expect(icon).toHaveClass("animate-spin", "text-gray-600", "h-6", "w-6");
  });

  test("renders consistently", () => {
    const { rerender } = render(<Spinner />);
    const firstRender = screen.getByTestId("spinner-container");
    
    rerender(<Spinner />);
    const secondRender = screen.getByTestId("spinner-container");
    
    expect(firstRender).toBeInTheDocument();
    expect(secondRender).toBeInTheDocument();
  });

  test("has correct structure", () => {
    render(<Spinner />);
    const container = screen.getByTestId("spinner-container");
    const icon = container.querySelector("svg");
    
    expect(container).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(container).toContainElement(icon);
  });

  test("applies flex layout correctly", () => {
    render(<Spinner />);
    const container = screen.getByTestId("spinner-container");
    expect(container).toHaveClass("flex", "items-center", "justify-center");
  });

  test("applies padding correctly", () => {
    render(<Spinner />);
    const container = screen.getByTestId("spinner-container");
    expect(container).toHaveClass("p-4");
  });

  test("icon has correct dimensions", () => {
    render(<Spinner />);
    const icon = screen.getByTestId("spinner-container").querySelector("svg");
    expect(icon).toHaveClass("h-6", "w-6");
  });

  test("icon has correct color", () => {
    render(<Spinner />);
    const icon = screen.getByTestId("spinner-container").querySelector("svg");
    expect(icon).toHaveClass("text-gray-600");
  });

  test("icon has animation class", () => {
    render(<Spinner />);
    const icon = screen.getByTestId("spinner-container").querySelector("svg");
    expect(icon).toHaveClass("animate-spin");
  });

  test("renders without crashing", () => {
    expect(() => render(<Spinner />)).not.toThrow();
  });

  test("has no text content", () => {
    render(<Spinner />);
    const container = screen.getByTestId("spinner-container");
    expect(container).toHaveTextContent("");
  });

  test("container is a div element", () => {
    render(<Spinner />);
    const container = screen.getByTestId("spinner-container");
    expect(container.tagName).toBe("DIV");
  });

  test("icon is an svg element", () => {
    render(<Spinner />);
    const icon = screen.getByTestId("spinner-container").querySelector("svg");
    expect(icon?.tagName).toBe("svg");
  });

  test("maintains consistent styling across renders", () => {
    const { rerender } = render(<Spinner />);
    const firstContainer = screen.getByTestId("spinner-container");
    const firstClasses = firstContainer.className;
    
    rerender(<Spinner />);
    const secondContainer = screen.getByTestId("spinner-container");
    const secondClasses = secondContainer.className;
    
    expect(firstClasses).toBe(secondClasses);
  });

  test("can be rendered multiple times", () => {
    render(
      <div>
        <Spinner />
        <Spinner />
        <Spinner />
      </div>
    );
    
    const spinners = screen.getAllByTestId("spinner-container");
    expect(spinners).toHaveLength(3);
  });

  test("each spinner instance is independent", () => {
    render(
      <div>
        <Spinner />
        <Spinner />
      </div>
    );
    
    const spinners = screen.getAllByRole("generic");
    expect(spinners[0]).not.toBe(spinners[1]);
    expect(spinners[0]).toBeInTheDocument();
    expect(spinners[1]).toBeInTheDocument();
  });

  test("has proper semantic structure", () => {
    render(<Spinner />);
    const container = screen.getByTestId("spinner-container");
    const icon = container.querySelector("svg");
    
    // Container should contain exactly one icon
    expect(container.children).toHaveLength(1);
    expect(icon).toBeInTheDocument();
  });

  test("applies all expected CSS classes", () => {
    render(<Spinner />);
    const container = screen.getByTestId("spinner-container");
    const icon = container.querySelector("svg");
    
    const expectedContainerClasses = ["flex", "items-center", "justify-center", "p-4"];
    const expectedIconClasses = ["animate-spin", "text-gray-600", "h-6", "w-6"];
    
    expectedContainerClasses.forEach(className => {
      expect(container).toHaveClass(className);
    });
    
    expectedIconClasses.forEach(className => {
      expect(icon).toHaveClass(className);
    });
  });
});