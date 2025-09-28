import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Input } from "./Input";

describe("Input", () => {
  const defaultProps = {
    label: "Test Input",
    name: "testInput",
    type: "text",
  };

  test("renders with required props", () => {
    render(<Input {...defaultProps} />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("name", "testInput");
    expect(input).toHaveAttribute("type", "text");
  });

  test("renders with label when useLabel is true", () => {
    render(<Input {...defaultProps} useLabel />);
    expect(screen.getByText("Test Input")).toBeInTheDocument();
    expect(screen.getByLabelText("Test Input")).toBeInTheDocument();
  });

  test("does not render label when useLabel is false", () => {
    render(<Input {...defaultProps} useLabel={false} />);
    expect(screen.queryByText("Test Input")).not.toBeInTheDocument();
  });

  test("generates unique id from label", () => {
    render(<Input {...defaultProps} useLabel />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("id", "input-test-input");
  });

  test("uses custom id when provided", () => {
    const customId = "custom-input-id";
    render(<Input {...defaultProps} id={customId} useLabel />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("id", customId);
  });

  test("applies correct outline types", () => {
    const { rerender } = render(<Input {...defaultProps} outlineType="round" />);
    expect(screen.getByRole("textbox")).toHaveClass("border", "border-foreground/10", "rounded-sm");

    rerender(<Input {...defaultProps} outlineType="bottom" />);
    expect(screen.getByRole("textbox")).toHaveClass("border-b", "border-foreground/10");

    rerender(<Input {...defaultProps} outlineType="none" />);
    expect(screen.getByRole("textbox")).toHaveClass("border-none");
  });

  test("renders with icon", () => {
    const icon = <span data-testid="icon">★</span>;
    render(<Input {...defaultProps} icon={icon} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveClass("pl-10");
  });

  test("renders with right button", () => {
    const rightButton = (
      <button type="button" data-testid="right-button">
        Click
      </button>
    );
    render(<Input {...defaultProps} rightButton={rightButton} />);
    expect(screen.getByTestId("right-button")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveClass("pr-12");
  });

  test("applies correct themes", () => {
    const { rerender } = render(<Input {...defaultProps} theme="light" />);
    expect(screen.getByRole("textbox")).toHaveClass("bg-input", "text-input-foreground");

    rerender(<Input {...defaultProps} theme="dark" />);
    expect(screen.getByRole("textbox")).toHaveClass("bg-background", "text-foreground");

    rerender(<Input {...defaultProps} theme="transparent" />);
    expect(screen.getByRole("textbox")).toHaveClass("bg-transparent", "text-gray-700");
  });

  test("applies correct sizes", () => {
    const { rerender } = render(<Input {...defaultProps} inputSize="sm" />);
    expect(screen.getByRole("textbox")).toHaveClass("text-sm", "px-2", "py-3");

    rerender(<Input {...defaultProps} inputSize="md" />);
    expect(screen.getByRole("textbox")).toHaveClass("text-sm", "px-4", "py-4");

    rerender(<Input {...defaultProps} inputSize="lg" />);
    expect(screen.getByRole("textbox")).toHaveClass("text-base", "px-6", "py-5");
  });

  test("applies fullWidth style when fullWidth is true", () => {
    render(<Input {...defaultProps} fullWidth />);
    const container = screen.getByRole("textbox").closest("div")?.parentElement;
    expect(container).toHaveClass("w-full");
  });

  test("applies required attribute", () => {
    render(<Input {...defaultProps} required />);
    const input = screen.getByRole("textbox");
    expect(input).toBeRequired();
  });

  test("handles onChange events", () => {
    const handleChange = jest.fn();
    render(<Input {...defaultProps} onChange={handleChange} />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test" },
    });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("applies value prop", () => {
    render(<Input {...defaultProps} value="test value" onChange={() => {}} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("test value");
  });

  test("applies placeholder", () => {
    render(<Input {...defaultProps} placeholder="Enter text" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("placeholder", "Enter text");
  });

  test("applies custom input className", () => {
    render(<Input {...defaultProps} inputClassName="custom-input" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-input");
  });

  test("applies custom icon style", () => {
    const icon = <span data-testid="icon">★</span>;
    render(<Input {...defaultProps} icon={icon} iconStyle="text-red-500" onChange={() => {}} />);
    const iconElement = screen.getByTestId("icon").parentElement;
    expect(iconElement).toHaveClass("text-red-500");
  });

  test("applies custom right button style", () => {
    const rightButton = (
      <button type="button" data-testid="right-button">
        Click
      </button>
    );
    render(
      <Input
        {...defaultProps}
        rightButton={rightButton}
        rightButtonStyle="text-blue-500"
        onChange={() => {}}
      />
    );
    const buttonElement = screen.getByTestId("right-button").parentElement;
    expect(buttonElement).toHaveClass("text-blue-500");
  });

  test("applies custom label style", () => {
    render(<Input {...defaultProps} useLabel labelStyle="text-red-500" />);
    const label = screen.getByText("Test Input");
    expect(label).toHaveClass("text-red-500");
  });

  test("renders error message", () => {
    render(<Input {...defaultProps} errorMessage="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
    expect(screen.getByText("This field is required")).toHaveClass("text-red-500");
    expect(screen.getByText("This field is required")).toHaveAttribute("role", "alert");
  });

  test("renders helper text when no error", () => {
    render(<Input {...defaultProps} helperText="This is helpful text" />);
    expect(screen.getByText("This is helpful text")).toBeInTheDocument();
    expect(screen.getByText("This is helpful text")).toHaveClass("text-gray-500");
  });

  test("does not render helper text when error is present", () => {
    render(
      <Input
        {...defaultProps}
        helperText="This is helpful text"
        errorMessage="This field is required"
      />
    );
    expect(screen.queryByText("This is helpful text")).not.toBeInTheDocument();
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  test("applies error styling to input", () => {
    render(<Input {...defaultProps} errorMessage="Error message" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("border-red-500");
  });

  test("applies labelRow layout", () => {
    render(<Input {...defaultProps} useLabel labelRow />);
    const container = screen.getByRole("textbox").closest("div")?.parentElement;
    expect(container).toHaveClass("flex", "flex-row", "gap-4", "items-center", "mb-3");
  });

  test("applies correct ARIA attributes", () => {
    render(<Input {...defaultProps} useLabel errorMessage="Error" helperText="Helper" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-label", "Test Input");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute(
      "aria-describedby",
      "input-test-input-error input-test-input-helper"
    );
  });

  test("applies focus styles", () => {
    render(<Input {...defaultProps} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("focus:outline-none", "focus:ring-2", "focus:ring-ring");
  });

  test("applies rounded corners", () => {
    render(<Input {...defaultProps} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("rounded");
  });

  test("applies w-full class", () => {
    render(<Input {...defaultProps} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("w-full");
  });

  test("forwards additional props", () => {
    render(<Input {...defaultProps} data-testid="custom-input" />);
    expect(screen.getByTestId("custom-input")).toBeInTheDocument();
  });

  test("renders with number value", () => {
    render(<Input {...defaultProps} value={42} onChange={() => {}} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("42");
  });

  test("renders with React node error message", () => {
    const errorNode = <span data-testid="error-node">Custom error</span>;
    render(<Input {...defaultProps} errorMessage={errorNode} />);
    expect(screen.getByTestId("error-node")).toBeInTheDocument();
  });

  test("generates unique id for different labels", () => {
    const { rerender } = render(<Input label="First Input" name="first" type="text" useLabel />);
    expect(screen.getByRole("textbox")).toHaveAttribute("id", "input-first-input");

    rerender(<Input label="Second Input" name="second" type="text" useLabel />);
    expect(screen.getByRole("textbox")).toHaveAttribute("id", "input-second-input");
  });

  test("handles special characters in label for id generation", () => {
    render(<Input label="Input with Spaces & Special!" name="special" type="text" useLabel />);
    expect(screen.getByRole("textbox")).toHaveAttribute("id", "input-input-with-spaces-&-special!");
  });
});
