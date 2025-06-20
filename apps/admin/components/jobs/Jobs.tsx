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

import { getCurrencySymbol } from "../../screen/Currency";
import { Job } from "../../graphql/actions/jobs";

// import Actions from "./Action";
// import Actions from "./Actions";
// import { getStatusTag } from "../utils";

// import Actions from "./drawer/Actions";
// import { getStatusTag, getVerificationTag } from "./utils";

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// Mock data for users

export default function Jobs({ data }: { data: Job[] | undefined }) {
  const columns: TableProps<Job>["columns"] = [
    {
      title: "Job Title",
      dataIndex: "cover",
      key: "cover",
      width: 250,
      render: (_, record) => {
        const description = (
          <span style={{ textTransform: "capitalize", fontSize: 10 }}>
            {record?.workplaceType} ({record?.jobType})
          </span>
        );
        return (
          <AntList style={{ width: "100%" }}>
            <AntList.Item>
              <AntList.Item.Meta
                avatar={
                  <Avatar
                    shape="square"
                    style={{ width: 60 }}
                    src={
                      `https://cdn.thrico.network/${record.company?.logo}` ||
                      "/placeholder.svg"
                    }
                  />
                }
                title={record?.title}
                description={description}
              />
            </AntList.Item>
          </AntList>
        );
      },
    },

    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (_, record) => <>{record.company.name}</>,
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
      title: "Applications",
      key: "numberOfApplicant",
      dataIndex: "numberOfApplicant",
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

    // {
    //   title: "Actions",
    //   key: "actions",
    //   render: (_, record) => {
    //     return <Actions {...record} />;
    //   },
    // },
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
