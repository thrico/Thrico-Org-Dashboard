"use client";
import { useState } from "react";
import { Button, Tabs, Card, Table, Avatar, Tooltip, Tag, Space } from "antd";
import {
  CalendarOutlined,
  UnorderedListOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;

const EventAgenda = () => {
  const [view, setView] = useState("list");

  const sessions: Session[] = [
    {
      id: "1",
      title: "Opening Keynote",
      time: "9:00 AM - 10:00 AM",
      date: "Nov 15, 2023",
      room: "Main Hall",
      tags: ["keynote"],
      speakers: [
        {
          id: "4",
          name: "Sarah Johnson",
          role: "CEO",
          image: "/placeholder.svg",
        },
      ],
      moderators: [],
      curators: [],
    },
    {
      id: "2",
      title: "Future of AI",
      time: "10:30 AM - 11:30 AM",
      date: "Nov 15, 2023",
      room: "Room A",
      tags: ["technical", "ai"],
      speakers: [
        {
          id: "1",
          name: "Dr. Emily Chen",
          role: "AI Research Lead",
          image: "/placeholder.svg",
        },
        {
          id: "5",
          name: "Michael Brown",
          role: "CTO",
          image: "/placeholder.svg",
        },
      ],
      moderators: [
        {
          id: "6",
          name: "David Lee",
          role: "Design Lead",
          image: "/placeholder.svg",
        },
      ],
      curators: [],
    },
    {
      id: "3",
      title: "Web Development Trends",
      time: "1:00 PM - 2:00 PM",
      date: "Nov 15, 2023",
      room: "Room B",
      tags: ["technical", "web"],
      speakers: [
        {
          id: "2",
          name: "James Wilson",
          role: "Senior Developer Advocate",
          image: "/placeholder.svg",
        },
      ],
      moderators: [],
      curators: [
        {
          id: "3",
          name: "Maria Rodriguez",
          role: "Product Director",
          image: "/placeholder.svg",
        },
      ],
    },
    {
      id: "4",
      title: "Panel Discussion: The Future of Tech",
      time: "2:30 PM - 4:00 PM",
      date: "Nov 15, 2023",
      room: "Workshop Hall",
      tags: ["panel", "discussion"],
      speakers: [
        {
          id: "1",
          name: "Dr. Emily Chen",
          role: "AI Research Lead",
          image: "/placeholder.svg",
        },
        {
          id: "2",
          name: "James Wilson",
          role: "Senior Developer Advocate",
          image: "/placeholder.svg",
        },
        {
          id: "5",
          name: "Michael Brown",
          role: "CTO",
          image: "/placeholder.svg",
        },
      ],
      moderators: [
        {
          id: "3",
          name: "Maria Rodriguez",
          role: "Product Director",
          image: "/placeholder.svg",
        },
      ],
      curators: [
        {
          id: "6",
          name: "David Lee",
          role: "Design Lead",
          image: "/placeholder.svg",
        },
      ],
    },
    {
      id: "5",
      title: "Networking Reception",
      time: "5:00 PM - 7:00 PM",
      date: "Nov 15, 2023",
      room: "Lobby",
      tags: ["networking"],
      speakers: [],
      moderators: [],
      curators: [],
    },
  ];

  const columns = [
    {
      title: "Session",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Date & Time",
      key: "datetime",
      render: (_: any, session: any) => (
        <div>
          <div>{session.date}</div>
          <div style={{ color: "#888" }}>{session.time}</div>
        </div>
      ),
    },
    {
      title: "Participants",
      key: "participants",
      render: (_: any, session: any) => (
        <Space direction="vertical">
          {["speakers", "moderators", "curators"].map((type) =>
            session[type]?.length ? (
              <div key={type}>
                <Space size="small">
                  {type === "curators" ? <TeamOutlined /> : <UserOutlined />}
                  <span style={{ fontSize: 12, color: "#999" }}>{type}</span>
                </Space>
                <Avatar.Group maxCount={4}>
                  {session[type].map((p: any) => (
                    <Tooltip title={`${p.name} - ${p.role}`} key={p.id}>
                      <Avatar src={p.image} alt={p.name}>
                        {p.name.charAt(0)}
                      </Avatar>
                    </Tooltip>
                  ))}
                </Avatar.Group>
              </div>
            ) : null
          )}
        </Space>
      ),
    },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => (
        <Space wrap>
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => <Button type="link">Edit</Button>,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ fontSize: 20, fontWeight: 500 }}>Agenda & Timeline</h2>
        <Space>
          <Button
            icon={<UnorderedListOutlined />}
            type={view === "list" ? "primary" : "default"}
            onClick={() => setView("list")}
          >
            List
          </Button>
          <Button
            icon={<CalendarOutlined />}
            type={view === "calendar" ? "primary" : "default"}
            onClick={() => setView("calendar")}
          >
            Calendar
          </Button>
          {/* AddSessionModal => Replace with Modal trigger */}
          <AddSessionModal />
        </Space>
      </div>

      <Card title="Event Schedule">
        <Tabs activeKey={view} onChange={setView}>
          <TabPane tab="List" key="list">
            <Table
              rowKey="id"
              columns={columns}
              dataSource={sessions}
              pagination={false}
            />
          </TabPane>
          <TabPane tab="Calendar" key="calendar">
            <div
              style={{
                height: 400,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "#999",
              }}
            >
              <CalendarOutlined style={{ fontSize: 36, marginBottom: 16 }} />
              <h3 style={{ fontWeight: 500 }}>Calendar View</h3>
              <p style={{ maxWidth: 400, textAlign: "center" }}>
                Calendar view would display a drag-and-drop interface for
                managing sessions across days and time slots.
              </p>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default EventAgenda;

import { Modal, Form, Input, Select, DatePicker, TimePicker } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import moment from "moment";

const { TextArea } = Input;
const { Option } = Select;

const speakersList = [
  {
    id: "1",
    name: "Dr. Emily Chen",
    role: "AI Research Lead",
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "James Wilson",
    role: "Senior Developer Advocate",
    image: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    role: "Product Director",
    image: "/placeholder.svg",
  },
  { id: "4", name: "Sarah Johnson", role: "CEO", image: "/placeholder.svg" },
  { id: "5", name: "Michael Brown", role: "CTO", image: "/placeholder.svg" },
  {
    id: "6",
    name: "David Lee",
    role: "Design Lead",
    image: "/placeholder.svg",
  },
];

type ParticipantRole = "speaker" | "moderator" | "curator";

function AddSessionModal() {
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [participants, setParticipants] = useState<
    Record<ParticipantRole, string[]>
  >({
    speaker: [],
    moderator: [],
    curator: [],
  });
  const [activeTab, setActiveTab] = useState<ParticipantRole>("speaker");

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (removedTag: string) => {
    setTags(tags.filter((tag) => tag !== removedTag));
  };

  const handleParticipantAdd = (id: string) => {
    if (!participants[activeTab].includes(id)) {
      setParticipants({
        ...participants,
        [activeTab]: [...participants[activeTab], id],
      });
    }
  };

  const handleParticipantRemove = (id: string) => {
    setParticipants({
      ...participants,
      [activeTab]: participants[activeTab].filter((pid) => pid !== id),
    });
  };

  const handleSubmit = (values: any) => {
    console.log("Session Data:", values, participants, tags);
    setOpen(false);
  };

  return (
    <>
      <Button icon={<PlusOutlined />} onClick={() => setOpen(true)}>
        Add Session
      </Button>
      <Modal
        open={open}
        title="Add New Session"
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Session Title"
            name="title"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter session title" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <TextArea rows={3} placeholder="Enter session description" />
          </Form.Item>

          <Form.Item label="Date & Time">
            <Input.Group compact>
              <Form.Item name="date" noStyle rules={[{ required: true }]}>
                <DatePicker className="w-1/2" style={{ width: "50%" }} />
              </Form.Item>
              <Form.Item name="time" noStyle rules={[{ required: true }]}>
                <TimePicker
                  style={{ width: "50%" }}
                  format="h:mm A"
                  use12Hours
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>

          <Form.Item label="Participants">
            <Tabs
              activeKey={activeTab}
              onChange={(key) => setActiveTab(key as ParticipantRole)}
            >
              {(["speaker", "moderator", "curator"] as ParticipantRole[]).map(
                (role) => (
                  <TabPane
                    tab={role.charAt(0).toUpperCase() + role.slice(1)}
                    key={role}
                  >
                    <Select
                      showSearch
                      placeholder={`Add ${role}`}
                      onSelect={handleParticipantAdd}
                      style={{ width: "100%" }}
                    >
                      {speakersList.map((s) => (
                        <Option
                          key={s.id}
                          value={s.id}
                          disabled={participants[role].includes(s.id)}
                        >
                          {s.name} ({s.role})
                        </Option>
                      ))}
                    </Select>

                    <div
                      style={{
                        marginTop: 12,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                      }}
                    >
                      {participants[role].map((pid) => {
                        const p = speakersList.find((s) => s.id === pid);
                        return (
                          <Tooltip key={pid} title={p?.role}>
                            <Tag
                              closable
                              onClose={() => handleParticipantRemove(pid)}
                            >
                              <Avatar
                                src={p?.image}
                                size="small"
                                icon={<UserOutlined />}
                                style={{ marginRight: 4 }}
                              />
                              {p?.name}
                            </Tag>
                          </Tooltip>
                        );
                      })}
                    </div>
                  </TabPane>
                )
              )}
            </Tabs>
          </Form.Item>

          <Form.Item label="Room" name="room">
            <Select placeholder="Select room">
              <Option value="main">Main Hall</Option>
              <Option value="roomA">Room A</Option>
              <Option value="roomB">Room B</Option>
              <Option value="workshop">Workshop Hall</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Tags">
            <Input.Search
              enterButton="Add"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onSearch={handleAddTag}
              placeholder="Add tags"
            />
            <div
              style={{
                marginTop: 12,
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {tags.map((tag) => (
                <Tag key={tag} closable onClose={() => handleRemoveTag(tag)}>
                  {tag}
                </Tag>
              ))}
            </div>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary" block>
              Add Session
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
