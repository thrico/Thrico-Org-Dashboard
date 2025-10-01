"use client";

import {
  UploadOutlined,
  DownloadOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Input,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { useState } from "react";

const { Title } = Typography;
const { Option } = Select;

const initialAttendees = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    ticketType: "Regular",
    status: "confirmed",
    checkedIn: true,
  },
  {
    id: "2",
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    ticketType: "VIP",
    status: "confirmed",
    checkedIn: false,
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    ticketType: "Regular",
    status: "confirmed",
    checkedIn: true,
  },
  {
    id: "4",
    name: "Sarah Davis",
    email: "sarah.davis@example.com",
    ticketType: "Student",
    status: "confirmed",
    checkedIn: false,
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.wilson@example.com",
    ticketType: "Regular",
    status: "waitlisted",
    checkedIn: false,
  },
  {
    id: "6",
    name: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    ticketType: "Early Bird",
    status: "confirmed",
    checkedIn: true,
  },
  {
    id: "7",
    name: "Robert Taylor",
    email: "robert.taylor@example.com",
    ticketType: "VIP",
    status: "confirmed",
    checkedIn: false,
  },
];

function EventAttendees() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAttendees = initialAttendees.filter((attendee) => {
    const matchFilter =
      filter === "all"
        ? true
        : filter === "checked-in"
          ? attendee.checkedIn
          : filter === "vip"
            ? attendee.ticketType === "VIP"
            : attendee.status === filter;

    const matchSearch =
      attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchTerm.toLowerCase());

    return matchFilter && matchSearch;
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Ticket Type",
      dataIndex: "ticketType",
    },
    {
      title: "Status",
      key: "status",
      render: (_: any, record: any) => (
        <Space direction="vertical" size={0}>
          <Tag color={record.status === "confirmed" ? "green" : "orange"}>
            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
          </Tag>
          {record.checkedIn && (
            <Tag color="blue" bordered>
              Checked In
            </Tag>
          )}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Button type="link" icon={<EditOutlined />} size="small">
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <Title level={4} className="!mb-0">
          Attendees
        </Title>
        <Space>
          {/* Replace with your actual modal trigger */}
          <Button type="primary" icon={<PlusCircleOutlined />}>
            Add Attendee
          </Button>
          <Button icon={<UploadOutlined />}>Import CSV</Button>
          <Button icon={<DownloadOutlined />}>Export</Button>
        </Space>
      </div>

      <Card title="Attendee Management">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
          <Space>
            <Input.Search
              placeholder="Search attendees..."
              allowClear
              enterButton
              onSearch={(value) => setSearchTerm(value)}
              className="max-w-xs"
            />
          </Space>
          <Select
            defaultValue="all"
            style={{ width: 200 }}
            onChange={(value) => setFilter(value)}
          >
            <Option value="all">All Attendees</Option>
            <Option value="confirmed">Confirmed</Option>
            <Option value="waitlisted">Waitlisted</Option>
            <Option value="checked-in">Checked In</Option>
            <Option value="vip">VIP</Option>
          </Select>
        </div>

        <Table
          rowKey="id"
          dataSource={filteredAttendees}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
}

export default EventAttendees;
