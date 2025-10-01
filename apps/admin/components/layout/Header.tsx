import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  Flex,
  MenuProps,
  Popover,
  theme,
  Typography,
} from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import Logo from "@thrico/ui/Logo";
import { getEntity, getGetUser } from "../../graphql/actions";
import { SettingOutlined } from "@ant-design/icons";

import Visit from "./Visit";
export const Navbar = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { data, loading } = getEntity();
  const { Text } = Typography;
  const { data: { getUser } = {}, error } = getGetUser();

  const items: MenuProps["items"] = [
    {
      key: "4",
      label: "Settings",
      icon: <SettingOutlined />,
      extra: "⌘S",
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: "Settings",
      icon: <SettingOutlined />,
      extra: "⌘S",
    },
  ];
  return (
    <Header
      style={{
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
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
        marginBottom: 10,
        zIndex: 10,
      }}
    >
      <Flex style={{ width: "100%" }} justify="space-between" align="center">
        <Flex style={{ margin: 20, width: "50%", alignItems: "center" }}>
          <Logo name={data?.getEntity?.name} logo={data?.getEntity?.logo} />
          <Divider type="vertical" />

          {/* <Flex gap={20} style={{ width: "70%" }}>
            <Popover content={<MenuNavigation />} title="Title" trigger="click">
              <Button icon={<AppstoreOutlined />}>Modules</Button>
            </Popover>
            <GlobalSearch />
          </Flex> */}
        </Flex>
        <div style={{ margin: 20 }}>
          <Visit />
          <Button style={{ height: "3rem" }} type="text">
            <Avatar shape="square" style={{ backgroundColor: "#87d068" }}>
              {getUser.firstName}
            </Avatar>
            {/* <Text style={{ marginLeft: "1rem" }}>
              {getUser.firstName}
              {getUser.lastName}
            </Text> */}
          </Button>
        </div>
      </Flex>
    </Header>
  );
};
