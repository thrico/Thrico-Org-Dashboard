import React from "react";
import { Line } from "@ant-design/plots";
import { Card } from "antd";
const Communities = () => {
  const data = [
    {
      value: Math.random() * 100,
      months: "Jan-24",
    },
    {
      value: Math.random() * 100,
      months: "Feb-24",
    },
    {
      value: Math.random() * 100,
      months: "Mar-24",
    },
    {
      value: Math.random() * 100,
      months: "Apr-24",
    },
    {
      value: Math.random() * 100,
      months: "May-24",
    },
    {
      value: Math.random() * 100,
      months: "Jun-24",
    },
    {
      value: Math.random() * 100,
      months: "Jul-24",
    },
    {
      value: Math.random() * 100,
      months: "Aug-24",
    },
    {
      value: Math.random() * 100,
      months: "Sep-24",
    },
    {
      value: Math.random() * 100,
      months: "Oct-24",
    },
    {
      value: Math.random() * 100,
      months: "Nov-24",
    },
    {
      value: Math.random() * 100,
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
    <Card title="Communities" style={{ width: "48%" }}>
      <Line {...config} />
    </Card>
  );
};

export default Communities;
