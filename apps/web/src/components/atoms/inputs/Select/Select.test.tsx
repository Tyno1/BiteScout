import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Select } from "./Select";

describe("Select", () => {
  const defaultProps = {
    label: "Test Select",
    name: "testSelect",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  };

  test("renders with required props", () => {
    render(<Select {...defaultProps} />);
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute("name", "testSelect");
  });

  test("renders with label when useLabel is true", () => {
    render(<Select {...defaultProps} useLabel />);
    expect(screen.getByText("Test Select")).toBeInTheDocument();
    expect(screen.getByLabelText("Test Select")).toBeInTheDocument();
  });

  test("does not render label when useLabel is false", () => {
    render(<Select {...defaultProps} useLabel={false} />);
    expect(screen.queryByText("Test Select")).not.toBeInTheDocument();
  });

  test("generates unique id from label", () => {
    render(<Select {...defaultProps} useLabel />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveAttribute("id", "select-test-select");
  });

  test("uses custom id when provided", () => {
    const customId = "custom-select-id";
    render(<Select {...defaultProps} id={customId} useLabel />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveAttribute("id", customId);
  });

  test("renders all options", () => {
    render(<Select {...defaultProps} />);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  test("renders placeholder option when provided", () => {
    render(<Select {...defaultProps} placeholder="Choose an option" />);
    expect(screen.getByText("Choose an option")).toBeInTheDocument();
  });

  test("does not render placeholder option when not provided", () => {
    render(<Select {...defaultProps} />);
    expect(screen.queryByText("Choose an option")).not.toBeInTheDocument();
  });

  test("applies correct outline types", () => {
    const { rerender } = render(<Select {...defaultProps} outlineType="round" />);
    expect(screen.getByRole("combobox")).toHaveClass(
      "border",
      "border-foreground/10",
      "rounded-sm"
    );

    rerender(<Select {...defaultProps} outlineType="bottom" />);
    expect(screen.getByRole("combobox")).toHaveClass("border-b", "border-foreground/10");

    rerender(<Select {...defaultProps} outlineType="none" />);
    expect(screen.getByRole("combobox")).toHaveClass("border-none");
  });

  test("renders with icon", () => {
    const icon = <span data-testid="icon">★</span>;
    render(<Select {...defaultProps} icon={icon} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveClass("pl-10");
  });

  test("renders with right button", () => {
    const rightButton = <div data-testid="right-button">Click</div>;
    render(<Select {...defaultProps} rightButton={rightButton} />);
    expect(screen.getByTestId("right-button")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveClass("pr-12");
  });

  test("applies correct themes", () => {
    const { rerender } = render(<Select {...defaultProps} theme="light" />);
    expect(screen.getByRole("combobox")).toHaveClass("bg-input", "text-input-foreground");

    rerender(<Select {...defaultProps} theme="dark" />);
    expect(screen.getByRole("combobox")).toHaveClass("bg-black", "text-white");

    rerender(<Select {...defaultProps} theme="transparent" />);
    expect(screen.getByRole("combobox")).toHaveClass("bg-transparent", "text-gray-700");
  });

  test("applies correct sizes", () => {
    const { rerender } = render(<Select {...defaultProps} inputSize="sm" />);
    expect(screen.getByRole("combobox")).toHaveClass("text-sm", "px-2", "py-3");

    rerender(<Select {...defaultProps} inputSize="md" />);
    expect(screen.getByRole("combobox")).toHaveClass("text-base", "px-4", "py-4");

    rerender(<Select {...defaultProps} inputSize="lg" />);
    expect(screen.getByRole("combobox")).toHaveClass("text-lg", "px-6", "py-5");
  });

  test("applies fullWidth style when fullWidth is true", () => {
    render(<Select {...defaultProps} fullWidth />);
    const container = screen.getByRole("combobox").closest("div")?.parentElement;
    expect(container).toHaveClass("w-full");
  });

  test("applies required attribute", () => {
    render(<Select {...defaultProps} required />);
    const select = screen.getByRole("combobox");
    expect(select).toBeRequired();
  });

  test("handles onChange events", () => {
    const handleChange = jest.fn();
    render(<Select {...defaultProps} onChange={handleChange} />);

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "option1" },
    });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("handles right button click events", () => {
    const handleRightButtonClick = jest.fn();
    const rightButton = <div data-testid="right-button">Click</div>;
    render(
      <Select
        {...defaultProps}
        rightButton={rightButton}
        rightButtonOnClick={handleRightButtonClick}
      />
    );

    fireEvent.click(screen.getByTestId("right-button"));
    expect(handleRightButtonClick).toHaveBeenCalledTimes(1);
  });

  test("applies value prop", () => {
    render(<Select {...defaultProps} value="option2" />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveValue("option2");
  });

  test("applies custom select className", () => {
    render(<Select {...defaultProps} selectClassName="custom-select" />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveClass("custom-select");
  });

  test("applies custom className to container", () => {
    render(<Select {...defaultProps} className="custom-container" />);
    const container = screen.getByRole("combobox").closest("div")?.parentElement;
    expect(container).toHaveClass("custom-container");
  });

  test("applies custom icon style", () => {
    const icon = <span data-testid="icon">★</span>;
    render(<Select {...defaultProps} icon={icon} iconStyle="text-red-500" />);
    const iconElement = screen.getByTestId("icon").parentElement;
    expect(iconElement).toHaveClass("text-red-500");
  });

  test("applies custom right button style", () => {
    const rightButton = <div data-testid="right-button">Click</div>;
    render(<Select {...defaultProps} rightButton={rightButton} rightButtonStyle="text-blue-500" />);
    const buttonElement = screen.getByTestId("right-button").parentElement;
    expect(buttonElement).toHaveClass("text-blue-500");
  });

  test("applies custom label style", () => {
    render(<Select {...defaultProps} useLabel labelStyle="text-red-500" />);
    const label = screen.getByText("Test Select");
    expect(label).toHaveClass("text-red-500");
  });

  test("renders error message", () => {
    render(<Select {...defaultProps} errorMessage="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
    expect(screen.getByText("This field is required")).toHaveClass("text-red-500");
    expect(screen.getByText("This field is required")).toHaveAttribute("role", "alert");
  });

  test("renders helper text when no error", () => {
    render(<Select {...defaultProps} helperText="This is helpful text" />);
    expect(screen.getByText("This is helpful text")).toBeInTheDocument();
    expect(screen.getByText("This is helpful text")).toHaveClass("text-gray-500");
  });

  test("does not render helper text when error is present", () => {
    render(
      <Select
        {...defaultProps}
        helperText="This is helpful text"
        errorMessage="This field is required"
      />
    );
    expect(screen.queryByText("This is helpful text")).not.toBeInTheDocument();
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  test("applies error styling to select", () => {
    render(<Select {...defaultProps} errorMessage="Error message" />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveClass("border-red-500");
  });

  test("applies labelRow layout", () => {
    render(<Select {...defaultProps} useLabel labelRow />);
    const container = screen.getByRole("combobox").closest("div")?.parentElement;
    expect(container).toHaveClass("flex", "flex-row", "gap-4", "items-center", "mb-3");
  });

  test("applies correct ARIA attributes", () => {
    render(<Select {...defaultProps} useLabel errorMessage="Error" helperText="Helper" />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveAttribute("aria-label", "Test Select");
    expect(select).toHaveAttribute(
      "aria-describedby",
      "select-test-select-error select-test-select-helper"
    );
  });

  test("applies focus styles", () => {
    render(<Select {...defaultProps} />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveClass("focus:outline-none", "focus:ring-2", "focus:ring-ring");
  });

  test("applies rounded corners", () => {
    render(<Select {...defaultProps} />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveClass("rounded-lg");
  });

  test("applies w-full class", () => {
    render(<Select {...defaultProps} />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveClass("w-full");
  });

  test("applies cursor pointer", () => {
    render(<Select {...defaultProps} />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveClass("cursor-pointer");
  });

  test("applies appearance none", () => {
    render(<Select {...defaultProps} />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveClass("appearance-none");
  });

  test("renders chevron down icon", () => {
    render(<Select {...defaultProps} />);
    const chevron = screen.getByRole("combobox").parentElement?.querySelector("svg");
    expect(chevron).toBeInTheDocument();
  });

  test("forwards additional props", () => {
    render(<Select {...defaultProps} data-testid="custom-select" />);
    expect(screen.getByTestId("custom-select")).toBeInTheDocument();
  });

  test("handles empty options array", () => {
    render(<Select {...defaultProps} options={[]} />);
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select.children).toHaveLength(0);
  });

  test("handles options with special characters", () => {
    const specialOptions = [
      { value: "option-1", label: "Option & Special!" },
      { value: "option-2", label: "Option with <script>" },
    ];
    render(<Select {...defaultProps} options={specialOptions} />);
    expect(screen.getByText("Option & Special!")).toBeInTheDocument();
    expect(screen.getByText("Option with <script>")).toBeInTheDocument();
  });

  test("handles onChange with first option selection", () => {
    const handleChange = jest.fn();
    render(<Select {...defaultProps} onChange={handleChange} />);

    // Select the first option
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "option1" },
    });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "option1",
        }),
      })
    );
  });

  test("applies right button aria label", () => {
    const rightButton = <div data-testid="right-button">Click</div>;
    render(<Select {...defaultProps} rightButton={rightButton} />);
    const button = screen.getByTestId("right-button").parentElement;
    expect(button).toHaveAttribute("aria-label", "Action button for Test Select");
  });

  test("generates unique id for different labels", () => {
    const { rerender } = render(<Select label="First Select" name="first" options={[]} useLabel />);
    expect(screen.getByRole("combobox")).toHaveAttribute("id", "select-first-select");

    rerender(<Select label="Second Select" name="second" options={[]} useLabel />);
    expect(screen.getByRole("combobox")).toHaveAttribute("id", "select-second-select");
  });

  test("handles special characters in label for id generation", () => {
    render(<Select label="Select with Spaces & Special!" name="special" options={[]} useLabel />);
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "id",
      "select-select-with-spaces-&-special!"
    );
  });
});
