import { Card, Typography, Tag, Space, Button } from "antd";
import {
  BankOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface JobsListingProps {
  featured?: boolean;
}

export default function JobsListing({ featured }: JobsListingProps) {
  const jobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Full-time",
      posted: "2 days ago",
      featured: true,
    },
    {
      id: 2,
      title: "Marketing Manager",
      company: "GrowthCo",
      location: "New York, NY",
      type: "Full-time",
      posted: "1 week ago",
      featured: false,
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "DesignHub",
      location: "Remote",
      type: "Contract",
      posted: "3 days ago",
      featured: true,
    },
    {
      id: 4,
      title: "Content Writer",
      company: "MediaGroup",
      location: "Chicago, IL",
      type: "Part-time",
      posted: "5 days ago",
      featured: false,
    },
  ];

  // Filter jobs if featured is true
  const displayJobs = featured ? jobs.filter((job) => job.featured) : jobs;

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      {displayJobs.map((job) => (
        <Card
          key={job.id}
          style={{
            background: job.featured ? "#f0f7ff" : undefined,
            borderColor: job.featured ? "#91caff" : undefined,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 16,
            }}
          >
            <div>
              <Title level={4} style={{ marginBottom: 8 }}>
                {job.title}
              </Title>
              <Text style={{ display: "flex", alignItems: "center" }}>
                <BankOutlined style={{ marginRight: 8 }} />
                {job.company}
              </Text>
            </div>
            <div>
              <Space>
                <Tag color={job.type === "Full-time" ? "blue" : "green"}>
                  {job.type}
                </Tag>
                {job.featured && <Tag color="orange">Featured</Tag>}
              </Space>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
              marginBottom: 16,
            }}
          >
            <Text
              type="secondary"
              style={{ display: "flex", alignItems: "center" }}
            >
              <EnvironmentOutlined style={{ marginRight: 8 }} />
              {job.location}
            </Text>
            <Text
              type="secondary"
              style={{ display: "flex", alignItems: "center" }}
            >
              <ClockCircleOutlined style={{ marginRight: 8 }} />
              Posted {job.posted}
            </Text>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <a
              href={`/jobs/${job.id}`}
              style={{ display: "flex", alignItems: "center" }}
            >
              View Details <ArrowRightOutlined style={{ marginLeft: 8 }} />
            </a>
            <Button type="primary">Apply Now</Button>
          </div>
        </Card>
      ))}
    </Space>
  );
}
