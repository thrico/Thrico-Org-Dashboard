"use client";

import { useState } from "react";
import { Avatar, Layout, Space, Table, Tabs, Tag, Typography } from "antd";

import type { TableProps } from "antd";

import moment from "moment";
// import { getVerificationTag } from "../../../screen/user/utils";

import { getStatusTag } from "../../screen/comman/utils";
import { communityEntity } from "./ts-types";
import Actions from "./Actions";
import { getVerificationTag } from "../discussion-forum/utils";
// import Actions from "./Actions";
// import { getStatusTag } from "../utils";

// import Actions from "./drawer/Actions";
// import { getStatusTag, getVerificationTag } from "./utils";

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// Mock data for users

export default function List({ data }: { data: communityEntity[] }) {
  const columns: TableProps<communityEntity>["columns"] = [
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

    // {
    //   title: "Vote",
    //   dataIndex: "vote",
    //   key: "title",
    //   render: (_, record) => <Vote id={record.id} />,
    // },

    {
      title: "Cover",
      dataIndex: "cover",
      key: "cover",
      render: (_, record) => (
        <Avatar src={`https://cdn.thrico.network/${record.cover}`} />
      ),
    },

    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Status",
      key: "status",
      render: (_, record) => getStatusTag(record?.status),
    },
    {
      title: "Privacy",
      key: "privacy",
      render: (_, record) => (
        <span style={{ textTransform: "capitalize" }}>{record?.privacy}</span>
      ),
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
