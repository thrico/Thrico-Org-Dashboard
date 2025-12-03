import { Menu } from "antd";
import { usePathname } from "next/navigation";
import React, { useState, useMemo } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import LogoutModal from "@thrico/ui/Logout";
import { extendedItems, main, profile, settings } from "./menu-items";
import { checkEntitySubscription, getEntity } from "../../../graphql/actions";
import Logo from "@thrico/ui/Logo";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const normalizeKey = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

const getEnabledModuleKeys = (modules: any[]) =>
  modules.map((mod: any) => normalizeKey(mod.name));

const getFilteredExtendedItems = (modules: any[]) => {
  const keys = getEnabledModuleKeys(modules);
  return extendedItems
    .filter((item) => keys.includes(item.key))
    .map((item) => {
      const mod = modules.find((m: any) => normalizeKey(m.name) === item.key);
      if (mod && typeof mod.icon === "string" && mod.icon) {
        try {
          const LucideIcon = require("lucide-react")[mod.icon];
          if (LucideIcon) {
            return { ...item, icon: <LucideIcon size={18} /> };
          }
        } catch (e) {
          // fallback to default icon if not found
        }
      }
      return item;
    });
};

const fixMenuItemType = (item: any) => {
  if (item.type && item.type !== "group") {
    const { type, ...rest } = item;
    return rest;
  }
  return item;
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const { data } = checkEntitySubscription();
  const { data: entity, loading, error } = getEntity();
  const [open, setOpen] = useState(false);
  const pathName = usePathname();

  // Memoize derived data for performance
  const moduleList = useMemo(
    () => data?.checkEntitySubscription?.modules ?? [],
    [data]
  );
  const filteredExtendedItems = useMemo(
    () => getFilteredExtendedItems(moduleList),
    [moduleList]
  );
  const finalMenuItems = useMemo(
    () => [...main, ...filteredExtendedItems, ...settings].map(fixMenuItemType),
    [filteredExtendedItems]
  );

  // Responsive sidebar width
  const sidebarWidth = collapsed ? 80 : 220;

  // Error handling for entity fetch
  const logoName = entity?.getEntity?.name || "Thrico";
  const logoSrc = entity?.getEntity?.logo || undefined;

  return (
    <Sider
      trigger={null}
      theme="light"
      style={{
        overflow: "auto",
        position: "fixed",
        height: "100%",
        left: 0,
        top: 0,
        bottom: 0,
        width: sidebarWidth,
        minWidth: sidebarWidth,
        transition: "width 0.2s",
        boxShadow: "0 0 8px rgba(0,0,0,0.04)",
        background: "#fff",
      }}
      collapsible
      collapsed={collapsed}
    >
      <div
        className="sidebar-header"
        style={{
          position: "fixed",
          top: 2,
          width: sidebarWidth,
          zIndex: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        }}
      >
        <div
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          onClick={() => setCollapsed(!collapsed)}
        >
          <Logo name={logoName} logo={logoSrc} />
        </div>
        <div
          style={{ cursor: "pointer", marginLeft: 8 }}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </div>
      <Menu
        selectedKeys={[pathName]}
        style={{
          marginTop: "4.5rem",
          fontSize: 13,
          marginInline: 1,
          paddingInline: 12,
          border: "none",
        }}
        mode="inline"
        theme="light"
        items={finalMenuItems}
      />
      <LogoutModal
        open={open}
        handleOk={() => setOpen(false)}
        handleCancel={() => setOpen(false)}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: collapsed ? 80 : 220,
          background: "#fff",
          boxShadow: "0 -2px 8px rgba(0,0,0,0.03)",
          padding: collapsed ? "6px 4px" : "10px 12px",
        }}
      >
        <Menu
          selectedKeys={[pathName]}
          mode="inline"
          theme="light"
          style={{
            border: "none",
            fontSize: 13,
            background: "transparent",
          }}
          items={profile}
        />
      </div>

      {error && (
        <div style={{ color: "red", padding: 8, fontSize: 12 }}>
          Failed to load entity info.
        </div>
      )}
    </Sider>
  );
};

export default Sidebar;
