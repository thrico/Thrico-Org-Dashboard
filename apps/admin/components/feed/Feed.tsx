"use client";

import { useState } from "react";
import {
    Layout,
    Menu,
    Card,
    Avatar,
    Typography,
    Button,
    Space,
    Divider,
    Badge,
    Tooltip,
    Modal,
    Statistic,
    Row,
    Col,
    List,
    Dropdown,
} from "antd";
import {
    HeartOutlined,
    HeartFilled,
    CommentOutlined,
    ShareAltOutlined,
    BarChartOutlined,
    LineChartOutlined,
    MoreOutlined,
    GlobalOutlined,
    LockOutlined,
} from "@ant-design/icons";
import moment from "moment";
import UserAvatar from "../../screen/comman/UserAvatar";
import { FaRegCommentAlt, FaRegHeart } from "react-icons/fa";
import { MdOutlineRepeat } from "react-icons/md";

const { Header, Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

// Sample feed data
// const feedData = [
//     {
//         id: 1,
//         author: {
//             name: "Pankaj Verma",
//             avatar: "/placeholder.svg?height=100&width=100",
//             role: "Software Developer",
//             verified: true,
//         },
//         timePosted: "6 hours ago",
//         visibility: "public",
//         content: {
//             text: "Google",
//             description: "Google to Migrate Ad Tech Stack to JavaScript!",
//             image: "/placeholder.svg?height=400&width=600",
//         },
//         stats: {
//             likes: 42,
//             comments: 8,
//             shares: 12,
//             views: 1024,
//         },
//     },
//     {
//         id: 2,
//         author: {
//             name: "Sarah Johnson",
//             avatar: "/placeholder.svg?height=100&width=100",
//             role: "UX Designer",
//             verified: false,
//         },
//         timePosted: "12 hours ago",
//         visibility: "public",
//         content: {
//             text: "Just finished my latest design project!",
//             description: "Really excited to share this new dashboard design with everyone. Let me know what you think!",
//             image: "/placeholder.svg?height=400&width=600",
//         },
//         stats: {
//             likes: 78,
//             comments: 23,
//             shares: 5,
//             views: 845,
//         },
//     },
//     {
//         id: 3,
//         author: {
//             name: "Alex Chen",
//             avatar: "/placeholder.svg?height=100&width=100",
//             role: "Product Manager",
//             verified: true,
//         },
//         timePosted: "1 day ago",
//         visibility: "private",
//         content: {
//             text: "Team update",
//             description: "We've hit our quarterly goals! Great job everyone on the team for your hard work and dedication.",
//             image: null,
//         },
//         stats: {
//             likes: 56,
//             comments: 14,
//             shares: 3,
//             views: 320,
//         },
//     },
// ]

// Analytics data for each feed
const getAnalyticsData = (feedId: number) => {
    const feed = feedData.find((f) => f.id === feedId);
    if (!feed) return null;

    return {
        engagement: [
            { name: "Likes", value: feed.stats.likes, color: "#ff4d4f" },
            { name: "Comments", value: feed.stats.comments, color: "#1890ff" },
            { name: "Shares", value: feed.stats.shares, color: "#52c41a" },
        ],
        demographics: {
            age: [
                { group: "18-24", percentage: 35 },
                { group: "25-34", percentage: 45 },
                { group: "35-44", percentage: 15 },
                { group: "45+", percentage: 5 },
            ],
            location: [
                { country: "United States", percentage: 40 },
                { country: "India", percentage: 30 },
                { country: "Europe", percentage: 20 },
                { country: "Other", percentage: 10 },
            ],
        },
        reachData: {
            total: feed.stats.views,
            organic: Math.floor(feed.stats.views * 0.7),
            paid: Math.floor(feed.stats.views * 0.3),
        },
    };
};

export default function Feed({ feed }) {
    const [selectedMenuItem, setSelectedMenuItem] = useState("1");
    const [likedPosts, setLikedPosts] = useState<number[]>([]);
    const [analyticsVisible, setAnalyticsVisible] = useState(false);
    const [currentFeedId, setCurrentFeedId] = useState<number | null>(null);

    return (
        <List.Item style={{ width: "70%" }}>
            <Card
                key={feed.id}
                bordered={false}
                style={{
                    width: "100%",
                    borderRadius: 8,
                    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                    }}
                >
                    <Space>
                        <UserAvatar size={48} src={feed?.user?.avatar} />
                        <div>
                            <Space>
                                <Text strong>
                                    {feed?.user.firstName} {feed?.user.lastName}
                                </Text>
                                {feed?.author?.verified && (
                                    <span style={{ color: "#1890ff", fontSize: 16 }}>✓</span>
                                )}
                            </Space>
                            <div>
                                <Text type="secondary">
                                    {feed?.user?.about?.currentPosition}
                                </Text>
                                <Text type="secondary">{feed?.author?.role}</Text>
                            </div>
                            <Space>
                                <Text type="secondary">
                                    {" "}
                                    {moment(feed?.createdAt).fromNow()}{" "}
                                </Text>
                                <Tooltip
                                    title={feed?.privacy === "public" ? "Public" : "Private"}
                                >
                                    {feed?.privacy === "public" ? (
                                        <GlobalOutlined />
                                    ) : (
                                        <LockOutlined />
                                    )}
                                </Tooltip>
                            </Space>
                        </div>
                    </Space>
                    <Dropdown
                        menu={{
                            items: [
                                { key: "1", label: "Save post" },
                                { key: "2", label: "Hide post" },
                                { key: "3", label: "Report" },
                            ],
                        }}
                        placement="bottomRight"
                    >
                        <Button type="text" icon={<MoreOutlined />} />
                    </Dropdown>
                </div>

                <div style={{ margin: "16px 0" }}>
                    <Title level={5}>{feed?.content?.text}</Title>
                    <Paragraph>{feed?.description}</Paragraph>
                    {feed?.content?.image && (
                        <div style={{ marginTop: 16 }}>
                            <img
                                src={feed?.content?.image || "/placeholder.svg"}
                                alt="Post content"
                                style={{ width: "100%", borderRadius: 8 }}
                            />
                        </div>
                    )}
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Space>
                        <Text type="secondary">{feed?.totalReactions} Likes</Text>
                        <Text type="secondary">•</Text>
                        <Text type="secondary">{feed?.totalComment} Comments</Text>
                        <Text type="secondary">•</Text>
                        <Text type="secondary">{feed?.totalReShare} Shares</Text>
                    </Space>
                    <Button type="text" icon={<BarChartOutlined />}>
                        Analytics
                    </Button>
                </div>

                <Divider style={{ margin: "12px 0" }} />

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button
                        type="text"
                        icon={<FaRegHeart size={17} />}
                    // onClick={() => toggleLike(feed.id)}
                    >
                        Like
                    </Button>
                    <Button type="text" icon={<FaRegCommentAlt size={17} />}>
                        Comment
                    </Button>
                    <Button type="text" icon={<MdOutlineRepeat size={17} />}>
                        Share
                    </Button>
                </div>
            </Card>

            {/* Analytics Modal */}
            {/* <Modal
                title={
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <BarChartOutlined style={{ marginRight: 8 }} />
                        <span>Post Analytics</span>
                    </div>
                }
                open={analyticsVisible}
                onCancel={() => setAnalyticsVisible(false)}
                footer={null}
                width={700}
            >
                {analyticsData && currentFeed && (
                    <div>
                        <div style={{ marginBottom: 24 }}>
                            <Space>
                                <Avatar size="small" src={currentFeed.author.avatar} />
                                <Text strong>{currentFeed.author.name}</Text>
                                <Text type="secondary">• {currentFeed.timePosted}</Text>
                            </Space>
                            <Paragraph style={{ marginTop: 8 }}>{currentFeed.content.text}</Paragraph>
                        </div>

                        <Divider orientation="left">Engagement Overview</Divider>
                        <Row gutter={16}>
                            {analyticsData.engagement.map((item) => (
                                <Col span={8} key={item.name}>
                                    <Card bordered={false}>
                                        <Statistic title={item.name} value={item.value} valueStyle={{ color: item.color }} />
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        <Divider orientation="left">Reach</Divider>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Card bordered={false}>
                                    <Statistic title="Total Views" value={analyticsData.reachData.total} prefix={<LineChartOutlined />} />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card bordered={false}>
                                    <Statistic
                                        title="Organic Reach"
                                        value={analyticsData.reachData.organic}
                                        suffix={`(${Math.round((analyticsData.reachData.organic / analyticsData.reachData.total) * 100)}%)`}
                                    />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card bordered={false}>
                                    <Statistic
                                        title="Paid Reach"
                                        value={analyticsData.reachData.paid}
                                        suffix={`(${Math.round((analyticsData.reachData.paid / analyticsData.reachData.total) * 100)}%)`}
                                    />
                                </Card>
                            </Col>
                        </Row>

                        <Divider orientation="left">Demographics</Divider>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Card title="Age Distribution" bordered={false}>
                                    <List
                                        dataSource={analyticsData.demographics.age}
                                        renderItem={(item) => (
                                            <List.Item>
                                                <Text>{item.group}</Text>
                                                <div>
                                                    <div
                                                        style={{
                                                            width: `${item.percentage}%`,
                                                            height: 8,
                                                            background: "#1890ff",
                                                            borderRadius: 4,
                                                        }}
                                                    />
                                                    <Text type="secondary">{item.percentage}%</Text>
                                                </div>
                                            </List.Item>
                                        )}
                                    />
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card title="Geographic Distribution" bordered={false}>
                                    <List
                                        dataSource={analyticsData.demographics.location}
                                        renderItem={(item) => (
                                            <List.Item>
                                                <Text>{item.country}</Text>
                                                <div>
                                                    <div
                                                        style={{
                                                            width: `${item.percentage}%`,
                                                            height: 8,
                                                            background: "#52c41a",
                                                            borderRadius: 4,
                                                        }}
                                                    />
                                                    <Text type="secondary">{item.percentage}%</Text>
                                                </div>
                                            </List.Item>
                                        )}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </div>
                )}
            </Modal> */}
        </List.Item>
    );
}
