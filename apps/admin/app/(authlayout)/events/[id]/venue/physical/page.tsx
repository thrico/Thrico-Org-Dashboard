"use client";

import { Card, Form, Input, Typography, Row, Col } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

function PhysicalVenuePage() {
  return (
    <Card title="Physical Venue Details">
      <Form layout="vertical">
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Venue Name" name="venueName">
              <Input defaultValue="San Francisco Convention Center" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Hall/Room" name="venueHall">
              <Input defaultValue="Grand Ballroom" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Address" name="venueAddress">
          <TextArea
            rows={3}
            defaultValue="747 Howard St, San Francisco, CA 94103, United States"
          />
        </Form.Item>

        <Form.Item label="Map Location">
          <div
            style={{
              borderRadius: 8,
              height: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              color: "#888",
              flexDirection: "column",
            }}
          >
            <EnvironmentOutlined style={{ fontSize: 32 }} />
            <Paragraph style={{ marginTop: 8 }}>
              Interactive map would be displayed here
            </Paragraph>
          </div>
        </Form.Item>

        <Form.Item label="Venue Rooms">
          <Row gutter={[16, 16]}>
            {[
              { name: "Main Hall", capacity: "1000" },
              { name: "Room A", capacity: "250" },
              { name: "Room B", capacity: "250" },
              { name: "Workshop Hall", capacity: "150" },
            ].map((room) => (
              <Col xs={24} sm={12} md={8} lg={6} key={room.name}>
                <Card size="small">
                  <Title level={5}>{room.name}</Title>
                  <Paragraph style={{ marginBottom: 0 }}>
                    Capacity: {room.capacity}
                  </Paragraph>
                </Card>
              </Col>
            ))}

            {/* Optional: Add Venue Modal Button Placeholder */}
            <Col xs={24} sm={12} md={8} lg={6}>
              <AddVenueModal />
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default PhysicalVenuePage;

import React, { useState } from "react";
import { Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function AddVenueModal() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Venue added:", values);
        setOpen(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <>
      <Button
        type="default"
        icon={<PlusOutlined />}
        onClick={() => setOpen(true)}
        style={{ display: "flex", alignItems: "center" }}
      >
        Add Room
      </Button>

      <Modal
        title="Add New Room"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleSubmit}
        okText="Add Room"
        cancelText="Cancel"
        width={500}
      >
        <Typography.Paragraph type="secondary">
          Add a new room or hall to your venue.
        </Typography.Paragraph>

        <Form form={form} layout="vertical">
          <Form.Item
            label="Room Name"
            name="roomName"
            rules={[{ required: true, message: "Please enter the room name" }]}
          >
            <Input placeholder="Enter room name" />
          </Form.Item>

          <Form.Item
            label="Capacity"
            name="capacity"
            rules={[{ required: true, message: "Please enter room capacity" }]}
          >
            <Input type="number" placeholder="Enter room capacity" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea placeholder="Enter room description" rows={3} />
          </Form.Item>

          <Form.Item label="Facilities" name="facilities">
            <Input.TextArea
              placeholder="List available facilities (e.g., projector, microphone, etc.)"
              rows={3}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
