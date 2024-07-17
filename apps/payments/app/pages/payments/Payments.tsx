import React from "react";
import { Button, Card, Flex, List, Space, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import {
  ArrowDownOutlined,
  CaretDownOutlined,
  CheckCircleFilled,
  CloseCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";
import Link from "next/link";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  amount: string;
  detail: string;
  status: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Payment ID",
    width: 100,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  {
    title: "Customer detail",
    dataIndex: "detail",
    key: "detail",
  },

  {
    title: "Created on",
    dataIndex: "address",
    key: "3",
  },
  {
    title: "amount",
    dataIndex: "amount",
    key: "4",
  },

  {
    title: "Status",
    dataIndex: "address",
    key: "7",
    render: (id, record) => (
      <>
        <Tag icon={<CheckCircleFilled />} color="green">
          Captured
        </Tag>
        <Tag icon={<CloseCircleOutlined />} color="red">
          Failed
        </Tag>
      </>
    ),
  },

  {
    title: "Action",
    key: "operation",

    render: (id, record) => (
      <Link href={`/transactions/${record.name}`}>
        <Button icon={<DownOutlined />}>Details</Button>
      </Link>
    ),
  },
];

const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `pay_OD1vFEsk7c8TMk`,
    age: 32,
    address: `Tue May 21, 11:04am`,
    amount: "₹ 2,000.00",
    detail: "91-7000379913",
    status: "Failed",
  });
}

const Payments = () => (
  <Card>
    <Card>
      <List.Item.Meta
        title={"Collected Amount"}
        description="₹0.00"
      ></List.Item.Meta>
    </Card>
    <Flex
      justify="space-between"
      gap={20}
      style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
    >
      <Card style={{ width: "33.3%" }}>
        <List.Item.Meta title={"Refunds"} description="₹0.00"></List.Item.Meta>
      </Card>
      <Card style={{ width: "33.3%" }}>
        <List.Item.Meta title={"Disputes"} description="₹0.00"></List.Item.Meta>
      </Card>
      <Card style={{ width: "33.3%" }}>
        <List.Item.Meta title={"Failed"} description="₹0.00"></List.Item.Meta>
      </Card>
    </Flex>
    <Table size="small" columns={columns} dataSource={data} />
  </Card>
);

export default Payments;
