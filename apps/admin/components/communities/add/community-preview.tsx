"use client";

import Image from "next/image";
import { Card, Tabs, Typography } from "antd";
import { GlobalOutlined, LockOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface CommunityPreviewProps {
  formData: {
    name: string;
    tagline: string;
    description: string;
    privacy: string;
    coverImage: string;
    enableEvents: boolean;
  };
  imageUrl: string | null;
}

export function CommunityPreview({
  formData,
  imageUrl,
}: CommunityPreviewProps) {
  const tabItems = [
    {
      key: "discussion",
      label: "Discussion",
      children: (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            <div>
              <div style={{ fontSize: 24, fontWeight: 600 }}>0</div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Members
              </Text>
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 600 }}>0</div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Posts
              </Text>
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 600 }}>0</div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Events
              </Text>
            </div>
          </div>

          {formData?.description ? (
            <Text style={{ fontSize: 14, lineHeight: 1.5 }}>
              {formData?.description}
            </Text>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 80,
                border: "2px dashed #d9d9d9",
                borderRadius: 6,
                backgroundColor: "#fafafa",
              }}
            >
              <Text type="secondary" style={{ fontSize: 14 }}>
                Community description will appear here
              </Text>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "featured",
      label: "Featured",
      children: <div>Featured content</div>,
    },
    {
      key: "people",
      label: "People",
      children: <div>People content</div>,
    },
    {
      key: "media",
      label: "Media",
      children: <div>Media content</div>,
    },
    {
      key: "events",
      label: "Events",
      children: <div>Events content</div>,
    },
  ];

  return (
    <Card
      style={{ overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
    >
      <div
        style={{
          aspectRatio: "3/1",
          overflow: "hidden",
          backgroundColor: "#f5f5f5",
          marginBottom: 16,
          borderRadius: 6,
        }}
      >
        <Image
          src={imageUrl || "https://cdn.thrico.network/defaultEventCover.png"}
          alt="Community cover"
          width={600}
          height={200}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 4,
        }}
      >
        <h3
          style={{
            fontWeight: 600,
            fontSize: 18,
            margin: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flex: 1,
          }}
        >
          {formData?.name || "Community Name"}
        </h3>
        {formData?.privacy === "public" ? (
          <GlobalOutlined style={{ color: "#8c8c8c" }} />
        ) : (
          <LockOutlined style={{ color: "#8c8c8c" }} />
        )}
      </div>

      {formData?.tagline && (
        <Text
          type="secondary"
          style={{ fontSize: 14, marginBottom: 16, display: "block" }}
        >
          {formData?.tagline}
        </Text>
      )}

      <Tabs
        defaultActiveKey="discussion"
        items={tabItems}
        size="small"
        style={{ marginTop: 16 }}
      />
    </Card>
  );
}
