import { Button, Menu, MenuProps, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import LogoutModal from "@thrico/ui/Logout";
import { items } from "./MenuItems";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const [open, setOpen] = useState(false);
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const pathName = usePathname();
  return (
    <>
      <Sider
        trigger={null}
        theme="light"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
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
            top: 20,
            width: "100%",

            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            icon={
              collapsed ? (
                <MenuUnfoldOutlined size={40} />
              ) : (
                <MenuFoldOutlined size={40} />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
        <Menu
          selectedKeys={[pathName]}
          style={{ marginTop: "5rem" }}
          mode="inline"
          theme="light"
          defaultSelectedKeys={["4"]}
          items={items}
        />
        <LogoutModal
          open={open}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      </Sider>
    </>
  );
};

export default Sidebar;
