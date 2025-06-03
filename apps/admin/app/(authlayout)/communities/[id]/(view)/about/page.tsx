"use client";
import { Typography, Card, Space } from "antd";

const { Title, Text, Paragraph } = Typography;

export default function CommunityAbout() {
  return (
    <Card
      style={{
        margin: "20px",
        borderRadius: "8px",
        border: "1px solid #f0f0f0",
      }}
    >
      <Title level={2} style={{ marginBottom: "32px", fontWeight: "600" }}>
        About This Community
      </Title>

      <div style={{ marginBottom: "40px" }}>
        <Title level={3} style={{ marginBottom: "16px", fontWeight: "600" }}>
          Description
        </Title>
        <Paragraph
          style={{ fontSize: "16px", lineHeight: "1.6", color: "#666" }}
        >
          A community for photographers of all levels to share their work, get
          feedback, and learn from each other. Whether you're just starting out
          or you're a seasoned professional, everyone is welcome here!
        </Paragraph>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <Title level={3} style={{ marginBottom: "24px", fontWeight: "600" }}>
          Community Rules
        </Title>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Text style={{ fontSize: "16px", color: "#666" }}>
            1. Be respectful and constructive in your feedback
          </Text>
          <Text style={{ fontSize: "16px", color: "#666" }}>
            2. Only post your own original work
          </Text>
          <Text style={{ fontSize: "16px", color: "#666" }}>
            3. No spam or promotional content
          </Text>
          <Text style={{ fontSize: "16px", color: "#666" }}>
            4. Keep discussions photography-related
          </Text>
        </Space>
      </div>

      <div>
        <Title level={3} style={{ marginBottom: "24px", fontWeight: "600" }}>
          Community Details
        </Title>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <div>
            <Text strong style={{ color: "#666", marginRight: "8px" }}>
              Privacy:
            </Text>
            <Text style={{ color: "#666" }}>Public</Text>
          </div>
          <div>
            <Text strong style={{ color: "#666", marginRight: "8px" }}>
              Join Condition:
            </Text>
            <Text style={{ color: "#666" }}>Anyone can join</Text>
          </div>
          <div>
            <Text strong style={{ color: "#666", marginRight: "8px" }}>
              Categories:
            </Text>
            <Text style={{ color: "#666" }}>Arts & Photography, Creative</Text>
          </div>
          <div>
            <Text strong style={{ color: "#666", marginRight: "8px" }}>
              Location:
            </Text>
            <Text style={{ color: "#666" }}>Global</Text>
          </div>
          <div>
            <Text strong style={{ color: "#666", marginRight: "8px" }}>
              Created:
            </Text>
            <Text style={{ color: "#666" }}>January 15, 2024</Text>
          </div>
        </Space>
      </div>
    </Card>
  );
}
