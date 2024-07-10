"use client";

import React from "react";
import Instructions from "./Instructions";
import AddDomain from "./AddDomain";
import { Space } from "antd";

const Domain = () => {
  return (
    <Space style={{ width: "95%", margin: 30 }} direction="vertical">
      <AddDomain />
      <Instructions />
    </Space>
  );
};

export default Domain;
