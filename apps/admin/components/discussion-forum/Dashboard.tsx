"use client";

import { useState } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Select,
  DatePicker,
  Tabs,
  Table,
  Button,
} from "antd";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ArrowUp, ArrowDown, Download, Filter } from "lucide-react";

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const { Option } = Select;

// Sample data for charts
const engagementData = [
  { name: "Jan", likes: 4000, comments: 2400, shares: 1200 },
  { name: "Feb", likes: 3000, comments: 1398, shares: 900 },
  { name: "Mar", likes: 2000, comments: 9800, shares: 1600 },
  { name: "Apr", likes: 2780, comments: 3908, shares: 2000 },
  { name: "May", likes: 1890, comments: 4800, shares: 2181 },
  { name: "Jun", likes: 2390, comments: 3800, shares: 2500 },
  { name: "Jul", likes: 3490, comments: 4300, shares: 2100 },
];

const userGrowthData = [
  { name: "Jan", users: 1200 },
  { name: "Feb", users: 1900 },
  { name: "Mar", users: 3000 },
  { name: "Apr", users: 5000 },
  { name: "May", users: 8000 },
  { name: "Jun", users: 10000 },
  { name: "Jul", users: 12000 },
];

const trafficSourceData = [
  { name: "Direct", value: 40 },
  { name: "Social Media", value: 30 },
  { name: "Referral", value: 20 },
  { name: "Organic Search", value: 10 },
];

const COLORS = ["#4f46e5", "#818cf8", "#c7d2fe", "#e0e7ff"];

