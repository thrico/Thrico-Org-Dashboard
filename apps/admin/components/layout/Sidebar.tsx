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
import { MdDashboardCustomize, MdGroup, MdLocalOffer } from "react-icons/md";
import Link from "next/link";
import { SiCodementor } from "react-icons/si";
import LogoutModal from "../../../../packages/ui/src/logout/Logout";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { GrUserWorker } from "react-icons/gr";
import { BsPersonWorkspace } from "react-icons/bs";

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
      key: "feed",

      label: (
        <Link href={"/feed"}>
          <Typography style={{ color: "white" }}>Feed</Typography>
        </Link>
      ),
      children: [
        {
          key: "/feed",
          type: "feed",
          label: (
            <Link href={"/feed/"}>
              <Typography style={{ color: "white" }}>Feed</Typography>
            </Link>
          ),
        },

        {
          key: "/feed/",

          label: (
            <Link href={"/feed/"}>
              <Typography style={{ color: "white" }}>Dashboard</Typography>
            </Link>
          ),
        },
        {
          key: "/feed/all",

          label: (
            <Link href={"/feed/all"}>
              <Typography style={{ color: "white" }}>All</Typography>
            </Link>
          ),
        },

        {
          key: "/feed",

          label: (
            <Link href={"/feed/settings"}>
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
            <Link href={"/communities/approval"}>
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
            <Link href={"/communities/customization"}>
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
      key: "Listing",
      label: (
        <Link href={"/mentorship"}>
          <Typography style={{ color: "white" }}>Listing</Typography>
        </Link>
      ),
      children: [
        {
          key: "/listing",
          type: "group",
          label: (
            <Link href={"/listing/"}>
              <Typography style={{ color: "white" }}>
                Manage Approvals
              </Typography>
            </Link>
          ),
        },
        {
          key: "/listing/customization",
          type: "group",
          label: (
            <Link href={"/listing/customization"}>
              <Typography style={{ color: "white" }}>Customization</Typography>
            </Link>
          ),
        },
        {
          key: "/listing/settings",
          type: "group",
          label: (
            <Link href={"/listing/settings"}>
              <Typography style={{ color: "white" }}>Setting</Typography>
            </Link>
          ),
        },
      ],
      icon: <HiOutlineShoppingBag />,
    },

    {
      key: "Job",
      label: (
        <Link href={"/job"}>
          <Typography style={{ color: "white" }}>Job</Typography>
        </Link>
      ),
      children: [
        {
          key: "/job",
          type: "group",
          label: (
            <Link href={"/job/"}>
              <Typography style={{ color: "white" }}>
                Manage Approvals
              </Typography>
            </Link>
          ),
        },
        {
          key: "/job/customization",
          type: "group",
          label: (
            <Link href={"/job/customization"}>
              <Typography style={{ color: "white" }}>Customization</Typography>
            </Link>
          ),
        },
        {
          key: "/job/settings",
          type: "group",
          label: (
            <Link href={"/job/settings"}>
              <Typography style={{ color: "white" }}>Setting</Typography>
            </Link>
          ),
        },
      ],
      icon: <GrUserWorker />,
    },

    {
      key: "offers",
      label: (
        <Link href={"/offers"}>
          <Typography style={{ color: "white" }}>Offers</Typography>
        </Link>
      ),
      children: [
        {
          key: "/job",
          type: "group",
          label: (
            <Link href={"/job/"}>
              <Typography style={{ color: "white" }}>View Offers</Typography>
            </Link>
          ),
        },
        {
          key: "/offers/customization",
          type: "group",
          label: (
            <Link href={"/job/customization"}>
              <Typography style={{ color: "white" }}>Customization</Typography>
            </Link>
          ),
        },
        {
          key: "/offers/settings",
          type: "group",
          label: (
            <Link href={"/job/settings"}>
              <Typography style={{ color: "white" }}>Setting</Typography>
            </Link>
          ),
        },
      ],
      icon: <MdLocalOffer />,
    },

    {
      key: "career-centre",
      label: (
        <Link href={"/career-centre"}>
          <Typography style={{ color: "white" }}>Career Centre</Typography>
        </Link>
      ),
      children: [
        {
          key: "/career-centre",
          type: "group",
          label: (
            <Link href={"/job/"}>
              <Typography style={{ color: "white" }}>
                View Career Centre
              </Typography>
            </Link>
          ),
        },
        {
          key: "/career-centre/customization",
          type: "group",
          label: (
            <Link href={"/job/customization"}>
              <Typography style={{ color: "white" }}>Customization</Typography>
            </Link>
          ),
        },
        {
          key: "/career-centre/settings",
          type: "group",
          label: (
            <Link href={"/job/settings"}>
              <Typography style={{ color: "white" }}>Setting</Typography>
            </Link>
          ),
        },
      ],
      icon: <BsPersonWorkspace />,
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
      key: "/settings",
      label: (
        <Link href={"/settings"}>
          <Typography style={{ color: "white" }}>Settings</Typography>
        </Link>
      ),

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
        <Link href={"/website"}>
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
