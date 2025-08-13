import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from '@storybook/test';
import { Search } from 'lucide-react';
import { Button } from '../../Button';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Atoms/Select',
  component: Select,
  argTypes: {
    outlineType: {
      control: { type: 'select' },
      options: ['round', 'bottom', 'none'],
      description: 'The outline type of the select',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark', 'transparent'],
      description: 'The theme of the select',
    },
    inputSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the select',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const sampleOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
];

export const Default: Story = {
  args: {
    label: 'Select Option',
    name: 'select',
    options: sampleOptions,
    placeholder: 'Choose an option',
    fullWidth: false,
    required: false,
    useLabel: true,
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Search Category',
    name: 'category',
    options: sampleOptions,
    placeholder: 'Select category',
    icon: <Search className="h-4 w-4" />,
    useLabel: true,
  },
};

export const WithRightButton: Story = {
  args: {
    label: 'Select with Action',
    name: 'select-with-button',
    options: sampleOptions,
    placeholder: 'Choose option',
    rightButton: <Button onClick={fn()} variant="plain" text="Add" color="primary" size="sm" />,
    useLabel: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Select',
    name: 'full-width-select',
    options: sampleOptions,
    placeholder: 'Select from options',
    fullWidth: true,
    useLabel: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Select with Error',
    name: 'error-select',
    options: sampleOptions,
    placeholder: 'Choose option',
    errorMessage: 'This field is required',
    useLabel: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Select with Helper',
    name: 'helper-select',
    options: sampleOptions,
    placeholder: 'Choose option',
    helperText: 'Please select the most appropriate option for your needs',
    useLabel: true,
  },
}; 