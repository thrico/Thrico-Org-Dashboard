"use client";

import React from "react";
import {
  Card,
  Typography,
  Space,
  Tag,
  Divider,
  Avatar,
  Row,
  Col,
  Button,
} from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  UserOutlined,
  ShareAltOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import dayjs from "dayjs";

const { Title, Text, Paragraph } = Typography;

interface EventPreviewProps {
  eventData: {
    title?: string;
    description?: string;
    location?: { name?: string };
    startDate?: any;
    endDate?: any;
    startTime?: any;
    type?: string;
    lastDateOfRegistration?: any;
  };
  coverImage?: string;
}

export function EventPreview({ eventData, coverImage }: EventPreviewProps) {
  const {
    title = "Your Event Title",
    description = "Your event description will appear here...",
    location,
    startDate,
    endDate,
    startTime,
    type = "IN_PERSON",
    lastDateOfRegistration,
  } = eventData;

  const formatDate = (date: any) => {
    if (!date) return "Date not set";
    return dayjs(date).format("MMM DD, YYYY");
  };

  const formatTime = (time: any) => {
    if (!time) return "Time not set";
    return dayjs(time).format("hh:mm A");
  };

  const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
      case "IN_PERSON":
        return "blue";
      case "ONLINE":
        return "green";
      case "HYBRID":
        return "purple";
      default:
        return "default";
    }
  };

  const getEventTypeLabel = (eventType: string) => {
    switch (eventType) {
      case "IN_PERSON":
        return "In Person";
      case "ONLINE":
        return "Online";
      case "HYBRID":
        return "Hybrid";
      default:
        return "Unknown";
    }
  };

  return (
    <Card
      style={{
        maxWidth: 600,
        margin: "0 auto",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
      bodyStyle={{ padding: 0 }}
    >
      {/* Cover Image */}
      <div
        style={{
          position: "relative",
          height: 200,
          overflow: "hidden",
          borderRadius: "8px 8px 0 0",
        }}
      >
        <Image
          src={coverImage || "https://cdn.thrico.network/defaultEventCover.png"}
          alt="Event cover"
          fill
          style={{ objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            display: "flex",
            gap: 8,
          }}
        >
          <Button
            shape="circle"
            icon={<ShareAltOutlined />}
            style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
          />
          <Button
            shape="circle"
            icon={<HeartOutlined />}
            style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
          />
        </div>
      </div>

      {/* Event Content */}
      <div style={{ padding: 24 }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Header */}
          <div>
            <Space align="start" style={{ width: "100%" }}>
              <div style={{ flex: 1 }}>
                <Title level={3} style={{ margin: 0, marginBottom: 8 }}>
                  {title}
                </Title>
                <Space size="small">
                  <Tag color={getEventTypeColor(type)}>
                    {getEventTypeLabel(type)}
                  </Tag>
                  {location?.name && (
                    <Text type="secondary">
                      <EnvironmentOutlined /> {location.name}
                    </Text>
                  )}
                </Space>
              </div>
              <Avatar size={48} icon={<UserOutlined />} />
            </Space>
          </div>

          {/* Event Details */}
          <Row gutter={16}>
            <Col span={12}>
              <Space direction="vertical" size="small">
                <Text strong>
                  <CalendarOutlined /> Date & Time
                </Text>
                <div>
                  <Text>{formatDate(startDate)}</Text>
                  {endDate && startDate !== endDate && (
                    <Text type="secondary"> - {formatDate(endDate)}</Text>
                  )}
                </div>
                <Text type="secondary">
                  <ClockCircleOutlined /> {formatTime(startTime)}
                </Text>
              </Space>
            </Col>
            <Col span={12}>
              <Space direction="vertical" size="small">
                <Text strong>Registration Deadline</Text>
                <Text type="secondary">
                  {formatDate(lastDateOfRegistration)}
                </Text>
              </Space>
            </Col>
          </Row>

          <Divider />

          {/* Description */}
          <div>
            <Title level={5}>About this event</Title>
            <Paragraph style={{ marginBottom: 0 }}>{description}</Paragraph>
          </div>

          {/* Action Buttons */}
          <div>
            <Space>
              <Button type="primary" size="large">
                Register Now
              </Button>
              <Button size="large">Learn More</Button>
            </Space>
          </div>

          {/* Event Stats */}
          <div
            style={{
              backgroundColor: "#f5f5f5",
              padding: 16,
              borderRadius: 8,
              marginTop: 16,
            }}
          >
            <Row gutter={24} justify="space-around">
              <Col>
                <Text strong>0</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Registered
                </Text>
              </Col>
              <Col>
                <Text strong>0</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Views
                </Text>
              </Col>
              <Col>
                <Text strong>0</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Interested
                </Text>
              </Col>
            </Row>
          </div>
        </Space>
      </div>
    </Card>
  );
}
