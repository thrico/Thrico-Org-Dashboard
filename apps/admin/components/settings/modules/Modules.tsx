"use client";

import { useState } from "react";
import { Card, Typography, Checkbox, Space, Divider, List, Button } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

const { Title, Text } = Typography;

export default function Modules() {
  const [hovered, setHovered] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checked, setChecked] = useState(true);

  const handleChange = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
  };

  const data = [
    "Directory",
    "Communities",
    "Events",
    "Jobs",
    "Marketplace",
    "Mentorship",
    "Stories",
    "Giving",
    "Projects",
    "Wall of Fame",
    "Marketplace",
    "shop",
    "Unlock Rewards",
    "Offers",
    "Nearby",
    "New To City",
    "Memories",
    "Birthdays",
    "Anniversaries",
    "Recommendations",
    "Invite ",
    "Refer ",
    "Mentorship",
    "Career Centre",
    "Entrepreneurship",
    "Unlock Rewards",
    "Polls",
    "Surveys",
    "Feedback",
    "FAQ",
    "Newsletter",
    "News",
    "Media",
  ];

  return (
    <Card
      title="Manage Modules"
      extra={<Button>Save</Button>}
      style={{ width: "100%" }}
    >
      <Space direction="vertical" size={32} style={{ width: "100%" }}>
        {/* Default */}

        {/* Selected */}
        <List
          style={{ width: "50%" }}
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item style={{ width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Checkbox style={{ marginRight: 40 }} />
                <Divider
                  type="vertical"
                  style={{ height: 24, margin: "0 40px" }}
                />
                <Text>{item}</Text>
              </div>
            </List.Item>
          )}
        />
      </Space>
    </Card>
  );
}
