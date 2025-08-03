'use client';

import { MediaDisplayOptimized } from '@/components/ui/media/MediaDisplayOptimized';
import { MediaUploadOptimized } from '@/components/ui/media/MediaUploadOptimized';
import type { FileWithPreview } from '@/components/ui/media/media-upload/types';
import { 
  useAssociatedMedia,
  useBatchDeleteMedia,
  useBatchMediaUpload,
  useDeleteMedia,
  useMedia,
  useMediaUpload,
  useMediaWithOptimizedUrl,
  useUpdateMedia,
  useUpdateMediaAssociation,
  useUserMedia,
  useUserMediaInfinite,
  useVerifiedMedia,
  useVerifyMedia,
} from '@/hooks/media';

import { useState } from 'react';

// Example component showing how to use React Query media hooks
export function MediaQueryExample() {
  const [mediaId, setMediaId] = useState('');
  const [userId, setUserId] = useState('');
  const [associatedType, setAssociatedType] = useState('');
  const [associatedId, setAssociatedId] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Query hooks
  const { data: media, isLoading: mediaLoading, error: mediaError } = useMedia(mediaId);
  const { data: optimizedMedia, isLoading: optimizedLoading } = useMediaWithOptimizedUrl(mediaId, 'medium', 'fast');
  const { data: userMedia, isLoading: userMediaLoading } = useUserMedia(userId, 1, 10);
  const { data: associatedMedia, isLoading: associatedLoading } = useAssociatedMedia(associatedType, associatedId);
  const { data: verifiedMedia, isLoading: verifiedLoading } = useVerifiedMedia(1, 10, 'image');

  // Infinite query for user media
  const { 
    data: infiniteUserMedia, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useUserMediaInfinite(userId, 10);

  // Upload mutations
  const uploadMutation = useMediaUpload((progress) => {
    setUploadProgress(progress);
  });

  const batchUploadMutation = useBatchMediaUpload((progress) => {
    setUploadProgress(progress);
  });

  // Management mutations
  const updateMediaMutation = useUpdateMedia();
  const deleteMediaMutation = useDeleteMedia();
  const verifyMediaMutation = useVerifyMedia();
  const updateAssociationMutation = useUpdateMediaAssociation();
  const batchDeleteMutation = useBatchDeleteMedia();

  // Example handlers
  const handleSingleUpload = async () => {
    if (selectedFiles.length === 1) {
      try {
        const result = await uploadMutation.mutateAsync({
          file: selectedFiles[0].file,
          metadata: {
            title: 'Uploaded via React Query',
            description: 'This was uploaded using the optimized upload hook',
            tags: ['react-query', 'example'],
            folder: 'examples',
          },
        });
        console.log('Upload successful:', result);
        setSelectedFiles([]);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };

  const handleBatchUpload = async () => {
    if (selectedFiles.length > 1) {
      try {
        const results = await batchUploadMutation.mutateAsync({
          files: selectedFiles.map(f => f.file),
          metadata: {
            title: 'Batch Upload',
            description: 'Multiple files uploaded via React Query',
            tags: ['batch', 'react-query'],
            folder: 'batch-examples',
          },
        });
        console.log('Batch upload successful:', results);
        setSelectedFiles([]);
      } catch (error) {
        console.error('Batch upload failed:', error);
      }
    }
  };

  const handleUpdateMedia = () => {
    if (mediaId) {
      updateMediaMutation.mutate({
        mediaId,
        updates: {
          title: 'Updated via React Query',
          description: 'This media was updated using the mutation hook',
        },
      });
    }
  };

  const handleDeleteMedia = () => {
    if (mediaId) {
      deleteMediaMutation.mutate(mediaId);
    }
  };

  const handleVerifyMedia = () => {
    if (mediaId) {
      verifyMediaMutation.mutate(mediaId);
    }
  };

  const handleUpdateAssociation = () => {
    if (mediaId && associatedType && associatedId) {
      updateAssociationMutation.mutate({
        mediaId,
        associatedWith: { type: associatedType, id: associatedId },
      });
    }
  };

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-bold">React Query Media Service Example</h1>

      {/* Media Display Examples */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Media Display</h2>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Media ID:
            <input
              type="text"
              value={mediaId}
              onChange={(e) => setMediaId(e.target.value)}
              className="ml-2 px-3 py-1 border rounded"
              placeholder="Enter media ID"
            />
          </label>
        </div>

        {mediaId && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Standard Media Display</h3>
              {mediaLoading ? (
                <div className="animate-pulse bg-gray-200 h-64 rounded-lg" />
              ) : mediaError ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600">Error: {mediaError.message}</p>
                </div>
              ) : media ? (
                <MediaDisplayOptimized
                  mediaId={mediaId}
                  size="medium"
                  showTitle
                  showDescription
                  className="w-full"
                />
              ) : null}
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Optimized Media Display</h3>
              {optimizedLoading ? (
                <div className="animate-pulse bg-gray-200 h-64 rounded-lg" />
              ) : optimizedMedia ? (
                <MediaDisplayOptimized
                  mediaId={mediaId}
                  size="large"
                  networkSpeed="fast"
                  showTitle
                  showDescription
                  className="w-full"
                />
              ) : null}
            </div>
          </div>
        )}
      </section>

      {/* Upload Examples */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Media Upload</h2>
        
        <MediaUploadOptimized
          uploadMode="batch"
          selectedFiles={selectedFiles}
          onSelectedFilesChange={setSelectedFiles}
          onUploadSuccess={(result) => console.log('Upload success:', result)}
          onUploadError={(error) => console.error('Upload error:', error)}
          onProgress={setUploadProgress}
          maxFiles={5}
          acceptedFileTypes={['image/*']}
          maxFileSize={5 * 1024 * 1024} // 5MB
        />

        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Upload Progress</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex space-x-2">
          <button
            type="button"
            onClick={handleSingleUpload}
            disabled={selectedFiles.length !== 1 || uploadMutation.isPending}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {uploadMutation.isPending ? 'Uploading...' : 'Upload Single'}
          </button>
          
          <button
            type="button"
            onClick={handleBatchUpload}
            disabled={selectedFiles.length <= 1 || batchUploadMutation.isPending}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          >
            {batchUploadMutation.isPending ? 'Uploading...' : 'Upload Batch'}
          </button>
        </div>
      </section>

      {/* User Media Examples */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">User Media</h2>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            User ID:
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="ml-2 px-3 py-1 border rounded"
              placeholder="Enter user ID"
            />
          </label>
        </div>

        {userId && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">User Media (Paginated)</h3>
              {userMediaLoading ? (
                <div className="animate-pulse bg-gray-200 h-32 rounded-lg" />
              ) : userMedia ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p>Total: {userMedia.pagination.total}</p>
                  <p>Page: {userMedia.pagination.page} of {userMedia.pagination.totalPages}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    {userMedia.data.slice(0, 4).map((item) => (
                      <div key={item._id} className="text-xs">
                        {item.title || 'Untitled'}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">User Media (Infinite)</h3>
              {infiniteUserMedia ? (
                <div className="space-y-2">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p>Pages loaded: {infiniteUserMedia.pages.length}</p>
                    <p>Total items: {infiniteUserMedia.pages.reduce((acc, page) => acc + page.data.length, 0)}</p>
                  </div>
                  
                  {hasNextPage && (
                    <button
                      type="button"
                      onClick={() => fetchNextPage()}
                      disabled={isFetchingNextPage}
                      className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
                    >
                      {isFetchingNextPage ? 'Loading...' : 'Load More'}
                    </button>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </section>

      {/* Associated Media Examples */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Associated Media</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <label className="block text-sm font-medium">
            Type:
            <input
              type="text"
              value={associatedType}
              onChange={(e) => setAssociatedType(e.target.value)}
              className="ml-2 px-3 py-1 border rounded"
              placeholder="e.g., restaurant"
            />
          </label>
          
          <label className="block text-sm font-medium">
            ID:
            <input
              type="text"
              value={associatedId}
              onChange={(e) => setAssociatedId(e.target.value)}
              className="ml-2 px-3 py-1 border rounded"
              placeholder="Enter ID"
            />
          </label>
        </div>

        {associatedType && associatedId && (
          <div>
            {associatedLoading ? (
              <div className="animate-pulse bg-gray-200 h-32 rounded-lg" />
            ) : associatedMedia ? (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>Associated media count: {associatedMedia.length}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {associatedMedia.slice(0, 4).map((item) => (
                    <div key={item._id} className="text-xs">
                      {item.title || 'Untitled'}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </section>

      {/* Verified Media Examples */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Verified Media</h2>
        
        {verifiedLoading ? (
          <div className="animate-pulse bg-gray-200 h-32 rounded-lg" />
        ) : verifiedMedia ? (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p>Total verified: {verifiedMedia.pagination.total}</p>
            <p>Page: {verifiedMedia.pagination.page} of {verifiedMedia.pagination.totalPages}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {verifiedMedia.data.slice(0, 4).map((item) => (
                <div key={item._id} className="text-xs">
                  {item.title || 'Untitled'}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      {/* Management Actions */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Media Management</h2>
        
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleUpdateMedia}
            disabled={!mediaId || updateMediaMutation.isPending}
            className="px-4 py-2 bg-yellow-600 text-white rounded disabled:opacity-50"
          >
            {updateMediaMutation.isPending ? 'Updating...' : 'Update Media'}
          </button>
          
          <button
            type="button"
            onClick={handleDeleteMedia}
            disabled={!mediaId || deleteMediaMutation.isPending}
            className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
          >
            {deleteMediaMutation.isPending ? 'Deleting...' : 'Delete Media'}
          </button>
          
          <button
            type="button"
            onClick={handleVerifyMedia}
            disabled={!mediaId || verifyMediaMutation.isPending}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          >
            {verifyMediaMutation.isPending ? 'Verifying...' : 'Verify Media'}
          </button>
          
          <button
            type="button"
            onClick={handleUpdateAssociation}
            disabled={!mediaId || !associatedType || !associatedId || updateAssociationMutation.isPending}
            className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
          >
            {updateAssociationMutation.isPending ? 'Updating...' : 'Update Association'}
          </button>
        </div>
      </section>

      {/* Error Display */}
      {(uploadMutation.error || batchUploadMutation.error || updateMediaMutation.error || 
        deleteMediaMutation.error || verifyMediaMutation.error || updateAssociationMutation.error) && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-red-800">Errors</h3>
          <div className="mt-2 text-sm text-red-700 space-y-1">
            {uploadMutation.error && <p>Upload: {uploadMutation.error.message}</p>}
            {batchUploadMutation.error && <p>Batch Upload: {batchUploadMutation.error.message}</p>}
            {updateMediaMutation.error && <p>Update: {updateMediaMutation.error.message}</p>}
            {deleteMediaMutation.error && <p>Delete: {deleteMediaMutation.error.message}</p>}
            {verifyMediaMutation.error && <p>Verify: {verifyMediaMutation.error.message}</p>}
            {updateAssociationMutation.error && <p>Association: {updateAssociationMutation.error.message}</p>}
          </div>
        </div>
      )}
    </div>
  );
} 