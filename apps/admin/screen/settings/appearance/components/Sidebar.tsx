import React from "react";
import type { EntityTheme } from "../../../../store/ts-types";
import TrendingTopics from "./TrendingTopics";
import ActiveMembers from "./ActiveMembers";

interface SidebarProps {
  theme: EntityTheme;
}

const Sidebar: React.FC<SidebarProps> = ({ theme }) => {
  return (
    <div>
      <TrendingTopics theme={theme} />
      <ActiveMembers theme={theme} />
    </div>
  );
};

export default Sidebar;
