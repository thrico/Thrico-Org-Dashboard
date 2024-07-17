"use client";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Flex, Layout, theme } from "antd";

import "antd/dist/reset.css";

const { Header } = Layout;

import { Avatar } from "antd";
import { getOrganization } from "../../graphql/actions";
import Logo from "@repo/ui/Logo";
export const HeaderComponent = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { data, loading } = getOrganization();
  const check = data?.getOrganization?.organization;
  return (
    <>
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
        <Flex style={{ width: "100%" }} justify="space-between" align="center">
          <div style={{ margin: 20 }}>
            <Logo
              name={data?.getOrganization?.organization.organizationName}
              logo={data?.getOrganization?.organization.logo}
            />
          </div>
        </Flex>
      </Header>
    </>
  );
};
