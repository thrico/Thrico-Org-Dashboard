"use client";

"use client";
import { useState } from "react";
import {
  TrophyOutlined,
  CrownOutlined,
  StarOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Card,
  Avatar,
  Tag,
  Select,
  Tabs,
  Modal,
  Form,
  Row,
  Col,
  List,
  Space,
  Statistic,
  Badge,
} from "antd";
import { Layout } from "antd";

// Mock data for Wall of Fame users
const WallOfFameComponent = () => {
  const [wallOfFameUsers, setWallOfFameUsers] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Technology Pioneer",
      avatar: "/placeholder.svg?height=100&width=100",
      category: "Innovation",
      yearInducted: 2024,
      location: "San Francisco, CA",
      achievements: [
        "Founded 3 successful tech startups",
        "Published 50+ research papers",
        "Mentored 100+ entrepreneurs",
        "Received Innovation Excellence Award 2023",
      ],
      bio: "Dr. Sarah Johnson is a renowned technology pioneer who has revolutionized the field of artificial intelligence and machine learning. Her groundbreaking work has led to significant advancements in healthcare technology.",
      specialties: [
        "Artificial Intelligence",
        "Healthcare Technology",
        "Entrepreneurship",
      ],
      inductionReason:
        "Outstanding contributions to technology innovation and mentorship of next-generation entrepreneurs.",
      socialLinks: {
        linkedin: "https://linkedin.com/in/sarahjohnson",
        twitter: "https://twitter.com/sarahjohnson",
        website: "https://sarahjohnson.com",
      },
    },
    {
      id: 2,
      name: "Marcus Thompson",
      title: "Community Leader",
      avatar: "/placeholder.svg?height=100&width=100",
      category: "Leadership",
      yearInducted: 2023,
      location: "Austin, TX",
      achievements: [
        "Led community development projects",
        "Established 5 non-profit organizations",
        "Volunteer of the Year 2022",
        "Impacted 10,000+ lives through initiatives",
      ],
      bio: "Marcus Thompson is a dedicated community leader who has spent over two decades working to improve lives and build stronger communities. His leadership has transformed neighborhoods and inspired countless volunteers.",
      specialties: [
        "Community Development",
        "Non-profit Management",
        "Social Impact",
      ],
      inductionReason:
        "Exceptional leadership in community development and lasting positive impact on society.",
      socialLinks: {
        linkedin: "https://linkedin.com/in/marcusthompson",
        website: "https://marcusthompson.org",
      },
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      title: "Environmental Advocate",
      avatar: "/placeholder.svg?height=100&width=100",
      category: "Environment",
      yearInducted: 2024,
      location: "Miami, FL",
      achievements: [
        "Reduced carbon emissions by 40% in local area",
        "Founded Green Future Initiative",
        "Environmental Excellence Award 2023",
        "Authored 'Sustainable Tomorrow' bestseller",
      ],
      bio: "Elena Rodriguez is a passionate environmental advocate whose innovative approaches to sustainability have made significant impacts on climate change mitigation and environmental conservation.",
      specialties: [
        "Environmental Conservation",
        "Sustainability",
        "Climate Change",
      ],
      inductionReason:
        "Pioneering work in environmental conservation and sustainable development practices.",
      socialLinks: {
        linkedin: "https://linkedin.com/in/elenarodriguez",
        twitter: "https://twitter.com/elenarodriguez",
      },
    },
  ]);

  const categories = [
    "All",
    "Innovation",
    "Leadership",
    "Environment",
    "Education",
    "Healthcare",
    "Arts",
    "Sports",
  ];
  const years = ["All Years", "2024", "2023", "2022", "2021", "2020"];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    title: "",
    category: "",
    location: "",
    bio: "",
    inductionReason: "",
    achievements: [""],
    specialties: [""],
    socialLinks: {
      linkedin: "",
      twitter: "",
      website: "",
    },
  });

  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const filteredUsers = wallOfFameUsers.filter((user) => {
    const matchesCategory =
      selectedCategory === "All" || user.category === selectedCategory;
    const matchesYear =
      selectedYear === "All Years" ||
      user.yearInducted.toString() === selectedYear;
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesYear && matchesSearch;
  });

  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return <CrownOutlined style={{ fontSize: "24px", color: "#fadb14" }} />;
      case 1:
        return <StarOutlined style={{ fontSize: "24px", color: "#8c8c8c" }} />;
      case 2:
        return <StarOutlined style={{ fontSize: "24px", color: "#d46b08" }} />;
      default:
        return (
          <TrophyOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
        );
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Innovation":
        return "blue";
      case "Leadership":
        return "purple";
      case "Environment":
        return "green";
      case "Education":
        return "orange";
      case "Healthcare":
        return "red";
      case "Arts":
        return "pink";
      case "Sports":
        return "gold";
      default:
        return "default";
    }
  };

  const handleAddUser = () => {
    const user = {
      id: Date.now(),
      ...newUser,
      yearInducted: new Date().getFullYear(),
      avatar: "/placeholder.svg?height=100&width=100",
    };
    setWallOfFameUsers([...wallOfFameUsers, user]);
    setIsAddUserOpen(false);
    setNewUser({
      name: "",
      title: "",
      category: "",
      location: "",
      bio: "",
      inductionReason: "",
      achievements: [""],
      specialties: [""],
      socialLinks: {
        linkedin: "",
        twitter: "",
        website: "",
      },
    });
    form.resetFields();
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    editForm.setFieldsValue({
      ...user,
      socialLinks: {
        linkedin: user.socialLinks.linkedin || "",
        twitter: user.socialLinks.twitter || "",
        website: user.socialLinks.website || "",
      },
    });
    setIsEditUserOpen(true);
  };

  const handleUpdateUser = () => {
    setWallOfFameUsers(
      wallOfFameUsers.map((user) =>
        user.id === editingUser.id ? editingUser : user
      )
    );
    setIsEditUserOpen(false);
    setEditingUser(null);
    editForm.resetFields();
  };

  const handleDeleteUser = (userId) => {
    setWallOfFameUsers(wallOfFameUsers.filter((user) => user.id !== userId));
  };

  const addAchievement = (setter, current) => {
    setter([...current, ""]);
  };

  const updateAchievement = (setter, current, index, value) => {
    const updated = [...current];
    updated[index] = value;
    setter(updated);
  };

  const removeAchievement = (setter, current, index) => {
    setter(current.filter((_, i) => i !== index));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #fff7e6, #fff1e6, #ffe6e6)",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              display: "inline-flex",
              background: "linear-gradient(to right, #fadb14, #fa8c16)",
              padding: "16px",
              borderRadius: "50%",
            }}
          >
            <TrophyOutlined style={{ fontSize: "48px", color: "#fff" }} />
          </div>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              background: "linear-gradient(to right, #d46b08, #fa8c16)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Wall of Fame
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#595959",
              maxWidth: "800px",
              margin: "16px auto",
            }}
          >
            Honoring exceptional individuals who have made outstanding
            contributions to our community and society.
          </p>
        </div>

        {/* Stats Overview */}
        <Row gutter={[16, 16]} style={{ marginBottom: "32px" }}>
          <Col xs={24} md={6}>
            <Card
              style={{
                background:
                  "linear-gradient(to bottom right, #fadb14, #faad14)",
              }}
            >
              <Statistic
                title={
                  <>
                    <TeamOutlined /> Total Inductees
                  </>
                }
                value={wallOfFameUsers.length}
                valueStyle={{ color: "#fff", fontSize: "32px" }}
                suffix={
                  <span
                    style={{ color: "#fff", opacity: 0.9, fontSize: "12px" }}
                  >
                    Distinguished members
                  </span>
                }
              />
            </Card>
          </Col>
          <Col xs={24} md={6}>
            <Card
              style={{
                background:
                  "linear-gradient(to bottom right, #1890ff, #40a9ff)",
              }}
            >
              <Statistic
                title={
                  <>
                    <CalendarOutlined /> This Year
                  </>
                }
                value={
                  wallOfFameUsers.filter(
                    (u) => u.yearInducted === new Date().getFullYear()
                  ).length
                }
                valueStyle={{ color: "#fff", fontSize: "32px" }}
                suffix={
                  <span
                    style={{ color: "#fff", opacity: 0.9, fontSize: "12px" }}
                  >
                    New inductees
                  </span>
                }
              />
            </Card>
          </Col>
          <Col xs={24} md={6}>
            <Card
              style={{
                background:
                  "linear-gradient(to bottom right, #52c41a, #73d13d)",
              }}
            >
              <Statistic
                title={
                  <>
                    <StarOutlined /> Categories
                  </>
                }
                value={categories.length - 1}
                valueStyle={{ color: "#fff", fontSize: "32px" }}
                suffix={
                  <span
                    style={{ color: "#fff", opacity: 0.9, fontSize: "12px" }}
                  >
                    Areas of excellence
                  </span>
                }
              />
            </Card>
          </Col>
          <Col xs={24} md={6}>
            <Card
              style={{
                background:
                  "linear-gradient(to bottom right, #722ed1, #9254de)",
              }}
            >
              <Statistic
                title={
                  <>
                    <StarOutlined /> Legacy
                  </>
                }
                value="∞"
                valueStyle={{ color: "#fff", fontSize: "32px" }}
                suffix={
                  <span
                    style={{ color: "#fff", opacity: 0.9, fontSize: "12px" }}
                  >
                    Lasting impact
                  </span>
                }
              />
            </Card>
          </Col>
        </Row>

        {/* Admin Controls */}
        <Card style={{ marginBottom: "24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>
                <TeamOutlined style={{ marginRight: "8px" }} /> Manage Hall of
                Fame
              </h3>
              <p style={{ color: "#595959" }}>
                Add, edit, and manage distinguished members
              </p>
            </div>
            <Modal
              title="Add New Hall of Fame Member"
              open={isAddUserOpen}
              onCancel={() => setIsAddUserOpen(false)}
              footer={null}
              width={1000}
            >
              <Form form={form} layout="vertical" onFinish={handleAddUser}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="name"
                      label="Full Name"
                      rules={[
                        { required: true, message: "Please enter full name" },
                      ]}
                    >
                      <Input
                        value={newUser.name}
                        onChange={(e) =>
                          setNewUser({ ...newUser, name: e.target.value })
                        }
                        placeholder="Enter full name"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="title"
                      label="Title/Position"
                      rules={[
                        { required: true, message: "Please enter title" },
                      ]}
                    >
                      <Input
                        value={newUser.title}
                        onChange={(e) =>
                          setNewUser({ ...newUser, title: e.target.value })
                        }
                        placeholder="e.g., Technology Pioneer, Community Leader"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="category"
                      label="Category"
                      rules={[
                        { required: true, message: "Please select category" },
                      ]}
                    >
                      <Select
                        value={newUser.category}
                        onChange={(value) =>
                          setNewUser({ ...newUser, category: value })
                        }
                        placeholder="Select category"
                      >
                        {categories.slice(1).map((category) => (
                          <Select.Option key={category} value={category}>
                            {category}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item name="location" label="Location">
                      <Input
                        value={newUser.location}
                        onChange={(e) =>
                          setNewUser({ ...newUser, location: e.target.value })
                        }
                        placeholder="City, State/Country"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item
                      name="bio"
                      label="Biography"
                      rules={[
                        { required: true, message: "Please enter biography" },
                      ]}
                    >
                      <Input.TextArea
                        value={newUser.bio}
                        onChange={(e) =>
                          setNewUser({ ...newUser, bio: e.target.value })
                        }
                        placeholder="Write a detailed biography..."
                        rows={4}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item
                      name="inductionReason"
                      label="Reason for Induction"
                      rules={[
                        {
                          required: true,
                          message: "Please enter reason for induction",
                        },
                      ]}
                    >
                      <Input.TextArea
                        value={newUser.inductionReason}
                        onChange={(e) =>
                          setNewUser({
                            ...newUser,
                            inductionReason: e.target.value,
                          })
                        }
                        placeholder="Explain why this person deserves to be in the Hall of Fame..."
                        rows={3}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item label="Key Achievements">
                      {newUser.achievements.map((achievement, index) => (
                        <Space
                          key={index}
                          style={{ display: "flex", marginBottom: 8 }}
                          align="baseline"
                        >
                          <Input
                            value={achievement}
                            onChange={(e) =>
                              updateAchievement(
                                (updated) =>
                                  setNewUser({
                                    ...newUser,
                                    achievements: updated,
                                  }),
                                newUser.achievements,
                                index,
                                e.target.value
                              )
                            }
                            placeholder="Enter achievement"
                          />
                          {newUser.achievements.length > 1 && (
                            <Button
                              type="text"
                              icon={<DeleteOutlined />}
                              onClick={() =>
                                removeAchievement(
                                  (updated) =>
                                    setNewUser({
                                      ...newUser,
                                      achievements: updated,
                                    }),
                                  newUser.achievements,
                                  index
                                )
                              }
                            />
                          )}
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() =>
                          addAchievement(
                            (updated) =>
                              setNewUser({ ...newUser, achievements: updated }),
                            newUser.achievements
                          )
                        }
                        icon={<PlusOutlined />}
                        style={{ marginTop: "8px" }}
                      >
                        Add Achievement
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item label="Specialties">
                      {newUser.specialties.map((specialty, index) => (
                        <Space
                          key={index}
                          style={{ display: "flex", marginBottom: 8 }}
                          align="baseline"
                        >
                          <Input
                            value={specialty}
                            onChange={(e) =>
                              updateAchievement(
                                (updated) =>
                                  setNewUser({
                                    ...newUser,
                                    specialties: updated,
                                  }),
                                newUser.specialties,
                                index,
                                e.target.value
                              )
                            }
                            placeholder="Enter specialty"
                          />
                          {newUser.specialties.length > 1 && (
                            <Button
                              type="text"
                              icon={<DeleteOutlined />}
                              onClick={() =>
                                removeAchievement(
                                  (updated) =>
                                    setNewUser({
                                      ...newUser,
                                      specialties: updated,
                                    }),
                                  newUser.specialties,
                                  index
                                )
                              }
                            />
                          )}
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() =>
                          addAchievement(
                            (updated) =>
                              setNewUser({ ...newUser, specialties: updated }),
                            newUser.specialties
                          )
                        }
                        icon={<PlusOutlined />}
                        style={{ marginTop: "8px" }}
                      >
                        Add Specialty
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name={["socialLinks", "linkedin"]}
                      label="LinkedIn URL"
                    >
                      <Input
                        value={newUser.socialLinks.linkedin}
                        onChange={(e) =>
                          setNewUser({
                            ...newUser,
                            socialLinks: {
                              ...newUser.socialLinks,
                              linkedin: e.target.value,
                            },
                          })
                        }
                        placeholder="https://linkedin.com/in/..."
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name={["socialLinks", "twitter"]}
                      label="Twitter URL"
                    >
                      <Input
                        value={newUser.socialLinks.twitter}
                        onChange={(e) =>
                          setNewUser({
                            ...newUser,
                            socialLinks: {
                              ...newUser.socialLinks,
                              twitter: e.target.value,
                            },
                          })
                        }
                        placeholder="https://twitter.com/..."
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name={["socialLinks", "website"]}
                      label="Website URL"
                    >
                      <Input
                        value={newUser.socialLinks.website}
                        onChange={(e) =>
                          setNewUser({
                            ...newUser,
                            socialLinks: {
                              ...newUser.socialLinks,
                              website: e.target.value,
                            },
                          })
                        }
                        placeholder="https://..."
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      Add to Hall of Fame
                    </Button>
                    <Button onClick={() => setIsAddUserOpen(false)}>
                      Cancel
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Modal>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsAddUserOpen(true)}
            >
              Add New Member
            </Button>
          </div>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Input
                prefix={<SearchOutlined />}
                placeholder="Search by name or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col xs={24} md={8}>
              <Select
                value={selectedCategory}
                onChange={setSelectedCategory}
                style={{ width: "100%" }}
              >
                {categories.map((category) => (
                  <Select.Option key={category} value={category}>
                    {category}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} md={8}>
              <Select
                value={selectedYear}
                onChange={setSelectedYear}
                style={{ width: "100%" }}
              >
                {years.map((year) => (
                  <Select.Option key={year} value={year}>
                    {year}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
        </Card>

        {/* Wall of Fame Grid */}
        <Row gutter={[16, 16]}>
          {filteredUsers.map((user, index) => (
            <Col xs={24} md={12} lg={8} key={user.id}>
              <Card
                hoverable
                style={{
                  background:
                    "linear-gradient(to bottom right, #ffffff, #f5f5f5)",
                }}
                cover={
                  <div style={{ textAlign: "center", padding: "24px" }}>
                    <Badge count={getRankIcon(index)} offset={[-10, 10]}>
                      <Avatar
                        size={96}
                        src={user.avatar}
                        style={{
                          border: "4px solid #fff",
                          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        }}
                      >
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Avatar>
                    </Badge>
                    <h3
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        margin: "12px 0 8px",
                      }}
                    >
                      {user.name}
                    </h3>
                    <p style={{ color: "#595959", marginBottom: "8px" }}>
                      {user.title}
                    </p>
                    <Tag color={getCategoryColor(user.category)}>
                      {user.category}
                    </Tag>
                  </div>
                }
              >
                <div style={{ textAlign: "center", marginBottom: "16px" }}>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      color: "#1890ff",
                    }}
                  >
                    Inducted {user.yearInducted}
                  </div>
                  <div style={{ color: "#595959" }}>Hall of Fame Member</div>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "16px",
                    color: "#595959",
                    fontSize: "14px",
                  }}
                >
                  <EnvironmentOutlined /> {user.location}
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <Space wrap>
                    {user.specialties.slice(0, 2).map((specialty) => (
                      <Tag key={specialty} color="blue">
                        {specialty}
                      </Tag>
                    ))}
                    {user.specialties.length > 2 && (
                      <Tag color="blue">
                        +{user.specialties.length - 2} more
                      </Tag>
                    )}
                  </Space>
                </div>
                <Space>
                  <Button type="primary" onClick={() => setSelectedUser(user)}>
                    View Profile
                  </Button>
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => handleEditUser(user)}
                  />
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteUser(user.id)}
                  />
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        {filteredUsers.length === 0 && (
          <Card style={{ textAlign: "center", padding: "48px" }}>
            <TrophyOutlined
              style={{
                fontSize: "64px",
                color: "#d9d9d9",
                marginBottom: "16px",
              }}
            />
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              No members found
            </h3>
            <p style={{ color: "#595959", marginBottom: "16px" }}>
              {searchTerm ||
              selectedCategory !== "All" ||
              selectedYear !== "All Years"
                ? "Try adjusting your search criteria"
                : "Start building your Hall of Fame by adding distinguished members"}
            </p>
            {!searchTerm &&
              selectedCategory === "All" &&
              selectedYear === "All Years" && (
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setIsAddUserOpen(true)}
                >
                  Add First Member
                </Button>
              )}
          </Card>
        )}

        {/* User Detail Modal */}
        {selectedUser && (
          <Modal
            open={!!selectedUser}
            onCancel={() => setSelectedUser(null)}
            footer={null}
            width={1000}
            style={{ top: 20 }}
          >
            <div
              style={{
                background: "linear-gradient(to right, #fadb14, #fa8c16)",
                padding: "24px",
                borderRadius: "8px 8px 0 0",
                color: "#fff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                  <Badge
                    count={
                      <TrophyOutlined
                        style={{
                          fontSize: "24px",
                          color: "#fadb14",
                          background: "#fff",
                          padding: "8px",
                          borderRadius: "50%",
                        }}
                      />
                    }
                    offset={[-10, 10]}
                  >
                    <Avatar
                      size={80}
                      src={selectedUser.avatar}
                      style={{
                        border: "4px solid #fff",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      }}
                    >
                      {selectedUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Avatar>
                  </Badge>
                  <div>
                    <h2 style={{ fontSize: "28px", fontWeight: "bold" }}>
                      {selectedUser.name}
                    </h2>
                    <p style={{ fontSize: "20px", opacity: 0.9 }}>
                      {selectedUser.title}
                    </p>
                    <Tag
                      color="white"
                      style={{ color: "#d46b08", marginTop: "8px" }}
                    >
                      {selectedUser.category} • Inducted{" "}
                      {selectedUser.yearInducted}
                    </Tag>
                  </div>
                </div>
                <Button
                  type="text"
                  onClick={() => setSelectedUser(null)}
                  style={{ color: "#fff" }}
                >
                  ✕
                </Button>
              </div>
            </div>
            <div style={{ padding: "24px" }}>
              <Tabs defaultActiveKey="overview">
                <Tabs.TabPane tab="Overview" key="overview">
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                      <Card title="Biography">
                        <p style={{ color: "#595959", marginBottom: "16px" }}>
                          {selectedUser.bio}
                        </p>
                        <Space direction="vertical">
                          <span>
                            <EnvironmentOutlined
                              style={{ marginRight: "8px" }}
                            />
                            {selectedUser.location}
                          </span>
                          <span>
                            <CalendarOutlined style={{ marginRight: "8px" }} />
                            Inducted {selectedUser.yearInducted}
                          </span>
                        </Space>
                      </Card>
                    </Col>
                    <Col xs={24} md={12}>
                      <Card title="Specialties">
                        <Space wrap>
                          {selectedUser.specialties.map((specialty) => (
                            <Tag key={specialty} color="blue">
                              {specialty}
                            </Tag>
                          ))}
                        </Space>
                      </Card>
                    </Col>
                    {selectedUser.socialLinks && (
                      <Col xs={24}>
                        <Card title="Connect">
                          <Space>
                            {selectedUser.socialLinks.linkedin && (
                              <Button
                                href={selectedUser.socialLinks.linkedin}
                                target="_blank"
                              >
                                LinkedIn
                              </Button>
                            )}
                            {selectedUser.socialLinks.twitter && (
                              <Button
                                href={selectedUser.socialLinks.twitter}
                                target="_blank"
                              >
                                Twitter
                              </Button>
                            )}
                            {selectedUser.socialLinks.website && (
                              <Button
                                href={selectedUser.socialLinks.website}
                                target="_blank"
                              >
                                Website
                              </Button>
                            )}
                          </Space>
                        </Card>
                      </Col>
                    )}
                  </Row>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Achievements" key="achievements">
                  <List
                    dataSource={selectedUser.achievements}
                    renderItem={(achievement, index) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <StarOutlined
                              style={{ fontSize: "24px", color: "#fa8c16" }}
                            />
                          }
                          title={achievement}
                          description="Key achievement"
                        />
                      </List.Item>
                    )}
                  />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Induction" key="induction">
                  <Card title="Reason for Induction">
                    <p style={{ color: "#595959" }}>
                      {selectedUser.inductionReason}
                    </p>
                  </Card>
                </Tabs.TabPane>
              </Tabs>
            </div>
          </Modal>
        )}

        {/* Edit User Modal */}
        <Modal
          title={`Edit Hall of Fame Member - ${editingUser?.name}`}
          open={isEditUserOpen}
          onCancel={() => setIsEditUserOpen(false)}
          footer={null}
          width={1000}
        >
          <Form form={editForm} layout="vertical" onFinish={handleUpdateUser}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[
                    { required: true, message: "Please enter full name" },
                  ]}
                >
                  <Input
                    value={editingUser?.name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="title"
                  label="Title/Position"
                  rules={[{ required: true, message: "Please enter title" }]}
                >
                  <Input
                    value={editingUser?.title}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, title: e.target.value })
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="category"
                  label="Category"
                  rules={[
                    { required: true, message: "Please select category" },
                  ]}
                >
                  <Select
                    value={editingUser?.category}
                    onChange={(value) =>
                      setEditingUser({ ...editingUser, category: value })
                    }
                  >
                    {categories.slice(1).map((category) => (
                      <Select.Option key={category} value={category}>
                        {category}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="location" label="Location">
                  <Input
                    value={editingUser?.location}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        location: e.target.value,
                      })
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name="bio"
                  label="Biography"
                  rules={[
                    { required: true, message: "Please enter biography" },
                  ]}
                >
                  <Input.TextArea
                    value={editingUser?.bio}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, bio: e.target.value })
                    }
                    rows={4}
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name="inductionReason"
                  label="Reason for Induction"
                  rules={[
                    {
                      required: true,
                      message: "Please enter reason for induction",
                    },
                  ]}
                >
                  <Input.TextArea
                    value={editingUser?.inductionReason}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        inductionReason: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Update Member
                </Button>
                <Button onClick={() => setIsEditUserOpen(false)}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default WallOfFameComponent;
