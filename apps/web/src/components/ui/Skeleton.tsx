import { cn } from "../../lib/utils";

interface SkeletonProps {
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
	height?: "sm" | "md" | "lg" | "xl" | "full";
	width?: "sm" | "md" | "lg" | "xl" | "full" | "3/4" | "1/2";
	// Animation
	animate?: boolean;
	// Shape
	rounded?: boolean;
}

const heightClasses = {
	sm: "h-8",
	md: "h-12", 
	lg: "h-16",
	xl: "h-20",
	full: "h-full"
};

const widthClasses = {
	sm: "w-8",
	md: "w-12",
	lg: "w-16", 
	xl: "w-20",
	full: "w-full",
	"3/4": "w-3/4",
	"1/2": "w-1/2"
};

export const Skeleton = ({ 
	className = "",
	height = "md",
	width = "full",
	animate = true,
	rounded = true
}: SkeletonProps) => {
	const skeletonClasses = cn(
		"bg-gray-200",
		height !== "full" && heightClasses[height],
		width !== "full" && widthClasses[width],
		rounded && "rounded",
		animate && "animate-pulse",
		className
	);

	return (
		<div className={skeletonClasses} />
	);
};

// Preset configurations for common use cases
export const SkeletonPresets = {
	// Text skeleton
	Text: (props: Partial<SkeletonProps>) => (
		<Skeleton height="sm" width="full" {...props} />
	),
	
	// Title skeleton
	Title: (props: Partial<SkeletonProps>) => (
		<Skeleton height="md" width="3/4" {...props} />
	),
	
	// Avatar skeleton
	Avatar: (props: Partial<SkeletonProps>) => (
		<Skeleton height="lg" width="lg" rounded={true} {...props} />
	),
	
	// Card skeleton
	Card: () => (
		<div className="space-y-3">
			<Skeleton height="lg" width="full" />
			<Skeleton height="sm" width="3/4" />
			<Skeleton height="sm" width="1/2" />
		</div>
	),
	
	// List skeleton
	List: ({ count = 5, ...props }: Partial<SkeletonProps> & { count?: number }) => (
		<div className="space-y-3">
			{Array.from({ length: count }, (_, index) => (
				<Skeleton key={`skeleton-list-${index}-${Date.now()}`} height="md" width="full" {...props} />
			))}
		</div>
	)
}; 