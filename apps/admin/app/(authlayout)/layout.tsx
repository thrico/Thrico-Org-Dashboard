"use client";

import React from "react";
import {
  CalendarOutlined,
  DownOutlined,
  LogoutOutlined,
  MoneyCollectOutlined,
  SettingOutlined,
  ShopOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";

import type { MenuProps } from "antd";
import {
  Avatar,
  Flex,
  Layout,
  Menu,
  Typography,
  notification,
  theme,
} from "antd";
import Logo from "@repo/ui/Logo";
const { Header, Content, Footer, Sider } = Layout;
import { Button, Dropdown, message, Space, Tooltip } from "antd";
import withAuth from "../../utils/withAuth";
import { getEntity } from "../../graphql/actions";
import KycForm from "../../screen/Kyc/Form";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdAmpStories,
  MdArticle,
  MdDashboardCustomize,
  MdFilterFrames,
  MdGroup,
  MdPayment,
  MdWork,
} from "react-icons/md";
import { BsActivity, BsBookmarkCheck } from "react-icons/bs";
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
            <Typography style={{ color: "white" }}>Manage Approvals</Typography>
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

  // {
  //   key: "Logs",
  //   label: (
  //     <Link href={"/mentorship"}>
  //       <Typography style={{ color: "white" }}>Logs</Typography>
  //     </Link>
  //   ),

  //   icon: <BsActivity />,
  // },
  {
    key: "Logout",
    label: (
      <a href={`${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/logout`}>Logout</a>
    ),
    icon: <LogoutOutlined />,
  },
];

const handleMenuClick: MenuProps["onClick"] = (e) => {
  message.info("Click on menu item.");
  console.log("click", e);
};
const menuProps = {
  items,
  onClick: handleMenuClick,
};
const { Title, Paragraph, Text } = Typography;
function RootLayout({ children }: { children: React.ReactNode }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { data, loading } = getEntity();
  const check = data?.getEntity?.entity;
  const pathName = usePathname();

  return (
    <>
      {!loading && (
        <>
          {check ? (
            <Layout hasSider>
              <Sider
                style={{
                  overflow: "auto",
                  height: "100vh",
                  position: "fixed",
                  left: 0,
                  top: 0,
                  bottom: 0,
                }}
              >
                <Menu
                  selectedKeys={[pathName]}
                  style={{ marginTop: "5rem" }}
                  theme="dark"
                  mode="inline"
                  defaultSelectedKeys={["4"]}
                  items={items}
                />
              </Sider>

              <Layout>
                <Header
                  style={{
                    padding: 0,
                    background: colorBgContainer,
                    overflow: "auto",
                    width: "100%",
                    position: "sticky",
                    left: 0,
                    display: "flex",
                    justifyContent: "center",
                    top: 0,
                    bottom: 0,
                    zIndex: 10,
                  }}
                >
                  <Flex
                    style={{ width: "100%" }}
                    justify="space-between"
                    align="center"
                  >
                    <div style={{ margin: 20 }}>
                      <Logo
                        name={data?.getEntity?.entity.name}
                        logo={data?.getEntity?.entity.logo}
                      />
                    </div>
                    <div style={{ margin: 20 }}>
                      <Button
                        target="_blank"
                        href={`http://${data?.getEntity?.entity?.domain?.domain}.${process.env.NEXT_PUBLIC_SITE_URL}`}
                        type="dashed"
                      >
                        Visit
                      </Button>
                      <Dropdown menu={{ items }}>
                        <Button style={{ height: "3rem" }} type="text">
                          <Avatar
                            shape="square"
                            style={{ backgroundColor: "#87d068" }}
                          >
                            {data?.getEntity.firstName}
                          </Avatar>
                          <Text style={{ marginLeft: "1rem" }}>
                            {data?.getEntity.firstName}
                            {data?.getEntity.lastName}
                          </Text>
                        </Button>
                      </Dropdown>
                    </div>
                  </Flex>
                </Header>

                <Content
                  style={{
                    margin: "24px",
                    marginLeft: check ? 230 : 0,
                    overflow: "initial",
                  }}
                >
                  <div
                    style={{
                      padding: 24,
                      textAlign: "center",
                      background: check ? colorBgContainer : "transparent",
                      borderRadius: borderRadiusLG,
                    }}
                  >
                    {children}
                  </div>
                </Content>
              </Layout>
            </Layout>
          ) : (
            <KycForm data={data} />
          )}
        </>
      )}
    </>
  );
}

export default withAuth(RootLayout);
