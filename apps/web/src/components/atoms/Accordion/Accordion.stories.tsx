import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Atoms/Accordion',
  component: Accordion,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'elevated'],
      description: 'Visual style variant of the accordion',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the accordion items',
    },
    allowMultiple: {
      control: { type: 'boolean' },
      description: 'Whether multiple items can be open simultaneously',
    },
    defaultOpen: {
      control: { type: 'object' },
      description: 'Array of item IDs that should be open by default',
    },
    onItemToggle: {
      action: 'item toggled',
      description: 'Callback fired when an accordion item is toggled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  {
    id: '1',
    title: 'How do I reset my password?',
    content: 'You can reset your password through the login screen or contact our support team for assistance. We\'ll guide you through the process step by step.',
  },
  {
    id: '2',
    title: 'How do I report inappropriate content?',
    content: 'Use the report button on any post or contact our moderation team directly. We take content moderation seriously and respond to reports within 24 hours.',
  },
  {
    id: '3',
    title: 'How can restaurants join BiteScout?',
    content: 'Restaurants can apply through our partnership portal or contact our business development team. We\'ll help you get set up and start reaching new customers.',
  },
  {
    id: '4',
    title: 'Is BiteScout available internationally?',
    content: 'Currently launching in Cardiff, Wales with plans to expand to other UK cities and internationally. Stay tuned for updates on new locations.',
  },
  {
    id: '5',
    title: 'What payment methods do you accept?',
    content: 'We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely through our trusted payment partners.',
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    variant: 'default',
    size: 'md',
    allowMultiple: false,
  },
};

export const Bordered: Story = {
  args: {
    items: sampleItems,
    variant: 'bordered',
    size: 'md',
    allowMultiple: false,
  },
};

export const Elevated: Story = {
  args: {
    items: sampleItems,
    variant: 'elevated',
    size: 'md',
    allowMultiple: false,
  },
};

export const Small: Story = {
  args: {
    items: sampleItems,
    variant: 'default',
    size: 'sm',
    allowMultiple: false,
  },
};

export const Large: Story = {
  args: {
    items: sampleItems,
    variant: 'default',
    size: 'lg',
    allowMultiple: false,
  },
};

export const MultipleOpen: Story = {
  args: {
    items: sampleItems,
    variant: 'default',
    size: 'md',
    allowMultiple: true,
    defaultOpen: ['1', '3'],
  },
};

export const WithDefaultOpen: Story = {
  args: {
    items: sampleItems,
    variant: 'bordered',
    size: 'md',
    allowMultiple: false,
    defaultOpen: ['2'],
  },
};

export const WithDisabledItems: Story = {
  args: {
    items: [
      ...sampleItems.slice(0, 2),
      {
        id: 'disabled-1',
        title: 'This item is disabled',
        content: 'This content cannot be accessed.',
        disabled: true,
      },
      ...sampleItems.slice(2),
    ],
    variant: 'default',
    size: 'md',
    allowMultiple: false,
  },
};

export const CustomContent: Story = {
  args: {
    items: [
      {
        id: 'custom-1',
        title: 'Custom React Content',
        content: (
          <div className="space-y-3">
            <p className="font-medium text-foreground">This is custom React content!</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Feature 1: Custom components</li>
              <li>Feature 2: Rich formatting</li>
              <li>Feature 3: Interactive elements</li>
            </ul>
            <button type="button" className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition-colors">
              Custom Button
            </button>
          </div>
        ),
      },
      {
        id: 'custom-2',
        title: 'Another Custom Item',
        content: (
          <div className="bg-muted p-3 rounded">
            <p>You can put any React components here!</p>
          </div>
        ),
      },
    ],
    variant: 'elevated',
    size: 'lg',
    allowMultiple: true,
  },
};

export const FAQStyle: Story = {
  args: {
    items: [
      {
        id: 'faq-1',
        title: 'What is BiteScout?',
        content: 'BiteScout is a comprehensive restaurant discovery and management platform that connects food lovers with amazing dining experiences while helping restaurants grow their business.',
      },
      {
        id: 'faq-2',
        title: 'How does the recommendation system work?',
        content: 'Our AI-powered recommendation system analyzes your preferences, dining history, and location to suggest restaurants that match your taste and dietary requirements.',
      },
      {
        id: 'faq-3',
        title: 'Can I book tables through BiteScout?',
        content: 'Yes! You can book tables directly through our platform. We partner with restaurants to provide seamless booking experiences with real-time availability.',
      },
    ],
    variant: 'bordered',
    size: 'md',
    allowMultiple: true,
    defaultOpen: ['faq-1'],
  },
  parameters: {
    docs: {
      description: {
        story: 'This example shows how the Accordion component can be used for FAQ sections with a clean, organized layout.',
      },
    },
  },
};

export const FeatureList: Story = {
  args: {
    items: [
      {
        id: 'feature-1',
        title: 'Smart Recommendations',
        content: 'Our AI analyzes your preferences and dining history to suggest restaurants you\'ll love.',
      },
      {
        id: 'feature-2',
        title: 'Real-time Availability',
        content: 'Check table availability and book reservations instantly through our platform.',
      },
      {
        id: 'feature-3',
        title: 'Restaurant Management',
        content: 'Comprehensive tools for restaurants to manage their online presence and customer relationships.',
      },
    ],
    variant: 'elevated',
    size: 'lg',
    allowMultiple: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'This example shows how the Accordion component can be used to showcase product features with an elevated design.',
      },
    },
  },
}; 