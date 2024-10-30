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

const Sidebar = ({ collapsed, setCollapsed }) => {
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
        ,
      ],
      icon: <MdGroup />,
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

    // {
    //   key: "MarketPlace",
    //   label: (
    //     <Link href={"/mentorship"}>
    //       <Typography style={{ color: "white" }}>MarketPlace</Typography>
    //     </Link>
    //   ),

    //   icon: <ShopOutlined />,
    // },
    // {
    //   key: "Jobs",
    //   label: (
    //     <Link href={"/mentorship"}>
    //       <Typography style={{ color: "white" }}>Jobs</Typography>
    //     </Link>
    //   ),

    //   icon: <MdWork />,
    // },

    // {
    //   key: "Mentorship",
    //   label: (
    //     <Link href={"/mentorship"}>
    //       <Typography style={{ color: "white" }}>Mentorship</Typography>
    //     </Link>
    //   ),
    //   children: [
    //     {
    //       key: "Mentors",
    //       type: "group",
    //       label: (
    //         <Link href={"/mentorship/mentors"}>
    //           <Typography style={{ color: "white" }}>Mentors</Typography>
    //         </Link>
    //       ),
    //     },

    //     {
    //       key: "Mentees",
    //       type: "group",
    //       label: (
    //         <Link href={"/mentorship/mentees"}>
    //           <Typography style={{ color: "white" }}>Mentees</Typography>
    //         </Link>
    //       ),
    //     },
    //   ],
    //   icon: <UserOutlined />,
    // },

    // {
    //   key: "alumni-stories",
    //   label: (
    //     <Link href={"/alumni-stories"}>
    //       <Typography style={{ color: "white" }}>Alumni Stories</Typography>
    //     </Link>
    //   ),
    //   children: [
    //     {
    //       key: "all",
    //       type: "group",
    //       label: (
    //         <Link href={"/alumni-stories"}>
    //           <Typography style={{ color: "white" }}>Stories</Typography>
    //         </Link>
    //       ),
    //     },

    //     {
    //       key: "category",
    //       type: "group",
    //       label: (
    //         <Link href={"/alumni-stories/category"}>
    //           <Typography style={{ color: "white" }}>Category</Typography>
    //         </Link>
    //       ),
    //     },
    //   ],
    //   icon: <UserOutlined />,
    // },

    // {
    //   key: "giving",
    //   label: (
    //     <Link href={"/giving"}>
    //       <Typography style={{ color: "white" }}>Giving</Typography>
    //     </Link>
    //   ),
    //   children: [
    //     {
    //       key: "all",
    //       type: "group",
    //       label: (
    //         <Link href={"/giving"}>
    //           <Typography style={{ color: "white" }}>Giving</Typography>
    //         </Link>
    //       ),
    //     },

    //     {
    //       key: "category",
    //       type: "group",
    //       label: (
    //         <Link href={"/giving/category"}>
    //           <Typography style={{ color: "white" }}>Category</Typography>
    //         </Link>
    //       ),
    //     },
    //   ],
    //   icon: <UserOutlined />,
    // },
    // {
    //   key: "Courses",
    //   label: (
    //     <Link href={"/courses"}>
    //       <Typography style={{ color: "white" }}>Courses</Typography>
    //     </Link>
    //   ),

    //   icon: <BsBookmarkCheck />,
    // },

    // {
    //   key: "entrepreneurship",
    //   label: "Entrepreneurship",
    //   children: [
    //     {
    //       key: "/user",
    //       type: "group",
    //       label: (
    //         <Link href={"/user"}>
    //           <Typography style={{ color: "white" }}>Guide</Typography>
    //         </Link>
    //       ),
    //     },

    //     {
    //       key: "Challenges",
    //       type: "group",
    //       label: (
    //         <Link href={"/entrepreneurship/challenges"}>
    //           <Typography style={{ color: "white" }}>
    //             Program and Challenges
    //           </Typography>
    //         </Link>
    //       ),
    //     },
    //     {
    //       key: "/user?value=requested",
    //       type: "group",
    //       label: (
    //         <Link href={"/user?value=requested"}>
    //           <Typography style={{ color: "white" }}>Startups</Typography>
    //         </Link>
    //       ),
    //     },

    //     {
    //       key: "/user?value=requested",
    //       type: "group",
    //       label: (
    //         <Link href={"/user?value=requested"}>
    //           <Typography style={{ color: "white" }}>Mentors</Typography>
    //         </Link>
    //       ),
    //     },
    //     {
    //       key: "/user?value=requested",
    //       type: "group",
    //       label: (
    //         <Link href={"/user?value=requested"}>
    //           <Typography style={{ color: "white" }}>Investors</Typography>
    //         </Link>
    //       ),
    //     },
    //     {
    //       key: "/user?value=requested",
    //       type: "group",
    //       label: (
    //         <Link href={"/user?value=requested"}>
    //           <Typography style={{ color: "white" }}>Accelerators</Typography>
    //         </Link>
    //       ),
    //     },
    //     {
    //       key: "/user?value=requested",
    //       type: "group",
    //       label: (
    //         <Link href={"/user?value=requested"}>
    //           <Typography style={{ color: "white" }}>Coporates</Typography>
    //         </Link>
    //       ),
    //     },
    //     {
    //       key: "/user?value=requested",
    //       type: "group",
    //       label: (
    //         <Link href={"/user?value=requested"}>
    //           <Typography style={{ color: "white" }}>Partners</Typography>
    //         </Link>
    //       ),
    //     },
    //     {
    //       key: "/user?value=requested",
    //       type: "group",
    //       label: (
    //         <Link href={"/user?value=requested"}>
    //           <Typography style={{ color: "white" }}>
    //             Government Bodies
    //           </Typography>
    //         </Link>
    //       ),
    //     },

    //     {
    //       key: "/user?value=requested",
    //       type: "group",
    //       label: (
    //         <Link href={"/user?value=requested"}>
    //           <Typography style={{ color: "white" }}>
    //             Co Working Spaces
    //           </Typography>
    //         </Link>
    //       ),
    //     },
    //     {
    //       key: "/user?value=requested",
    //       type: "group",
    //       label: (
    //         <Link href={"/user?value=requested"}>
    //           <Typography style={{ color: "white" }}>Resources</Typography>
    //         </Link>
    //       ),
    //     },
    //     {
    //       key: "/user?value=requested",
    //       type: "group",
    //       label: (
    //         <Link href={"/user?value=requested"}>
    //           <Typography style={{ color: "white" }}>Media</Typography>
    //         </Link>
    //       ),
    //     },
    //   ],

    //   icon: <UserOutlined />,
    // },
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

    // {
    //   key: "Media",
    //   label: (
    //     <Link href={"/media"}>
    //       <Typography style={{ color: "white" }}>Wall of fame</Typography>
    //     </Link>
    //   ),

    //   icon: <MdFilterFrames />,
    // },
    // {
    //   key: "Giving",
    //   label: (
    //     <Link href={"/media"}>
    //       <Typography style={{ color: "white" }}>Giving</Typography>
    //     </Link>
    //   ),

    //   icon: <MoneyCollectOutlined />,
    // },

    // {
    //   key: "Stories",
    //   label: (
    //     <Link href={"/media"}>
    //       <Typography style={{ color: "white" }}>Stories</Typography>
    //     </Link>
    //   ),

    //   icon: <MdAmpStories />,
    // },

    // {
    //   key: "Media",
    //   label: (
    //     <Link href={"/media"}>
    //       <Typography style={{ color: "white" }}>Media</Typography>
    //     </Link>
    //   ),

    //   icon: <MdArticle />,
    // },

    // {
    //   key: "payments",

    //   label: (
    //     <Link href={process.env.NEXT_PUBLIC_PAYMENTS_URL ? process.env.NEXT_PUBLIC_PAYMENTS_URL : "/"}>
    //       <Typography style={{ color: "white" }}>Payments</Typography>
    //     </Link>
    //   ),

    //   icon: <MdPayment />,
    // },

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
        <a href={`${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/logout`}>Logout</a>
      ),
      icon: <LogoutOutlined />,
    },
  ];

  const pathName = usePathname();
  return (
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
    </Sider>
  );
};

export default Sidebar;