const topPostsData = [
  {
    key: "1",
    title: "Welcome to PulsePlay Digital",
    views: 12453,
    engagement: 8.7,
    conversionRate: "3.2%",
  },
  {
    key: "2",
    title: "New Features Coming Soon",
    views: 9876,
    engagement: 7.5,
    conversionRate: "2.8%",
  },
  {
    key: "3",
    title: "Community Guidelines Update",
    views: 8765,
    engagement: 6.9,
    conversionRate: "2.5%",
  },
  {
    key: "4",
    title: "Upcoming Events in June",
    views: 7654,
    engagement: 6.2,
    conversionRate: "2.1%",
  },
  {
    key: "5",
    title: "User Spotlight: May Edition",
    views: 6543,
    engagement: 5.8,
    conversionRate: "1.9%",
  },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("month");

  const topPostsColumns = [
    {
      title: "Post Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <a href="#">{text}</a>,
    },
    {
      title: "Views",
      dataIndex: "views",
      key: "views",
      sorter: (a: any, b: any) => a.views - b.views,
    },
    {
      title: "Engagement Rate",
      dataIndex: "engagement",
      key: "engagement",
      render: (rate: number) => `${rate}%`,
      sorter: (a: any, b: any) => a.engagement - b.engagement,
    },
    {
      title: "Conversion Rate",
      dataIndex: "conversionRate",
      key: "conversionRate",
      sorter: (a: any, b: any) =>
        Number.parseFloat(a.conversionRate) -
        Number.parseFloat(b.conversionRate),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Detailed insights into your platform performance
          </p>
        </div>
        <div className="flex items-center gap-4">
          <RangePicker className="w-64" />
          <Select
            defaultValue="month"
            style={{ width: 120 }}
            onChange={setTimeRange}
          >
            <Option value="day">Today</Option>
            <Option value="week">This Week</Option>
            <Option value="month">This Month</Option>
            <Option value="year">This Year</Option>
          </Select>
          <Button type="primary" icon={<Download size={16} />}>
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <Row gutter={16} className="mb-6">
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Views"
              value={124532}
              suffix={
                <span className="text-green-500 text-xs ml-2 flex items-center">
                  <ArrowUp size={12} /> 12%
                </span>
              }
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Avg. Engagement Rate"
              value={7.8}
              suffix="%"
              precision={1}
              valueStyle={{ color: "#4f46e5" }}
              suffix={
                <span className="text-green-500 text-xs ml-2 flex items-center">
                  <ArrowUp size={12} /> 0.5%
                </span>
              }
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Conversion Rate"
              value={2.4}
              suffix="%"
              precision={1}
              valueStyle={{ color: "#4f46e5" }}
              suffix={
                <span className="text-red-500 text-xs ml-2 flex items-center">
                  <ArrowDown size={12} /> 0.2%
                </span>
              }
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Users"
              value={15432}
              suffix={
                <span className="text-green-500 text-xs ml-2 flex items-center">
                  <ArrowUp size={12} /> 8%
                </span>
              }
            />
          </Card>
        </Col>
      </Row>

      {/* Engagement Chart */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Engagement Metrics</h2>
          <div className="flex items-center gap-2">
            <Button type="text" icon={<Filter size={16} />}>
              Filter
            </Button>
            <Button type="text" icon={<Download size={16} />}>
              Export
            </Button>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={engagementData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="likes"
                stroke="#4f46e5"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="comments" stroke="#818cf8" />
              <Line type="monotone" dataKey="shares" stroke="#c7d2fe" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* User Growth and Traffic Sources */}
      <Row gutter={16} className="mb-6">
        <Col span={16}>
          <Card>
            <h2 className="text-lg font-semibold mb-4">User Growth</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={userGrowthData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <h2 className="text-lg font-semibold mb-4">Traffic Sources</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {trafficSourceData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center mt-4">
              {trafficSourceData.map((entry, index) => (
                <div
                  key={`legend-${index}`}
                  className="flex items-center mx-2 mb-2"
                >
                  <div
                    className="w-3 h-3 mr-1"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-xs">
                    {entry.name}: {entry.value}%
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Top Performing Content */}
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Top Posts" key="1">
            <Table
              columns={topPostsColumns}
              dataSource={topPostsData}
              pagination={false}
            />
          </TabPane>
          <TabPane tab="Demographics" key="2">
            <div className="p-4 text-center">
              <h3 className="text-lg mb-4">User Demographics</h3>
              <Row gutter={16}>
                <Col span={8}>
                  <Card title="Age Distribution">
                    <div className="flex justify-between text-sm">
                      <div>
                        <div className="font-medium">18-24</div>
                        <div className="text-gray-500">25%</div>
                      </div>
                      <div>
                        <div className="font-medium">25-34</div>
                        <div className="text-gray-500">40%</div>
                      </div>
                      <div>
                        <div className="font-medium">35-44</div>
                        <div className="text-gray-500">20%</div>
                      </div>
                      <div>
                        <div className="font-medium">45+</div>
                        <div className="text-gray-500">15%</div>
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Gender">
                    <div className="flex justify-between text-sm">
                      <div>
                        <div className="font-medium">Male</div>
                        <div className="text-gray-500">48%</div>
                      </div>
                      <div>
                        <div className="font-medium">Female</div>
                        <div className="text-gray-500">47%</div>
                      </div>
                      <div>
                        <div className="font-medium">Other</div>
                        <div className="text-gray-500">5%</div>
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Location">
                    <div className="flex justify-between text-sm">
                      <div>
                        <div className="font-medium">North America</div>
                        <div className="text-gray-500">45%</div>
                      </div>
                      <div>
                        <div className="font-medium">Europe</div>
                        <div className="text-gray-500">30%</div>
                      </div>
                      <div>
                        <div className="font-medium">Asia</div>
                        <div className="text-gray-500">25%</div>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          </TabPane>
          <TabPane tab="Devices" key="3">
            <div className="p-4 text-center">
              <h3 className="text-lg mb-4">Device Usage</h3>
              <Row gutter={16}>
                <Col span={8}>
                  <Card>
                    <Statistic title="Mobile" value={65} suffix="%" />
                    <div className="mt-2 text-xs text-gray-500">
                      +5% from last month
                    </div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <Statistic title="Desktop" value={30} suffix="%" />
                    <div className="mt-2 text-xs text-gray-500">
                      -3% from last month
                    </div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <Statistic title="Tablet" value={5} suffix="%" />
                    <div className="mt-2 text-xs text-gray-500">
                      -2% from last month
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
}
