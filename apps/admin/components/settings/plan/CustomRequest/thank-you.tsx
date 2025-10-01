"use client";

import { Button, Card, Typography, Space } from "antd";
import {
  CheckCircleOutlined,
  CalendarOutlined,
  MailOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export default function ThankYou() {
  return (
    <Card
      style={{
        backgroundColor: "#f6ffed",
        border: "1px solid #b7eb8f",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: 32 }}>
        <CheckCircleOutlined
          style={{
            fontSize: 64,
            color: "#52c41a",
            marginBottom: 16,
            display: "block",
          }}
        />
        <Title level={1} style={{ color: "#389e0d", marginBottom: 8 }}>
          Thank You!
        </Title>
        <Paragraph
          style={{
            fontSize: 18,
            color: "#52c41a",
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          We've received your request for a custom enterprise plan. Our sales
          team will review your requirements and contact you within 24 hours.
        </Paragraph>
      </div>

      <Card
        style={{
          backgroundColor: "white",
          marginBottom: 32,
          textAlign: "left",
        }}
      >
        <Title level={3} style={{ marginBottom: 16 }}>
          What happens next:
        </Title>
        <ul style={{ paddingLeft: 0, listStyle: "none" }}>
          <li
            style={{
              marginBottom: 12,
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <span
              style={{ color: "#52c41a", fontWeight: "bold", marginRight: 8 }}
            >
              •
            </span>
            <span>Our enterprise specialist will review your requirements</span>
          </li>
          <li
            style={{
              marginBottom: 12,
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <span
              style={{ color: "#52c41a", fontWeight: "bold", marginRight: 8 }}
            >
              •
            </span>
            <span>We'll prepare a custom proposal tailored to your needs</span>
          </li>
          <li
            style={{
              marginBottom: 12,
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <span
              style={{ color: "#52c41a", fontWeight: "bold", marginRight: 8 }}
            >
              •
            </span>
            <span>Schedule a demo and technical discussion</span>
          </li>
          <li
            style={{
              marginBottom: 12,
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <span
              style={{ color: "#52c41a", fontWeight: "bold", marginRight: 8 }}
            >
              •
            </span>
            <span>Provide detailed pricing and implementation timeline</span>
          </li>
        </ul>
      </Card>
    </Card>
  );
}
