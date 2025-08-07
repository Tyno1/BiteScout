import type { Preview } from '@storybook/nextjs-vite';
import React from 'react';
import { ModeDecorator } from './modeDecodartor';
// Import global styles including Tailwind CSS
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Add viewport configurations
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1200px',
            height: '800px',
          },
        },
      },
    },
    // Add backgrounds configuration
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#333333',
        },
        {
          name: 'gray',
          value: '#f5f5f5',
        },
      ],
    },
    // Add docs configuration
    docs: {
      // Configures the docs page
      toc: true,
      source: {
        state: 'open',
      },
    },
    // Add layout configuration
    layout: 'centered',
  },
  // Add global decorators
  decorators: [
    ModeDecorator, // Add the dark mode toggle decorator
    (Story) => (
      <div style={{ 
        padding: '1rem',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        lineHeight: '1.5',
        color: '#333',
      }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;