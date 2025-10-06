import React from "react";
import { Card, Typography, Space, Badge } from "antd";
import type { EntityTheme } from "../../../../store/ts-types";

const { Text } = Typography;

interface TrendingTopicsProps {
  theme: EntityTheme;
}

const TrendingTopics: React.FC<TrendingTopicsProps> = ({ theme }) => {
  const topics = [
    { topic: "React Hooks", posts: 24 },
    { topic: "TypeScript", posts: 18 },
    { topic: "Next.js", posts: 15 },
    { topic: "GraphQL", posts: 12 },
  ];

  return (
    <Card
      title="Trending Topics"
      size="small"
      style={{
        backgroundColor: theme.inputBackground,
        borderColor: theme.borderColor,
        borderRadius: theme.borderRadius,
        marginBottom: 16,
        boxShadow: theme.boxShadow,
      }}
      headStyle={{
        color: theme.textColor,
        fontSize: theme.fontSize,
        fontWeight: theme.fontWeight,
      }}
    >
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        {topics.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 0",
              borderBottom:
                index < topics.length - 1
                  ? `1px solid ${theme.borderColor}`
                  : "none",
            }}
          >
            <Text
              style={{
                color: theme.primaryColor,
                fontSize: theme.fontSize,
                cursor: "pointer",
              }}
            >
              #{item.topic}
            </Text>
            <Badge
              count={item.posts}
              style={{
                backgroundColor: theme.primaryColor,
              }}
            />
          </div>
        ))}
      </Space>
    </Card>
  );
};

export default TrendingTopics;
