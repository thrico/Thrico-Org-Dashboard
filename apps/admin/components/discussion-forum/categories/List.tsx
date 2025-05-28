"use client";

import { useState } from "react";
import { Avatar, Layout, Space, Table, Tabs, Tag, Typography } from "antd";

import type { TableProps } from "antd";

import moment from "moment";
import { discussionCategory } from "../ts-types";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Actions from "./Actions";
// import Actions from "./drawer/Actions";
// import { getStatusTag, getVerificationTag } from "./utils";

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// Mock data for users

export default function List({ data }: { data: discussionCategory[] }) {
  const columns: TableProps<discussionCategory>["columns"] = [
    // {
    //   title: "Verification",
    //   key: "verification",
    //   render: (_, record) =>
    //     getVerificationTag(record.verification?.isVerified || false),
    //   filters: [
    //     { text: "Verified", value: true },
    //     { text: "Unverified", value: false },
    //   ],
    //   onFilter: (value, record) => record.verification?.isVerified === value,
    // },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },

    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <>
          {record.isActive && (
            <Tag icon={<CheckCircleOutlined />} color="success">
              Active
            </Tag>
          )}

          {!record.isActive && (
            <Tag icon={<CloseCircleOutlined />} color="warning">
              In Active
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => (
        <Text type="secondary">
          {moment(record.createdAt).format("MMMM Do YYYY")}
        </Text>
      ),
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (_, record) => (
        <Text type="secondary">
          {record?.updatedAt && moment(record?.updatedAt).fromNow()}
        </Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        return <Actions {...record} />;
      },
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "24px" }}>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: "No users found matching your criteria" }}
        />
      </Content>
    </Layout>
  );
}
