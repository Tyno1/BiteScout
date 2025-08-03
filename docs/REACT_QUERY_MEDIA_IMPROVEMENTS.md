# React Query Media Service Improvements

This document outlines how React Query can significantly improve the media service by providing better caching, background updates, optimistic updates, and enhanced user experience.

## Overview

React Query transforms the media service from basic API calls to a sophisticated data management system with:

- **Automatic Caching**: Intelligent caching with configurable stale times
- **Background Updates**: Seamless data synchronization
- **Optimistic Updates**: Instant UI feedback
- **Error Handling**: Robust error management with retries
- **Loading States**: Built-in loading and error states
- **Performance**: Request deduplication and intelligent refetching

## Key Improvements

### 1. **Upload Operations**

#### Before (Basic Implementation)
```typescript
// Basic upload without React Query
const handleUpload = async (file: File) => {
  setIsLoading(true);
  try {
    const result = await uploadFile(file, metadata);
    setUploadedFiles(prev => [...prev, result]);
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};
```

#### After (React Query Implementation)
```typescript
// Optimized upload with React Query
const uploadMutation = useMediaUpload((progress) => {
  setUploadProgress(progress);
});

const handleUpload = async (file: File) => {
  try {
    const result = await uploadMutation.mutateAsync({
      file,
      metadata: {
        title: 'My Upload',
        description: 'Uploaded via React Query',
        tags: ['react-query'],
        folder: 'uploads',
      },
    });
    // Automatic cache invalidation and UI updates
  } catch (error) {
    // Automatic error handling
  }
};
```

**Benefits:**
- Progress tracking
- Automatic cache invalidation
- Optimistic updates
- Retry logic
- Background synchronization

### 2. **Download/Display Operations**

#### Before (Basic Implementation)
```typescript
// Basic media display
const [media, setMedia] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchMedia = async () => {
    setLoading(true);
    try {
      const data = await getMedia(mediaId);
      setMedia(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  if (mediaId) {
    fetchMedia();
  }
}, [mediaId]);
```

#### After (React Query Implementation)
```typescript
// Optimized media display with React Query
const { 
  data: media, 
  isLoading, 
  error, 
  isError 
} = useMediaWithOptimizedUrl(mediaId, 'medium', 'fast');

// Component automatically handles loading, error, and success states
return (
  <div>
    {isLoading && <LoadingSpinner />}
    {isError && <ErrorMessage error={error} />}
    {media && <MediaDisplay media={media} />}
  </div>
);
```

**Benefits:**
- Automatic caching (5 minutes stale time)
- Background refetching
- Optimized URL generation
- Network speed adaptation
- Prefetching support

### 3. **Batch Operations**

#### Before (Basic Implementation)
```typescript
// Basic batch upload
const handleBatchUpload = async (files: File[]) => {
  setIsLoading(true);
  const results = [];
  
  for (const file of files) {
    try {
      const result = await uploadFile(file, metadata);
      results.push(result);
    } catch (error) {
      console.error(`Failed to upload ${file.name}:`, error);
    }
  }
  
  setUploadedFiles(prev => [...prev, ...results]);
  setIsLoading(false);
};
```

#### After (React Query Implementation)
```typescript
// Optimized batch upload with React Query
const batchUploadMutation = useBatchMediaUpload((progress) => {
  setBatchProgress(progress);
});

const handleBatchUpload = async (files: File[]) => {
  try {
    const results = await batchUploadMutation.mutateAsync({
      files,
      metadata: {
        title: 'Batch Upload',
        tags: ['batch'],
        folder: 'batch-uploads',
      },
    });
    // Automatic cache invalidation for all related queries
  } catch (error) {
    // Automatic error handling with retry logic
  }
};
```

**Benefits:**
- Parallel uploads
- Progress tracking
- Automatic cache invalidation
- Error handling per file
- Optimistic updates

## Implementation Structure

### 1. **Query Hooks**

```typescript
// apps/web/src/hooks/media/queries/useMedia.ts
export const useMedia = (mediaId: string) => {
  return useQuery({
    queryKey: mediaKeys.detail(mediaId),
    queryFn: () => getMedia(mediaId),
    enabled: !!mediaId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useMediaWithOptimizedUrl = (
  mediaId: string,
  size: "small" | "medium" | "large" = "medium",
  networkSpeed?: "slow" | "medium" | "fast"
) => {
  return useQuery({
    queryKey: mediaKeys.optimized(mediaId, size, networkSpeed),
    queryFn: () => getMediaWithOptimizedUrl(mediaId, size, networkSpeed),
    enabled: !!mediaId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
```

### 2. **Mutation Hooks**

```typescript
// apps/web/src/hooks/media/mutations/useMediaUpload.ts
export const useMediaUpload = (onProgress?: UploadProgressCallback) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ file, metadata }) => {
      // Upload with progress tracking
      const result = await uploadFile(file, metadata);
      return result;
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ["media"] });
      
      // Optimistic updates for associated media
      if (variables.metadata?.associatedWith) {
        const { type, id } = variables.metadata.associatedWith;
        queryClient.invalidateQueries({ 
          queryKey: ["media", "associated", type, id] 
        });
      }
    },
    onError: (error) => {
      console.error("Media upload failed:", error);
      if (onProgress) onProgress(0);
    },
  });
};
```

### 3. **Optimized Components**

