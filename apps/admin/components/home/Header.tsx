"use client";

import { theme, Typography } from "antd";
import Title from "antd/es/skeleton/Title";
import React from "react";
import { UserDetails } from "../layout/sidebar/MenuItems";
import Visit from "../layout/Visit";

const HomeHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { Title } = Typography;
  return (
    <div
      style={{
        width: "100%",
        height: 60,
        backgroundColor: colorBgContainer,
        position: "sticky",
        top: 0,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Title
        level={3}
        style={{
          color: "#000",
          fontWeight: 600,
          textTransform: "capitalize",
          paddingLeft: 24,
          paddingTop: 20,
        }}
      >
        Welcome <UserDetails /> 👋
      </Title>

      <Visit />
    </div>
  );
};

export default HomeHeader;
