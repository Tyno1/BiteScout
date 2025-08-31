# Media Upload Components

This folder contains modular media upload components that have been broken down from the original monolithic `MediaUpload` component.

## 📁 Structure

```
media/
├── media-upload/         # Modular upload components
│   ├── index.ts              # Main exports
│   ├── types.ts              # Shared TypeScript interfaces
│   ├── MediaUpload.tsx       # Main orchestrator component
│   ├── FileDropZone.tsx      # Drag & drop file selection
│   ├── MediaPreview.tsx      # Grid display of selected files
│   ├── MediaCard.tsx         # Individual file card with preview
│   ├── MediaMetadataForm.tsx # Collapsible metadata editing form
│   └── README.md            # This documentation
├── MediaDisplay.tsx      # Media display component
├── MediaGallery.tsx      # Media gallery component
├── MediaSkeleton.tsx     # Loading skeleton component
├── MediaUpload.tsx       # Original monolithic component (legacy)
├── MediaUploadWizard.tsx # Upload wizard component
└── index.ts              # Main media exports
```

## 🧩 Components

### `MediaUpload` (Main Component)
The main orchestrator component that manages state and coordinates all sub-components.

**Props:**
- `onUploadSuccess?: (result: UploadMediaResponse) => void`
- `onUploadError?: (error: string) => void`
- `associatedWith?: Media["associatedWith"]`
- `folder?: string`
- `className?: string`
- `multiple?: boolean`

### `FileDropZone`
Handles drag & drop functionality and file selection UI.

**Features:**
- Drag & drop file selection
- File browser integration
- Visual feedback for selected files
- Upload/Clear action buttons

### `MediaPreview`
Displays a grid of selected media files.

**Features:**
- Responsive grid layout (1-4 columns)
- "Add More Files" button for multiple mode
- Individual file management

### `MediaCard`
Individual file card with preview and metadata controls.

**Features:**
- File preview (image/video)
- File information display
- Remove button
- Expand/collapse metadata form
- Upload progress indicator

### `MediaMetadataForm`
Collapsible form for editing file metadata.

**Fields:**
- Title (optional)
- Description (optional)
- Tags (comma-separated)
- Upload progress bar

## 🚀 Usage

```tsx
import { MediaUpload } from "@/components/ui/media";

// Basic usage
<MediaUpload 
  onUploadSuccess={(result) => console.log(result)}
  onUploadError={(error) => console.error(error)}
/>

// With association
<MediaUpload 
  associatedWith={{ type: "dish", id: "food-id" }}
  multiple={true}
  folder="food-images"
/>
```

## 🔧 Individual Component Usage

You can also use individual components for custom implementations:

```tsx
import { 
  FileDropZone, 
  MediaPreview, 
  MediaCard,
  MediaMetadataForm 
} from "@/components/ui/media/media-upload";
```

## 📝 Types

All TypeScript interfaces are exported from `types.ts`:

- `MediaUploadProps`
- `FileWithPreview`
- `FileDropZoneProps`
- `MediaPreviewProps`
- `MediaCardProps`
- `MediaMetadataFormProps`

## 🎯 Benefits

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Individual components can be used separately
3. **Maintainability**: Easier to test and modify individual parts
4. **Flexibility**: Custom implementations using specific components
5. **Type Safety**: Comprehensive TypeScript interfaces

## 🔄 Migration

The original `MediaUpload` component is located at `apps/web/src/components/ui/media/MediaUpload.tsx` and can be safely deleted after confirming the new structure works correctly. 