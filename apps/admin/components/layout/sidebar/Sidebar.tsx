import { Button, Menu, MenuProps, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import LogoutModal from "@thrico/ui/Logout";
import { extendedItems, main, profile, settings } from "./MenuItems";
import { checkEntitySubscription, getEntity } from "../../../graphql/actions";
import Logo from "@thrico/ui/Logo";
import Visit from "../Visit";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const normalizeKey = (name: string) =>
    name.toLowerCase().replace(/\s+/g, "-");

  const getEnabledModuleKeys = (modules: any[]) => {
    return modules.map((mod: any) => normalizeKey(mod.name));
  };

  const getFilteredExtendedItems = (modules: any[]) => {
    const keys = getEnabledModuleKeys(modules);
    return extendedItems.filter((item) => keys.includes(item.key));
  };
  const { data } = checkEntitySubscription();
  const [open, setOpen] = useState(false);
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const pathName = usePathname();

  const moduleList = data?.checkEntitySubscription?.modules ?? [];
  const filteredExtendedItems = getFilteredExtendedItems(moduleList);
  const finalMenuItems = [...main, ...filteredExtendedItems, ...settings];
  const { data: entity, loading } = getEntity();

  return (
    <>
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
        }}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical" />
        <div
          style={{
            position: "absolute",
            top: 2,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
          }}
        >
          <div
            style={{ cursor: "pointer" }}
            onClick={() => setCollapsed(!collapsed)}
          >
            <Logo
              name={entity?.getEntity?.name}
              logo={entity?.getEntity?.logo}
            />
          </div>
          {!collapsed && (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setCollapsed(!collapsed)}
            >
              {" "}
              <MenuFoldOutlined />{" "}
            </div>
          )}
        </div>
        <Menu
          selectedKeys={[pathName]}
          style={{ marginTop: "5rem" }}
          mode="inline"
          theme="light"
          defaultSelectedKeys={["4"]}
          items={finalMenuItems}
        />

        <LogoutModal
          open={open}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />

        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
          }}
        >
          <Menu
            selectedKeys={[pathName]}
            style={{ marginTop: "5rem" }}
            mode="vertical"
            theme="light"
            defaultSelectedKeys={["4"]}
            items={profile}
          />
        </div>
      </Sider>
    </>
  );
};

export default Sidebar;
