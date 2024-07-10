"use client";

import React from "react";

import { Flex, Space } from "antd";

import dynamic from "next/dynamic";
import Demographics from "./Demographics";
import Communities from "./Communities";
import Members from "./Members";
import Engagement from "./Engagement";

const Approval = dynamic(() => import("./Approval"), {
  ssr: false,
});
const Dashboard = () => {
  return (
    <Flex
      style={{ width: "100%" }}
      wrap="wrap"
      gap={40}
      justify="space-between"
    >
      <Demographics />
      <Approval />
      <Communities />
      <Members />
      <Engagement />
    </Flex>
  );
};

export default Dashboard;
