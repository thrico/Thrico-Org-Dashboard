import React from "react";
import { Card, Typography, Space, Badge, Avatar } from "antd";
import type { EntityTheme } from "../../../../store/ts-types";

const { Text } = Typography;

interface ActiveMembersProps {
  theme: EntityTheme;
}

const ActiveMembers: React.FC<ActiveMembersProps> = ({ theme }) => {
  const users = [
    { name: "Alex Rivera", status: "online" as const, avatar: "AR" },
    { name: "Emma Watson", status: "online" as const, avatar: "EW" },
    { name: "John Doe", status: "away" as const, avatar: "JD" },
    { name: "Lisa Park", status: "online" as const, avatar: "LP" },
  ];

  return (
    <Card
      title="Active Members"
      size="small"
      style={{
        backgroundColor: theme.inputBackground,
        borderColor: theme.borderColor,
        borderRadius: theme.borderRadius,
        boxShadow: theme.boxShadow,
      }}
      headStyle={{
        color: theme.textColor,
        fontSize: theme.fontSize,
        fontWeight: theme.fontWeight,
      }}
    >
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        {users.map((user, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "8px 0",
            }}
          >
            <Badge
              dot
              color={user.status === "online" ? "#52c41a" : "#faad14"}
              offset={[-4, 4]}
            >
              <Avatar
                size={32}
                style={{
                  backgroundColor: theme.primaryColor,
                  color: "#ffffff",
                  fontSize: (theme.fontSize || 16) - 4,
                }}
              >
                {user.avatar}
              </Avatar>
            </Badge>
            <Text
              style={{
                color: theme.textColor,
                fontSize: (theme.fontSize || 16) - 1,
              }}
            >
              {user.name}
            </Text>
          </div>
        ))}
      </Space>
    </Card>
  );
};

export default ActiveMembers;
