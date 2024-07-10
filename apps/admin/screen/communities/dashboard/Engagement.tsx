import React from "react";
import { Line } from "@ant-design/plots";
import { Card } from "antd";
const Engagement = () => {
  const config = {
    data: {
      type: "fetch",
      value:
        "https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json",
    },
    xField: (d) => new Date(d.year),
    yField: "value",
    sizeField: "value",
    shapeField: "trail",
    legend: { size: false },
    colorField: "category",
  };

  return (
    <Card title="Engagement" style={{ width: "48%" }}>
      {" "}
      <Line {...config} />
    </Card>
  );
};

export default Engagement;
