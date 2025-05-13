"use client";

import { useState } from "react";
import {
  Typography,
  Button,
  Card,
  Input,
  Select,
  List,
  Tag,
  Space,
  Dropdown,
  Menu,
  Row,
  Col,
  Empty,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  MoreOutlined,
  EyeOutlined,
  EditOutlined,
  CopyOutlined,
  DeleteOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const { Title, Text } = Typography;
const { Option } = Select;

// Mock data for forms
const mockForms = [
  {
    id: 1,
    name: "Customer Feedback",
    description: "Collect feedback from customers after purchase",
    createdAt: "2023-04-15",
    status: "Published",
    submissions: 124,
  },
  {
    id: 2,
    name: "Event Registration",
    description: "Registration form for upcoming conference",
    createdAt: "2023-05-02",
    status: "Published",
    submissions: 87,
  },
  {
    id: 3,
    name: "Product Survey",
    description: "Gather insights about our new product",
    createdAt: "2023-05-10",
    status: "Draft",
    submissions: 56,
  },
  {
    id: 4,
    name: "Employee Satisfaction",
    description: "Annual employee satisfaction survey",
    createdAt: "2023-05-18",
    status: "Draft",
    submissions: 0,
  },
  {
    id: 5,
    name: "Website Feedback",
    description: "Collect feedback about website experience",
    createdAt: "2023-05-20",
    status: "Published",
    submissions: 42,
  },
];

export default function FormsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter forms based on search term and status
  const filteredForms = mockForms.filter((form) => {
    const matchesSearch =
      form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      form.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const getActionMenu = (form: (typeof mockForms)[0]) => (
    <Menu
      items={[
        {
          key: "edit",
          icon: <EditOutlined />,
          label: <Link href={`/forms/${form.id}`}>Edit</Link>,
        },
        {
          key: "duplicate",
          icon: <CopyOutlined />,
          label: "Duplicate",
        },
        {
          key: "delete",
          icon: <DeleteOutlined />,
          label: <span style={{ color: "#ff4d4f" }}>Delete</span>,
        },
      ]}
    />
  );

  return (
    <div style={{ marginTop: 30 }}>
      <div
        style={{
          marginBottom: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          Forms
        </Title>
        <Button type="primary" icon={<PlusOutlined />}>
          <Link href="/feedback/forms/create">Create Form</Link>
        </Button>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12}>
          <Input
            placeholder="Search forms..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col
          xs={24}
          md={12}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Space>
            <Text>Status:</Text>
            <Select
              style={{ width: 180 }}
              value={statusFilter}
              onChange={setStatusFilter}
            >
              <Option value="all">All</Option>
              <Option value="published">Published</Option>
              <Option value="draft">Draft</Option>
            </Select>
          </Space>
        </Col>
      </Row>

      {filteredForms.length > 0 ? (
        <List
          dataSource={filteredForms}
          renderItem={(form) => (
            <List.Item style={{ padding: 0, marginBottom: 16 }}>
              <Card style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ display: "flex", gap: 16 }}>
                    <div
                      style={{
                        background: "#f0f5ff",
                        padding: 8,
                        borderRadius: 8,
                        height: 40,
                        width: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FileTextOutlined
                        style={{ color: "#1677ff", fontSize: 20 }}
                      />
                    </div>
                    <div>
                      <Text strong>{form.name}</Text>
                      <div>
                        <Text type="secondary">{form.description}</Text>
                      </div>
                      <div style={{ marginTop: 8 }}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          Created: {form.createdAt} • {form.submissions}{" "}
                          submissions
                        </Text>
                      </div>
                    </div>
                  </div>

                  <Space>
                    <Tag
                      color={
                        form.status === "Published" ? "success" : "warning"
                      }
                    >
                      {form.status}
                    </Tag>
                    <Button size="small" icon={<EyeOutlined />}>
                      <Link href={`/results/${form.id}`}>View Results</Link>
                    </Button>
                    <Dropdown overlay={getActionMenu(form)} trigger={["click"]}>
                      <Button size="small" icon={<MoreOutlined />} />
                    </Dropdown>
                  </Space>
                </div>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <Card>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter"
                : "Create your first form to get started"
            }
          >
            {!searchTerm && statusFilter === "all" && (
              <Button type="primary" icon={<PlusOutlined />}>
                <Link href="/forms/create">Create Form</Link>
              </Button>
            )}
          </Empty>
        </Card>
      )}
    </div>
  );
}
