import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Textarea } from "./TextArea";

describe("Textarea", () => {
	const defaultProps = {
		label: "Test Textarea",
		name: "testTextarea",
	};

	test("renders with required props", () => {
		render(<Textarea {...defaultProps} />);
		const textarea = screen.getByRole("textbox");
		expect(textarea).toBeInTheDocument();
		expect(textarea).toHaveAttribute("name", "testTextarea");
	});

	test("renders with label when useLabel is true", () => {
		render(<Textarea {...defaultProps} useLabel />);
		expect(screen.getByText("Test Textarea")).toBeInTheDocument();
		expect(screen.getByLabelText("Test Textarea")).toBeInTheDocument();
	});

	test("does not render label when useLabel is false", () => {
		render(<Textarea {...defaultProps} useLabel={false} />);
		expect(screen.queryByText("Test Textarea")).not.toBeInTheDocument();
	});

	test("generates unique id from label", () => {
		render(<Textarea {...defaultProps} useLabel />);
		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveAttribute("id", "textarea-test-textarea");
	});

	test("uses custom id when provided", () => {
		render(<Textarea {...defaultProps} id="custom-id" useLabel />);
		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveAttribute("id", "custom-id");
	});

	test("applies correct outline types", () => {
		const { rerender } = render(
			<Textarea {...defaultProps} outlineType="round" />,
		);
		expect(screen.getByRole("textbox")).toHaveClass(
			"border",
			"border-foreground/10",
			"rounded-sm",
		);

		rerender(<Textarea {...defaultProps} outlineType="bottom" />);
		expect(screen.getByRole("textbox")).toHaveClass(
			"border-b",
			"border-foreground/10",
		);

		rerender(<Textarea {...defaultProps} outlineType="none" />);
		expect(screen.getByRole("textbox")).toHaveClass("border-none");
	});

	test("renders with icon", () => {
		const icon = <span data-testid="icon">★</span>;
		render(<Textarea {...defaultProps} icon={icon} />);
		expect(screen.getByTestId("icon")).toBeInTheDocument();
		expect(screen.getByRole("textbox")).toHaveClass("pl-10");
	});

	test("renders with right button", () => {
		const rightButton = (
			<div data-testid="right-button">
				Click
			</div>
		);
		render(<Textarea {...defaultProps} rightButton={rightButton} />);
		expect(screen.getByTestId("right-button")).toBeInTheDocument();
		expect(screen.getByRole("textbox")).toHaveClass("pr-12");
	});

	test("applies correct themes", () => {
		const { rerender } = render(<Textarea {...defaultProps} theme="light" />);
		expect(screen.getByRole("textbox")).toHaveClass(
			"bg-input",
			"text-input-foreground",
		);

		rerender(<Textarea {...defaultProps} theme="dark" />);
		expect(screen.getByRole("textbox")).toHaveClass("bg-black", "text-white");

		rerender(<Textarea {...defaultProps} theme="transparent" />);
		expect(screen.getByRole("textbox")).toHaveClass(
			"bg-transparent",
			"text-gray-700",
		);
	});

	test("applies correct sizes", () => {
		const { rerender } = render(<Textarea {...defaultProps} inputSize="sm" />);
		expect(screen.getByRole("textbox")).toHaveClass("text-sm", "px-2", "py-3");

		rerender(<Textarea {...defaultProps} inputSize="md" />);
		expect(screen.getByRole("textbox")).toHaveClass(
			"text-base",
			"px-4",
			"py-4",
		);

		rerender(<Textarea {...defaultProps} inputSize="lg" />);
		expect(screen.getByRole("textbox")).toHaveClass("text-lg", "px-6", "py-5");
	});

	test("applies fullWidth style when fullWidth is true", () => {
		render(<Textarea {...defaultProps} fullWidth />);
		const container = screen.getByRole("textbox").closest("div").parentElement;
		expect(container).toHaveClass("w-full");
	});

	test("applies required attribute", () => {
		render(<Textarea {...defaultProps} required />);
		const textarea = screen.getByRole("textbox");
		expect(textarea).toBeRequired();
	});

	test("handles onChange events", () => {
		const handleChange = jest.fn();
		render(<Textarea {...defaultProps} onChange={handleChange} />);

		fireEvent.change(screen.getByRole("textbox"), {
			target: { value: "test" },
		});
		expect(handleChange).toHaveBeenCalledTimes(1);
	});

	test("handles right button click events", () => {
		const handleRightButtonClick = jest.fn();
		const rightButton = (
			<div data-testid="right-button">
				Click
			</div>
		);
		render(
			<Textarea
				{...defaultProps}
				rightButton={rightButton}
				rightButtonOnClick={handleRightButtonClick}
			/>,
		);

		fireEvent.click(screen.getByTestId("right-button"));
		expect(handleRightButtonClick).toHaveBeenCalledTimes(1);
	});

	test("applies value prop", () => {
		render(<Textarea {...defaultProps} value="test value" onChange={() => {}} />);
		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveValue("test value");
	});

	test("applies placeholder", () => {
		render(<Textarea {...defaultProps} placeholder="Enter text" />);
		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveAttribute("placeholder", "Enter text");
	});

	test("applies custom textarea className", () => {
		render(<Textarea {...defaultProps} textareaClassName="custom-textarea" />);
		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveClass("custom-textarea");
	});

	test("applies custom icon style", () => {
		const icon = <span data-testid="icon">★</span>;
		render(<Textarea {...defaultProps} icon={icon} iconStyle="text-red-500" />);
		const iconElement = screen.getByTestId("icon").parentElement;
		expect(iconElement).toHaveClass("text-red-500");
	});

	test("applies custom right button style", () => {
		const rightButton = (
			<div data-testid="right-button">
				Click
			</div>
		);
		render(
			<Textarea
				{...defaultProps}
				rightButton={rightButton}
				rightButtonStyle="text-blue-500"
			/>,
		);
		const buttonElement = screen.getByTestId("right-button").parentElement;
		expect(buttonElement).toHaveClass("text-blue-500");
	});

	test("applies custom label style", () => {
		render(<Textarea {...defaultProps} useLabel labelStyle="text-red-500" />);
		const label = screen.getByText("Test Textarea");
		expect(label).toHaveClass("text-red-500");
	});

	test("renders error message", () => {
		render(
			<Textarea {...defaultProps} errorMessage="This field is required" />,
		);
		expect(screen.getByText("This field is required")).toBeInTheDocument();
		expect(screen.getByText("This field is required")).toHaveClass(
			"text-red-500",
		);
		expect(screen.getByText("This field is required")).toHaveAttribute(
			"role",
			"alert",
		);
	});

	test("renders helper text when no error", () => {
		render(<Textarea {...defaultProps} helperText="This is helpful text" />);
		expect(screen.getByText("This is helpful text")).toBeInTheDocument();
		expect(screen.getByText("This is helpful text")).toHaveClass(
			"text-gray-500",
		);
	});

	test("does not render helper text when error is present", () => {
		render(
			<Textarea
				{...defaultProps}
				helperText="This is helpful text"
				errorMessage="This field is required"
			/>,
		);
		expect(screen.queryByText("This is helpful text")).not.toBeInTheDocument();
		expect(screen.getByText("This field is required")).toBeInTheDocument();
	});

	test("applies error styling to textarea", () => {
		render(<Textarea {...defaultProps} errorMessage="Error message" />);
		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveClass("border-red-500");
	});

	test("applies labelRow layout", () => {
		render(<Textarea {...defaultProps} useLabel labelRow />);
		const container = screen.getByRole("textbox").closest("div").parentElement;
		expect(container).toHaveClass(
			"flex",
			"flex-row",
			"gap-4",
			"items-center",
			"mb-3",
		);
	});

	test("applies correct ARIA attributes", () => {
		render(
			<Textarea
				{...defaultProps}
				useLabel
				errorMessage="Error"
				helperText="Helper"
			/>,
		);
		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveAttribute("aria-label", "Test Textarea");
		expect(textarea).toHaveAttribute(
			"aria-describedby",
			"textarea-test-textarea-error textarea-test-textarea-helper",
		);
	});

	test("applies focus styles", () => {
		render(<Textarea {...defaultProps} />);
		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveClass(
			"focus:outline-none",
			"focus:ring-2",
			"focus:ring-ring",
		);
	});

	test("applies rounded corners", () => {
		render(<Textarea {...defaultProps} />);
		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveClass("rounded-lg");
	});

	test("applies w-full class", () => {
		render(<Textarea {...defaultProps} />);
		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveClass("w-full");
	});

	test("applies resize-none class", () => {
		render(<Textarea {...defaultProps} />);
		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveClass("resize-none");
	});

	test("applies default rows", () => {
		render(<Textarea {...defaultProps} />);
		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveAttribute("rows", "4");
	});

	test("applies custom rows", () => {
		render(<Textarea {...defaultProps} rows={6} />);
		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveAttribute("rows", "6");
	});

	test("applies right button aria label", () => {
		const rightButton = (
			<div data-testid="right-button">
				Click
			</div>
		);
		render(<Textarea {...defaultProps} rightButton={rightButton} />);
		const button = screen.getByTestId("right-button").parentElement;
		expect(button).toHaveAttribute(
			"aria-label",
			"Action button for Test Textarea",
		);
	});

	test("forwards additional props", () => {
		render(<Textarea {...defaultProps} data-testid="custom-textarea" />);
		expect(screen.getByTestId("custom-textarea")).toBeInTheDocument();
	});

	test("renders with multiline text", () => {
		const multilineText = "Line 1\nLine 2\nLine 3";
		render(<Textarea {...defaultProps} value={multilineText} onChange={() => {}} />);
		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveValue(multilineText);
	});

	test("handles empty value", () => {
		render(<Textarea {...defaultProps} value="" onChange={() => {}} />);
		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveValue("");
	});

	test("generates unique id for different labels", () => {
		const { rerender } = render(
			<Textarea label="First Textarea" name="first" useLabel />,
		);
		expect(screen.getByRole("textbox")).toHaveAttribute(
			"id",
			"textarea-first-textarea",
		);

		rerender(<Textarea label="Second Textarea" name="second" useLabel />);
		expect(screen.getByRole("textbox")).toHaveAttribute(
			"id",
			"textarea-second-textarea",
		);
	});

	test("handles special characters in label for id generation", () => {
		render(
			<Textarea
				label="Textarea with Spaces & Special!"
				name="special"
				useLabel
			/>,
		);
		expect(screen.getByRole("textbox")).toHaveAttribute(
			"id",
			"textarea-textarea-with-spaces-&-special!",
		);
	});

	test("applies correct icon positioning", () => {
		const icon = <span data-testid="icon">★</span>;
		render(<Textarea {...defaultProps} icon={icon} />);
		const iconElement = screen.getByTestId("icon").parentElement;
		expect(iconElement).toHaveClass("absolute", "top-4", "left-3", "transform");
	});

	test("applies correct right button positioning", () => {
		const rightButton = (
			<div data-testid="right-button">
				Click
			</div>
		);
		render(<Textarea {...defaultProps} rightButton={rightButton} />);
		const buttonElement = screen.getByTestId("right-button").parentElement;
		expect(buttonElement).toHaveClass("absolute", "top-4", "right-3");
	});

	test("handles long text content", () => {
		const longText =
			"This is a very long text that should be handled properly by the textarea component. ".repeat(
				10,
			);
		render(<Textarea {...defaultProps} value={longText} onChange={() => {}} />);
		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveValue(longText);
	});

	test("applies disabled state", () => {
		render(<Textarea {...defaultProps} disabled />);
		const textarea = screen.getByRole("textbox");
		expect(textarea).toBeDisabled();
	});

	test("applies readOnly state", () => {
		render(<Textarea {...defaultProps} readOnly />);
		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveAttribute("readOnly");
	});
});
