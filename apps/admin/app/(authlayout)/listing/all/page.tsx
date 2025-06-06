"use client";

import React, { useState, useRef } from "react";
import {
  Layout,
  Card,
  Table,
  Button,
  Input,
  Select,
  Modal,
  Form,
  Badge,
  Tag,
  Dropdown,
  Tabs,
  Statistic,
  Avatar,
  Space,
  Row,
  Col,
  Typography,
  Upload,
  message,
  Tooltip,
  Progress,
  Descriptions,
  Alert,
  Checkbox,
  Radio,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  MoreOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  TrophyOutlined,
  ShoppingOutlined,
  RiseOutlined,
  StarOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InboxOutlined,
  CameraOutlined,
} from "@ant-design/icons";

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;
const { Dragger } = Upload;

// Mock data for listings with verification status
const mockListings = [
  {
    id: 1,
    title: "1999 Yamaha 135",
    price: "₹150,000",
    category: "Motorcycle",
    status: "Active",
    views: 245,
    likes: 12,
    datePosted: "Nov 4, 2024",
    location: "Dharamshala Sub-District",
    image: "/placeholder.svg?height=60&width=60",
    verification: {
      status: "verified",
      verifiedAt: "Nov 5, 2024",
      verifiedBy: "Admin Team",
      verificationChecks: {
        identityVerified: true,
        documentVerified: true,
        phoneVerified: true,
        addressVerified: true,
        priceVerified: true,
      },
      verificationNotes:
        "All documents verified successfully. Seller identity confirmed.",
    },
    analytics: {
      totalViews: 245,
      uniqueViews: 189,
      saves: 12,
      shares: 5,
      contactClicks: 8,
      phoneViews: 3,
      viewsThisWeek: 45,
      viewsLastWeek: 38,
      topLocations: ["Mumbai", "Delhi", "Bangalore"],
      deviceBreakdown: { mobile: 65, desktop: 35 },
    },
    images: [
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
    ],
  },
  {
    id: 2,
    title: "iPhone 14 Pro Max",
    price: "$899",
    category: "Electronics",
    status: "Pending",
    views: 89,
    likes: 5,
    datePosted: "Nov 3, 2024",
    location: "New York, NY",
    image: "/placeholder.svg?height=60&width=60",
    verification: {
      status: "pending",
      submittedAt: "Nov 3, 2024",
      verificationChecks: {
        identityVerified: true,
        documentVerified: false,
        phoneVerified: true,
        addressVerified: false,
        priceVerified: false,
      },
      verificationNotes:
        "Waiting for document verification and address confirmation.",
    },
    analytics: {
      totalViews: 89,
      uniqueViews: 67,
      saves: 5,
      shares: 2,
      contactClicks: 3,
      phoneViews: 1,
      viewsThisWeek: 25,
      viewsLastWeek: 18,
      topLocations: ["New York", "Los Angeles", "Chicago"],
      deviceBreakdown: { mobile: 78, desktop: 22 },
    },
    images: ["/placeholder.svg?height=300&width=300"],
  },
  {
    id: 3,
    title: "Vintage Leather Sofa",
    price: "$450",
    category: "Furniture",
    status: "Sold",
    views: 156,
    likes: 23,
    datePosted: "Oct 28, 2024",
    location: "Los Angeles, CA",
    image: "/placeholder.svg?height=60&width=60",
    verification: {
      status: "rejected",
      rejectedAt: "Oct 29, 2024",
      rejectedBy: "Admin Team",
      verificationChecks: {
        identityVerified: true,
        documentVerified: false,
        phoneVerified: true,
        addressVerified: true,
        priceVerified: false,
      },
      verificationNotes:
        "Price verification failed. Listed price significantly below market value. Please provide additional documentation.",
      rejectionReason: "Suspicious pricing and incomplete documentation",
    },
    analytics: {
      totalViews: 156,
      uniqueViews: 134,
      saves: 23,
      shares: 8,
      contactClicks: 12,
      phoneViews: 6,
      viewsThisWeek: 0,
      viewsLastWeek: 5,
      topLocations: ["Los Angeles", "San Francisco", "San Diego"],
      deviceBreakdown: { mobile: 55, desktop: 45 },
    },
    images: [
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
    ],
  },
  {
    id: 4,
    title: "Gaming Laptop RTX 4070",
    price: "$1,299",
    category: "Electronics",
    status: "Active",
    views: 312,
    likes: 18,
    datePosted: "Nov 1, 2024",
    location: "Austin, TX",
    image: "/placeholder.svg?height=60&width=60",
    verification: {
      status: "unverified",
      verificationChecks: {
        identityVerified: false,
        documentVerified: false,
        phoneVerified: false,
        addressVerified: false,
        priceVerified: false,
      },
    },
    analytics: {
      totalViews: 312,
      uniqueViews: 267,
      saves: 18,
      shares: 7,
      contactClicks: 15,
      phoneViews: 9,
      viewsThisWeek: 78,
      viewsLastWeek: 65,
      topLocations: ["Austin", "Houston", "Dallas"],
      deviceBreakdown: { mobile: 60, desktop: 40 },
    },
    images: [
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
    ],
  },
];

