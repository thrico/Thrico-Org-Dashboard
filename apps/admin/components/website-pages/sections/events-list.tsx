import { Card, Row, Col, Typography, Button, Tag, Space } from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  ArrowRightOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Meta } = Card;

export default function EventsList() {
  const events = [
    {
      id: 1,
      title: "Annual Tech Conference",
      date: "May 15, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Convention Center, Downtown",
      category: "Technology",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Networking Mixer",
      date: "May 20, 2025",
      time: "6:00 PM - 9:00 PM",
      location: "Skyline Lounge",
      category: "Networking",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Community Volunteer Day",
      date: "May 25, 2025",
      time: "10:00 AM - 2:00 PM",
      location: "City Park",
      category: "Community",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Professional Development Workshop",
      date: "June 5, 2025",
      time: "1:00 PM - 4:00 PM",
      location: "Business Center",
      category: "Career",
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  return (
    <Row gutter={[24, 24]}>
      {events.map((event) => (
        <Col xs={24} sm={12} lg={6} key={event.id}>
          <Card
            hoverable
            cover={
              <div style={{ height: 200, overflow: "hidden" }}>
                <img
                  alt={event.title}
                  src={event.image || "/placeholder.svg"}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            }
            actions={[
              <Button type="link" key="view" href={`/events/${event.id}`}>
                View Details <ArrowRightOutlined />
              </Button>,
            ]}
          >
            <div
              style={{
                marginBottom: 12,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Title level={5} style={{ margin: 0 }}>
                {event.title}
              </Title>
              <Tag color="blue">{event.category}</Tag>
            </div>

            <Space
              direction="vertical"
              size={4}
              style={{ color: "rgba(0, 0, 0, 0.45)" }}
            >
              <Text type="secondary">
                <CalendarOutlined style={{ marginRight: 8 }} />
                {event.date}
              </Text>
              <Text type="secondary">
                <ClockCircleOutlined style={{ marginRight: 8 }} />
                {event.time}
              </Text>
              <Text type="secondary">
                <EnvironmentOutlined style={{ marginRight: 8 }} />
                {event.location}
              </Text>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
