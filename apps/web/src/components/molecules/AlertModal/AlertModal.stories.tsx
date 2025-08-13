import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { AlertModal, type AlertModalProps } from "./AlertModal";

const meta: Meta<typeof AlertModal> = {
  title: "Components/Molecules/AlertModal",
  component: AlertModal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A confirmation modal component for critical user actions. Provides a clear interface for confirming or canceling destructive operations like deletion.",
      },
    },
  },
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Controls whether the modal is visible",
    },
    title: {
      control: "text",
      description: "Title displayed at the top of the modal",
    },
    children: {
      control: "text",
      description: "Content/message to display in the modal body",
    },
    confirmText: {
      control: "text",
      description: "Text for the primary action button",
    },
    cancelText: {
      control: "text",
      description: "Text for the secondary action button",
    },
    confirmVariant: {
      control: "select",
      options: ["primary", "danger", "success", "neutral"],
      description: "Color variant for the confirm button",
    },
    cancelVariant: {
      control: "select",
      options: ["primary", "secondary", "danger", "success", "neutral"],
      description: "Color variant for the cancel button",
    },
    isLoading: {
      control: "boolean",
      description: "Shows loading state on confirm button",
    },
    disableBackdropClose: {
      control: "boolean",
      description: "Prevents closing when clicking outside the modal",
    },
    disableEscapeClose: {
      control: "boolean",
      description: "Prevents closing when pressing the Escape key",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AlertModal>;

// Wrapper component to handle state for stories
function AlertModalWrapper(props: Partial<AlertModalProps>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Open Alert Modal
      </button>
      <AlertModal
        title={props.title || "Default Title"}
        {...props}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {
          console.log("Confirmed");
          setIsOpen(false);
        }}
      >
        {props.children || "Default content"}
      </AlertModal>
    </div>
  );
}

export const Default: Story = {
  render: (args) => <AlertModalWrapper {...args} />,
  args: {
    title: "Confirm Action",
    children: "Are you sure you want to proceed with this action?",
    confirmText: "Confirm",
    cancelText: "Cancel",
    confirmVariant: "primary",
    cancelVariant: "secondary",
  },
};

export const DeleteConfirmation: Story = {
  render: (args) => <AlertModalWrapper {...args} />,
  args: {
    title: "Delete Item",
    children: (
      <div>
        <p className="mb-2">Are you sure you want to delete this item?</p>
        <p className="text-sm text-red-600 font-medium">
          This action cannot be undone.
        </p>
      </div>
    ),
    confirmText: "Delete",
    cancelText: "Cancel",
    confirmVariant: "danger",
    cancelVariant: "secondary",
  },
};

export const LoadingState: Story = {
  render: (args) => <AlertModalWrapper {...args} />,
  args: {
    title: "Processing Request",
    children: "Please wait while we process your request...",
    confirmText: "Submit",
    cancelText: "Cancel",
    confirmVariant: "primary",
    cancelVariant: "secondary",
    isLoading: true,
  },
};

export const NoBackdropClose: Story = {
  render: (args) => <AlertModalWrapper {...args} />,
  args: {
    title: "Important Notice",
    children: (
      <div>
        <p className="mb-2">This is a critical action that requires your attention.</p>
        <p className="text-sm text-amber-600">
          You must choose an action to continue.
        </p>
      </div>
    ),
    confirmText: "I Understand",
    cancelText: "Go Back",
    confirmVariant: "primary",
    cancelVariant: "secondary",
    disableBackdropClose: true,
    disableEscapeClose: true,
  },
};

export const CustomContent: Story = {
  render: (args) => <AlertModalWrapper {...args} />,
  args: {
    title: "Save Changes",
    children: (
      <div className="space-y-3">
        <p>You have unsaved changes in your document.</p>
        <ul className="text-sm space-y-1 pl-4">
          <li>• Modified title</li>
          <li>• Updated description</li>
          <li>• Added 3 new items</li>
        </ul>
        <p className="text-sm font-medium">What would you like to do?</p>
      </div>
    ),
    confirmText: "Save Changes",
    cancelText: "Discard",
    confirmVariant: "success",
    cancelVariant: "danger",
  },
};

export const LongContent: Story = {
  render: (args) => <AlertModalWrapper {...args} />,
  args: {
    title: "Terms and Conditions",
    children: (
      <div className="space-y-3 max-h-48 overflow-y-auto">
        <p>
          By continuing, you agree to our terms and conditions. Please read the
          following carefully:
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p className="font-medium">
          Do you accept these terms and conditions?
        </p>
      </div>
    ),
    confirmText: "I Accept",
    cancelText: "Decline",
    confirmVariant: "primary",
    cancelVariant: "secondary",
  },
}; 