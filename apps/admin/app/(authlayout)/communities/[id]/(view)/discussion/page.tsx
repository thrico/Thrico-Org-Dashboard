"use client";
import { Typography, Tabs, Avatar, Button, Space, Row, Col, Card } from "antd";
import { MoreOutlined, StarFilled } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export default function CommunityDashboard() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarFilled
        key={i}
        style={{
          color: i < Math.floor(rating) ? "#fadb14" : "#f0f0f0",
          fontSize: "14px",
          marginRight: "2px",
        }}
      />
    ));
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[24, 0]}>
        <Col span={8}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Card>
              <Title level={4} style={{ marginBottom: "16px" }}>
                Community Activity
              </Title>
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <Row justify="space-between">
                  <Col>
                    <Text>Total Posts</Text>
                  </Col>
                  <Col>
                    <Text strong>1234</Text>
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Col>
                    <Text>Posts Today</Text>
                  </Col>
                  <Col>
                    <Text strong>12</Text>
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Col>
                    <Text>New Members</Text>
                  </Col>
                  <Col>
                    <Text strong>+23 this week</Text>
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Col>
                    <Text>Community Rating</Text>
                  </Col>
                  <Col>
                    <Space align="center">
                      <StarFilled style={{ color: "#fadb14" }} />
                      <Text strong>4.8</Text>
                    </Space>
                  </Col>
                </Row>
              </Space>
            </Card>

            <Card>
              <Row
                justify="space-between"
                align="middle"
                style={{ marginBottom: "16px" }}
              >
                <Col>
                  <Title level={1} style={{ margin: 0, fontSize: "32px" }}>
                    4.6
                  </Title>
                </Col>
                <Col>
                  <Button type="link" style={{ padding: 0 }}>
                    Rate Community
                  </Button>
                </Col>
              </Row>
              <div style={{ marginBottom: "8px" }}>{renderStars(4.6)}</div>
              <Text style={{ color: "#666" }}>(156)</Text>
            </Card>

            <Card>
              <Title level={4} style={{ marginBottom: "16px" }}>
                Community Admins
              </Title>
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <Row gutter={[12, 0]} align="middle">
                  <Col>
                    <Avatar size={32} style={{ backgroundColor: "#f0f0f0" }} />
                  </Col>
                  <Col>
                    <div>
                      <Text strong>John Doe</Text>
                      <div>
                        <Text style={{ color: "#666", fontSize: "12px" }}>
                          Admin
                        </Text>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row gutter={[12, 0]} align="middle">
                  <Col>
                    <Avatar size={32} style={{ backgroundColor: "#f0f0f0" }} />
                  </Col>
                  <Col>
                    <div>
                      <Text strong>Jane Smith</Text>
                      <div>
                        <Text style={{ color: "#666", fontSize: "12px" }}>
                          Co-Admin
                        </Text>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Space>
            </Card>

            <Card>
              <Title level={4} style={{ marginBottom: "16px" }}>
                Suggested Communities
              </Title>
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <Row justify="space-between" align="middle">
                  <Col>
                    <div>
                      <Text strong>Street Photography</Text>
                      <div>
                        <Space align="center">
                          <Text style={{ color: "#666", fontSize: "12px" }}>
                            8.5K members
                          </Text>
                          <StarFilled
                            style={{ color: "#fadb14", fontSize: "12px" }}
                          />
                          <Text style={{ color: "#666", fontSize: "12px" }}>
                            4.7
                          </Text>
                        </Space>
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <Button size="small">Join</Button>
                  </Col>
                </Row>
                <Row justify="space-between" align="middle">
                  <Col>
                    <div>
                      <Text strong>Portrait Masters</Text>
                      <div>
                        <Space align="center">
                          <Text style={{ color: "#666", fontSize: "12px" }}>
                            12.1K members
                          </Text>
                          <StarFilled
                            style={{ color: "#fadb14", fontSize: "12px" }}
                          />
                          <Text style={{ color: "#666", fontSize: "12px" }}>
                            4.9
                          </Text>
                        </Space>
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <Button size="small">Join</Button>
                  </Col>
                </Row>
                <Row justify="space-between" align="middle">
                  <Col>
                    <div>
                      <Text strong>Nature Photography</Text>
                      <div>
                        <Space align="center">
                          <Text style={{ color: "#666", fontSize: "12px" }}>
                            15.3K members
                          </Text>
                          <StarFilled
                            style={{ color: "#fadb14", fontSize: "12px" }}
                          />
                          <Text style={{ color: "#666", fontSize: "12px" }}>
                            4.6
                          </Text>
                        </Space>
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <Button size="small">Join</Button>
                  </Col>
                </Row>
              </Space>
            </Card>
          </Space>
        </Col>
      </Row>
    </div>
  );
}
