import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { MessageSquare, Send } from "lucide-react";
import { Button } from "../../Button";
import { Textarea } from "./TextArea";

const meta: Meta<typeof Textarea> = {
  title: "Atoms/TextArea",
  component: Textarea,
  argTypes: {
    outlineType: {
      control: { type: "select" },
      options: ["round", "bottom", "none"],
      description: "The outline type of the textarea",
    },
    theme: {
      control: { type: "select" },
      options: ["light", "dark", "transparent"],
      description: "The theme of the textarea",
    },
    inputSize: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "The size of the textarea",
    },
    rows: {
      control: { type: "number", min: 1, max: 10 },
      description: "Number of visible rows",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Description",
    name: "description",
    placeholder: "Enter your description here...",
    fullWidth: false,
    required: false,
    useLabel: true,
    rows: 4,
  },
};

export const WithIcon: Story = {
  args: {
    label: "Message",
    name: "message",
    placeholder: "Type your message...",
    icon: <MessageSquare className="h-4 w-4" />,
    useLabel: true,
    rows: 4,
  },
};

export const WithRightButton: Story = {
  args: {
    label: "Comment",
    name: "comment",
    placeholder: "Write your comment...",
    rightButton: (
      <Button
        onClick={fn()}
        variant="plain"
        text="Send"
        color="primary"
        size="sm"
        IconBefore={<Send className="h-4 w-4" />}
      />
    ),
    useLabel: true,
    rows: 4,
  },
};

export const FullWidth: Story = {
  args: {
    label: "Full Width TextArea",
    name: "full-width-textarea",
    placeholder: "This textarea takes the full width of its container...",
    fullWidth: true,
    useLabel: true,
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    label: "TextArea with Error",
    name: "error-textarea",
    placeholder: "Enter text here...",
    errorMessage: "This field is required and must be at least 10 characters",
    useLabel: true,
    rows: 4,
  },
};

export const WithHelperText: Story = {
  args: {
    label: "TextArea with Helper",
    name: "helper-textarea",
    placeholder: "Enter your thoughts...",
    helperText: "Please provide a detailed description of your experience",
    useLabel: true,
    rows: 4,
  },
};

export const LargeTextArea: Story = {
  args: {
    label: "Large TextArea",
    name: "large-textarea",
    placeholder: "This is a larger textarea with more rows...",
    rows: 8,
    useLabel: true,
  },
};

export const SmallTextArea: Story = {
  args: {
    label: "Small TextArea",
    name: "small-textarea",
    placeholder: "Short text here...",
    rows: 2,
    useLabel: true,
  },
};
