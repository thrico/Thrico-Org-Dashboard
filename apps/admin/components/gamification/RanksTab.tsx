// File: components/RanksTab.tsx
import { useState } from "react";
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Space,
  Typography,
  Divider,
} from "antd";
import { PlusOutlined, DeleteOutlined, CrownOutlined } from "@ant-design/icons";
import { mockRanks } from "./mockData";

const { Option } = Select;
const { Text } = Typography;

export default function RanksTab({}) {
  const [ranks, setRanks] = useState(mockRanks);
  const [form] = Form.useForm();

  const addRank = (values: any) => {
    const rank = {
      ...values,
      id: Date.now(),
    };
    setRanks([...ranks, rank]);
    form.resetFields();
  };

  const deleteRank = (id: number) => {
    setRanks(ranks.filter((r: any) => r.id !== id));
  };

  const getRankTypeDescription = (rank: any) => {
    switch (rank.type) {
      case "points":
        return `${rank.minPoints} - ${rank.maxPoints || "∞"} points`;
      case "badges":
        return `${rank.minBadges} - ${rank.maxBadges || "∞"} badges`;
      case "hybrid":
        return `${rank.minPoints}+ pts & ${rank.minBadges}+ badges`;
      default:
        return "Unknown criteria";
    }
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Card title="Add Rank">
        <Form
          form={form}
          layout="vertical"
          onFinish={addRank}
          initialValues={{
            type: "points",
            minPoints: 0,
            minBadges: 0,
            color: "#3b82f6",
          }}
        >
          <Form.Item name="name" label="Rank Name" rules={[{ required: true }]}>
            <Input placeholder="Legend" />
          </Form.Item>

          <Form.Item name="type" label="Rank Type">
            <Select>
              <Option value="points">Points-Based</Option>
              <Option value="badges">Badges-Based</Option>
              <Option value="hybrid">Hybrid (Points + Badges)</Option>
            </Select>
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prev, curr) => prev.type !== curr.type}
          >
            {({ getFieldValue }) => {
              const type = getFieldValue("type");
              return (
                <>
                  {(type === "points" || type === "hybrid") && (
                    <>
                      <Form.Item name="minPoints" label="Min Points">
                        <Input type="number" />
                      </Form.Item>
                      <Form.Item name="maxPoints" label="Max Points">
                        <Input
                          type="number"
                          placeholder="Leave empty for no limit"
                        />
                      </Form.Item>
                    </>
                  )}

                  {(type === "badges" || type === "hybrid") && (
                    <>
                      <Form.Item name="minBadges" label="Min Badges">
                        <Input type="number" />
                      </Form.Item>
                      <Form.Item name="maxBadges" label="Max Badges">
                        <Input
                          type="number"
                          placeholder="Leave empty for no limit"
                        />
                      </Form.Item>
                    </>
                  )}
                </>
              );
            }}
          </Form.Item>

          <Form.Item name="color" label="Color">
            <Input type="color" />
          </Form.Item>

          <Form.Item name="icon" label="Icon/Emoji">
            <Input placeholder="👑" />
          </Form.Item>

          <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
            Add Rank
          </Button>
        </Form>
      </Card>

      <Card title="Current Ranks">
        <Space direction="vertical" style={{ width: "100%" }}>
          {ranks.map((rank: any) => (
            <div
              key={rank.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Space>
                  <span
                    style={{
                      width: 12,
                      height: 12,
                      backgroundColor: rank.color,
                      display: "inline-block",
                      borderRadius: 6,
                    }}
                  ></span>
                  <span>{rank.icon}</span>
                  <Text strong>{rank.name}</Text>
                  <Text type="secondary">{getRankTypeDescription(rank)}</Text>
                  <Text type="secondary">({rank.type})</Text>
                </Space>
              </div>
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => deleteRank(rank.id)}
              />
            </div>
          ))}
        </Space>
      </Card>
    </Space>
  );
}
