import { Button, Menu, MenuProps, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  CalendarOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { MdDashboardCustomize, MdGroup } from "react-icons/md";
import Link from "next/link";
import { SiCodementor } from "react-icons/si";
import LogoutModal from "../../../../packages/ui/src/logout/Logout";
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

  const items: MenuProps["items"] = [
    {
      key: "General",
      label: "Dashboard",
      icon: <MdDashboardCustomize />,
    },
    {
      key: "user",

      label: (
        <Link href={"/user"}>
          <Typography style={{ color: "white" }}>Manage User</Typography>
        </Link>
      ),
      children: [
        {
          key: "/user?value=approved-user",
          type: "group",
          label: (
            <Link href={"/user/approved"}>
              <Typography style={{ color: "white" }}>Approved</Typography>
            </Link>
          ),
        },
        {
          key: "/user?value=approved-user",
          type: "group",
          label: (
            <Link href={"/user/pending"}>
              <Typography style={{ color: "white" }}>Pending</Typography>
            </Link>
          ),
        },
        {
          key: "/user?value=approved-user",
          type: "group",
          label: (
            <Link href={"/user/pending"}>
              <Typography style={{ color: "white" }}>Rejected</Typography>
            </Link>
          ),
        },
        {
          key: "/user?value=approved-user",
          type: "group",
          label: (
            <Link href={"/user/blocked"}>
              <Typography style={{ color: "white" }}>Blocked</Typography>
            </Link>
          ),
        },
        {
          key: "/user?value=approved-user",
          type: "group",
          label: (
            <Link href={"/user/settings"}>
              <Typography style={{ color: "white" }}>Settings</Typography>
            </Link>
          ),
        },
      ],
      icon: <UserOutlined />,
    },
    {
      key: "communities",
      label: (
        <Link href={"/communities"}>
          <Typography style={{ color: "white" }}>Communities</Typography>
        </Link>
      ),
      children: [
        {
          key: "/communities/approval",
          type: "group",
          label: (
            <Link href={"/user/approved"}>
              <Typography style={{ color: "white" }}>
                Manage Approvals
              </Typography>
            </Link>
          ),
        },
        {
          key: "/communities/customization",
          type: "group",
          label: (
            <Link href={"/user/pending"}>
              <Typography style={{ color: "white" }}>Customization</Typography>
            </Link>
          ),
        },
        {
          key: "/communities/settings",
          type: "group",
          label: (
            <Link href={"/communities/settings"}>
              <Typography style={{ color: "white" }}>Setting</Typography>
            </Link>
          ),
        },
      ],
      icon: <MdGroup />,
    },

    {
      key: "mentorship",
      label: (
        <Link href={"/mentorship"}>
          <Typography style={{ color: "white" }}>Mentorship</Typography>
        </Link>
      ),
      children: [
        {
          key: "/mentorship",
          type: "group",
          label: (
            <Link href={"/mentorship/"}>
              <Typography style={{ color: "white" }}>
                Manage Approvals
              </Typography>
            </Link>
          ),
        },
        {
          key: "/mentorship/customization",
          type: "group",
          label: (
            <Link href={"/mentorship/customization"}>
              <Typography style={{ color: "white" }}>Customization</Typography>
            </Link>
          ),
        },
        {
          key: "/mentorship/settings",
          type: "group",
          label: (
            <Link href={"/mentorship/settings"}>
              <Typography style={{ color: "white" }}>Setting</Typography>
            </Link>
          ),
        },
      ],
      icon: <SiCodementor />,
    },
    {
      key: "Events",
      label: (
        <Link href={"/mentorship"}>
          <Typography style={{ color: "white" }}>Events</Typography>
        </Link>
      ),

      icon: <CalendarOutlined />,
    },

    {
      key: "announcements",
      label: (
        <Link href={"/announcements"}>
          <Typography style={{ color: "white" }}>
            Announcements & Highlights
          </Typography>
        </Link>
      ),

      icon: <CalendarOutlined />,
    },

    {
      key: "/settings/appearance",
      label: "Setting",
      children: [
        {
          key: "/settings/appearance",
          type: "group",
          label: (
            <Link href={"/settings/appearance"}>
              <Typography style={{ color: "white" }}>Appearance</Typography>
            </Link>
          ),
        },
      ],
      icon: <SettingOutlined />,
    },

    {
      key: "cms",

      label: (
        <Link
          target="_blank"
          href={
            process.env.NEXT_PUBLIC_EDITOR_URL
              ? process.env.NEXT_PUBLIC_EDITOR_URL
              : "/"
          }
        >
          <Typography style={{ color: "white" }}>Manage Website</Typography>
        </Link>
      ),

      icon: <UnorderedListOutlined />,
    },

    {
      key: "Logout",
      label: (
        <Typography onClick={() => handleOk()} style={{ color: "white" }}>
          Logout
        </Typography>
      ),
      icon: <LogoutOutlined />,
    },
  ];

  const pathName = usePathname();
  return (
    <>
      <Sider
        trigger={null}
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
            type="text"
            icon={
              collapsed ? (
                <MenuUnfoldOutlined size={40} style={{ color: "white" }} />
              ) : (
                <MenuFoldOutlined size={40} style={{ color: "white" }} />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
        <Menu
          selectedKeys={[pathName]}
          style={{ marginTop: "5rem" }}
          theme="dark"
          mode="inline"
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
