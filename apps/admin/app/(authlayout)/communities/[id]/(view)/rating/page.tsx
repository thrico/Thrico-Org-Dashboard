"use client";
import {
  Typography,
  Button,
  Progress,
  Avatar,
  Space,
  Row,
  Col,
  Select,
  Card,
} from "antd";
import {
  StarFilled,
  LikeOutlined,
  DislikeOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export default function CommunityRatings() {
  const ratingData = [
    { stars: 5, count: 78, percentage: 65 },
    { stars: 4, count: 45, percentage: 38 },
    { stars: 3, count: 18, percentage: 15 },
    { stars: 2, count: 8, percentage: 7 },
    { stars: 1, count: 7, percentage: 6 },
  ];

  const categoryRatings = [
    { category: "Content Quality", rating: 4.7 },
    { category: "Community Support", rating: 4.8 },
    { category: "Moderation", rating: 4.5 },
    { category: "Educational Value", rating: 4.6 },
    { category: "User Experience", rating: 4.4 },
  ];

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
      <Row gutter={[40, 0]}>
        <Col span={14}>
          <div style={{ marginBottom: "32px" }}>
            <Row align="middle" gutter={[40, 0]}>
              <Col>
                <div>
                  <Title
                    level={1}
                    style={{ margin: 0, fontSize: "48px", fontWeight: "600" }}
                  >
                    4.6
                  </Title>
                  <div style={{ marginBottom: "8px" }}>{renderStars(4.6)}</div>
                  <Text style={{ color: "#666" }}>156 total ratings</Text>
                  <div style={{ marginTop: "4px" }}>
                    <Text style={{ color: "#52c41a", fontSize: "14px" }}>
                      📈 +0.2 this month
                    </Text>
                  </div>
                </div>
              </Col>
              <Col flex={1}>
                <Space
                  direction="vertical"
                  size="small"
                  style={{ width: "100%" }}
                >
                  {ratingData.map((item) => (
                    <Row key={item.stars} align="middle" gutter={[8, 0]}>
                      <Col width={20}>
                        <Text>{item.stars}</Text>
                      </Col>
                      <Col width={20}>
                        <StarFilled
                          style={{ color: "#fadb14", fontSize: "12px" }}
                        />
                      </Col>
                      <Col flex={1}>
                        <Progress
                          percent={item.percentage}
                          showInfo={false}
                          strokeColor="#4096ff"
                          trailColor="#f0f0f0"
                          size="small"
                        />
                      </Col>
                      <Col width={30}>
                        <Text style={{ fontSize: "14px", color: "#666" }}>
                          {item.count}
                        </Text>
                      </Col>
                    </Row>
                  ))}
                </Space>
              </Col>
            </Row>
          </div>

          <Button
            type="primary"
            size="large"
            style={{
              marginBottom: "32px",
              borderRadius: "4px",
              fontWeight: "500",
            }}
          >
            Write a Review
          </Button>

          <Row gutter={[16, 0]} style={{ marginBottom: "32px" }}>
            <Col>
              <Select
                defaultValue="newest"
                style={{ width: 140 }}
                options={[
                  { value: "newest", label: "Newest First" },
                  { value: "oldest", label: "Oldest First" },
                ]}
              />
            </Col>
            <Col>
              <Select
                defaultValue="all"
                style={{ width: 120 }}
                options={[
                  { value: "all", label: "All Ratings" },
                  { value: "5", label: "5 Stars" },
                  { value: "4", label: "4 Stars" },
                ]}
              />
            </Col>
          </Row>

          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Card style={{ border: "none", padding: "0" }}>
              <Row gutter={[16, 0]}>
                <Col>
                  <Avatar size={48} style={{ backgroundColor: "#f0f0f0" }} />
                </Col>
                <Col flex={1}>
                  <div style={{ marginBottom: "8px" }}>
                    <Space align="center">
                      <Text strong>Sarah Johnson</Text>
                      <CheckCircleFilled
                        style={{ color: "#1890ff", fontSize: "16px" }}
                      />
                      <div style={{ marginLeft: "auto" }}>
                        {renderStars(5)}
                        <Text style={{ marginLeft: "8px", color: "#666" }}>
                          2 days ago
                        </Text>
                      </div>
                    </Space>
                  </div>
                  <Text
                    style={{
                      color: "#666",
                      fontSize: "12px",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Member since Jan 2024
                  </Text>
                  <Title level={5} style={{ marginBottom: "12px" }}>
                    Amazing photography community!
                  </Title>
                  <Paragraph style={{ marginBottom: "16px", color: "#666" }}>
                    This community has helped me improve my photography skills
                    tremendously. The feedback is always constructive and the
                    weekly challenges keep me motivated. Highly recommend to
                    anyone interested in photography!
                  </Paragraph>
                  <Space style={{ marginBottom: "16px" }}>
                    <div
                      style={{
                        padding: "4px 8px",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "4px",
                        fontSize: "12px",
                      }}
                    >
                      Content Quality
                    </div>
                    <div
                      style={{
                        padding: "4px 8px",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "4px",
                        fontSize: "12px",
                      }}
                    >
                      Community Support
                    </div>
                  </Space>
                  <Space>
                    <Button type="text" icon={<LikeOutlined />} size="small">
                      Helpful (24)
                    </Button>
                    <Button type="text" icon={<DislikeOutlined />} size="small">
                      Not Helpful (2)
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Card>

            <Card style={{ border: "none", padding: "0" }}>
              <Row gutter={[16, 0]}>
                <Col>
                  <Avatar size={48} style={{ backgroundColor: "#f0f0f0" }} />
                </Col>
                <Col flex={1}>
                  <div style={{ marginBottom: "8px" }}>
                    <Space align="center">
                      <Text strong>Mike Chen</Text>
                      <div style={{ marginLeft: "auto" }}>
                        {renderStars(4)}
                        <Text style={{ marginLeft: "8px", color: "#666" }}>
                          1 week ago
                        </Text>
                      </div>
                    </Space>
                  </div>
                  <Text
                    style={{
                      color: "#666",
                      fontSize: "12px",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Member since Mar 2024
                  </Text>
                  <Title level={5} style={{ marginBottom: "12px" }}>
                    Great community with active members
                  </Title>
                  <Paragraph style={{ marginBottom: "16px", color: "#666" }}>
                    Love the active discussions and the variety of photography
                    styles shared. The admins are responsive and the community
                    guidelines are clear. Only wish there were more in-person
                    meetups.
                  </Paragraph>
                  <Space style={{ marginBottom: "16px" }}>
                    <div
                      style={{
                        padding: "4px 8px",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "4px",
                        fontSize: "12px",
                      }}
                    >
                      Community Engagement
                    </div>
                    <div
                      style={{
                        padding: "4px 8px",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "4px",
                        fontSize: "12px",
                      }}
                    >
                      Moderation
                    </div>
                  </Space>
                  <Space>
                    <Button type="text" icon={<LikeOutlined />} size="small">
                      Helpful (18)
                    </Button>
                    <Button type="text" icon={<DislikeOutlined />} size="small">
                      Not Helpful (1)
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Card>
          </Space>
        </Col>

        <Col span={10}>
          <div>
            <Title level={4} style={{ marginBottom: "16px" }}>
              Category Ratings
            </Title>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              {categoryRatings.map((item) => (
                <Row key={item.category} justify="space-between" align="middle">
                  <Col>
                    <Text>{item.category}</Text>
                  </Col>
                  <Col>
                    <Space align="center">
                      <Text strong>{item.rating}</Text>
                      <StarFilled
                        style={{ color: "#fadb14", fontSize: "14px" }}
                      />
                    </Space>
                  </Col>
                </Row>
              ))}
            </Space>
          </div>
        </Col>
      </Row>
    </div>
  );
}
