import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Atoms/Alert",
  component: Alert,
  argTypes: {
    status: {
      control: {
        type: "select",
        options: ["warning", "information", "error", "success"],
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Warning: Story = {
  args: {
    status: "warning",
    children: "This is a default alert",
  },
};

export const Information: Story = {
  args: {
    status: "information",
    children: "This is an information alert",
  },
};

export const ErrorAlert: Story = {
  args: {
    status: "error",
    children: "This is an error alert",
  },
};

export const Success: Story = {
  args: {
    status: "success",
    children: "This is a success alert",
  },
};
