import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  Flex,
  theme,
  Typography,
} from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import Logo from "@repo/ui/Logo";
import { getEntity } from "../../graphql/actions";
import { AppstoreOutlined } from "@ant-design/icons";
import Search, { SearchProps } from "antd/es/input/Search";
import GlobalSearch from "./Search";
export const Navbar = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { data, loading } = getEntity();
  const { Text } = Typography;

  return (
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
        marginBottom: 10,
        zIndex: 10,
      }}
    >
      <Flex style={{ width: "100%" }} justify="space-between" align="center">
        <Flex style={{ margin: 20, width: "50%", alignItems: "center" }}>
          <Logo
            name={data?.getEntity?.entity.name}
            logo={data?.getEntity?.entity.logo}
          />
          <Divider type="vertical" />

          <Flex gap={20} style={{ width: "70%" }}>
            <Button icon={<AppstoreOutlined />}>Modules</Button>
            <GlobalSearch />
          </Flex>
        </Flex>
        <div style={{ margin: 20 }}>
          <Button
            target="_blank"
            href={`http://${data?.getEntity?.entity?.domain?.domain}.${process.env.NEXT_PUBLIC_SITE_URL}`}
            type="dashed"
          >
            Visit
          </Button>

          <Button style={{ height: "3rem" }} type="text">
            <Avatar shape="square" style={{ backgroundColor: "#87d068" }}>
              {data?.getEntity.firstName}
            </Avatar>
            <Text style={{ marginLeft: "1rem" }}>
              {data?.getEntity.firstName}
              {data?.getEntity.lastName}
            </Text>
          </Button>
        </div>
      </Flex>
    </Header>
  );
};
