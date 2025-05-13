"use client";

import { useState } from "react";
import {
  Typography,
  Button,
  Card,
  Input,
  Table,
  Tag,
  Select,
  DatePicker,
  Space,
  Row,
  Col,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import type { TableProps } from "antd";

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

// Mock data for forms
const forms = [
  { id: 1, name: "Customer Feedback" },
  { id: 2, name: "Event Registration" },
  { id: 3, name: "Product Survey" },
  { id: 4, name: "Employee Satisfaction" },
  { id: 5, name: "Website Feedback" },
];

// Mock data for submissions
const submissionsData = [
  {
    id: 1,
    formId: 1,
    formName: "Customer Feedback",
    submittedBy: "John Doe",
    email: "john.doe@example.com",
    submittedAt: "2023-05-01T14:30:00Z",
    status: "Complete",
  },
  {
    id: 2,
    formId: 1,
    formName: "Customer Feedback",
    submittedBy: "Jane Smith",
    email: "jane.smith@example.com",
    submittedAt: "2023-05-02T09:15:00Z",
    status: "Complete",
  },
  {
    id: 3,
    formId: 2,
    formName: "Event Registration",
    submittedBy: "Robert Johnson",
    email: "robert.j@example.com",
    submittedAt: "2023-05-03T16:45:00Z",
    status: "Complete",
  },
  {
    id: 4,
    formId: 3,
    formName: "Product Survey",
    submittedBy: "Emily Davis",
    email: "emily.davis@example.com",
    submittedAt: "2023-05-04T11:20:00Z",
    status: "Complete",
  },
  {
    id: 5,
    formId: 1,
    formName: "Customer Feedback",
    submittedBy: "Michael Wilson",
    email: "michael.w@example.com",
    submittedAt: "2023-05-05T13:10:00Z",
    status: "Complete",
  },
  {
    id: 6,
    formId: 4,
    formName: "Employee Satisfaction",
    submittedBy: "Sarah Brown",
    email: "sarah.b@example.com",
    submittedAt: "2023-05-06T10:30:00Z",
    status: "Complete",
  },
  {
    id: 7,
    formId: 2,
    formName: "Event Registration",
    submittedBy: "David Miller",
    email: "david.m@example.com",
    submittedAt: "2023-05-07T15:45:00Z",
    status: "Complete",
  },
  {
    id: 8,
    formId: 5,
    formName: "Website Feedback",
    submittedBy: "Jennifer Lee",
    email: "jennifer.l@example.com",
    submittedAt: "2023-05-08T09:20:00Z",
    status: "Complete",
  },
  {
    id: 9,
    formId: 3,
    formName: "Product Survey",
    submittedBy: "Thomas Clark",
    email: "thomas.c@example.com",
    submittedAt: "2023-05-09T14:15:00Z",
    status: "Complete",
  },
  {
    id: 10,
    formId: 5,
    formName: "Website Feedback",
    submittedBy: "Lisa Anderson",
    email: "lisa.a@example.com",
    submittedAt: "2023-05-10T11:30:00Z",
    status: "Complete",
  },
  {
    id: 11,
    formId: 4,
    formName: "Employee Satisfaction",
    submittedBy: "Kevin White",
    email: "kevin.w@example.com",
    submittedAt: "2023-05-11T16:10:00Z",
    status: "Incomplete",
  },
  {
    id: 12,
    formId: 1,
    formName: "Customer Feedback",
    submittedBy: "Amanda Harris",
    email: "amanda.h@example.com",
    submittedAt: "2023-05-12T13:45:00Z",
    status: "Complete",
  },
];

// Format date for display
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};

interface DataType {
  id: number;
  formId: number;
  formName: string;
  submittedBy: string;
  email: string;
  submittedAt: string;
  status: string;
}

type DataIndex = keyof DataType;

export default function AllResultsPage() {
  const [searchText, setSearchText] = useState("");
  const [formFilter, setFormFilter] = useState<number | "all">("all");
  const [statusFilter, setStatusFilter] = useState<string | "all">("all");
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);

  // Filter submissions based on search and filters
  const filteredSubmissions = submissionsData.filter((submission) => {
    // Search text filter
    const matchesSearch =
      submission.submittedBy.toLowerCase().includes(searchText.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchText.toLowerCase()) ||
      submission.formName.toLowerCase().includes(searchText.toLowerCase());

    // Form filter
    const matchesForm =
      formFilter === "all" || submission.formId === formFilter;

    // Status filter
    const matchesStatus =
      statusFilter === "all" || submission.status === statusFilter;

    // Date range filter
    let matchesDateRange = true;
    if (dateRange && dateRange[0] && dateRange[1]) {
      const submissionDate = new Date(submission.submittedAt);
      const startDate = new Date(dateRange[0]);
      const endDate = new Date(dateRange[1]);
      matchesDateRange =
        submissionDate >= startDate && submissionDate <= endDate;
    }

    return matchesSearch && matchesForm && matchesStatus && matchesDateRange;
  });

  // Table columns
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Form",
      dataIndex: "formName",
      key: "formName",
      sorter: (a, b) => a.formName.localeCompare(b.formName),
      render: (text, record) => (
        <Link href={`/results/${record.formId}`}>
          <Text strong>{text}</Text>
        </Link>
      ),
    },
    {
      title: "Submitted By",
      dataIndex: "submittedBy",
      key: "submittedBy",
      sorter: (a, b) => a.submittedBy.localeCompare(b.submittedBy),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Submitted At",
      dataIndex: "submittedAt",
      key: "submittedAt",
      sorter: (a, b) =>
        new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime(),
      render: (text) => formatDate(text),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Complete" ? "success" : "warning"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            href={`/results/${record.formId}?submission=${record.id}`}
          >
            View
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          marginBottom: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          All Submissions
        </Title>
        <Button icon={<DownloadOutlined />}>Export Data</Button>
      </div>

      <Card style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={6}>
            <Input
              placeholder="Search by name or email"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
          <Col xs={24} md={6}>
            <Select
              style={{ width: "100%" }}
              placeholder="Filter by form"
              value={formFilter}
              onChange={setFormFilter}
            >
              <Option value="all">All Forms</Option>
              {forms.map((form) => (
                <Option key={form.id} value={form.id}>
                  {form.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} md={6}>
            <Select
              style={{ width: "100%" }}
              placeholder="Filter by status"
              value={statusFilter}
              onChange={setStatusFilter}
            >
              <Option value="all">All Statuses</Option>
              <Option value="Complete">Complete</Option>
              <Option value="Incomplete">Incomplete</Option>
            </Select>
          </Col>
          <Col xs={24} md={6}>
            <RangePicker
              style={{ width: "100%" }}
              onChange={(dates, dateStrings) => {
                setDateRange(dateStrings as [string, string]);
              }}
            />
          </Col>
        </Row>
      </Card>

      <Card>
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>
            Showing <Text strong>{filteredSubmissions.length}</Text> of{" "}
            <Text strong>{submissionsData.length}</Text> submissions
          </Text>
          <Space>
            <Button icon={<FilterOutlined />}>Clear Filters</Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredSubmissions}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
          }}
        />
      </Card>
    </div>
  );
}
