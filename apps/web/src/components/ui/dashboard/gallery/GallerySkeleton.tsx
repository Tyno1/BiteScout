import { Skeleton } from "@/components/ui/Skeleton";

interface GallerySkeletonProps {
  count?: number;
}

export const GallerySkeleton = ({ count = 8 }: GallerySkeletonProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={`skeleton-${index}-${Date.now()}`} 
          className="bg-card rounded-xl shadow-sm"
        >
          <Skeleton height="full" width="full" className="aspect-square rounded-t-xl" />
          <div className="p-3 space-y-2">
            <Skeleton height="sm" width="3/4" />
            <Skeleton height="sm" width="1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};
