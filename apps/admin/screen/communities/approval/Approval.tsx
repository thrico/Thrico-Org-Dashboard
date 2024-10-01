"use client";

import React from "react";
import { Avatar, Badge, Image, Space, Table, Tag, Typography } from "antd";
import type { TableProps } from "antd";
import Actions from "./Actions";
import moment from "moment";
import { DataType } from "./ts-types";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";

const columns: TableProps<DataType>["columns"] = [
  {
    width: 200,
    title: "Cover",
    dataIndex: "cover",
    key: "cover",
    render: (_, { cover, status }) => (
      <>
        <Space>
          <Avatar src={`https://cdn.thrico.network/${cover}`} />

          {status === "APPROVED" && (
            <Tag color="green" icon={<CheckCircleOutlined />}>
              {status}
            </Tag>
          )}
          {status === "BLOCKED" && (
            <Tag color="red" icon={<StopOutlined />}>
              {status}
            </Tag>
          )}
          {status === "PENDING" && (
            <Tag color="orange" icon={<StopOutlined />}>
              {status}
            </Tag>
          )}
          {status === "REJECTED" && (
            <Tag color="red" icon={<CloseCircleOutlined />}>
              {status}
            </Tag>
          )}
        </Space>
      </>
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
