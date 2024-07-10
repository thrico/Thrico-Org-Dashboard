import React from "react";
import { Area } from "@ant-design/plots";
import { Card } from "antd";
const Approval = () => {
  const data = [
    {
      date: "JAN-24",
      industry: "APPROVED",
      unemployed: 1000,
    },
    {
      date: "FEB-24",
      industry: "BLOCKED",
      unemployed: 734,
    },
    {
      date: "MAR-24",
      industry: "REJECTED",
      unemployed: 782,
    },
    {
      date: "APR-24",
      industry: "PAUSED",
      unemployed: 655,
    },
  ];
  const config = {
    data: data,
    xField: "date",
    yField: "unemployed",
    colorField: "industry",
    shapeField: "smooth",
    stack: true, // Try to remove this line.
  };

  return (
    <Card title="Approvals" style={{ width: "48%" }}>
      <Area {...config} />
    </Card>
  );
};

export default Approval;
