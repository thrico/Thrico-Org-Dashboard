"use client";

import { useState } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Switch,
  Card,
  Upload,
  Button,
  Row,
  Col,
  Typography,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Image from "next/image";
import GooglePlacesInput from "../../../../components/comman/location/Google-places-autocomplete";

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

export default function EventGeneralInfo() {
  const [form] = Form.useForm();
  const [eventType, setEventType] = useState("physical");
  const [registrationOpen, setRegistrationOpen] = useState(true);

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        title: "Tech Conference 2023",
        description:
          "Join us for the premier tech conference of the year, featuring industry leaders, workshops, and networking opportunities.",
        seats: 1500,
        timezone: "pst",
        eventType: "physical",
      }}
    >
      <Row gutter={24}>
        {/* LEFT SIDE */}
        <Col xs={24} md={14}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Event Title" name="title">
                <Input placeholder="Enter event title" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="location"
                label={"Location"}
                rules={[
                  {
                    required: true,
                    message: "Please select a location",
                  },
                ]}
                extra="Select the Job Location"
              >
                <GooglePlacesInput
                  onChange={(value) => form.setFieldsValue({ location: value })}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Description" name="description">
            <TextArea
              placeholder="Enter event description"
              autoSize={{ minRows: 4 }}
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Start Date" name="startDate">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="End Date" name="endDate">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Start Time" name="startTime">
                <TimePicker
                  style={{ width: "100%" }}
                  use12Hours
                  format="h:mm a"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Timezone" name="timezone">
                <Select>
                  <Option value="pst">Pacific Time (PST)</Option>
                  <Option value="mst">Mountain Time (MST)</Option>
                  <Option value="cst">Central Time (CST)</Option>
                  <Option value="est">Eastern Time (EST)</Option>
                  <Option value="utc">Coordinated Universal Time (UTC)</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Event Type" name="eventType">
            <Select onChange={(val) => setEventType(val)}>
              <Option value="physical">Physical</Option>
              <Option value="online">Online</Option>
              <Option value="hybrid">Hybrid</Option>
            </Select>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Seat Limit" name="seats">
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Registration Open">
            <Switch checked={registrationOpen} onChange={setRegistrationOpen} />
          </Form.Item>
        </Col>

        {/* RIGHT SIDE - COVER IMAGE */}
        <Col xs={24} md={10}>
          <Card title="Cover Image" bordered={false}>
            <div
              style={{
                position: "relative",
                aspectRatio: "16 / 9",
                border: "1px dashed #aaa",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <Image
                src="/placeholder.svg?height=400&width=800"
                alt="Event Cover"
                fill
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255,255,255,0.6)",
                }}
              >
                <Upload showUploadList={false}>
                  <Button icon={<UploadOutlined />}>Upload Cover Image</Button>
                </Upload>
                <p style={{ marginTop: 8, fontSize: 12, color: "#666" }}>
                  Recommended size: 1200x630px
                </p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Form>
  );
}
