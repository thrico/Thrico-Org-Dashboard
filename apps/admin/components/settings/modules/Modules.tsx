"use client";

import React from "react";

import { useState } from "react";
import {
  Table,
  Switch,
  Tag,
  Input,
  Button,
  Tabs,
  Tooltip,
  Alert,
  Card,
  Space,
  Badge,
  Spin,
  notification,
  Avatar,
} from "antd";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import {
  SearchOutlined,
  CheckOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { TableProps } from "antd";
import {
  checkEntitySubscription,
  InputUpdateEntityModule,
} from "../../../graphql/actions";
import { gql, useMutation } from "@apollo/client";
import MobileNavigation from "./MobileNavigation";

// TypeScript types for mutation

interface UpdateEntityModuleResponse {
  updateEntityModule: {
    success: boolean;
  };
}

const UPDATE_ENTITY_MODULE = gql`
  mutation UpdateEntityModule($input: [inputUpdateEntityModule]) {
    updateEntityModule(input: $input) {
      success
    }
  }
`;
import * as LucideIcons from "lucide-react";
// Sample data for modules
const moduleData = [
  {
    id: "1",
    name: "Directory",
    enabled: true,
    required: true,
    category: "Core",
    showInMobileNavigation: true,
    showInWebNavigation: true,
    icon: null,
    isPopular: false,
  },
  {
    id: "2",
    name: "Communities",
    enabled: true,
    required: false,
    category: "Social",
    showInMobileNavigation: true,
    showInWebNavigation: true,
    icon: null,
    isPopular: true,
  },
  // ... (add the rest of your static moduleData items here as previously defined)
];
interface ModuleItem {
  id: string;
  name: string;
  icon: string | null;
  enabled: boolean;
  required?: boolean;
  showInMobileNavigation: boolean;
  showInWebNavigation: boolean;
  isPopular: boolean;
  showInMobileNavigationSortNumber?: number;
}

// Get icon for navigation item
const getNavIcon = (icon: string | null) => {
  if (!icon || typeof icon !== "string" || !(icon in LucideIcons)) {
    const Puzzle = LucideIcons["Puzzle"] as React.ElementType;
    return <Puzzle className="h-2 w-2 text-primary" />;
  }
  const IconComponent = (LucideIcons as any)[icon] as React.ElementType;
  return <IconComponent className="h-2 w-2 text-primary" />;
};

export default function ModuleManagement() {
  // Apollo mutation hook
  const [updateEntityModule, { loading: updateLoading }] = useMutation<
    UpdateEntityModuleResponse,
    { input: InputUpdateEntityModule[] }
  >(UPDATE_ENTITY_MODULE);
  // Notification for save
  const openNotification = (
    type: "success" | "error",
    message: string,
    description?: string
  ) => {
    notification[type]({
      message,
      description,
      placement: "topRight",
    });
  };
  // Use subscription.modules if available, otherwise fallback to moduleData
  const { data, loading, error } = checkEntitySubscription();
  const subscription = data?.checkEntitySubscription;
  console.log("Entity Subscription:", subscription);
  const [modules, setModules] = useState<ModuleItem[]>(moduleData);
  const [modulesInitialized, setModulesInitialized] = useState(false);
  const [saving, setSaving] = useState(false);

  // Only set modules from subscription once
  React.useEffect(() => {
    if (
      !modulesInitialized &&
      subscription &&
      Array.isArray(subscription.modules)
    ) {
      setModules(
        subscription.modules.map((m: any) => ({
          id: m.id,
          name: m.name,
          enabled: m.enabled ?? true,
          required: m.required ?? false,
          showInMobileNavigation: m.showInMobileNavigation ?? false,
          showInWebNavigation: m.showInWebNavigation ?? false,
          icon: m.icon ?? null,
          showInMobileNavigationSortNumber:
            typeof m.showInMobileNavigationSortNumber === "number"
              ? m.showInMobileNavigationSortNumber
              : undefined,
          isPopular: m.isPopular ?? false,
        }))
      );
      setModulesInitialized(true);
    }
  }, [subscription, modulesInitialized]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [userRole, setUserRole] = useState("admin"); // "admin" or "directory"
  const [activeTab, setActiveTab] = useState("1");

  // Call checkEntitySubscription hook

  // Filter modules based on search term and category

  // Toggle module enabled status
  const toggleModule = (id: string) => {
    if (userRole === "directory") {
      // Directory users cannot disable modules
      return;
    }
    setModules((prevModules) => {
      return prevModules.map((module) => {
        if (module.id === id && !module.required) {
          // If disabling, also remove from mobile navigation
          if (module.enabled) {
            return { ...module, enabled: false, showInMobileNavigation: false };
          } else {
            return { ...module, enabled: true };
          }
        }
        return module;
      });
    });
  };

  // Toggle module in mobile navigation
  const toggleNavigation = (id: string) => {
    if (userRole === "directory") {
      // Directory users cannot modify navigation
      return;
    }
    setModules((prevModules) => {
      const currentNavigationCount = prevModules.filter(
        (m) => m.showInMobileNavigation
      ).length;
      return prevModules.map((module) => {
        if (module.id === id) {
          // If already in navigation, remove it
          if (module.showInMobileNavigation) {
            return { ...module, showInMobileNavigation: false };
          }
          // If not in navigation and less than 3 modules are selected, add it
          if (currentNavigationCount < 3) {
            return { ...module, showInMobileNavigation: true };
          }
          // Otherwise, don't change (max 3 reached)
          return module;
        }
        return module;
      });
    });
  };

  // Save changes
  const saveChanges = async () => {
    setSaving(true);
    const input: InputUpdateEntityModule[] = modules.map((m, idx) => {
      return {
        icon: m.icon ?? null,
        id: m.id ?? null,
        name: m.name ?? null,
        isEnabled: m.enabled ?? null,
        showInMobileNavigation: m.showInMobileNavigation ?? null,
        showInMobileNavigationSortNumber: m.showInMobileNavigation
          ? idx
          : undefined,
        showInWebNavigation: m.showInWebNavigation ?? null,
        isPopular: m.isPopular ?? null,
      };
    });
    try {
      const response = await updateEntityModule({ variables: { input } });
      if (response.data?.updateEntityModule.success) {
        openNotification("success", "Changes saved successfully!");
      } else {
        openNotification("error", "Save failed", "Mutation did not succeed");
      }
    } catch (err: any) {
      openNotification(
        "error",
        "Save failed",
        err?.message || "An error occurred"
      );
    } finally {
      setSaving(false);
    }
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
          {getNavIcon(record.icon)}
          <Tag
            color={record.isPopular ? "gold" : "default"}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setModules((prev) =>
                prev.map((m) =>
                  m.id === record.id ? { ...m, isPopular: !m.isPopular } : m
                )
              );
            }}
          >
            {record.isPopular ? "Popular" : "Mark Popular"}
          </Tag>
          {name}
        </Space>
      ),
    },

    {
      title: "Mobile Navigation",
      dataIndex: "showInMobileNavigation",
      key: "showInMobileNavigation",
      width: 120,
      render: (showInMobileNavigation, record) => (
        <Tooltip
          title={
            !record.enabled
              ? "Enable this module first to add to navigation"
              : userRole === "directory"
                ? "Directory users cannot change navigation settings"
                : showInMobileNavigation
                  ? "Remove from mobile navigation"
                  : modules.filter((m) => m.showInMobileNavigation).length >= 3
                    ? "Maximum of 3 modules in navigation (remove one first)"
                    : "Add to mobile navigation"
          }
        >
          <Switch
            checked={showInMobileNavigation}
            onChange={() => toggleNavigation(record.id)}
            disabled={
              userRole === "directory" ||
              !record.enabled ||
              (!showInMobileNavigation &&
                modules.filter((m) => m.showInMobileNavigation).length >= 3)
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
        <div style={{ fontSize: "20px" }}>{getNavIcon(record.icon)}</div>
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

  // Get modules for navigation table, sorted by showInMobileNavigationSortNumber
  const navigationModules = modules
    .filter((m) => m.showInMobileNavigation)
    .sort(
      (a, b) =>
        (a.showInMobileNavigationSortNumber ?? 0) -
        (b.showInMobileNavigationSortNumber ?? 0)
    );

  // Drag-and-drop handler for navigation table
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const navModules = Array.from(navigationModules);
    const [removed] = navModules.splice(result.source.index, 1);
    if (removed) {
      navModules.splice(result.destination.index, 0, removed);
    }
    setModules((prev) => {
      const updated = prev.map((m) => {
        const idx = navModules.findIndex((nm) => nm.id === m.id);
        if (idx !== -1) {
          return { ...m, showInMobileNavigationSortNumber: idx };
        }
        return m;
      });
      return updated;
    });
  };

  if (loading) {
    return (
      <Spin tip="Loading modules..." style={{ width: "100%", marginTop: 40 }} />
    );
  }
  if (error) {
    return (
      <Alert
        type="error"
        message="Failed to load modules"
        description={error.message}
        showIcon
        style={{ marginTop: 40 }}
      />
    );
  }
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
                {/* Search input for modules */}
                <div
                  style={{
                    marginBottom: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Input
                    placeholder="Search modules..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    prefix={<SearchOutlined />}
                    allowClear
                    style={{ maxWidth: 300 }}
                  />
                </div>
                <Card
                  extra={
                    <Button
                      type="primary"
                      onClick={saveChanges}
                      disabled={userRole === "directory"}
                      loading={saving}
                    >
                      Save Changes
                    </Button>
                  }
                >
                  <Table
                    columns={moduleColumns}
                    dataSource={modules}
                    rowKey="id"
                    size="middle"
                    style={{ marginTop: "16px" }}
                    locale={{
                      emptyText: (
                        <div style={{ textAlign: "center", padding: "32px 0" }}>
                          <span
                            role="img"
                            aria-label="no data"
                            style={{ fontSize: 32 }}
                          >
                            😕
                          </span>
                          <div style={{ marginTop: 8 }}>No modules found</div>
                        </div>
                      ),
                    }}
                    rowClassName={() => "module-row-hover"}
                    pagination={false}
                  />
                </Card>
              </>
            ),
          },
          {
            key: "2",
            label: "Mobile Navigation",
            children: (
              <MobileNavigation
                modules={modules}
                navigationColumns={navigationColumns}
                navigationModules={navigationModules}
                userRole={userRole}
                saving={saving}
                saveChanges={saveChanges}
                onDragEnd={onDragEnd}
                toggleNavigation={toggleNavigation}
              />
            ),
          },
        ]}
      />
      <style>{`
        .module-row-hover:hover {
          background: #f5faff !important;
          transition: background 0.2s;
        }
      `}</style>
    </Card>
  );
}
