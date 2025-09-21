import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Search } from "lucide-react";
import { Button } from "../../Button";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "secondary", "danger", "success", "neutral"],
      description: "The color theme of the input",
    },
    outlineType: {
      control: "select",
      options: ["round", "bottom", "none"],
      description: "The outline type of the input",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Input",
    name: "input",
    type: "text",
    placeholder: "Enter your input",
    fullWidth: false,
    required: false,
    icon: <Search className="h-4 w-4" color="primary" />,
    rightButton: <Button onClick={fn()} variant="plain" text="Search" color="neutral" size="sm" />,
  },
};

export const WithIcon: Story = {
  args: {
    label: "Input",
    name: "input",
    type: "text",
    placeholder: "Enter your input",
    fullWidth: false,
    required: false,
    icon: <Search className="h-4 w-4" color="primary" />,
  },
};
export const WithErrorMessage: Story = {
  args: {
    label: "Input",
    name: "input",
    type: "text",
    placeholder: "Enter your input",
    fullWidth: false,
    required: false,
    errorMessage: "This is an error message",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Input",
    name: "input",
    type: "text",
    placeholder: "Enter your input",
    fullWidth: false,
    required: false,
    helperText: "This is a helper text",
  },
};