```typescript
// apps/web/src/components/ui/media/MediaDisplayOptimized.tsx
export const MediaDisplayOptimized = memo(({ mediaId, size, networkSpeed }) => {
  const { data, isLoading, error, isError } = useMediaWithOptimizedUrl(
    mediaId, 
    size, 
    networkSpeed
  );

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <ErrorMessage error={error} />;
  if (!data) return <NoDataMessage />;

  return (
    <img
      src={data.optimizedUrl}
      alt={data.media.title}
      className="w-full h-full object-cover"
    />
  );
});
```

## Performance Benefits

### 1. **Caching Strategy**

```typescript
// Intelligent caching based on media type and usage
const cacheConfig = {
  // Frequently accessed media (thumbnails, avatars)
  thumbnails: { staleTime: 10 * 60 * 1000, gcTime: 30 * 60 * 1000 },
  
  // User media (gallery, uploads)
  userMedia: { staleTime: 2 * 60 * 1000, gcTime: 5 * 60 * 1000 },
  
  // Associated media (restaurant images, food photos)
  associatedMedia: { staleTime: 3 * 60 * 1000, gcTime: 8 * 60 * 1000 },
  
  // Verified media (curated content)
  verifiedMedia: { staleTime: 15 * 60 * 1000, gcTime: 60 * 60 * 1000 },
};
```

### 2. **Prefetching**

```typescript
// Prefetch media for better UX
export const usePrefetchMedia = () => {
  const queryClient = useQueryClient();
  
  return useCallback((mediaId: string) => {
    queryClient.prefetchQuery({
      queryKey: mediaKeys.detail(mediaId),
      queryFn: () => getMedia(mediaId),
      staleTime: 5 * 60 * 1000,
    });
  }, [queryClient]);
};
```

### 3. **Infinite Queries**

```typescript
// Infinite scroll for user media
export const useUserMediaInfinite = (userId: string, limit = 10) => {
  return useInfiniteQuery({
    queryKey: ["media", "user", "infinite", userId],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getUserMedia(userId, pageParam, limit),
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.page < lastPage.pagination.totalPages) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
```

## Error Handling

### 1. **Retry Logic**

```typescript
// Automatic retry with exponential backoff
const retryConfig = {
  retries: 3,
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
  retryCondition: (error: Error) => {
    // Retry on network errors, not on 4xx errors
    return error.message.includes('network') || error.message.includes('timeout');
  },
};
```

### 2. **Error Boundaries**

```typescript
// Graceful error handling with fallbacks
const MediaDisplayWithFallback = ({ mediaId, fallbackUrl }) => {
  const { data, error, isError } = useMedia(mediaId);
  
  if (isError) {
    return (
      <div className="error-container">
        <img src={fallbackUrl} alt="Fallback" />
        <p>Failed to load media</p>
      </div>
    );
  }
  
  return <MediaDisplay media={data} />;
};
```

## Migration Guide

### 1. **Replace Basic API Calls**

```typescript
// Before
const [media, setMedia] = useState(null);
useEffect(() => {
  getMedia(id).then(setMedia);
}, [id]);

// After
const { data: media } = useMedia(id);
```

### 2. **Replace Upload Logic**

```typescript
// Before
const handleUpload = async (file) => {
  const result = await uploadFile(file);
  setUploadedFiles(prev => [...prev, result]);
};

// After
const uploadMutation = useMediaUpload();
const handleUpload = (file) => {
  uploadMutation.mutate({ file, metadata });
};
```

### 3. **Replace Loading States**

```typescript
// Before
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

// After
const { isLoading, error, isError } = useMedia(id);
```

## Best Practices

### 1. **Query Key Management**

```typescript
// Centralized query key factory
export const mediaKeys = {
  all: ["media"] as const,
  lists: () => [...mediaKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) => [...mediaKeys.lists(), filters] as const,
  details: () => [...mediaKeys.all, "detail"] as const,
  detail: (id: string) => [...mediaKeys.details(), id] as const,
  optimized: (id: string, size: string, networkSpeed?: string) => 
    [...mediaKeys.detail(id), "optimized", size, networkSpeed] as const,
};
```

### 2. **Optimistic Updates**

```typescript
// Optimistic updates for better UX
const updateMediaMutation = useUpdateMedia();

const handleUpdate = (mediaId: string, updates: Partial<Media>) => {
  updateMediaMutation.mutate({
    mediaId,
    updates,
  }, {
    onMutate: async (variables) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: mediaKeys.detail(variables.mediaId) });
      
      // Snapshot previous value
      const previousMedia = queryClient.getQueryData(mediaKeys.detail(variables.mediaId));
      
      // Optimistically update
      queryClient.setQueryData(mediaKeys.detail(variables.mediaId), (old) => ({
        ...old,
        ...variables.updates,
      }));
      
      return { previousMedia };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousMedia) {
        queryClient.setQueryData(
          mediaKeys.detail(variables.mediaId),
          context.previousMedia
        );
      }
    },
  });
};
```

### 3. **Background Synchronization**

```typescript
// Automatic background updates
const { data: media } = useMedia(mediaId, {
  refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  refetchIntervalInBackground: true,
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
});
```

## Conclusion

React Query transforms the media service from a basic API layer into a sophisticated data management system. The benefits include:

- **Better Performance**: Intelligent caching and request deduplication
- **Improved UX**: Instant feedback with optimistic updates
- **Robust Error Handling**: Automatic retries and graceful fallbacks
- **Background Synchronization**: Always up-to-date data
- **Developer Experience**: Simplified state management and debugging tools

By implementing these improvements, the media service becomes more reliable, performant, and user-friendly while reducing the complexity of state management in the frontend application. 