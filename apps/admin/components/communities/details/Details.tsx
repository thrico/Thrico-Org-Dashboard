"use client";
import { Typography, Button, Space, Tag, Avatar, Row, Col, Card } from "antd";
import {
  GlobalOutlined,
  StarFilled,
  UserOutlined,
  ShareAltOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { communityEntity } from "../ts-types";
import Image from "next/image";

const { Title, Text, Paragraph } = Typography;

export default function PhotographyCommunity({
  data,
}: {
  data: communityEntity;
}) {
  return (
    <div>
      {/* Banner Image */}

      <div
        style={{
          height: "300px",
          backgroundColor: "#b3b3b3",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Image
          src={`https://cdn.thrico.network/${data?.cover}`}
          alt="alt"
          layout="fill"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>

      {/* Content Card */}
      <Card
        style={{
          backgroundColor: "white",
          padding: "24px",
          margin: "-40px 40px 0 40px",
          borderRadius: "8px",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Header Section */}
        <Row align="middle" gutter={[16, 16]}>
          <Col>
            <Title level={2} style={{ margin: 0, fontWeight: "bold" }}>
              {data?.title}
            </Title>
          </Col>
          <Col>
            <Tag
              icon={<GlobalOutlined />}
              style={{
                borderRadius: "16px",
                padding: "0 12px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                fontWeight: "500",
                fontSize: "14px",
              }}
            >
              <span>{data?.privacy}</span>
            </Tag>
          </Col>
          <Col>
            <Tag
              icon={<StarFilled style={{ color: "#fadb14" }} />}
              color="default"
              style={{
                borderRadius: "16px",
                padding: "0 12px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                fontWeight: "500",
                fontSize: "14px",
              }}
            >
              4.8 (156)
            </Tag>
          </Col>
        </Row>

        {/* Tagline */}

        {/* Description */}
        <Paragraph style={{ fontSize: "16px", marginTop: "14px" }}>
          {data?.description}
        </Paragraph>

        {/* Action Buttons */}
        <Row justify="space-between" align="middle">
          <Col>
            <Space size="large">
              <Space>
                <UserOutlined style={{ fontSize: "16px" }} />
                <Text>12.5K members</Text>
              </Space>
              <Text>1234 posts</Text>
              <Space>
                <EnvironmentOutlined style={{ fontSize: "16px" }} />
                <Text>Global</Text>
              </Space>
            </Space>
          </Col>
          <Col>
            <Space size="middle">
              <Button
                type="primary"
                size="large"
                icon={<UserOutlined />}
                style={{
                  borderRadius: "4px",
                  fontWeight: "500",
                  backgroundColor: "#4096ff",
                }}
              >
                Join
              </Button>
              <Button
                size="large"
                icon={<ShareAltOutlined />}
                style={{
                  borderRadius: "4px",
                  fontWeight: "500",
                }}
              >
                Share
              </Button>
            </Space>
          </Col>
        </Row>

        {/* Member Avatars */}
        <div style={{ marginTop: "24px" }}>
          <Avatar.Group
            maxCount={5}
            maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
          >
            <Avatar style={{ backgroundColor: "#f0f0f0" }} />
            <Avatar style={{ backgroundColor: "#f0f0f0" }} />
            <Avatar style={{ backgroundColor: "#f0f0f0" }} />
            <Avatar style={{ backgroundColor: "#f0f0f0" }} />
            <Avatar style={{ backgroundColor: "#f0f0f0" }} />
          </Avatar.Group>
          <Text style={{ marginLeft: "8px" }}>+12.5K members</Text>
        </div>
      </Card>
    </div>
  );
}
