import { useState } from "react";
import { TabHeader } from "./TabHeader";

export type TabItem = {
    key: string;
    label: string;
    content: React.ReactNode;
    disabled?: boolean;
};

export type TabsProps = {
    tabs: TabItem[];
    defaultTab?: string;
    selectedTab?: string;
    onTabChange?: (tabKey: string) => void;
    className?: string;
    useDivider?: boolean;
};

export const Tabs = ({ 
    tabs, 
    defaultTab, 
    selectedTab,
    onTabChange,
    className = "",
    useDivider = false,
}: TabsProps) => {
    // Use selectedTab if provided, otherwise use defaultTab or first tab
    const activeTab = selectedTab || defaultTab || tabs[0]?.key;
    const [internalSelectedTab, setInternalSelectedTab] = useState<string>(activeTab);

    // Use external selectedTab if provided, otherwise use internal state
    const currentTab = selectedTab !== undefined ? selectedTab : internalSelectedTab;

    const handleTabChange = (tabKey: string) => {
        if (selectedTab === undefined) {
            // Only update internal state if not controlled externally
            setInternalSelectedTab(tabKey);
        }
        onTabChange?.(tabKey);
    };

    const selectedTabContent = tabs.find((tab) => tab.key === currentTab)?.content;

    if (!tabs.length) {
        return null;
    }

    return (
        <div className={className}>
            {/* Tab Headers */}
            <div className="flex">
                {tabs.map((tab) => (
                    <TabHeader
                        key={tab.key}
                        tabKey={tab.key}
                        label={tab.label}
                        onClick={() => handleTabChange(tab.key)}
                        selectedTab={currentTab}
                        disabled={tab.disabled}
                    />
                ))}
            </div>
            {useDivider && <div className="border-b border-foreground/10" />}
            {/* Tab Content */}
            <div className="mt-4">
                {selectedTabContent}
            </div>
        </div>
    );
};