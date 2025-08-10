# Accordion Component

A flexible and accessible accordion component that supports multiple variants, sizes, and configurations. Perfect for FAQ sections, collapsible content, and organized information display.

## Features

- **Multiple Variants**: Default, bordered, and elevated styles
- **Flexible Sizing**: Small, medium, and large size options
- **Accessibility**: Full ARIA support and keyboard navigation
- **Customizable**: Support for both string and React component content
- **State Management**: Built-in state management with callback support
- **Brand Consistent**: Follows BiteScout design system and color palette

## Usage

### Basic Example

```tsx
import { Accordion } from '@/components/atoms';

const faqItems = [
  {
    id: '1',
    title: 'How do I reset my password?',
    content: 'You can reset your password through the login screen or contact our support team for assistance.',
  },
  {
    id: '2',
    title: 'How do I report inappropriate content?',
    content: 'Use the report button on any post or contact our moderation team directly.',
  },
];

function FAQSection() {
  return (
    <Accordion 
      items={faqItems}
      variant="bordered"
      size="md"
      allowMultiple={true}
    />
  );
}
```

### With Custom React Content

```tsx
const customItems = [
  {
    id: 'custom-1',
    title: 'Custom Content Example',
    content: (
      <div className="space-y-3">
        <p className="font-medium">This is custom React content!</p>
        <ul className="list-disc list-inside">
          <li>Feature 1: Custom components</li>
          <li>Feature 2: Rich formatting</li>
        </ul>
        <button type="button" className="btn btn-primary">
          Custom Button
        </button>
      </div>
    ),
  },
];

<Accordion items={customItems} variant="elevated" size="lg" />
```

### With Default Open Items

```tsx
<Accordion 
  items={faqItems}
  defaultOpen={['1']} // First item will be open by default
  allowMultiple={false}
/>
```

### With Callback

```tsx
<Accordion 
  items={faqItems}
  onItemToggle={(itemId, isOpen) => {
    console.log(`Item ${itemId} is now ${isOpen ? 'open' : 'closed'}`);
    // Track analytics, update state, etc.
  }}
/>
```

## Props

### AccordionProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `AccordionItem[]` | **Required** | Array of accordion items to display |
| `variant` | `'default' \| 'bordered' \| 'elevated'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of accordion items |
| `allowMultiple` | `boolean` | `false` | Whether multiple items can be open simultaneously |
| `defaultOpen` | `string[]` | `[]` | Array of item IDs that should be open by default |
| `className` | `string` | `''` | Additional CSS classes for the accordion container |
| `containerClassName` | `string` | `''` | Additional CSS classes for the outer container |
| `onItemToggle` | `(itemId: string, isOpen: boolean) => void` | `undefined` | Callback fired when an item is toggled |

### AccordionItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | **Required** | Unique identifier for the accordion item |
| `title` | `string` | **Required** | Title text displayed in the accordion header |
| `content` | `string \| React.ReactNode` | **Required** | Content to display when the item is expanded |
| `disabled` | `boolean` | `false` | Whether the accordion item is disabled |

## Variants

### Default
Simple border-bottom separator between items. Clean and minimal design.

```tsx
<Accordion items={items} variant="default" />
```

### Bordered
Each item has its own border and rounded corners. Good for card-like layouts.

```tsx
<Accordion items={items} variant="bordered" />
```

### Elevated
Items have subtle shadows and background colors. Perfect for elevated content sections.

```tsx
<Accordion items={items} variant="elevated" />
```

## Sizes

### Small (`sm`)
Compact design for space-constrained layouts.

```tsx
<Accordion items={items} size="sm" />
```

### Medium (`md`)
Default size, balanced spacing and typography.

```tsx
<Accordion items={items} size="md" />
```

### Large (`lg`)
Spacious design for prominent content sections.

```tsx
<Accordion items={items} size="lg" />
```

## Accessibility Features

- **ARIA Support**: Full `aria-expanded` and `aria-disabled` attributes
- **Keyboard Navigation**: Tab navigation and Enter/Space key support
- **Focus Management**: Proper focus indicators and ring styles
- **Screen Reader Support**: Semantic HTML structure and ARIA labels

## Best Practices

### 1. Use Descriptive Titles
Make sure your accordion titles clearly describe the content that will be revealed.

```tsx
// Good
{ title: 'How do I reset my password?' }

// Avoid
{ title: 'Password' }
```

### 2. Keep Content Concise
Accordion content should be focused and not too lengthy. Consider breaking up very long content.

### 3. Use Appropriate Variants
- **Default**: For simple lists and basic content
- **Bordered**: For content that needs visual separation
- **Elevated**: For prominent sections and featured content

### 4. Consider User Experience
- Use `allowMultiple={true}` when users might want to compare multiple items
- Use `defaultOpen` sparingly to avoid overwhelming users
- Provide clear visual feedback with hover and focus states

### 5. Content Types
- **String content**: For simple text and descriptions
- **React components**: For rich content, forms, or interactive elements

## Examples

### FAQ Section
```tsx
<section className="py-12 bg-card">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-8">
      Frequently Asked Questions
    </h2>
    <Accordion 
      items={faqItems}
      variant="bordered"
      size="md"
      allowMultiple={true}
      defaultOpen={['1']}
    />
  </div>
</section>
```

### Product Features
```tsx
<section className="py-16 bg-background">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold text-center mb-12">
      Platform Features
    </h2>
    <Accordion 
      items={featureItems}
      variant="elevated"
      size="lg"
      allowMultiple={false}
    />
  </div>
</section>
```

### Settings Panel
```tsx
<div className="bg-card rounded-lg p-6">
  <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
  <Accordion 
    items={settingsItems}
    variant="default"
    size="sm"
    allowMultiple={true}
  />
</div>
```

## Styling

The component uses Tailwind CSS classes and follows the BiteScout design system:

- **Colors**: Uses semantic color tokens (`primary`, `muted`, `foreground`, etc.)
- **Typography**: Consistent font weights and sizes
- **Spacing**: Follows the established spacing scale
- **Transitions**: Smooth animations for interactions
- **Focus States**: Accessible focus indicators

## Customization

You can customize the appearance using the `className` and `containerClassName` props:

```tsx
<Accordion 
  items={items}
  className="custom-accordion-styles"
  containerClassName="custom-container-styles"
/>
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with polyfills for CSS Grid and other modern features)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lightweight with minimal bundle impact
- Efficient re-renders using React hooks
- Optimized animations and transitions
- No external dependencies beyond React and Lucide icons 