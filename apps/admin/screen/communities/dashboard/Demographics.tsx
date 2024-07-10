import React from "react";
import { Column } from "@ant-design/plots";
import { Card } from "antd";
const Demographics = () => {
  const data = [
    {
      name: "Female",
      月份: "25-30",
      月均降雨量: 18.9,
    },
    {
      name: "Male",
      月份: "25-34",
      月均降雨量: 28.8,
    },
    {
      name: "Male",
      月份: "35-44",
      月均降雨量: 39.3,
    },
    {
      name: "Male",
      月份: "45-54.",
      月均降雨量: 81.4,
    },
    {
      name: "Male",
      月份: "55-64",
      月均降雨量: 47,
    },
    {
      name: "Female",
      月份: "25-30",
      月均降雨量: 18.9,
    },
    {
      name: "Female",
      月份: "25-34",
      月均降雨量: 28.8,
    },
    {
      name: "Female",
      月份: "35-44",
      月均降雨量: 39.3,
    },
    {
      name: "Female",
      月份: "45-54.",
      月均降雨量: 81.4,
    },
    {
      name: "Female",
      月份: "55-64",
      月均降雨量: 47,
    },
  ];
  const config = {
    data,
    xField: "月份",
    yField: "月均降雨量",
    colorField: "name",
    group: true,
    style: {
      // 矩形四个方向的内边距
      inset: 5,

      // 矩形单个方向的内边距
      // insetLeft:5,
      // insetRight:20,
      // insetBottom:10
      // insetTop:10
    },
  };
  return (
    <Card title="Age Group" style={{ width: "48%" }}>
      <Column {...config} />
    </Card>
  );
};

export default Demographics;
