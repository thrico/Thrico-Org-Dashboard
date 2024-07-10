import { Space } from "antd";
import React from "react";

const IconView = ({ icon }: { icon: React.FC }) => {
  return <Space style={{ marginTop: 10 }}>{React.createElement(icon)}</Space>;
};

export default IconView;
