import React from "react";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Card, Timeline } from "antd";

const PaymentTimeline = () => (
  <Card title="Timeline">
    <Timeline
      items={[
        {
          color: "green",
          dot: <CheckCircleOutlined />,
          children: (
            <>
              <p>Payment created</p>
              <p>Tue, May 21, 2024 11:04 AM</p>
            </>
          ),
        },
        {
          color: "green",
          dot: <CheckCircleOutlined />,
          children: (
            <>
              <p>Payment authorized</p>
              <p>Tue, May 21, 2024 11:04 AM</p>
            </>
          ),
        },
        {
          color: "green",
          dot: <CheckCircleOutlined />,
          children: (
            <>
              <p>Payment captured</p>
              <p>Tue, May 21, 2024 11:04 AM</p>
            </>
          ),
        },
        {
          color: "gray",
          dot: <ClockCircleOutlined />,
          children: (
            <>
              <p>Settlement (To be processed)</p>
              <p>To be deposited by: Fri, May 24, 2024 1:00 PM</p>
            </>
          ),
        },
      ]}
    />
  </Card>
);

export default PaymentTimeline;
