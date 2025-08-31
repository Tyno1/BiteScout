import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Spinner } from './Spinners';

const meta: Meta<typeof Spinner> = {
  title: 'Atoms/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const InContainer: Story = {
  render: () => (
    <div className="border border-gray-200 rounded-lg p-8 w-64 h-32">
      <Spinner />
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <Spinner />
      <p className="text-sm text-gray-600">Loading...</p>
    </div>
  ),
};

export const InButton: Story = {
  render: () => (
    <button 
      type="button"
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      disabled
    >
      <Spinner />
      <span>Loading...</span>
    </button>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 w-80">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Loading Data</h3>
      </div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
      </div>
      <div className="mt-4">
        <Spinner />
      </div>
    </div>
  ),
}; 