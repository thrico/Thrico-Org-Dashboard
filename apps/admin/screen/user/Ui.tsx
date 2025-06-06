"use client";

import { useState } from "react";
import {
  Avatar,
  Layout,
  List,
  Space,
  Table,
  Tabs,
  Tag,
  Typography,
} from "antd";

import type { TableProps } from "antd";

import { userStatus } from "./ts-types";
import moment from "moment";
import Actions from "./drawer/Actions";
import { getStatusTag, getVerificationTag } from "./utils";

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// Mock data for users

export default function UsersPage({ users }: { users: userStatus[] }) {
  const columns: TableProps<userStatus>["columns"] = [
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
      title: "User",
      dataIndex: "user",
      key: "name",
      width: 200,
      render: (_, record) => (
        <List>
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  size={60}
                  src={`https://cdn.thrico.network/${record?.user?.avatar}`}
                />
              }
              title={record.user?.firstName + " " + record.user?.lastName}
              description={record.user?.about?.currentPosition}
            />
          </List.Item>
        </List>
      ),
    },
    {
      title: "Contact",
      key: "contact",
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Text>{record.user.email}</Text>
          <Text type="secondary">
            +{record?.user?.profile?.phone?.countryCode}-
            {record?.user?.profile?.phone?.phoneNumber}
          </Text>
        </Space>
      ),
    },
    {
      title: "Location",

      dataIndex: "location",
      key: "location",
      render: (_, record) => (
        <Text type="secondary">{record?.user?.location.address}</Text>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => getStatusTag(record?.status),
    },
    {
      title: "Joined",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => (
        <Text type="secondary">
          {moment(record?.user?.createdAt).format("MMMM Do YYYY")}
        </Text>
      ),
    },
    {
      title: "Last Active",
      dataIndex: "lastActive",
      key: "lastActive",
      render: (_, record) => (
        <Text type="secondary">
          {record?.lastActive && moment(record?.lastActive).fromNow()}
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
          size="small"
          columns={columns}
          dataSource={users}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: "No users found matching your criteria" }}
        />
      </Content>
    </Layout>
  );
}
