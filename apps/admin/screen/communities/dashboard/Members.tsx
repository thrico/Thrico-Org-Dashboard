import React from "react";
import { Line } from "@ant-design/plots";
import { Card } from "antd";
const Members = () => {
  const data = [
    {
      value: Math.random() * 10000,
      months: "Jan-24",
    },
    {
      value: Math.random() * 10000,
      months: "Feb-24",
    },
    {
      value: Math.random() * 10000,
      months: "Mar-24",
    },
    {
      value: Math.random() * 10000,
      months: "Apr-24",
    },
    {
      value: Math.random() * 10000,
      months: "May-24",
    },
    {
      value: Math.random() * 10000,
      months: "Jun-24",
    },
    {
      value: Math.random() * 10000,
      months: "Jul-24",
    },
    {
      value: Math.random() * 10000,
      months: "Aug-24",
    },
    {
      value: Math.random() * 10000,
      months: "Sep-24",
    },
    {
      value: Math.random() * 10000,
      months: "Oct-24",
    },
    {
      value: Math.random() * 10000,
      months: "Nov-24",
    },
    {
      value: Math.random() * 10000,
      months: "Dec-24",
    },
  ];
  const config = {
    data,
    xField: "months",
    yField: "value",
    point: {
      shapeField: "square",
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };
  return (
    <Card title="Memberships" style={{ width: "48%" }}>
      <Line {...config} />
    </Card>
  );
};

export default Members;