export default function MarketplaceDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);
  const [selectedListingForAnalytics, setSelectedListingForAnalytics] =
    useState(null);
  const [selectedListingForEdit, setSelectedListingForEdit] = useState(null);
  const [selectedListingForVerification, setSelectedListingForVerification] =
    useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [verificationForm] = Form.useForm();

  const filteredListings = mockListings.filter((listing) => {
    const matchesSearch = listing.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTab =
      selectedTab === "all" || listing.status.toLowerCase() === selectedTab;
    return matchesSearch && matchesTab;
  });

  const handleAddListing = (values) => {
    console.log("Adding new listing:", values);
    setIsAddListingOpen(false);
    form.resetFields();
    setUploadedImages([]);
    message.success("Listing created successfully!");
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      Active: { color: "green" },
      Pending: { color: "orange" },
      Sold: { color: "default" },
    };
    return <Tag color={statusConfig[status]?.color || "default"}>{status}</Tag>;
  };

  const getVerificationBadge = (verification) => {
    const config = {
      verified: {
        color: "success",
        icon: <CheckCircleOutlined />,
        text: "Verified",
      },
      pending: {
        color: "warning",
        icon: <ClockCircleOutlined />,
        text: "Pending",
      },
      rejected: {
        color: "error",
        icon: <CloseCircleOutlined />,
        text: "Rejected",
      },
      unverified: {
        color: "default",
        icon: <ExclamationCircleOutlined />,
        text: "Unverified",
      },
    };
    const { color, icon, text } =
      config[verification.status] || config.unverified;
    return <Badge status={color} text={text} />;
  };

  const handleEditListing = (listing) => {
    setSelectedListingForEdit(listing);
    editForm.setFieldsValue({
      title: listing.title,
      price: listing.price,
      category: listing.category.toLowerCase(),
      location: listing.location,
    });
    setUploadedImages(listing.images || []);
  };

  const handleSaveEdit = (values) => {
    console.log("Saving edited listing:", values);
    setSelectedListingForEdit(null);
    editForm.resetFields();
    setUploadedImages([]);
    message.success("Listing updated successfully!");
  };

  const handleVerificationSubmit = (values) => {
    console.log("Verification decision:", values);
    setSelectedListingForVerification(null);
    verificationForm.resetFields();
    message.success("Verification status updated!");
  };

  const uploadProps = {
    name: "file",
    multiple: true,
    listType: "picture-card",
    fileList: uploadedImages,
    beforeUpload: () => false, // Prevent auto upload
    onChange: (info) => {
      setUploadedImages(info.fileList);
    },
  };

  const actionItems = (listing) => [
    {
      key: "analytics",
      label: "View Analytics",
      icon: <BarChartOutlined />,
      onClick: () => setSelectedListingForAnalytics(listing),
    },
    {
      key: "verification",
      label: "Verify Listing",
      icon: "",
      onClick: () => setSelectedListingForVerification(listing),
    },
    {
      key: "edit",
      label: "Edit Listing",
      icon: <EditOutlined />,
      onClick: () => handleEditListing(listing),
    },
    {
      key: "view",
      label: "View Details",
      icon: <EyeOutlined />,
    },
    {
      key: "share",
      label: "Share",
      icon: <ShareAltOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "delete",
      label: "Delete",
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

  const columns = [
    {
      title: "Listing",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Space>
          <Avatar
            src={record.image}
            size={48}
            shape="square"
            icon={<ShoppingOutlined />}
          />
          <div>
            <div style={{ fontWeight: 500 }}>{text}</div>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {record.location}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <Text strong>{price}</Text>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
    },
    {
      title: "Verification",
      dataIndex: "verification",
      key: "verification",
      render: (verification) => getVerificationBadge(verification),
    },
    {
      title: "Views",
      dataIndex: "views",
      key: "views",
    },
    {
      title: "Likes",
      dataIndex: "likes",
      key: "likes",
    },
    {
      title: "Date Posted",
      dataIndex: "datePosted",
      key: "datePosted",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          menu={{ items: actionItems(record) }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      {/* Header */}

      {/* Stats Cards */}

      {/* Listings Table */}
      <Table
        columns={columns}
        dataSource={filteredListings}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1200 }}
      />

      {/* Add Listing Modal */}
      <Modal
        title="Create New Listing"
        open={isAddListingOpen}
        onCancel={() => setIsAddListingOpen(false)}
        width={1200}
        footer={null}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form form={form} layout="vertical" onFinish={handleAddListing}>
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  { required: true, message: "Please enter listing title" },
                ]}
              >
                <Input placeholder="Enter listing title" />
              </Form.Item>

              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Please enter price" }]}
              >
                <Input placeholder="Enter price (e.g., $100, ₹5000)" />
              </Form.Item>

              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: "Please select category" }]}
              >
                <Select placeholder="Select category">
                  <Option value="electronics">Electronics</Option>
                  <Option value="vehicles">Vehicles</Option>
                  <Option value="furniture">Furniture</Option>
                  <Option value="clothing">Clothing</Option>
                  <Option value="books">Books</Option>
                  <Option value="sports">Sports & Recreation</Option>
                  <Option value="home">Home & Garden</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Location"
                name="location"
                rules={[{ required: true, message: "Please enter location" }]}
              >
                <Input placeholder="Enter your location" />
              </Form.Item>

              <Form.Item label="Description" name="description">
                <TextArea
                  placeholder="Describe your item in detail..."
                  rows={4}
                />
              </Form.Item>

              <Form.Item label="Photos">
                <Dragger {...uploadProps}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag files to upload
                  </p>
                  <p className="ant-upload-hint">You can add up to 10 photos</p>
                </Dragger>
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    Create Listing
                  </Button>
                  <Button onClick={() => setIsAddListingOpen(false)}>
                    Cancel
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Col>

          <Col span={12}>
            <div
              style={{ borderLeft: "1px solid #f0f0f0", paddingLeft: "24px" }}
            >
              <Title level={5}>Preview</Title>
              <Text type="secondary">
                See how your listing will appear to buyers
              </Text>

              <Card style={{ marginTop: "16px" }}>
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    background: "#f5f5f5",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                  }}
                >
                  <CameraOutlined
                    style={{ fontSize: "48px", color: "#bfbfbf" }}
                  />
                </div>

                <Title level={5} style={{ margin: "0 0 8px 0" }}>
                  Your listing title will appear here
                </Title>
                <Text strong style={{ fontSize: "20px", color: "#52c41a" }}>
                  Price
                </Text>

                <div style={{ margin: "16px 0" }}>
                  <Badge status="default" text="Pending Verification" />
                </div>

                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Description">
                    Your item description will appear here...
                  </Descriptions.Item>
                  <Descriptions.Item label="Location">
                    Location will be shown here
                  </Descriptions.Item>
                </Descriptions>

                <Alert
                  message="💡 Tips for a great listing"
                  description={
                    <ul style={{ margin: 0, paddingLeft: "20px" }}>
                      <li>Use a clear, descriptive title</li>
                      <li>Add high-quality photos from multiple angles</li>
                      <li>Include detailed condition information</li>
                      <li>Set a competitive price</li>
                      <li>Respond quickly to buyer inquiries</li>
                    </ul>
                  }
                  type="info"
                  showIcon
                  style={{ marginTop: "16px" }}
                />
              </Card>
            </div>
          </Col>
        </Row>
      </Modal>

      {/* Analytics Modal */}
      {selectedListingForAnalytics && (
        <Modal
          title="Listing Analytics"
          open={!!selectedListingForAnalytics}
          onCancel={() => setSelectedListingForAnalytics(null)}
          width={800}
          footer={[
            <Button
              key="close"
              onClick={() => setSelectedListingForAnalytics(null)}
            >
              Close
            </Button>,
          ]}
        >
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Total Views"
                  value={selectedListingForAnalytics.analytics.totalViews}
                  prefix={<EyeOutlined />}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Unique Views"
                  value={selectedListingForAnalytics.analytics.uniqueViews}
                  prefix={<EyeOutlined />}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Contact Clicks"
                  value={selectedListingForAnalytics.analytics.contactClicks}
                  prefix={<ShareAltOutlined />}
                />
              </Card>
            </Col>
          </Row>

          <Card style={{ marginTop: "16px" }}>
            <Title level={5}>Device Breakdown</Title>
            <Progress
              percent={
                selectedListingForAnalytics.analytics.deviceBreakdown.mobile
              }
              format={() =>
                `Mobile: ${selectedListingForAnalytics.analytics.deviceBreakdown.mobile}%`
              }
            />
            <Progress
              percent={
                selectedListingForAnalytics.analytics.deviceBreakdown.desktop
              }
              format={() =>
                `Desktop: ${selectedListingForAnalytics.analytics.deviceBreakdown.desktop}%`
              }
              style={{ marginTop: "8px" }}
            />
          </Card>
        </Modal>
      )}

      {/* Verification Modal */}
      {selectedListingForVerification && (
        <Modal
          title="Verify Listing"
          open={!!selectedListingForVerification}
          onCancel={() => setSelectedListingForVerification(null)}
          width={600}
          footer={null}
        >
          <Form
            form={verificationForm}
            layout="vertical"
            onFinish={handleVerificationSubmit}
          >
            <Title level={5}>Verification Checks</Title>
            <Form.Item name="identityVerified" valuePropName="checked">
              <Checkbox>Identity Verified</Checkbox>
            </Form.Item>
            <Form.Item name="documentVerified" valuePropName="checked">
              <Checkbox>Document Verified</Checkbox>
            </Form.Item>
            <Form.Item name="phoneVerified" valuePropName="checked">
              <Checkbox>Phone Verified</Checkbox>
            </Form.Item>
            <Form.Item name="addressVerified" valuePropName="checked">
              <Checkbox>Address Verified</Checkbox>
            </Form.Item>
            <Form.Item name="priceVerified" valuePropName="checked">
              <Checkbox>Price Verified</Checkbox>
            </Form.Item>

            <Form.Item label="Action" name="action" initialValue="approve">
              <Radio.Group>
                <Radio value="approve">Approve</Radio>
                <Radio value="reject">Reject</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Verification Notes" name="verificationNotes">
              <TextArea rows={3} placeholder="Add any verification notes..." />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit Verification
                </Button>
                <Button onClick={() => setSelectedListingForVerification(null)}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      )}

      {/* Edit Listing Modal */}
      {selectedListingForEdit && (
        <Modal
          title="Edit Listing"
          open={!!selectedListingForEdit}
          onCancel={() => setSelectedListingForEdit(null)}
          width={800}
          footer={null}
        >
          <Form form={editForm} layout="vertical" onFinish={handleSaveEdit}>
            <Form.Item
              label="Title"
              name="title"
              rules={[
                { required: true, message: "Please enter listing title" },
              ]}
            >
              <Input placeholder="Enter listing title" />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please enter price" }]}
            >
              <Input placeholder="Enter price" />
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select category" }]}
            >
              <Select>
                <Option value="electronics">Electronics</Option>
                <Option value="vehicles">Vehicles</Option>
                <Option value="furniture">Furniture</Option>
                <Option value="clothing">Clothing</Option>
                <Option value="books">Books</Option>
                <Option value="sports">Sports & Recreation</Option>
                <Option value="home">Home & Garden</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Location"
              name="location"
              rules={[{ required: true, message: "Please enter location" }]}
            >
              <Input placeholder="Enter location" />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <TextArea rows={4} placeholder="Describe your item..." />
            </Form.Item>

            <Form.Item label="Photos">
              <Upload {...uploadProps}>
                <Button icon={<PlusOutlined />}>Upload Photos</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Save Changes
                </Button>
                <Button onClick={() => setSelectedListingForEdit(null)}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
}
