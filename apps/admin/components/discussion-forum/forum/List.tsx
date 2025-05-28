"use client";

import { useState } from "react";
import { Avatar, Layout, Space, Table, Tabs, Tag, Typography } from "antd";

import type { TableProps } from "antd";

import moment from "moment";
import { getVerificationTag } from "../../../screen/user/utils";
import { discussionForm } from "../ts-types";
import Actions from "./Actions";
import { getStatusTag } from "../utils";
import Vote from "./votes/Vote";
// import Actions from "./drawer/Actions";
// import { getStatusTag, getVerificationTag } from "./utils";

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// Mock data for users

export default function List({ data }: { data: discussionForm[] }) {
  const columns: TableProps<discussionForm>["columns"] = [
    {
      title: "Verification",
      key: "verification",
      render: (_, record) =>
        getVerificationTag(record.verification?.isVerified || false),
      filters: [
        { text: "Verified", value: true },
        { text: "Unverified", value: false },
      ],
      onFilter: (value, record) => record.verification?.isVerified === value,
    },

    {
      title: "Vote",
      dataIndex: "vote",
      key: "title",
      render: (_, record) => <Vote id={record.id} />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Status",
      key: "status",
      render: (_, record) => getStatusTag(record?.status),
    },
    {
      title: "Category",
      key: "category",
      render: (_, record) => <>{record?.category?.name}</>,
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => (
        <Text type="secondary">
          {moment(record?.createdAt).format("MMMM Do YYYY")}
        </Text>
      ),
    },
    {
      title: "Last Update",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (_, record) => (
        <Text type="secondary">{moment(record?.updatedAt).fromNow()}</Text>
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
          locale={{ emptyText: "No forum found matching your criteria" }}
        />
      </Content>
    </Layout>
  );
}
