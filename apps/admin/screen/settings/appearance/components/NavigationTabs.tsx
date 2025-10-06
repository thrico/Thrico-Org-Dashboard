import React from "react";
import {
  HomeOutlined,
  TeamOutlined,
  CalendarOutlined,
  BookOutlined,
} from "@ant-design/icons";
import type { EntityTheme } from "../../../../store/ts-types";

interface NavigationTabsProps {
  theme: EntityTheme;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ theme }) => {
  const tabs = [
    { icon: <HomeOutlined />, label: "Feed", active: true },
    { icon: <TeamOutlined />, label: "Communities" },
    { icon: <CalendarOutlined />, label: "Events" },
    { icon: <BookOutlined />, label: "Resources" },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: 24,
        marginBottom: 24,
        borderBottom: `1px solid ${theme.borderColor}`,
        paddingBottom: 16,
      }}
    >
      {tabs.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            backgroundColor: item.active ? theme.primaryColor : "transparent",
            color: item.active ? "#ffffff" : theme.textColor,
            borderRadius: theme.borderRadius,
            cursor: "pointer",
            fontSize: theme.fontSize,
            fontWeight: item.active ? "600" : "400",
          }}
        >
          {item.icon}
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default NavigationTabs;
