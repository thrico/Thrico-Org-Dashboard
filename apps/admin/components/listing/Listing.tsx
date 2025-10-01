"use client";

import { useState } from "react";
import {
  Avatar,
  Layout,
  Space,
  Table,
  Tabs,
  Tag,
  Typography,
  List as AntList,
} from "antd";

import type { TableProps } from "antd";

import moment from "moment";
// import { getVerificationTag } from "../../../screen/user/utils";

import { getStatusTag } from "../../screen/comman/utils";

// import Actions from "./Actions";
import { getVerificationTag } from "../discussion-forum/utils";
import { GlobalOutlined, LockOutlined } from "@ant-design/icons";
import { MarketPlaceListing } from "../../graphql/actions/listing";
import { getCurrencySymbol } from "../../screen/Currency";
import Actions from "./Action";
// import Actions from "./Actions";
// import { getStatusTag } from "../utils";

// import Actions from "./drawer/Actions";
// import { getStatusTag, getVerificationTag } from "./utils";

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// Mock data for users

export default function Listing({
  data,
}: {
  data: MarketPlaceListing[] | undefined;
}) {
  const columns: TableProps<MarketPlaceListing>["columns"] = [
    {
      title: "Listing",
      dataIndex: "cover",
      key: "cover",
      width: 250,
      render: (_, record) => {
        const price =
          getCurrencySymbol(record?.currency) +
          record?.price +
          `(${record.category})`;
        return (
          <AntList style={{ width: "100%" }}>
            <AntList.Item>
              <AntList.Item.Meta
                avatar={
                  record?.media?.length > 0 ? (
                    <Avatar
                      shape="square"
                      style={{ width: 60 }}
                      src={`https://cdn.thrico.network/${record.media?.[0]?.url}`}
                    />
                  ) : (
                    <Avatar shape="square" style={{ width: 60 }} />
                  )
                }
                title={record?.title}
                description={price}
              />
            </AntList.Item>
          </AntList>
        );
      },
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "location",
      dataIndex: "location",
      key: "Location",
      width: 250,
    },

    {
      title: "Status",
      key: "status",
      render: (_, record) => getStatusTag(record?.status),
    },
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
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => (
        <>{moment(record?.createdAt).format("MMMM Do YYYY")}</>
      ),
    },
    {
      title: "Last Update",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (_, record) => <>{moment(record?.updatedAt).fromNow()}</>,
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
          dataSource={data}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: "No Listing found matching your criteria" }}
        />
      </Content>
    </Layout>
  );
}
