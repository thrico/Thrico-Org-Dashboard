"use client";

import React from "react";
import { Badge, Image, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import Actions from "./Actions";
import moment from "moment";
import { DataType } from "./ts-types";

const columns: TableProps<DataType>["columns"] = [
  {
    width: 200,
    title: "Cover",
    dataIndex: "cover",
    key: "cover",
    render: (_, { cover }) => (
      <Image
        width={100}
        height={100}
        style={{ objectFit: "cover" }}
        src={`https://cdn.thrico.network/${cover}`}
      />
    ),
  },
  {
    width: 200,
    title: "Name",
    dataIndex: "title",
    key: "title",
  },

  {
    width: 200,
    title: "Date of Creation",
    dataIndex: "createdAt",
    render: (_, { createdAt }) => <>{moment(createdAt).fromNow()}</>,
  },
  {
    width: 150,
    title: "Status",
    dataIndex: "name",
    key: "name",
    render: (text, { isActive, isBlocked, isApproved }) => (
      <>
        {isBlocked && <Badge status="processing" />}
        {!isApproved && (
          <Tag color="blue" icon={<Badge status="processing" />}>
            Pending
          </Tag>
        )}

        {isApproved && (
          <Tag color="green" icon={<Badge status="success" />}>
            Approved
          </Tag>
        )}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => <Actions data={record} />,
  },
];

const Approval = ({ data, loading }) => (
  <div style={{ overflow: "scroll" }}>
    <Table loading={loading} columns={columns} dataSource={data} />
  </div>
);

export default Approval;
