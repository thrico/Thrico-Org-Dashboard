"use client";

import React from "react";
import { Button, Card, List, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import Actions from "./Actions";
import { CalendarOutlined } from "@ant-design/icons";
import moment from "moment";
import AddChallenge from "../add/Form";
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Event Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },

  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Registration Date",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        <List.Item.Meta
          description={
            <>
              <CalendarOutlined /> {moment().format("MMMM Do YYYY, h:mm")}{" "}
            </>
          }
        />
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Actions />
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const Challenges = () => (
  <Card title={"Program and  Challenges"} extra={<AddChallenge />}>
    <Table columns={columns} dataSource={data} />
  </Card>
);

export default Challenges;
