import React from "react";
import { Card, Avatar, Input, Tag, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { EntityTheme } from "../../../../store/ts-types";

interface CreatePostProps {
  theme: EntityTheme;
}

const CreatePost: React.FC<CreatePostProps> = ({ theme }) => {
  return (
    <Card
      size="small"
      style={{
        backgroundColor: theme.inputBackground,
        borderColor: theme.borderColor,
        borderRadius: theme.borderRadius,
        marginBottom: 16,
        boxShadow: theme.boxShadow,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <Avatar
          size={40}
          src="https://via.placeholder.com/40"
          style={{
            border: `2px solid ${theme.primaryColor}`,
          }}
        />
        <Input
          placeholder="What's on your mind?"
          style={{
            backgroundColor: theme.backgroundColor,
            borderColor: theme.inputBorderColor,
            borderRadius: theme.borderRadius,
            fontSize: theme.fontSize,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <Tag
            color={theme.primaryColor}
            style={{
              borderRadius: (theme.borderRadius || 8) / 2,
              fontSize: (theme.fontSize || 16) - 2,
            }}
          >
            Discussion
          </Tag>
          <Tag
            color={theme.secondaryColor}
            style={{
              borderRadius: (theme.borderRadius || 8) / 2,
              fontSize: (theme.fontSize || 16) - 2,
            }}
          >
            Question
          </Tag>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{
            backgroundColor: theme.Button?.colorPrimary,
            borderColor: theme.Button?.colorBorder,
            color: theme.Button?.colorText,
            borderRadius: theme.Button?.borderRadius,
            fontSize: theme.Button?.fontSize,
          }}
        >
          Post
        </Button>
      </div>
    </Card>
  );
};

export default CreatePost;
