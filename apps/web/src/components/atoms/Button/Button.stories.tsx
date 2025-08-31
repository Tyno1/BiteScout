import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "@storybook/test";
import { Trash } from "lucide-react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
	title: "Atoms/Button",
	component: Button,
	argTypes: {
		color: {
			control: {
				type: "select",
				options: [
					"primary",
					"secondary",
					"danger",
					"success",
					"neutral",
				],
			},
		},
		variant: {
			control: {
				type: "select",
				options: ["solid", "outline", "plain", "glass"],
			},
		},
		size: {
			control: {
				type: "select",
				options: ["xs", "sm", "md", "lg"],
			},
		},
		disabled: {
			control: {
				type: "boolean",
			},
		},
		fullWidth: {
			control: {
				type: "boolean",
			},
		},
		type: {
			control: {
				type: "select",
				options: ["button", "submit", "reset"],
			},
		},
		text: {
			control: "text",
			description: "Button text content",
		},
		IconAfter: {
			control: false, // or "object", but false avoids control UI for ReactNode
		  },
		  IconBefore: {
			control: false,
		  },
	},
	args: {
		onClick: fn(),
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		text: "Button",
		color: "primary",
		variant: "solid",
		size: "md",
		disabled: false,
		fullWidth: false,
		type: "button",
	},
};

export const IconAfter: Story = {
    args: {
        text: "Button",
        color: "primary",
        variant: "solid",
        size: "md",
        IconAfter:<Trash />,
    },
};

export const IconBefore: Story = {
    args: {
        text: "Button",
        color: "primary",
        variant: "solid",
        size: "md",
        IconBefore:<Trash />,
    },
};
