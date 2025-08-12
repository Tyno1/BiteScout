

// Pure function for building query parameters
export const buildQueryParams = (params: Record<string, string | number | boolean>): string => {
  const searchParams = new URLSearchParams();
  
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  }

  return searchParams.toString();
};

// Pure function for creating form data
export const createUploadFormData = (
  file: File,
  metadata: {
    title?: string;
    description?: string;
    tags?: string[];
    folder?: string;
    // Note: associatedWith is not sent to media service, only to backend sync
  } = {}
): FormData => {
  const formData = new FormData();
  formData.append("file", file);

  if (metadata.title) formData.append("title", metadata.title);
  if (metadata.description) formData.append("description", metadata.description);
  if (metadata.tags) formData.append("tags", JSON.stringify(metadata.tags));
  if (metadata.folder) formData.append("folder", metadata.folder);
  // associatedWith is handled separately in backend sync, not sent to media service

  return formData;
}; 