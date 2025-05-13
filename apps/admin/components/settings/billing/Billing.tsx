"use client";

import type React from "react";
import { Table, Typography, Button, Dropdown, Card } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;

interface BillingRecord {
  key: string;
  date: string;
  description: React.ReactNode;
  amount: string;
}

export default function Billing() {
  // Sample data based on the image
  const data: BillingRecord[] = [
    {
      key: "1",
      date: "April, 01 2025",
      description: "Payment (visa 7741)",
      amount: "-$133.34",
    },
    {
      key: "2",
      date: "April, 01 2025",
      description: <a href="#">Invoice for March 2025</a>,
      amount: "$133.34",
    },
    {
      key: "3",
      date: "March, 01 2025",
      description: "Payment (visa 7741)",
      amount: "-$133.34",
    },
    {
      key: "4",
      date: "March, 01 2025",
      description: <a href="#">Invoice for February 2025</a>,
      amount: "$133.34",
    },
    {
      key: "5",
      date: "February, 01 2025",
      description: "Payment (visa 7741)",
      amount: "-$133.34",
    },
    {
      key: "6",
      date: "February, 01 2025",
      description: <a href="#">Invoice for January 2025</a>,
      amount: "$133.34",
    },
    {
      key: "7",
      date: "January, 01 2025",
      description: "Payment (visa 7741)",
      amount: "-$133.34",
    },
    {
      key: "8",
      date: "January, 01 2025",
      description: <a href="#">Invoice for December 2024</a>,
      amount: "$133.34",
    },
  ];

  const columns: ColumnsType<BillingRecord> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "25%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "50%",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: "20%",
    },
    {
      title: "",
      key: "action",
      width: "5%",
      render: () => (
        <Dropdown
          menu={{
            items: [
              { key: "1", label: "Download receipt" },
              { key: "2", label: "View details" },
            ],
          }}
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <Card title="Billing" style={{ width: "100%" }}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "ant-table-row-light" : ""
        }
      />
    </Card>
  );
}
