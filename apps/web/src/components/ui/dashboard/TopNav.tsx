"use client";

import { IconButton, Input } from "@/components/atoms";
import { NotificationBadge } from "@/components/atoms/Badges";
import type { User } from "@/types";
import { Bell, ChevronDown, Menu } from "lucide-react";
import Image from "next/image";

type TopNavProps = {
	onMenuClick: () => void;
	user: User;
};

export function TopNav({ onMenuClick, user }: TopNavProps) {
	return (
		<div className="fixed top-0 left-0 md:left-72 right-0 z-30 flex h-16 items-center border-b border-foreground/10 bg-background px-4 shadow-sm">
			{/* Conditionally rendered hamburger Menu */}
			<IconButton
				icon={<Menu />}
				variant="plain"
				onClick={onMenuClick}
				className="md:hidden"
			/>

			<div className="flex w-full items-center justify-around">

				{/* Middle - Search bar */}
				<div className="hidden md:block max-w-md w-full mx-4">
					<Input
						name="navSearch"
						placeholder="search"
						type="text"
						id="navbar-search"
						label="Navbar Search"
						fullWidth
						outlineType="round"
					/>
				</div>

				{/* Right side - Notifications and profile */}
				<div className="flex items-center gap-2">
					{/* Notifications */}
					<button
						type="button"
						className="p-2 relative rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
						aria-label="Notifications"
					>
						<Bell />
						<NotificationBadge userId={user?._id} />
					</button>

					{/* User profile */}
					<div className="flex items-center gap-2 cursor-pointer">
						<Image
							src={user?.image || "/placeholder.svg"}
							alt={user?.name || "User"}
							width={32}
							height={32}
							className="h-8 w-8 rounded-full object-cover border border-gray-200 dark:border-gray-600"
						/>
						<div className="hidden md:flex flex-col items-start">
							<span className="hidden md:inline-block text-sm">
								{user?.name}
							</span>

							<span className="hidden md:inline-block text-xs text-primary font-bold rounded-full">
								{user?.restaurantCount && user.restaurantCount >= 1
									? "Owner"
									: "User"}
							</span>
						</div>

						<ChevronDown className="text-gray-500 dark:text-gray-400" />
					</div>
				</div>
			</div>
		</div>
	);
}
