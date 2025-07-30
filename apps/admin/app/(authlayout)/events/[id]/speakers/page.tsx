"use client";
import { useState } from "react";
import type React from "react";
import {
  Card,
  Input,
  Select,
  Checkbox,
  Avatar,
  Badge,
  Button,
  Dropdown,
  Menu,
  Typography,
  Tooltip,
} from "antd";
import {
  SearchOutlined,
  StarFilled,
  MoreOutlined,
  HolderOutlined,
} from "@ant-design/icons";

// Define speaker type
interface Speaker {
  id: string;
  name: string;
  role: string;
  bio: string;
  sessions: string[];
  image: string;
  featured?: boolean;
  order?: number;
}

function EventSpeakers() {
  const [speakers, setSpeakers] = useState<Speaker[]>([
    {
      id: "1",
      name: "Dr. Emily Chen",
      role: "AI Research Lead, TechCorp",
      bio: "Leading researcher in artificial intelligence with over 15 years of experience.",
      sessions: ["Future of AI"],
      image: "/placeholder.svg",
      featured: true,
      order: 1,
    },
    {
      id: "2",
      name: "James Wilson",
      role: "Senior Developer Advocate, WebTech",
      bio: "Passionate about web technologies and developer experience.",
      sessions: ["Web Development Trends"],
      image: "/placeholder.svg",
      featured: false,
      order: 2,
    },
    {
      id: "3",
      name: "Maria Rodriguez",
      role: "Product Director, ProductHQ",
      bio: "Experienced product leader with a track record of successful launches.",
      sessions: ["Product Management Workshop"],
      image: "/placeholder.svg",
      featured: true,
      order: 3,
    },
    {
      id: "4",
      name: "Sarah Johnson",
      role: "CEO, InnovateCo",
      bio: "Visionary leader driving innovation in the tech industry.",
      sessions: ["Opening Keynote"],
      image: "/placeholder.svg",
      featured: false,
      order: 4,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [draggedSpeaker, setDraggedSpeaker] = useState<string | null>(null);

  const filteredSpeakers = speakers
    .filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.role.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((s) => {
      if (filterType === "featured") return s.featured;
      if (filterType === "regular") return !s.featured;
      return true;
    })
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const toggleFeatured = (id: string) => {
    setSpeakers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, featured: !s.featured } : s))
    );
  };

  const handleDragStart = (id: string) => setDraggedSpeaker(id);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleDrop = (targetId: string) => {
    if (!draggedSpeaker || draggedSpeaker === targetId) {
      setDraggedSpeaker(null);
      return;
    }

    const draggedIndex = speakers.findIndex((s) => s.id === draggedSpeaker);
    const targetIndex = speakers.findIndex((s) => s.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newSpeakers = [...speakers];
    const [removed] = newSpeakers.splice(draggedIndex, 1);
    newSpeakers.splice(targetIndex, 0, removed);

    const updated = newSpeakers.map((s, i) => ({
      ...s,
      order: i + 1,
    }));

    setSpeakers(updated);
    setDraggedSpeaker(null);
  };

  return (
    <div style={{ padding: "24px" }}>
      <div
        className="flex-between mb-6"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography.Title level={4}>Speakers & Curators</Typography.Title>
        <AddSpeakerModal />
      </div>

      <div
        className="filters"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 24,
          justifyContent: "space-between",
        }}
      >
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search speakers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ maxWidth: 300 }}
        />

        <Select
          value={filterType}
          onChange={(value) => setFilterType(value)}
          style={{ width: 180 }}
        >
          <Select.Option value="all">All Speakers</Select.Option>
          <Select.Option value="featured">Featured Only</Select.Option>
          <Select.Option value="regular">Regular Only</Select.Option>
        </Select>
      </div>

      <div
        className="grid"
        style={{
          display: "grid",
          gap: 24,
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {filteredSpeakers.map((speaker) => {
          const menu = (
            <Menu>
              <Menu.Item key="1" onClick={() => toggleFeatured(speaker.id)}>
                {speaker.featured ? "Remove from featured" : "Mark as featured"}
              </Menu.Item>
              <Menu.Item key="2">Assign to session</Menu.Item>
              <Menu.Item key="3">View profile</Menu.Item>
            </Menu>
          );

          return (
            <Card
              key={speaker.id}
              draggable
              onDragStart={() => handleDragStart(speaker.id)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(speaker.id)}
              style={{
                opacity: draggedSpeaker === speaker.id ? 0.5 : 1,
                position: "relative",
              }}
              actions={[
                <Button key="edit" size="small">
                  Edit
                </Button>,
                <Dropdown overlay={menu} key="more">
                  <Button icon={<MoreOutlined />} size="small" />
                </Dropdown>,
              ]}
            >
              <div
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Checkbox
                  checked={speaker.featured}
                  onChange={() => toggleFeatured(speaker.id)}
                >
                  <span style={{ fontSize: 12 }}>Featured</span>
                </Checkbox>
                <Tooltip title="Drag to reorder">
                  <HolderOutlined style={{ cursor: "grab", color: "#999" }} />
                </Tooltip>
              </div>

              <div style={{ textAlign: "center", paddingTop: 24 }}>
                <Avatar
                  size={96}
                  src={speaker.image}
                  alt={speaker.name}
                  style={{ marginBottom: 16 }}
                />
                {speaker.featured && (
                  <Tooltip title="Featured Speaker">
                    <StarFilled
                      style={{
                        color: "#fadb14",
                        position: "absolute",
                        top: 12,
                        left: 12,
                      }}
                    />
                  </Tooltip>
                )}
                <Typography.Title level={5}>{speaker.name}</Typography.Title>
                <Typography.Text type="secondary">
                  {speaker.role}
                </Typography.Text>
                <Typography.Paragraph
                  ellipsis={{ rows: 3 }}
                  style={{ marginTop: 8 }}
                >
                  {speaker.bio}
                </Typography.Paragraph>
                <div
                  style={{
                    marginTop: 16,
                    display: "flex",
                    gap: 8,
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {speaker.sessions.map((session) => (
                    <Badge key={session} color="blue" count={session} />
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default EventSpeakers;

import { Modal, Form, Upload, Row, Col } from "antd";
import { PlusOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";

function AddSpeakerModal() {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [form] = Form.useForm();

  const handleImageChange = (info: any) => {
    const file = info.file.originFileObj;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Speaker added:", values);
        form.resetFields();
        setImagePreview(null);
        setOpen(false);
      })
      .catch((err) => {
        console.error("Validation failed:", err);
      });
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setOpen(true)}
      >
        Add Speaker
      </Button>
      <Modal
        title="Add New Speaker"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleSubmit}
        okText="Add Speaker"
        width={600}
      >
        <Typography.Paragraph type="secondary">
          Add a new speaker to your event.
        </Typography.Paragraph>

        <Form form={form} layout="vertical" initialValues={{ remember: true }}>
          <Row gutter={16} align="middle">
            <Col xs={24} sm={8} className="text-center">
              <Avatar
                src={imagePreview || "/placeholder.svg"}
                size={96}
                icon={!imagePreview && <UserOutlined />}
              />
              <Form.Item name="image" className="mt-2">
                <Upload
                  showUploadList={false}
                  accept="image/*"
                  beforeUpload={() => false}
                  onChange={handleImageChange}
                >
                  <Button icon={<UploadOutlined />}>Upload Photo</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col xs={24} sm={16}>
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: "Please enter name" }]}
              >
                <Input placeholder="Enter speaker's full name" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="role"
            label="Role / Title"
            rules={[{ required: true, message: "Please enter role/title" }]}
          >
            <Input placeholder="e.g., CTO at TechCorp" />
          </Form.Item>

          <Form.Item
            name="bio"
            label="Biography"
            rules={[{ required: true, message: "Please enter bio" }]}
          >
            <Input.TextArea placeholder="Enter speaker's bio" rows={4} />
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input type="email" placeholder="Enter speaker's email" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="twitter" label="Twitter">
                <Input placeholder="@username" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="linkedin" label="LinkedIn">
                <Input placeholder="LinkedIn profile URL" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
