"use client"

import { useState } from "react"
import { Typography, Button, Card, Input, Tabs, Table, Row, Col, Statistic, Progress, List, Space } from "antd"
import {
  ArrowLeftOutlined,
  DownloadOutlined,
  FileTextOutlined,
  BarChartOutlined,
  UserOutlined,
  SearchOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons"
import Link from "next/link"

const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs

// Mock form data
const formData = {
  id: 1,
  name: "Customer Feedback",
  description: "Collect feedback from customers after purchase",
  createdAt: "2023-04-15",
  fields: [
    { id: "field-1", label: "Full Name", type: "text" },
    { id: "field-2", label: "Email", type: "email" },
    { id: "field-3", label: "Rating", type: "select", options: ["Excellent", "Good", "Average", "Poor"] },
    { id: "field-4", label: "Comments", type: "textarea" },
    { id: "field-5", label: "Would you recommend us?", type: "radio", options: ["Yes", "No", "Maybe"] },
  ],
}

// Mock submissions data
const submissionsData = [
  {
    id: 1,
    submittedAt: "2023-05-01T14:30:00Z",
    data: {
      "field-1": "John Doe",
      "field-2": "john.doe@example.com",
      "field-3": "Excellent",
      "field-4": "Great service and product quality!",
      "field-5": "Yes",
    },
  },
  {
    id: 2,
    submittedAt: "2023-05-02T09:15:00Z",
    data: {
      "field-1": "Jane Smith",
      "field-2": "jane.smith@example.com",
      "field-3": "Good",
      "field-4": "Product was good but delivery took longer than expected.",
      "field-5": "Maybe",
    },
  },
  {
    id: 3,
    submittedAt: "2023-05-03T16:45:00Z",
    data: {
      "field-1": "Robert Johnson",
      "field-2": "robert.j@example.com",
      "field-3": "Average",
      "field-4": "The product is okay but could be improved.",
      "field-5": "No",
    },
  },
  {
    id: 4,
    submittedAt: "2023-05-04T11:20:00Z",
    data: {
      "field-1": "Emily Davis",
      "field-2": "emily.davis@example.com",
      "field-3": "Excellent",
      "field-4": "Absolutely love the product! Will buy again.",
      "field-5": "Yes",
    },
  },
  {
    id: 5,
    submittedAt: "2023-05-05T13:10:00Z",
    data: {
      "field-1": "Michael Wilson",
      "field-2": "michael.w@example.com",
      "field-3": "Good",
      "field-4": "Good product, fair price.",
      "field-5": "Yes",
    },
  },
]

// Calculate summary statistics for the form
const calculateStats = () => {
  const totalSubmissions = submissionsData.length

  // Rating distribution
  const ratingCounts = submissionsData.reduce((acc: Record<string, number>, submission) => {
    const rating = submission.data["field-3"]
    acc[rating] = (acc[rating] || 0) + 1
    return acc
  }, {})

  // Recommendation distribution
  const recommendationCounts = submissionsData.reduce((acc: Record<string, number>, submission) => {
    const recommendation = submission.data["field-5"]
    acc[recommendation] = (acc[recommendation] || 0) + 1
    return acc
  }, {})

  return {
    totalSubmissions,
    ratingCounts,
    recommendationCounts,
  }
}

export default function ResultsPage({ params }: { params: { id: string } }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedSubmission, setExpandedSubmission] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("submissions")

  const stats = calculateStats()

  // Filter submissions based on search term
  const filteredSubmissions = submissionsData.filter((submission) => {
    const fullName = submission.data["field-1"].toLowerCase()
    const email = submission.data["field-2"].toLowerCase()
    const comments = submission.data["field-4"].toLowerCase()

    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      comments.includes(searchTerm.toLowerCase())
    )
  })

  // Toggle submission details
  const toggleSubmission = (id: number) => {
    if (expandedSubmission === id) {
      setExpandedSubmission(null)
    } else {
      setExpandedSubmission(id)
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  // Table columns
  const columns = [
    {
      title: "Details",
      key: "details",
      render: (record: any) => (
        <Button
          type="text"
          icon={expandedSubmission === record.id ? <UpOutlined /> : <DownOutlined />}
          onClick={() => toggleSubmission(record.id)}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: ["data", "field-1"],
      key: "name",
    },
    {
      title: "Email",
      dataIndex: ["data", "field-2"],
      key: "email",
    },
    {
      title: "Rating",
      dataIndex: ["data", "field-3"],
      key: "rating",
    },
    {
      title: "Submitted At",
      key: "submittedAt",
      render: (record: any) => formatDate(record.submittedAt),
    },
  ]

  // Expanded row render
  const expandedRowRender = (record: any) => (
    <div style={{ padding: "16px 0" }}>
      <Title level={5}>Submission Details</Title>
      <Row gutter={[16, 16]}>
        {formData.fields.map((field) => (
          <Col span={12} key={field.id}>
            <Text type="secondary">{field.label}</Text>
            <Paragraph>{record.data[field.id]}</Paragraph>
          </Col>
        ))}
      </Row>
    </div>
  )

  return (
    <div>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Space>
          <Button type="text" icon={<ArrowLeftOutlined />}>
            <Link href="/forms">Back</Link>
          </Button>
          <Title level={2} style={{ margin: 0 }}>
            {formData.name} Results
          </Title>
        </Space>

        <Button icon={<DownloadOutlined />}>Export Data</Button>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Total Submissions"
              value={stats.totalSubmissions}
              prefix={<FileTextOutlined style={{ color: "#1677ff" }} />}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Average Rating"
              value={stats.ratingCounts["Excellent"] ? "Good" : "N/A"}
              prefix={<BarChartOutlined style={{ color: "#1677ff" }} />}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Would Recommend"
              value={
                stats.recommendationCounts["Yes"]
                  ? `${Math.round((stats.recommendationCounts["Yes"] / stats.totalSubmissions) * 100)}%`
                  : "N/A"
              }
              prefix={<UserOutlined style={{ color: "#1677ff" }} />}
            />
          </Card>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Submissions" key="submissions">
          <div style={{ marginBottom: 16 }}>
            <Input
              placeholder="Search submissions..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 300 }}
            />
          </div>

          <Table
            columns={columns}
            dataSource={filteredSubmissions}
            rowKey="id"
            expandable={{
              expandedRowRender: expandedRowRender,
              expandedRowKeys: expandedSubmission ? [expandedSubmission] : [],
              expandIcon: () => null,
            }}
            onRow={(record) => ({
              onClick: () => toggleSubmission(record.id),
            })}
          />
        </TabPane>

        <TabPane tab="Analytics" key="analytics">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card title="Rating Distribution">
                {formData.fields[2].options?.map((option) => {
                  const count = stats.ratingCounts[option] || 0
                  const percentage = stats.totalSubmissions > 0 ? Math.round((count / stats.totalSubmissions) * 100) : 0

                  return (
                    <div key={option} style={{ marginBottom: 16 }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Text>{option}</Text>
                        <Text strong>
                          {count} ({percentage}%)
                        </Text>
                      </div>
                      <Progress percent={percentage} showInfo={false} />
                    </div>
                  )
                })}
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card title="Would Recommend">
                {formData.fields[4].options?.map((option) => {
                  const count = stats.recommendationCounts[option] || 0
                  const percentage = stats.totalSubmissions > 0 ? Math.round((count / stats.totalSubmissions) * 100) : 0

                  return (
                    <div key={option} style={{ marginBottom: 16 }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Text>{option}</Text>
                        <Text strong>
                          {count} ({percentage}%)
                        </Text>
                      </div>
                      <Progress percent={percentage} showInfo={false} />
                    </div>
                  )
                })}
              </Card>
            </Col>
          </Row>

          <Card title="Recent Comments" style={{ marginTop: 16 }}>
            <List
              dataSource={submissionsData}
              renderItem={(submission) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Text strong>{submission.data["field-1"]}</Text>
                        <Text type="secondary">{formatDate(submission.submittedAt)}</Text>
                      </div>
                    }
                    description={submission.data["field-4"]}
                  />
                </List.Item>
              )}
            />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}
