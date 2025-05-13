"use client";
import { Typography, Card, Divider, Select, Button } from "antd";
import {
  ShopOutlined,
  EnvironmentOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

const { Title, Text, Link } = Typography;
const { Option } = Select;

export default function General() {
  return (
    <Card title="Settings">
      {/* Store Details Card */}
      <Card style={{ marginBottom: "24px", borderRadius: "8px" }}>
        <Title level={4} style={{ marginBottom: "24px" }}>
          Store details
        </Title>

        <Card style={{ borderRadius: "8px" }}>
          <div
            style={{ display: "flex", alignItems: "center", padding: "16px 0" }}
          >
            <ShopOutlined
              style={{ fontSize: "20px", marginRight: "16px", color: "#666" }}
            />
            <Text strong style={{ fontSize: "16px" }}>
              My Page
            </Text>
          </div>

          <Divider style={{ margin: "0" }} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 0",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <EnvironmentOutlined
                style={{
                  fontSize: "20px",
                  marginRight: "16px",
                  marginTop: "4px",
                  color: "#666",
                }}
              />
              <div>
                <div style={{ fontWeight: 500 }}>Billing address</div>
                <div>India</div>
              </div>
            </div>
            <Button type="text" icon={<EditOutlined />} />
          </div>
        </Card>
      </Card>

      {/* Store Defaults Card */}
      <Card style={{ borderRadius: "8px" }}>
        <Title level={4} style={{ marginBottom: "24px" }}>
          Store defaults
        </Title>

        <Card style={{ marginBottom: "24px", borderRadius: "8px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontWeight: 500, marginBottom: "8px" }}>
                Currency display
              </div>
              <div style={{ color: "#666" }}>
                To manage the currencies customers see, go to{" "}
                <Link href="#">Markets</Link>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Select defaultValue="inr" style={{ width: 220 }} bordered={true}>
                <Option value="inr">Indian Rupee (INR ₹)</Option>
                <Option value="usd">US Dollar (USD $)</Option>
                <Option value="eur">Euro (EUR €)</Option>
                <Option value="gbp">British Pound (GBP £)</Option>
              </Select>
              <Button
                type="text"
                icon={<EllipsisOutlined />}
                style={{ marginLeft: "8px" }}
              />
            </div>
          </div>
        </Card>

        <div style={{ display: "flex", gap: "24px", marginBottom: "24px" }}>
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: "8px" }}>Unit system</div>
            <Select
              defaultValue="metric"
              style={{ width: "100%" }}
              bordered={true}
            >
              <Option value="metric">Metric system</Option>
              <Option value="imperial">Imperial system</Option>
            </Select>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: "8px" }}>Default weight unit</div>
            <Select defaultValue="kg" style={{ width: "100%" }} bordered={true}>
              <Option value="kg">Kilogram (kg)</Option>
              <Option value="g">Gram (g)</Option>
              <Option value="lb">Pound (lb)</Option>
              <Option value="oz">Ounce (oz)</Option>
            </Select>
          </div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <div style={{ marginBottom: "8px" }}>Time zone</div>
          <Select
            defaultValue="india"
            style={{ width: "100%" }}
            bordered={true}
          >
            <Option value="india">
              (GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi
            </Option>
            <Option value="london">(GMT+00:00) London, Edinburgh</Option>
            <Option value="newyork">(GMT-05:00) New York, Washington DC</Option>
            <Option value="tokyo">(GMT+09:00) Tokyo, Osaka</Option>
          </Select>
          <div style={{ color: "#666", marginTop: "8px" }}>
            Sets the time for when orders and analytics are recorded
          </div>
        </div>

        <div style={{ marginTop: "32px" }}>
          <Text>
            To change your user level time zone and language visit your{" "}
            <Link href="#">account settings</Link>
          </Text>
        </div>
      </Card>
    </Card>
  );
}
