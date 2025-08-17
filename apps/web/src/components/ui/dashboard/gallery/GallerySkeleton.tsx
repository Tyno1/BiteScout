interface GallerySkeletonProps {
  count?: number;
}

export const GallerySkeleton = ({ count = 8 }: GallerySkeletonProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={`skeleton-${index}-${Date.now()}`} 
          className="bg-card rounded-xl shadow-sm animate-pulse"
        >
          <div className="aspect-square rounded-t-xl bg-gradient-to-br from-gray-200 to-gray-300" />
          <div className="p-3 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};
