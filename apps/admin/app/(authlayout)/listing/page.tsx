"use client";

import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Statistic,
  Table,
  Tag,
  Button,
  Select,
  Divider,
} from "antd";
import {
  ShopOutlined,
  EyeOutlined,
  LikeOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  StopOutlined,
  PauseCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

interface ListingData {
  id: string;
  title: string;
  category: string;
  condition: string;
  price: number;
  status: string;
  views: number;
  likes: number;
  date: string;
}

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("week");
  const [listingData, setListingData] = useState<ListingData[]>([]);

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const mockData: ListingData[] = [
      {
        id: "1",
        title: "2022 Tesla Model 3",
        category: "Vehicles",
        condition: "Used",
        price: 35000,
        status: "approved",
        views: 1245,
        likes: 89,
        date: "2023-05-01",
      },
      {
        id: "2",
        title: "MacBook Pro 16-inch",
        category: "Electronics",
        condition: "New",
        price: 2400,
        status: "pending",
        views: 780,
        likes: 45,
        date: "2023-05-02",
      },
      {
        id: "3",
        title: "Luxury Apartment for Rent",
        category: "Real Estate",
        condition: "New",
        price: 3500,
        status: "approved",
        views: 2100,
        likes: 120,
        date: "2023-05-03",
      },
      {
        id: "4",
        title: "Vintage Leather Sofa",
        category: "Furniture",
        condition: "Used",
        price: 850,
        status: "blocked",
        views: 320,
        likes: 15,
        date: "2023-05-04",
      },
      {
        id: "5",
        title: "iPhone 14 Pro Max",
        category: "Electronics",
        condition: "New",
        price: 1100,
        status: "inactive",
        views: 450,
        likes: 30,
        date: "2023-05-05",
      },
    ];

    setListingData(mockData);
  }, []);

  const columns: ColumnsType<ListingData> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Condition",
      dataIndex: "condition",
      key: "condition",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toLocaleString()}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "green";
        let icon = <CheckCircleOutlined />;

        if (status === "pending") {
          color = "gold";
          icon = <ClockCircleOutlined />;
        } else if (status === "blocked") {
          color = "red";
          icon = <StopOutlined />;
        } else if (status === "inactive") {
          color = "gray";
          icon = <PauseCircleOutlined />;
        }

        return (
          <Tag color={color} icon={icon}>
            {status.toUpperCase()}
          </Tag>
        );
      },
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
  ];

  // Calculate statistics
  const totalListings = listingData.length;
  const pendingListings = listingData.filter(
    (item) => item.status === "pending"
  ).length;
  const totalViews = listingData.reduce((sum, item) => sum + item.views, 0);
  const totalLikes = listingData.reduce((sum, item) => sum + item.likes, 0);

  // Top categories
  const categoryCount = listingData.reduce(
    (acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const topCategories = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  // Top conditions
  const conditionCount = listingData.reduce(
    (acc, item) => {
      acc[item.condition] = (acc[item.condition] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const topConditions = Object.entries(conditionCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h1 style={{ margin: 0 }}>Dashboard Overview</h1>
        <Select
          defaultValue="week"
          style={{ width: 120 }}
          onChange={setTimeRange}
          options={[
            { value: "today", label: "Today" },
            { value: "week", label: "This Week" },
            { value: "month", label: "This Month" },
            { value: "year", label: "This Year" },
          ]}
        />
      </div>

      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Listings"
              value={totalListings}
              prefix={<ShopOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Pending Approvals"
              value={pendingListings}
              prefix={<ClockCircleOutlined />}
              valueStyle={{
                color: pendingListings > 0 ? "#faad14" : "#3f8600",
              }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Views"
              value={totalViews}
              prefix={<EyeOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Likes"
              value={totalLikes}
              prefix={<LikeOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Divider orientation="left">Top Performing Categories</Divider>

      <Row gutter={16}>
        {topCategories.map(([category, count], index) => (
          <Col span={8} key={index}>
            <Card>
              <Statistic
                title={category}
                value={count}
                suffix={`listing${count > 1 ? "s" : ""}`}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Divider orientation="left">Top Conditions</Divider>

      <Row gutter={16}>
        {topConditions.map(([condition, count], index) => (
          <Col span={8} key={index}>
            <Card>
              <Statistic
                title={condition}
                value={count}
                suffix={`listing${count > 1 ? "s" : ""}`}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Divider orientation="left">Recent Listings</Divider>

      <Table
        columns={columns}
        dataSource={listingData}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <div
        style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}
      >
        <Button type="primary" href="/all-listings">
          View All Listings
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
