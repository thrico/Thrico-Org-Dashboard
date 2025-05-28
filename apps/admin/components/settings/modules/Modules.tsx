"use client";

import React from "react";

import { useState } from "react";
import {
  Table,
  Switch,
  Tag,
  Input,
  Select,
  Button,
  Tabs,
  Tooltip,
  Alert,
  Card,
  Space,
  Badge,
} from "antd";
import {
  SearchOutlined,
  CheckOutlined,
  HomeOutlined,
  UserOutlined,
  CalendarOutlined,
  TeamOutlined,
  AppstoreOutlined,
  BankOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import type { TableProps } from "antd";

// Sample data for modules
const moduleData = [
  {
    id: 1,
    name: "Directory",
    enabled: true,
    required: true,
    category: "Core",
    showInNavigation: true,
  },
  {
    id: 2,
    name: "Communities",
    enabled: true,
    required: false,
    category: "Social",
    showInNavigation: true,
  },
  {
    id: 3,
    name: "Events",
    enabled: true,
    required: false,
    category: "Social",
    showInNavigation: true,
  },
  {
    id: 4,
    name: "Jobs",
    enabled: true,
    required: false,
    category: "Career",
    showInNavigation: false,
  },
  {
    id: 5,
    name: "Marketplace",
    enabled: true,
    required: false,
    category: "Commerce",
    showInNavigation: false,
  },
  {
    id: 6,
    name: "Mentorship",
    enabled: true,
    required: false,
    category: "Career",
    showInNavigation: false,
  },
  {
    id: 7,
    name: "Stories",
    enabled: true,
    required: false,
    category: "Social",
    showInNavigation: false,
  },
  {
    id: 8,
    name: "Giving",
    enabled: false,
    required: false,
    category: "Community",
    showInNavigation: false,
  },
  {
    id: 9,
    name: "Projects",
    enabled: true,
    required: false,
    category: "Collaboration",
    showInNavigation: false,
  },
  {
    id: 10,
    name: "Wall of Fame",
    enabled: false,
    required: false,
    category: "Recognition",
    showInNavigation: false,
  },
  {
    id: 11,
    name: "Shop",
    enabled: false,
    required: false,
    category: "Commerce",
    showInNavigation: false,
  },
  {
    id: 12,
    name: "Unlock Rewards",
    enabled: true,
    required: false,
    category: "Engagement",
    showInNavigation: false,
  },
  {
    id: 13,
    name: "Offers",
    enabled: false,
    required: false,
    category: "Commerce",
    showInNavigation: false,
  },
  {
    id: 14,
    name: "Nearby",
    enabled: false,
    required: false,
    category: "Location",
    showInNavigation: false,
  },
  {
    id: 15,
    name: "New To City",
    enabled: false,
    required: false,
    category: "Location",
    showInNavigation: false,
  },
  {
    id: 16,
    name: "Memories",
    enabled: false,
    required: false,
    category: "Social",
    showInNavigation: false,
  },
  {
    id: 17,
    name: "Birthdays",
    enabled: true,
    required: false,
    category: "Social",
    showInNavigation: false,
  },
  {
    id: 18,
    name: "Anniversaries",
    enabled: false,
    required: false,
    category: "Social",
    showInNavigation: false,
  },
  {
    id: 19,
    name: "Recommendations",
    enabled: true,
    required: false,
    category: "Discovery",
    showInNavigation: false,
  },
  {
    id: 20,
    name: "Invite",
    enabled: true,
    required: false,
    category: "Growth",
    showInNavigation: false,
  },
  {
    id: 21,
    name: "Refer",
    enabled: false,
    required: false,
    category: "Growth",
    showInNavigation: false,
  },
  {
    id: 22,
    name: "Career Centre",
    enabled: true,
    required: false,
    category: "Career",
    showInNavigation: false,
  },
  {
    id: 23,
    name: "Entrepreneurship",
    enabled: false,
    required: false,
    category: "Career",
    showInNavigation: false,
  },
  {
    id: 24,
    name: "Polls",
    enabled: false,
    required: false,
    category: "Engagement",
    showInNavigation: false,
  },
  {
    id: 25,
    name: "Surveys",
    enabled: false,
    required: false,
    category: "Engagement",
    showInNavigation: false,
  },
  {
    id: 26,
    name: "Feedback",
    enabled: true,
    required: false,
    category: "Support",
    showInNavigation: false,
  },
  {
    id: 27,
    name: "FAQ",
    enabled: true,
    required: false,
    category: "Support",
    showInNavigation: false,
  },
  {
    id: 28,
    name: "Newsletter",
    enabled: true,
    required: false,
    category: "Communication",
    showInNavigation: false,
  },
];

// Get unique categories
const categories = [
  "All",
  ...new Set(moduleData.map((module) => module.category)),
].sort();

// Interface for module data
interface ModuleItem {
  id: number;
  name: string;
  enabled: boolean;
  required: boolean;
  category: string;
  showInNavigation: boolean;
}

// Get icon for navigation item
const getNavIcon = (name: string) => {
  switch (name) {
    case "Directory":
      return <TeamOutlined />;
    case "Communities":
      return <TeamOutlined />;
    case "Events":
      return <CalendarOutlined />;
    case "Marketplace":
      return <ShopOutlined />;
    case "Jobs":
      return <BankOutlined />;
    default:
      return <AppstoreOutlined />;
  }
};

export default function ModuleManagement() {
  const [modules, setModules] = useState<ModuleItem[]>(moduleData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [userRole, setUserRole] = useState("admin"); // "admin" or "directory"
  const [activeTab, setActiveTab] = useState("1");

  // Filter modules based on search term and category
  const filteredModules = modules.filter((module) => {
    const matchesSearch = module.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || module.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Toggle module enabled status
  const toggleModule = (id: number) => {
    if (userRole === "directory") {
      // Directory users cannot disable modules
      return;
    }

    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === id && !module.required
          ? { ...module, enabled: !module.enabled }
          : module
      )
    );
  };

  // Toggle module in mobile navigation
  const toggleNavigation = (id: number) => {
    if (userRole === "directory") {
      // Directory users cannot modify navigation
      return;
    }

    // Count current modules in navigation
    const currentNavigationCount = modules.filter(
      (m) => m.showInNavigation
    ).length;

    setModules((prevModules) =>
      prevModules.map((module) => {
        if (module.id === id) {
          // If already in navigation, remove it
          if (module.showInNavigation) {
            return { ...module, showInNavigation: false };
          }
          // If not in navigation and less than 3 modules are selected, add it
          else if (currentNavigationCount < 3) {
            return { ...module, showInNavigation: true };
          }
          // Otherwise, don't change (max 3 reached)
          return module;
        }
        return module;
      })
    );
  };

  // Save changes
  const saveChanges = () => {
    // In a real app, this would send the updated modules to an API
    console.log("Saving changes:", modules);
    // Show success message
    alert("Changes saved successfully!");
  };

  // Module Management Table Columns
  const moduleColumns: TableProps<ModuleItem>["columns"] = [
    {
      title: "Status",
      dataIndex: "enabled",
      key: "enabled",
      width: 100,
      render: (enabled, record) => (
        <Tooltip
          title={
            record.required
              ? "This module is required and cannot be disabled"
              : userRole === "directory"
                ? "Directory users cannot change module settings"
                : enabled
                  ? "Click to disable"
                  : "Click to enable"
          }
        >
          <Switch
            checked={enabled}
            onChange={() => toggleModule(record.id)}
            disabled={userRole === "directory" || record.required}
            size="small"
          />
        </Tooltip>
      ),
    },
    {
      title: "Module",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <Space>
          {name}
          {record.required && <Tag color="blue">Required</Tag>}
        </Space>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => <Tag color="default">{category}</Tag>,
    },
    {
      title: "Mobile Navigation",
      dataIndex: "showInNavigation",
      key: "showInNavigation",
      width: 120,
      render: (showInNavigation, record) => (
        <Tooltip
          title={
            !record.enabled
              ? "Enable this module first to add to navigation"
              : userRole === "directory"
                ? "Directory users cannot change navigation settings"
                : showInNavigation
                  ? "Remove from mobile navigation"
                  : modules.filter((m) => m.showInNavigation).length >= 3
                    ? "Maximum of 3 modules in navigation (remove one first)"
                    : "Add to mobile navigation"
          }
        >
          <Switch
            checked={showInNavigation}
            onChange={() => toggleNavigation(record.id)}
            disabled={
              userRole === "directory" ||
              !record.enabled ||
              (!showInNavigation &&
                modules.filter((m) => m.showInNavigation).length >= 3)
            }
            size="small"
            checkedChildren={<CheckOutlined />}
          />
        </Tooltip>
      ),
    },
  ];

  // Navigation Table Columns
  const navigationColumns: TableProps<ModuleItem>["columns"] = [
    {
      title: "Position",
      key: "position",
      width: 100,
      render: (_, record, index) => (
        <Badge count={index + 1} style={{ backgroundColor: "#1890ff" }} />
      ),
    },
    {
      title: "Module",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Icon",
      key: "icon",
      width: 100,
      render: (_, record) => (
        <div style={{ fontSize: "20px" }}>{getNavIcon(record.name)}</div>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      render: (_, record) => (
        <Button
          type="text"
          danger
          onClick={() => toggleNavigation(record.id)}
          disabled={userRole === "directory"}
        >
          Remove
        </Button>
      ),
    },
  ];

  // Get modules for navigation table
  const navigationModules = modules.filter((m) => m.showInNavigation);

  return (
    <Card>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: "1",
            label: "Module Management",
            children: (
              <>
                <Card
                  extra={
                    <Button
                      type="primary"
                      onClick={saveChanges}
                      disabled={userRole === "directory"}
                    >
                      Save Changes
                    </Button>
                  }
                >
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Input
                      placeholder="Search modules..."
                      prefix={<SearchOutlined />}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ maxWidth: 300 }}
                    />
                    <Select
                      placeholder="Category"
                      value={selectedCategory}
                      onChange={setSelectedCategory}
                      style={{ width: 180 }}
                      options={categories.map((category) => ({
                        value: category,
                        label: category,
                      }))}
                    />
                  </div>

                  <Table
                    columns={moduleColumns}
                    dataSource={filteredModules}
                    rowKey="id"
                    size="middle"
                    style={{ marginTop: "16px" }}
                  />
                </Card>
              </>
            ),
          },
          {
            key: "2",
            label: "Mobile Navigation",
            children: (
              <>
                <Alert
                  message="Mobile Navigation Configuration"
                  description={
                    <div>
                      <p>
                        Home and Profile are fixed navigation items. You can
                        select up to 3 additional modules to show in the
                        navigation.
                      </p>
                      <p style={{ marginTop: "8px", fontWeight: 500 }}>
                        {3 - modules.filter((m) => m.showInNavigation).length}{" "}
                        slot(s) remaining.
                      </p>
                    </div>
                  }
                  type="info"
                  showIcon
                  style={{ marginBottom: "16px" }}
                />

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "24px",
                  }}
                >
                  <div>
                    <Card
                      title=" Navigation Items"
                      style={{ marginBottom: "16px" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "16px",
                        }}
                      ></div>

                      <div
                        style={{
                          border: "1px solid #f0f0f0",
                          borderTopLeftRadius: "8px",
                          borderTopRightRadius: "8px",
                          padding: "16px",
                          width: "400px",
                          backgroundColor: "#f5f5f5",
                        }}
                      >
                        <div
                          style={{
                            height: "160px",
                            backgroundColor: "white",
                            borderRadius: "4px",
                            border: "1px solid #f0f0f0",
                          }}
                        ></div>
                        <div
                          style={{
                            marginTop: "16px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: "white",
                            padding: "8px",
                            borderRadius: "8px",
                            border: "1px solid #f0f0f0",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              padding: "0 8px",
                            }}
                          >
                            <HomeOutlined
                              style={{ fontSize: 24, color: "#1890ff" }}
                            />
                            <span
                              style={{ marginTop: "4px", fontSize: "12px" }}
                            >
                              Home
                            </span>
                          </div>

                          {navigationModules.map((module) => (
                            <div
                              key={module.id}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: "0 8px",
                              }}
                            >
                              {React.cloneElement(getNavIcon(module.name), {
                                style: { fontSize: 24 },
                              })}
                              <span
                                style={{ marginTop: "4px", fontSize: "12px" }}
                              >
                                {module.name}
                              </span>
                            </div>
                          ))}

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              padding: "0 8px",
                            }}
                          >
                            <UserOutlined style={{ fontSize: 24 }} />
                            <span
                              style={{ marginTop: "4px", fontSize: "12px" }}
                            >
                              Profile
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card title="Customizable Navigation Items">
                      <Table
                        columns={navigationColumns}
                        dataSource={navigationModules}
                        rowKey="id"
                        pagination={false}
                        size="small"
                        locale={{
                          emptyText: "No modules selected for navigation",
                        }}
                      />
                    </Card>
                  </div>

                  <Card title="Mobile Navigation Preview"></Card>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "16px",
                  }}
                >
                  <Button
                    type="primary"
                    onClick={saveChanges}
                    disabled={userRole === "directory"}
                  >
                    Save Changes
                  </Button>
                </div>
              </>
            ),
          },
        ]}
      />
    </Card>
  );
}
