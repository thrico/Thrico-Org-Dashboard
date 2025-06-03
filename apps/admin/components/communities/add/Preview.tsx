// import CommunitiesGuides from "@/components/guides/CommunitiesGuides";
import { GlobalOutlined, LockOutlined } from "@ant-design/icons";
import {
  Alert,
  Card,
  Col,
  Image,
  Row,
  Space,
  Tabs,
  Tag,
  Typography,
} from "antd";

import React from "react";
import { FormValues } from "../ts-types";

interface props {
  data: FormValues;
  imageUrl: string;
}
const Preview = ({ data, imageUrl }: props) => {
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
      <Card
        style={{ width: "60rem", height: "50rem" }}
        title="Preview"
        extra={<Space>{/* <CommunitiesGuides /> */}</Space>}
      >
        <Image
          preview={false}
          alt="cover"
          style={{
            width: "100%",
            height: "20rem",
            filter: "grayscale(100%)",
            objectFit: "cover",
          }}
          src={imageUrl}
        />
        <Typography.Title style={{ marginTop: 20 }} level={3}>
          {data?.title}
        </Typography.Title>
        <Typography.Title level={5} style={{ textTransform: "capitalize" }}>
          {data?.privacy === "private" ? (
            <LockOutlined style={{ marginRight: 10 }} />
          ) : (
            <GlobalOutlined style={{ marginRight: 10 }} />
          )}
          <span style={{ textTransform: "capitalize" }}>{data?.privacy}</span>
        </Typography.Title>
        <Typography.Paragraph>{data?.description}</Typography.Paragraph>
        <Tabs
          style={{ marginTop: 20 }}
          items={[
            "Discussion",
            "Featured",
            "People",
            "Media",
            "Events",
            "Invites",
          ].map((t, i) => {
            const id = String(i + 1);
            return {
              key: id,
              label: t,
            };
          })}
        />

        <div style={{ paddingTop: "16px" }}>
          <Row gutter={16}>
            <Col span={8} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#1f2937",
                }}
              >
                0
              </div>
              <div style={{ fontSize: "14px", color: "#6b7280" }}>Members</div>
            </Col>
            <Col span={8} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#1f2937",
                }}
              >
                0
              </div>
              <div style={{ fontSize: "14px", color: "#6b7280" }}>Posts</div>
            </Col>
            <Col span={8} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#1f2937",
                }}
              >
                0
              </div>
              <div style={{ fontSize: "14px", color: "#6b7280" }}>Events</div>
            </Col>
          </Row>

          {/* <Space wrap>
          <Tag>
            {data?.groupType === "virtual"
              ? "Virtual"
              : data?.groupType === "in-person"
                ? "In Person"
                : "Hybrid"}
          </Tag>
          <Tag>
            {data?.joiningTerms === "anyone" ? "Open Join" : "Admin Approval"}
          </Tag>
          {data?.requireAdminApproval && <Tag>Post Approval</Tag>}
          {data?.allowMemberInvites && <Tag>Member Invites</Tag>}
        </Space> */}
        </div>
      </Card>
    </div>
  );
};

export default Preview;
