import React from "react";
import { Card, Space } from "antd";
import type { EntityTheme } from "../../../../store/ts-types";
import WebsiteHeader from "./WebsiteHeader";
import NavigationTabs from "./NavigationTabs";
import PostsFeed from "./PostsFeed";
import Sidebar from "./Sidebar";

interface ThemePreviewProps {
  theme: EntityTheme;
}

const ThemePreview: React.FC<ThemePreviewProps> = ({ theme }) => {
  return (
    <Card title="Website Theme Preview" style={{ marginBottom: 24 }}>
      <div
        style={{
          background: theme.backgroundColor,
          padding: 0,
          borderRadius: theme.borderRadius,
          border: `${theme.borderWidth}px ${theme.borderStyle} ${theme.borderColor}`,
          boxShadow: theme.boxShadow,
          overflow: "hidden",
        }}
      >
        <Space direction="vertical" size={0} style={{ width: "100%" }}>
          <WebsiteHeader theme={theme} />

          <div style={{ padding: 24 }}>
            <NavigationTabs theme={theme} />

            {/* Main Content Area */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: 24,
              }}
            >
              <PostsFeed theme={theme} />
              <Sidebar theme={theme} />
            </div>
          </div>
        </Space>
      </div>
    </Card>
  );
};

export default ThemePreview;
