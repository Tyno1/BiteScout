import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'success', 'neutral'],
      description: 'The color theme of the badge',
    },
    variant: {
      control: { type: 'select' },
      options: ['solid', 'outline', 'plain', 'glass'],
      description: 'The visual style variant',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md'],
      description: 'The size of the badge',
    },
    children: {
      control: 'text',
      description: 'The content to display inside the badge',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
    color: 'neutral',
    variant: 'solid',
    size: 'sm',
  },
};
