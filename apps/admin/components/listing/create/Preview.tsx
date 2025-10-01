import React from "react";
import { Card, Typography, Button, Avatar, Divider, Tag } from "antd";
import {
  EnvironmentOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { GetCurrency } from "../../../screen/Currency";

const { Title, Text, Paragraph } = Typography;

interface PreviewProps {
  values: {
    title?: string;
    price?: number | string;
    description?: string;
    location?: {
      name?: string;
    };
    // Add other fields as needed
  };
  fileList: Array<{
    uid: string;
    thumbUrl: string;
    // Add other fields as needed
  }>;
}

const Preview: React.FC<PreviewProps> = ({ values, fileList }) => {
  return (
    <Card title="Preview" style={{ maxWidth: 700, margin: "0 auto" }}>
      <Text type="secondary">See how your listing will appear to buyers</Text>

      {/* Image placeholder */}
      <div style={{ marginTop: 24, borderRadius: 8, overflow: "hidden" }}>
        {fileList?.length > 0 ? (
          <img
            src={fileList[0]?.thumbUrl}
            alt="Preview"
            style={{
              width: "100%",
              height: 200,
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        ) : (
          <div
            style={{
              background: "#f5f5f5",
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text type="secondary">Image Placeholder</Text>
          </div>
        )}

        {fileList.map((file) => (
          <div
            key={file.uid}
            style={{
              marginTop: 12,
              display: "inline-block",
              width: 120,
              height: 80,
              borderRadius: 8,
              overflow: "hidden",
              marginRight: 8,
            }}
          >
            <img
              src={file.thumbUrl}
              alt="Thumbnail"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          </div>
        ))}
      </div>

      {/* Listing details */}
      <Title level={4}>{values?.title}</Title>
      <Title level={3} style={{ color: "#2ECC71" }}>
        ${GetCurrency()} {values?.price || "Price not set"}
      </Title>

      <Tag icon={<ExclamationCircleOutlined />} color="default">
        Pending Verification
      </Tag>

      <Divider />

      <Title level={5}>Description</Title>
      <Paragraph type="secondary">
        {values?.description || "No description provided."}
      </Paragraph>

      <Title level={5}>Location</Title>
      <Text type="danger">
        <EnvironmentOutlined />{" "}
        {values?.location?.name || "Location not specified"}
      </Text>

      <Divider />

      {/* Seller info */}
      <Title level={5}>Seller Information</Title>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Avatar size="large" />
        <div>
          <Text strong>Your Name</Text>
          <br />
          <Text type="secondary">Member since 2024</Text>
        </div>
      </div>

      <Button block type="default" disabled style={{ marginTop: 20 }}>
        Contact Seller
      </Button>
    </Card>
  );
};

export default Preview;
