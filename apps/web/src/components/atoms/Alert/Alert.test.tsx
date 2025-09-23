import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Alert } from "./Alert";

describe("Alert", () => {
  test("Should render with warning status", () => {
    render(<Alert status="warning">Test Alert</Alert>);
    expect(screen.getByText("Test Alert")).toBeInTheDocument();
  });

  test("Should render with success status", () => {
    render(<Alert status="success">Success message</Alert>);
    expect(screen.getByText("Success message")).toBeInTheDocument();
  });

  test("Should render with error status", () => {
    render(<Alert status="error">Error message</Alert>);
    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  test("Should render with info status", () => {
    render(<Alert status="information">Info message</Alert>);
    expect(screen.getByText("Info message")).toBeInTheDocument();
  });

  test("Should apply correct CSS classes for different statuses", () => {
    const { rerender } = render(<Alert status="warning">Warning</Alert>);
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toHaveClass("border-yellow-200", "bg-yellow-50");

    rerender(<Alert status="success">Success</Alert>);
    expect(alertElement).toHaveClass("border-green-200", "bg-green-50");

    rerender(<Alert status="error">Error</Alert>);
    expect(alertElement).toHaveClass("border-red-200", "bg-red-50");

    rerender(<Alert status="information">Info</Alert>);
    expect(alertElement).toHaveClass("border-blue-200", "bg-blue-50");
  });

  test("Should render with custom className", () => {
    render(<Alert status="warning" className="custom-class">Test</Alert>);
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toHaveClass("custom-class");
  });
});
