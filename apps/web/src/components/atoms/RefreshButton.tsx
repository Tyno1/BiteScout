import { useForceSignOut } from "@/hooks/useForceSignOut";
import { Button } from "./Button";

interface RefreshButtonProps {
  text?: string;
  variant?: "solid" | "outline" | "plain" | "glass";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const RefreshButton = ({ 
  text = "Refresh Session", 
  variant = "outline",
  size = "md",
  className = ""
}: RefreshButtonProps) => {
  const { forceSignOut, isSigningOut } = useForceSignOut();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={forceSignOut}
      disabled={isSigningOut}
      text={isSigningOut ? "Refreshing..." : text}
      className={className}
    />
  );
};
