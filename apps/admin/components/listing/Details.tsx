import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Divider,
  Drawer,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import React, { useState } from "react";

import {
  CheckCircleFilled,
  CheckCircleOutlined,
  DislikeOutlined,
  FlagOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
  UndoOutlined,
  UnlockOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";

import moment from "moment";
import { MarketPlaceListing } from "../../graphql/actions/listing";
import { Row, Col, Rate } from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { GetCurrency } from "../../screen/Currency";
import { getEntity } from "../../graphql/actions";

const { Title, Text, Paragraph } = Typography;
const Details = ({
  listing,
  isDrawerOpen,
  setIsDrawerOpen,
  handleAction,
}: {
  listing: MarketPlaceListing | null;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  handleAction: (
    action:
      | "APPROVE"
      | "DISABLE"
      | "ENABLE"
      | "UNBLOCK"
      | "REJECT"
      | "FLAG"
      | "VERIFY"
      | "UNVERIFY"
      | "REAPPROVE",
    listing: MarketPlaceListing | null
  ) => void;
}) => {
  const { Title, Text, Paragraph } = Typography;
  const [active, setActive] = useState<string>(listing?.media?.[0]?.url || "");
  const { data, loading } = getEntity();
  return (
    <Drawer
      title="User Details"
      placement="right"
      onClose={() => setIsDrawerOpen(false)}
      open={isDrawerOpen}
      width={1200}
      extra={
        <Space wrap>
          {listing?.status === "PENDING" && (
            <>
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                onClick={() => handleAction("APPROVE", listing)}
              >
                Approve
              </Button>
              <Button
                danger
                icon={<DislikeOutlined />}
                onClick={() => handleAction("REJECT", listing)}
              >
                Reject
              </Button>
            </>
          )}

          {listing?.status === "BLOCKED" ? (
            <Button
              type="primary"
              icon={<UnlockOutlined />}
              onClick={() => handleAction("UNBLOCK", listing)}
            >
              Unblock
            </Button>
          ) : (
            listing?.status === "REJECTED" && (
              <>
                <Button
                  type="primary"
                  icon={<UndoOutlined />}
                  onClick={() => handleAction("REAPPROVE", listing)}
                >
                  Re-approve User
                </Button>
              </>
            )
          )}

          {listing?.status === "APPROVED" && (
            <>
              {listing?.verification?.isVerified ? (
                <Button
                  danger
                  icon={<SafetyCertificateOutlined />}
                  onClick={() => handleAction("UNVERIFY", listing)}
                >
                  Remove Verification
                </Button>
              ) : (
                <Button
                  type="primary"
                  icon={<SafetyCertificateOutlined />}
                  onClick={() => handleAction("VERIFY", listing)}
                >
                  Verify User
                </Button>
              )}
              <Button
                icon={<UserDeleteOutlined />}
                onClick={() => handleAction("DISABLE", listing)}
              >
                Disable
              </Button>
            </>
          )}

          {listing?.status === "DISABLED" && (
            <>
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                onClick={() => handleAction("ENABLE", listing)}
              >
                Enable
              </Button>
            </>
          )}
        </Space>
      }
    >
      <div style={{ padding: 24 }}>
        <Row gutter={24} align="start">
          {/* LEFT SIDE */}
          <Col xs={24} md={16}>
            {/* Image Gallery */}
            <Card>
              <div
                style={{ height: 300, background: "#f0f0f0", marginBottom: 16 }}
              >
                <img
                  src={`https://cdn.thrico.network/${active}`}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: 300,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              </div>
              {listing?.media.length === 1 ? (
                <div style={{ textAlign: "center", color: "#aaa" }}></div>
              ) : (
                <Row gutter={8}>
                  {listing?.media.map((set, i) => (
                    <Col onClick={() => setActive(set.url)} span={6} key={i}>
                      <img
                        src={`https://cdn.thrico.network/${set.url}`}
                        alt="Preview"
                        style={{
                          width: "100%",
                          height: 100,
                          objectFit: "cover",
                          borderRadius: 8,
                          cursor: "pointer",
                        }}
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </Card>

            {/* Description */}
            <Card style={{ marginTop: 16 }}>
              <Title level={5}>Description</Title>
              <Paragraph>{listing?.description}</Paragraph>
            </Card>

            {/* Specifications */}
          </Col>

          {/* RIGHT SIDE */}
          <Col xs={24} md={8}>
            <div style={{ position: "sticky", top: 24 }}>
              <Card>
                <Title level={3} style={{ marginBottom: 0 }}>
                  {GetCurrency(listing?.currency)} {listing?.price}
                </Title>
                <Tag color="green">Active</Tag>
                <Tag color="blue">Verified</Tag>
                <Divider style={{ margin: "12px 0" }} />

                <Text type="secondary">
                  <EnvironmentOutlined /> {listing?.location}
                </Text>
                <br />
                <Text>
                  Posted on{" "}
                  {moment(listing?.createdAt).format("MMM D, YYYY")}{" "}
                </Text>
                <br />
                <Text>{listing?.numberOfViews} views </Text>
                <br />
                <Divider style={{ margin: "12px 0" }} />

                <Text strong>{listing?.category}</Text>
                <br />
                <Text>Condition: {listing?.condition}</Text>
              </Card>

              <Card style={{ marginTop: 16 }}>
                <Title level={5}>Seller Information</Title>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Avatar size={48} />
                  <div>
                    <Text strong>Rajesh Kumar</Text>{" "}
                    <Tag color="green">✔ Verified</Tag>
                    <br />
                    <Rate
                      disabled
                      defaultValue={4.8}
                      allowHalf
                      style={{ fontSize: 14 }}
                    />
                  </div>
                </div>
                <Divider style={{ margin: "12px 0" }} />
                <Text>Member since: 2020</Text>
                <br />
                <Text>Total sales: 23</Text>
                <br />
                <Text type="secondary">Usually responds within 2 hours</Text>
                <Divider style={{ margin: "12px 0" }} />

                <Button type="primary" block size="large">
                  Message
                </Button>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </Drawer>
  );
};

export default Details;
