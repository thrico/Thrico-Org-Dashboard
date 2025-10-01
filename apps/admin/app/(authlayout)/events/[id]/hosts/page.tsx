"use client";

import { useState } from "react";
import {
  Table,
  Tag,
  Avatar,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Checkbox,
  Space,
  Tooltip,
  Typography,
} from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  LinkOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Text, Link } = Typography;

const PERMISSION_OPTIONS = [
  { label: "Full Access", value: "full_access" },
  { label: "Edit Agenda", value: "edit_agenda" },
  { label: "Manage Speakers", value: "manage_speakers" },
  { label: "Manage Attendees", value: "manage_attendees" },
  { label: "Send Communications", value: "send_communications" },
  { label: "Manage Sponsors", value: "manage_sponsors" },
];

export default function EventHosts() {
  const [form] = Form.useForm();
  const [hosts, setHosts] = useState([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "Main Host",
      permissions: ["full_access"],
      image: "/placeholder.svg",
      company: "TechCorp",
      companyUrl: "https://techcorp.example.com",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael@example.com",
      role: "Co-host",
      permissions: ["edit_agenda", "manage_speakers"],
      image: "/placeholder.svg",
      company: "InnovateLabs",
      companyUrl: "https://innovatelabs.example.com",
    },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAdd = (values: any) => {
    const newHost = {
      id: String(hosts.length + 1),
      ...values,
      image: "/placeholder.svg",
    };
    setHosts([...hosts, newHost]);
    form.resetFields();
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Host",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: any) => (
        <Space>
          <Avatar src={record.image} icon={<UserOutlined />} />
          <div>
            <div>{record.name}</div>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {record.email}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role === "Main Host" ? "blue" : "purple"}>{role}</Tag>
      ),
    },
    {
      title: "Company",
      key: "company",
      render: (_: any, record: any) =>
        record.company ? (
          record.companyUrl ? (
            <Link href={record.companyUrl} target="_blank">
              {record.company} <LinkOutlined />
            </Link>
          ) : (
            record.company
          )
        ) : (
          <Text type="secondary">Not specified</Text>
        ),
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      key: "permissions",
      render: (permissions: string[]) => (
        <Space wrap>
          {permissions.map((perm) => (
            <Tag key={perm}>{perm.replace(/_/g, " ")}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Tooltip title="Edit">
            <Button icon={<EditOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Delete">
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Hosts & Co-hosts</h2>
        <Button
          icon={<PlusCircleOutlined />}
          type="primary"
          onClick={() => setIsModalVisible(true)}
        >
          Add Host
        </Button>
      </div>

      <Table dataSource={hosts} columns={columns} rowKey="id" />

      <Modal
        title="Add New Host"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        okText="Add Host"
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleAdd}
          initialValues={{ role: "Co-host", permissions: [] }}
        >
          <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
            <Input placeholder="Enter full name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Select options={[{ value: "Main Host" }, { value: "Co-host" }]} />
          </Form.Item>
          <Form.Item name="company" label="Company (optional)">
            <Input />
          </Form.Item>
          <Form.Item name="companyUrl" label="Company URL (optional)">
            <Input placeholder="https://company.example.com" />
          </Form.Item>
          <Form.Item name="permissions" label="Permissions">
            <Checkbox.Group options={PERMISSION_OPTIONS} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
