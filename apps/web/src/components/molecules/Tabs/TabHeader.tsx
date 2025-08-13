import { Button } from "@/components/atoms";

export type TabHeaderProps = {
  tabKey: string;
  label: string;
  onClick: (key: string) => void;
  selectedTab: string;
  disabled?: boolean;
};

export const TabHeader = ({
  tabKey,
  label,
  onClick,
  selectedTab,
  disabled = false,
}: TabHeaderProps) => {
  const isSelected = selectedTab === tabKey;

  const handleClick = () => {
    if (!disabled) {
      onClick(tabKey);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Button
        size="sm"
        color={isSelected ? "primary" : "neutral"}
        onClick={handleClick}
        variant={isSelected ? "glass" : "plain"}
        fullWidth
        text={label}
        disabled={disabled}
      />

      <div
        className={`w-full h-1 ${isSelected ? "bg-primary" : "bg-gray-200"}`}
      />
    </div>
  );
};
