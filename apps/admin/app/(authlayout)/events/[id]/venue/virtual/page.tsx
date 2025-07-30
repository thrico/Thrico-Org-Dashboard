"use client";

import { Card, Form, Input, Typography } from "antd";

const { Title } = Typography;

function VirtualMeetingDetails() {
  return (
    <Card
      title={<Title level={5}>Virtual Meeting Details</Title>}
      style={{ marginBottom: 24 }}
    >
      <Form layout="vertical">
        <div
          style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}
        >
          <Form.Item label="Platform" name="platform" initialValue="Zoom">
            <Input />
          </Form.Item>

          <Form.Item
            label="Meeting ID"
            name="meetingId"
            initialValue="123 456 7890"
          >
            <Input />
          </Form.Item>
        </div>

        <Form.Item
          label="Meeting Link"
          name="meetingLink"
          initialValue="https://zoom.us/j/1234567890"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="meetingPassword"
          initialValue="techconf2023"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label="Additional Notes" name="meetingNotes">
          <Input.TextArea
            rows={4}
            placeholder="Any additional information about the virtual meeting..."
          />
        </Form.Item>
      </Form>
    </Card>
  );
}

export default VirtualMeetingDetails;
