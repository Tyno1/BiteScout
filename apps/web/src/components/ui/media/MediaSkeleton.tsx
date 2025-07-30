import { Skeleton } from "../Skeleton";

interface MediaSkeletonProps {
	count?: number;
	className?: string;
	// Layout options
	columns?: {
		sm?: number;
		md?: number;
		lg?: number;
		xl?: number;
	};
	// Size options
	height?: "sm" | "md" | "lg" | "xl";
	showInfo?: boolean;
	// Animation
	animate?: boolean;
}

const mediaHeightMap = {
	sm: "h-32",
	md: "h-48", 
	lg: "h-64",
	xl: "h-80"
};

export const MediaSkeleton = ({ 
	count = 12, 
	className = "",
	columns = { sm: 1, md: 2, lg: 3, xl: 4 },
	height = "md",
	showInfo = true,
	animate = true
}: MediaSkeletonProps) => {
	return (
		<div className={`grid gap-4 ${className}`}>
			{Array.from({ length: count }, (_, index) => (
				<div key={`media-skeleton-${index}-${Date.now()}`} className="space-y-2">
					{/* Image skeleton */}
					<Skeleton 
						height="full" 
						width="full" 
						className={mediaHeightMap[height]}
						animate={animate}
					/>
					
					{/* Info skeleton */}
					{showInfo && (
						<div className="space-y-2">
							<Skeleton height="sm" width="3/4" animate={animate} />
							<Skeleton height="sm" width="1/2" animate={animate} />
						</div>
					)}
				</div>
			))}
		</div>
	);
};

// Preset configurations for common use cases
export const MediaSkeletonPresets = {
	// Gallery view
	Gallery: (props: Partial<MediaSkeletonProps>) => (
		<MediaSkeleton 
			count={12} 
			height="md" 
			showInfo={true}
			columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
			{...props}
		/>
	),
	
	// Grid view
	Grid: (props: Partial<MediaSkeletonProps>) => (
		<MediaSkeleton 
			count={6} 
			height="lg" 
			showInfo={false}
			columns={{ sm: 2, md: 3, lg: 4, xl: 6 }}
			{...props}
		/>
	),
	
	// List view
	List: (props: Partial<MediaSkeletonProps>) => (
		<MediaSkeleton 
			count={5} 
			height="sm" 
			showInfo={true}
			columns={{ sm: 1, md: 1, lg: 1, xl: 1 }}
			{...props}
		/>
	),
	
	// Compact view
	Compact: (props: Partial<MediaSkeletonProps>) => (
		<MediaSkeleton 
			count={8} 
			height="sm" 
			showInfo={false}
			columns={{ sm: 2, md: 4, lg: 6, xl: 8 }}
			{...props}
		/>
	)
}; 