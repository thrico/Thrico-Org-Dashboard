import React from "react";
import { Card, Avatar, Typography, Tag, Button } from "antd";
import {
  HeartOutlined,
  CommentOutlined,
  EyeOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import type { EntityTheme } from "../../../../store/ts-types";

const { Text, Title } = Typography;

interface PostData {
  author: string;
  avatar: string;
  time: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
}

interface PostCardProps {
  theme: EntityTheme;
  post: PostData;
}

const PostCard: React.FC<PostCardProps> = ({ theme, post }) => {
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
          src={post.avatar}
          style={{
            border: `2px solid ${theme.primaryColor}`,
          }}
        />
        <div style={{ flex: 1 }}>
          <Text
            style={{
              color: theme.textColor,
              fontSize: theme.fontSize,
              fontWeight: "600",
              display: "block",
            }}
          >
            {post.author}
          </Text>
          <Text
            style={{
              color: theme.textColor,
              opacity: 0.6,
              fontSize: (theme.fontSize || 16) - 2,
            }}
          >
            {post.time}
          </Text>
        </div>
      </div>

      <Title
        level={5}
        style={{
          color: theme.textColor,
          fontSize: (theme.fontSize || 16) + 2,
          fontWeight: theme.fontWeight,
          margin: "0 0 8px 0",
        }}
      >
        {post.title}
      </Title>

      <Text
        style={{
          color: theme.textColor,
          fontSize: theme.fontSize,
          display: "block",
          marginBottom: 12,
          lineHeight: "1.5",
        }}
      >
        {post.content}
      </Text>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 12,
          flexWrap: "wrap",
        }}
      >
        {post.tags.map((tag, tagIndex) => (
          <Tag
            key={tagIndex}
            style={{
              backgroundColor: `${theme.primaryColor}15`,
              borderColor: theme.primaryColor,
              color: theme.primaryColor,
              borderRadius: (theme.borderRadius || 8) / 2,
              fontSize: (theme.fontSize || 16) - 3,
            }}
          >
            {tag}
          </Tag>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 12,
          borderTop: `1px solid ${theme.borderColor}`,
        }}
      >
        <div style={{ display: "flex", gap: 16 }}>
          <Button
            type="text"
            icon={<HeartOutlined />}
            style={{
              color: theme.primaryColor,
              padding: 0,
              fontSize: (theme.fontSize || 16) - 1,
            }}
          >
            {post.likes}
          </Button>
          <Button
            type="text"
            icon={<CommentOutlined />}
            style={{
              color: theme.primaryColor,
              padding: 0,
              fontSize: (theme.fontSize || 16) - 1,
            }}
          >
            {post.comments}
          </Button>
          <Button
            type="text"
            icon={<EyeOutlined />}
            style={{
              color: theme.textColor,
              opacity: 0.6,
              padding: 0,
              fontSize: (theme.fontSize || 16) - 1,
            }}
          >
            {post.views}
          </Button>
        </div>
        <Button
          icon={<ShareAltOutlined />}
          type="text"
          style={{
            color: theme.primaryColor,
            borderRadius: theme.Button?.borderRadius,
          }}
        />
      </div>
    </Card>
  );
};

export default PostCard;
