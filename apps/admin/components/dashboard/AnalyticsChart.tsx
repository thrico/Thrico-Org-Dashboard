"use client";

import { Card } from "antd";
import { Line } from "@ant-design/plots";

export default function AnalyticsChart() {
  // Sample data matching the graph
  const data = [
    {
      month: "May 2021",
      accounts: 200,
      users: 500,
      dashboards: 400,
      loads: 10000,
    },
    {
      month: "Apr 2021",
      accounts: 400,
      users: 1000,
      dashboards: 800,
      loads: 50000,
    },
    {
      month: "May 2021",
      accounts: 500,
      users: 1500,
      dashboards: 1200,
      loads: 100000,
    },
    {
      month: "Jun 2021",
      accounts: 600,
      users: 2000,
      dashboards: 1600,
      loads: 150000,
    },
    {
      month: "Jul 2021",
      accounts: 700,
      users: 2500,
      dashboards: 2000,
      loads: 250000,
    },
    {
      month: "Aug 2021",
      accounts: 800,
      users: 3000,
      dashboards: 2400,
      loads: 300000,
    },
    {
      month: "Sep 2021",
      accounts: 900,
      users: 3500,
      dashboards: 2800,
      loads: 400000,
    },
    {
      month: "Oct 2021",
      accounts: 1000,
      users: 4000,
      dashboards: 3200,
      loads: 500000,
    },
    {
      month: "Nov 2021",
      accounts: 1100,
      users: 4500,
      dashboards: 3600,
      loads: 550000,
    },
    {
      month: "Dec 2021",
      accounts: 1200,
      users: 5000,
      dashboards: 4000,
      loads: 600000,
    },
    {
      month: "Jan 2021",
      accounts: 1300,
      users: 5200,
      dashboards: 4200,
      loads: 650000,
    },
    {
      month: "Feb 2021",
      accounts: 1400,
      users: 5400,
      dashboards: 4400,
      loads: 600000,
    },
    {
      month: "Mar 2021",
      accounts: 1500,
      users: 5600,
      dashboards: 4800,
      loads: 400000,
    },
  ];

  // Transform data for the chart
  const chartData = data.reduce(
    (acc, item) => {
      return acc.concat([
        {
          month: item.month,
          value: item.accounts,
          category: "# of Accounts",
        },
        {
          month: item.month,
          value: item.users,
          category: "# of Users",
        },
        {
          month: item.month,
          value: item.dashboards,
          category: "# of Dashboards",
        },
        {
          month: item.month,
          value: item.loads,
          category: "# of Loads (right axis)",
        },
      ]);
    },
    [] as { month: string; value: number; category: string }[]
  );

  const config = {
    data: chartData,
    xField: "month",
    yField: "value",
    seriesField: "category",
    yAxis: {
      loads: {
        min: 0,
        max: 800000,
        position: "right",
      },
      metrics: {
        min: 0,
        max: 6000,
        position: "left",
      },
    },
    legend: {
      position: "top",
    },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 1000,
      },
    },
    color: ["#ffc53d", "#1890ff", "#69c0ff", "#13c2c2"],
  };

  return (
    <Card style={{ width: "100%", marginTop: 20 }}>
      <div style={{ padding: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 24 }}>
          Monthly Active Accounts, Users, and Dashboards - by Month
        </h2>
        <div style={{ height: 400 }}>
          <Line {...config} />
        </div>
      </div>
    </Card>
  );
}
