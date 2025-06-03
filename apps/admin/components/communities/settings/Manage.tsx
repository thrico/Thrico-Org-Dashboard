"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  Input,
  Form,
  Switch,
  Select,
  Badge,
  Avatar,
  Tabs,
  Typography,
  Space,
  Divider,
  Progress,
  List,
  Row,
  Col,
  message,
  Popconfirm,
  Drawer,
} from "antd";
import {
  ArrowLeftOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  CrownOutlined,
  SafetyOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  TrophyOutlined,
  FileTextOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import Analytics from "./Analytics";
import BasicInfo from "./BasicInfo";
import Rules from "./Rules";
import Permission from "./Permission";
import { communityEntity } from "../ts-types";

const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const mockJoinRequests = [
  {
    id: 1,
    name: "Emma Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    requestDate: "2 days ago",
    message:
      "I'm a professional photographer and would love to share my work and learn from the community.",
  },
  {
    id: 2,
    name: "David Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    requestDate: "1 day ago",
    message:
      "Amateur photographer looking to improve my skills and get feedback on my photos.",
  },
  {
    id: 3,
    name: "Lisa Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    requestDate: "3 hours ago",
    message:
      "I specialize in landscape photography and would like to connect with other nature photographers.",
  },
];

const mockMembers = [
  {
    id: 1,
    name: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Creator",
    joinDate: "Jan 2024",
    posts: 45,
    isActive: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Admin",
    joinDate: "Feb 2024",
    posts: 32,
    isActive: true,
  },
  {
    id: 3,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Member",
    joinDate: "Mar 2024",
    posts: 18,
    isActive: true,
  },
  {
    id: 4,
    name: "Sarah Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Member",
    joinDate: "Mar 2024",
    posts: 24,
    isActive: false,
  },
];

export default function Manage({ data }: { data: communityEntity }) {
  const [form] = Form.useForm();

  const [groupSettings, setGroupSettings] = useState({
    name: "Photography Enthusiasts",
    description:
      "A community for photographers of all levels to share their work, get feedback, and learn from each other.",
    privacy: "public",
    joinCondition: "anyone",
    allowMemberPosts: true,
    requirePostApproval: false,
    allowMemberInvites: false,
    rules:
      "1. Be respectful and constructive in your feedback\n2. Only post your own original work\n3. No spam or promotional content\n4. Keep discussions photography-related",
  });

  const [joinRequests, setJoinRequests] = useState(mockJoinRequests);
  const [members, setMembers] = useState(mockMembers);

  const handleApproveRequest = (requestId: number) => {
    setJoinRequests((requests) =>
      requests.filter((req) => req.id !== requestId)
    );
    message.success("Join request approved successfully");
  };

  const handleRejectRequest = (requestId: number) => {
    setJoinRequests((requests) =>
      requests.filter((req) => req.id !== requestId)
    );
    message.success("Join request rejected");
  };

  const handlePromoteMember = (memberId: number) => {
    setMembers(
      members.map((member) =>
        member.id === memberId
          ? { ...member, role: member.role === "Member" ? "Admin" : "Member" }
          : member
      )
    );
    message.success("Member role updated successfully");
  };

  const handleRemoveMember = (memberId: number) => {
    setMembers(members.filter((member) => member.id !== memberId));
    message.success("Member removed from group");
  };

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    message.success("Settings saved successfully");
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Creator":
        return (
          <Badge
            color="gold"
            text={
              <Space>
                <CrownOutlined />
                Creator
              </Space>
            }
          />
        );
      case "Admin":
        return (
          <Badge
            color="blue"
            text={
              <Space>
                <SafetyOutlined />
                Admin
              </Space>
            }
          />
        );
      default:
        return <Badge color="default" text="Member" />;
    }
  };

  return (
    <>
      {/* Trigger Button */}

      {/* Drawer Component */}

      {/* Move all the existing Tabs content here, but remove the outer container styling */}
      <Tabs
        defaultActiveKey="settings"
        size="large"
        items={[
          {
            key: "analytics",
            label: (
              <span>
                <TrophyOutlined /> Analytics
              </span>
            ),
            children: <Analytics />,
          },
          {
            key: "Basic Info",
            label: (
              <span>
                <FileTextOutlined /> Basic Info
              </span>
            ),
            children: <BasicInfo data={data} />,
          },
          {
            key: "Rules",
            label: (
              <span>
                <FileTextOutlined /> Rules
              </span>
            ),
            children: <Rules data={data} />,
          },
          {
            key: "Permissions",
            label: (
              <span>
                <FileTextOutlined /> Permissions
              </span>
            ),
            children: <Permission data={data} />,
          },
          {
            key: "members",
            label: (
              <Space>
                Members
                <Badge count={members.length} showZero />
              </Space>
            ),
            icon: <TeamOutlined />,
            children: (
              <Card title={`Group Members (${members.length})`}>
                <List
                  itemLayout="horizontal"
                  dataSource={members}
                  renderItem={(member) => (
                    <List.Item
                      actions={
                        member.role !== "Creator"
                          ? [
                              <Button
                                key="promote"
                                type="default"
                                onClick={() => handlePromoteMember(member.id)}
                              >
                                {member.role === "Admin"
                                  ? "Remove Admin"
                                  : "Make Admin"}
                              </Button>,
                              <Popconfirm
                                key="remove"
                                title="Are you sure you want to remove this member?"
                                onConfirm={() => handleRemoveMember(member.id)}
                                okText="Yes"
                                cancelText="No"
                              >
                                <Button danger icon={<UserDeleteOutlined />}>
                                  Remove
                                </Button>
                              </Popconfirm>,
                            ]
                          : []
                      }
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar src={member.avatar} size={48}>
                            {member.name[0]}
                          </Avatar>
                        }
                        title={
                          <Space>
                            <Text strong>{member.name}</Text>
                            {getRoleBadge(member.role)}
                            {!member.isActive && (
                              <Badge status="error" text="Inactive" />
                            )}
                          </Space>
                        }
                        description={`Joined ${member.joinDate} • ${member.posts} posts`}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            ),
          },
          {
            key: "requests",
            label: (
              <Space>
                Join Requests
                {joinRequests.length > 0 && (
                  <Badge count={joinRequests.length} />
                )}
              </Space>
            ),
            icon: <UserAddOutlined />,
            children: (
              <Card title={`Join Requests (${joinRequests.length})`}>
                {joinRequests.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "48px 0" }}>
                    <UserAddOutlined
                      style={{
                        fontSize: 48,
                        color: "#d9d9d9",
                        marginBottom: 16,
                      }}
                    />
                    <Text type="secondary">No pending join requests</Text>
                  </div>
                ) : (
                  <List
                    itemLayout="vertical"
                    dataSource={joinRequests}
                    renderItem={(request) => (
                      <List.Item
                        actions={[
                          <Button
                            key="approve"
                            type="primary"
                            icon={<CheckCircleOutlined />}
                            onClick={() => handleApproveRequest(request.id)}
                          >
                            Approve
                          </Button>,
                          <Button
                            key="reject"
                            danger
                            icon={<CloseCircleOutlined />}
                            onClick={() => handleRejectRequest(request.id)}
                          >
                            Reject
                          </Button>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar src={request.avatar} size={48}>
                              {request.name[0]}
                            </Avatar>
                          }
                          title={<Text strong>{request.name}</Text>}
                          description={`Requested ${request.requestDate}`}
                        />
                        {request.message && (
                          <Card
                            size="small"
                            style={{
                              backgroundColor: "#fafafa",
                              marginTop: 8,
                            }}
                          >
                            <Text italic>"{request.message}"</Text>
                          </Card>
                        )}
                      </List.Item>
                    )}
                  />
                )}
              </Card>
            ),
          },
        ]}
      />
    </>
  );
}
