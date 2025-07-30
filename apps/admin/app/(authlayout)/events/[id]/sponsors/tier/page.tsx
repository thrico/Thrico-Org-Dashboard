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
  const [tiers] = useState([
    {
      id: "1",
      name: "Platinum",
      price: "$10,000",
      benefits: [
        "Logo on main stage",
        "10 VIP tickets",
        "Booth space",
        "Speaking slot",
        "Logo on website",
      ],
      limit: 3,
      sponsors: [
        { id: "1", name: "TechCorp", logo: "/placeholder.svg" },
        { id: "2", name: "InnovateCo", logo: "/placeholder.svg" },
      ],
    },
    {
      id: "2",
      name: "Gold",
      price: "$5,000",
      benefits: [
        "Logo on website",
        "5 VIP tickets",
        "Booth space",
        "Logo on promotional materials",
      ],
      limit: 5,
      sponsors: [
        { id: "3", name: "WebTech", logo: "/placeholder.svg" },
        { id: "4", name: "ProductHQ", logo: "/placeholder.svg" },
        { id: "5", name: "DevTools Inc", logo: "/placeholder.svg" },
      ],
    },
    {
      id: "3",
      name: "Silver",
      price: "$2,500",
      benefits: [
        "Logo on website",
        "2 VIP tickets",
        "Logo on promotional materials",
      ],
      limit: 10,
      sponsors: [
        { id: "6", name: "StartupX", logo: "/placeholder.svg" },
        { id: "7", name: "CodeLabs", logo: "/placeholder.svg" },
      ],
    },
  ]);

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      {tiers.map((tier) => (
        <Card
          key={tier.id}
          title={`${tier.name} Tier - ${tier.price}`}
          extra={
            <Badge
              count={`${tier.sponsors.length}/${tier.limit} Filled`}
              style={{ backgroundColor: "#f0f0f0", color: "#333" }}
            />
          }
        >
          <div style={{ marginBottom: 16 }}>
            <Text strong>Benefits:</Text>
            <List
              size="small"
              dataSource={tier.benefits}
              renderItem={(benefit) => <List.Item>{benefit}</List.Item>}
            />
          </div>

          <Text strong className="mb-2 block">
            Current Sponsors:
          </Text>
          <Space wrap size="large">
            {tier.sponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar size={64} src={sponsor.logo || "/placeholder.svg"} />
                <Text style={{ marginTop: 8 }}>{sponsor.name}</Text>
              </div>
            ))}

            {tier.sponsors.length < tier.limit && (
              <Button
                shape="circle"
                icon={<PlusCircleOutlined />}
                size="large"
              />
            )}
          </Space>
        </Card>
      ))}
    </Space>
  );
}

export default EventSponsorship;
