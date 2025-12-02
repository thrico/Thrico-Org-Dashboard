"use client";

import type React from "react";
import { Table, Typography, Button, Dropdown, Card } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useGetAllEntityInvoice } from "../../../graphql/actions";

const { Title } = Typography;

interface BillingRecord {
  key: string;
  date: string;
  description: string | React.ReactElement;
  amount: string;
  status: string;
}

export default function Billing() {
  const { data, loading, error } = useGetAllEntityInvoice();

  // Transform API data to table format
  const invoiceData =
    data?.getAllEntityInvoice?.map((inv, idx) => ({
      key: inv.billingId || idx.toString(),
      date: new Date(inv.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      description: inv.invoiceUrl ? (
        <a href={inv.invoiceUrl} target="_blank" rel="noopener noreferrer">
          Invoice for {inv.planName}
        </a>
      ) : (
        inv.notes || inv.planName
      ),
      amount: `${inv.currency} ${inv.amount.toFixed(2)}`,
      status: inv.status,
    })) || [];

  const columns: ColumnsType<BillingRecord> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "20%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "35%",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: "15%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (status: string) => (
        <span
          style={{
            color:
              status === "paid"
                ? "#52c41a"
                : status === "pending"
                  ? "#faad14"
                  : "#ff4d4f",
            fontWeight: 500,
          }}
        >
          {status?.toUpperCase()}
        </span>
      ),
    },
    {
      title: "",
      key: "action",
      width: "15%",
      render: (_: any, record) => (
        <Dropdown
          menu={{
            items: [
              record.description && typeof record.description === "object"
                ? { key: "1", label: "Download Invoice" }
                : { key: "2", label: "View Details" },
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
    <Card title={<Title level={4}>Billing</Title>} style={{ width: "100%" }}>
      {loading ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <span className="ant-spin ant-spin-lg" />
          <div>Loading invoices...</div>
        </div>
      ) : error ? (
        <div
          style={{
            color: "#ff4d4f",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          Error loading invoices
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={invoiceData}
          pagination={false}
          rowClassName={(record, index) =>
            index % 2 === 0 ? "ant-table-row-light" : ""
          }
        />
      )}
    </Card>
  );
}
