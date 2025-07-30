"use client";

import { useState } from "react";
import {
  Button,
  Card,
  Tabs,
  Typography,
  Avatar,
  Badge,
  Space,
  List,
  Row,
  Col,
  Divider,
} from "antd";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

function EventSponsorship() {
  const [specialSponsors] = useState([
    {
      id: "1",
      type: "Title Sponsor",
      name: "MegaTech Industries",
      logo: "/placeholder.svg",
      benefits: [
        "Exclusive branding as 'Title Sponsor'",
        "Prime logo placement",
        "VIP dinner with speakers",
      ],
    },
    {
      id: "2",
      type: "Co-powered by",
      name: "InnovateNow",
      logo: "/placeholder.svg",
      benefits: [
        "Secondary branding",
        "Special mention in opening keynote",
        "VIP access",
      ],
    },
  ]);

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      {specialSponsors.map((sponsor) => (
        <Card key={sponsor.id} title={sponsor.type}>
          <Row gutter={16} align="middle">
            <Col>
              <Avatar size={80} src={sponsor.logo || "/placeholder.svg"} />
            </Col>
            <Col flex="auto">
              <Title level={5}>{sponsor.name}</Title>
              <List
                size="small"
                header={<Text strong>Benefits:</Text>}
                dataSource={sponsor.benefits}
                renderItem={(benefit) => <List.Item>{benefit}</List.Item>}
              />
            </Col>
          </Row>
        </Card>
      ))}
      <Button block icon={<PlusCircleOutlined />}>
        Add Special Sponsor
      </Button>
    </Space>
  );
}

export default EventSponsorship;
