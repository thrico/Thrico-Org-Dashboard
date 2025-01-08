"use client";

import { Card, Col, Row } from "antd";
import { Column } from "@ant-design/plots";

const accountsData = [
  { range: "1 day", value: 0 },
  { range: "2-7 days", value: 13 },
  { range: "8-14 days", value: 25 },
  { range: ">14 days", value: 936 },
];

const usersData = [
  { range: "1 day", value: 0 },
  { range: "2-7 days", value: 210 },
  { range: "8-14 days", value: 204 },
  { range: ">14 days", value: 546 },
];

const dashboardsActiveData = [
  { range: "1 day", value: 0 },
  { range: "2-7 days", value: 110 },
  { range: "8-14 days", value: 124 },
  { range: ">14 days", value: 470000 },
];

const dashboardsLoadData = [
  { range: "1 Load", value: 0 },
  { range: "2-10 Loads", value: 411000 },
  { range: "11-20 Loads", value: 110 },
  { range: ">20 Loads", value: 45 },
];

const formatNumber = (value: number) => {
  return value >= 1000 ? `${(value / 1000).toFixed(0)}K` : value;
};

const baseChartConfig = {
  xField: "range",
  yField: "value",
  label: {
    position: "top",
    formatter: (datum: { value: number }) => formatNumber(datum.value),
  },
  tooltip: {
    formatter: (datum: { value: number }) => ({
      name: "Value",
      value: formatNumber(datum.value),
    }),
  },
};

export default function Analytics() {
  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card
            title="Accounts"
            extra={
              <span style={{ color: "rgba(0,0,0,0.45)", fontSize: "14px" }}>
                Distributions by Active Days
              </span>
            }
          >
            <Column
              {...baseChartConfig}
              data={accountsData}
              color="#40A9A5"
              height={300}
            />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            title="Users"
            extra={
              <span style={{ color: "rgba(0,0,0,0.45)", fontSize: "14px" }}>
                Distributions by Active Days
              </span>
            }
          >
            <Column
              {...baseChartConfig}
              data={usersData}
              color="#69C0FF"
              height={300}
            />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            title="Dashboards"
            extra={
              <span style={{ color: "rgba(0,0,0,0.45)", fontSize: "14px" }}>
                Distributions by Active Days
              </span>
            }
          >
            <Column
              {...baseChartConfig}
              data={dashboardsActiveData}
              color="#1D39C4"
              height={300}
            />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            title="Dashboards"
            extra={
              <span style={{ color: "rgba(0,0,0,0.45)", fontSize: "14px" }}>
                Distributions by Load Volume
              </span>
            }
          >
            <Column
              {...baseChartConfig}
              data={dashboardsLoadData}
              color="#1D39C4"
              height={300}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
