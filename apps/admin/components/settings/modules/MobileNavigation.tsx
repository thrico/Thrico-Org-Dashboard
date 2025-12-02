import React from "react";
import { Card, Alert, Badge, Avatar, Button } from "antd";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import {
  HomeOutlined,
  UserOutlined,
  MenuOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import * as LucideIcons from "lucide-react";

export interface ModuleItem {
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

interface MobileNavigationProps {
  modules: ModuleItem[];
  navigationColumns: any[];
  navigationModules: ModuleItem[];
  userRole: string;
  saving: boolean;
  saveChanges: () => void;
  onDragEnd: (result: DropResult) => void;
  toggleNavigation: (id: string) => void;
}

const getNavIcon = (icon: string | null) => {
  if (!icon || typeof icon !== "string" || !(icon in LucideIcons)) {
    const Puzzle = LucideIcons["Puzzle"] as React.ElementType;
    return <Puzzle className="h-2 w-2 text-primary" />;
  }
  const IconComponent = (LucideIcons as any)[icon] as React.ElementType;
  return <IconComponent className="h-2 w-2 text-primary" />;
};

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  modules,
  navigationColumns,
  navigationModules,
  userRole,
  saving,
  saveChanges,
  onDragEnd,
  toggleNavigation,
}) => {
  return (
    <>
      <Alert
        message="Mobile Navigation Configuration"
        description={
          <div>
            <p>
              Home and Profile are fixed navigation items. You can select up to
              3 additional modules to show in the navigation.
            </p>
            <p style={{ marginTop: "8px", fontWeight: 500 }}>
              {3 - modules.filter((m) => m.showInMobileNavigation).length}{" "}
              slot(s) remaining.
            </p>
          </div>
        }
        type="info"
        showIcon
        style={{ marginBottom: "16px" }}
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
        <div>
          <Card title=" Navigation Items" style={{ marginBottom: "16px" }}>
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
                  <Badge size="small" count={"Default"} color="default">
                    <HomeOutlined style={{ fontSize: 32, color: "#1890ff" }} />
                  </Badge>
                  <span style={{ marginTop: "4px", fontSize: "14px" }}>
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
                    {React.cloneElement(getNavIcon(module.icon), {
                      style: { fontSize: 32 },
                    })}
                    <span style={{ marginTop: "4px", fontSize: "14px" }}>
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
                  <Badge count={"Default"} size="small" color="default">
                    <LucideIcons.LayoutDashboard style={{ fontSize: 32 }} />
                  </Badge>
                  <span style={{ marginTop: "4px", fontSize: "14px" }}>
                    Menu
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "0 8px",
                  }}
                >
                  <Badge size="small" count={"Default"} color="default">
                    <Avatar
                      style={{ backgroundColor: "#87d068" }}
                      icon={<UserOutlined />}
                    />
                  </Badge>
                  <span style={{ marginTop: "4px", fontSize: "14px" }}>
                    Profile
                  </span>
                </div>
              </div>
            </div>
          </Card>
          {/* Drag-and-drop table separated from Card */}
          <div
            style={{
              marginBottom: "24px",
              background: "#fff",
              borderRadius: 8,
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              padding: 16,
            }}
          >
            <h3 style={{ marginBottom: 12 }}>Customizable Navigation Items</h3>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="nav-table">
                {(provided, snapshot) => (
                  <table
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ width: "100%", borderCollapse: "collapse" }}
                  >
                    <thead>
                      <tr>
                        <th style={{ width: 40 }}></th>
                        {navigationColumns.map((col) => (
                          <th key={col.key || col.dataIndex}>{col.title}</th>
                        ))}
                        <th style={{ width: 40 }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {navigationModules.map((module, idx) => (
                        <Draggable
                          key={module.id}
                          draggableId={module.id}
                          index={idx}
                        >
                          {(dragProvided, dragSnapshot) => (
                            <tr
                              ref={dragProvided.innerRef}
                              {...dragProvided.draggableProps}
                              style={{
                                ...dragProvided.draggableProps.style,
                                cursor: "move",
                                background: dragSnapshot.isDragging
                                  ? "#e6f7ff"
                                  : snapshot.isDraggingOver
                                    ? "#fafafa"
                                    : undefined,
                                transition: "background 0.2s",
                              }}
                            >
                              <td
                                {...dragProvided.dragHandleProps}
                                style={{ textAlign: "center", cursor: "grab" }}
                              >
                                <MenuOutlined
                                  style={{
                                    fontSize: 18,
                                    color: dragSnapshot.isDragging
                                      ? "#1890ff"
                                      : "#aaa",
                                  }}
                                />
                              </td>
                              {navigationColumns.map((col) => (
                                <td key={col.key || col.dataIndex}>
                                  {typeof col.render === "function"
                                    ? col.render(
                                        module[
                                          col.dataIndex as keyof typeof module
                                        ],
                                        module,
                                        idx
                                      )
                                    : module[
                                        col.dataIndex as keyof typeof module
                                      ]}
                                </td>
                              ))}
                              <td style={{ textAlign: "center" }}>
                                <DeleteOutlined
                                  style={{
                                    color: "#ff4d4f",
                                    fontSize: 18,
                                    cursor: "pointer",
                                  }}
                                  onClick={() => toggleNavigation(module.id)}
                                />
                              </td>
                            </tr>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </tbody>
                  </table>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <Card title="Mobile Navigation Preview"></Card>
        </div>
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
          loading={saving}
        >
          Save Changes
        </Button>
      </div>
      <style>{`
        .drag-row {
          transition: background 0.2s;
        }
        @media (max-width: 600px) {
          table {
            font-size: 13px;
          }
          th, td {
            padding: 6px;
          }
        }
      `}</style>
    </>
  );
};

export default MobileNavigation;
