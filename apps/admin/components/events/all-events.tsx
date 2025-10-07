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
  Spin,
} from "antd";

import type { TableProps } from "antd";

import moment from "moment";

import { getStatusTag } from "../../screen/comman/utils";

import { getVerificationTag } from "../discussion-forum/utils";

import { Event } from "../../graphql/actions/events";

const { Content } = Layout;

// Mock data for users

export default function AllEvents({
  data,
  loading,
}: {
  data: Event[] | undefined;
  loading?: boolean;
}) {
  const columns: TableProps<Event>["columns"] = [
    {
      title: "Event Details",
      dataIndex: "title",
      key: "title",
      width: 300,
      render: (_, record) => {
        const description = (
          <span style={{ textTransform: "capitalize", fontSize: 10 }}>
            {record?.type} • {moment(record?.startDate).format("MMM DD, YYYY")}
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
                      record.cover
                        ? `https://cdn.thrico.network/${record.cover}`
                        : "https://cdn.thrico.network/defaultEventCover.png"
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
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 200,
      render: (_, record) => (
        <div>
          <div>{record?.location?.name || "N/A"}</div>
        </div>
      ),
    },

    {
      title: "Event Date",
      key: "eventDate",
      width: 150,
      render: (_, record) => (
        <div>
          <div>{moment(record?.startDate).format("MMM DD, YYYY")}</div>
          <div style={{ fontSize: 12, color: "#666" }}>{record?.startTime}</div>
        </div>
      ),
    },

    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 100,
      render: (type) => (
        <Tag
          color={
            type === "ONLINE" ? "blue" : type === "HYBRID" ? "purple" : "green"
          }
        >
          {type}
        </Tag>
      ),
    },

    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Tag
          color={
            record?.status === "APPROVED"
              ? "green"
              : record?.status === "PENDING"
                ? "orange"
                : record?.status === "REJECTED"
                  ? "red"
                  : "default"
          }
        >
          {record?.status}
        </Tag>
      ),
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
      title: "Attendees",
      key: "numberOfAttendees",
      dataIndex: "numberOfAttendees",
      width: 100,
    },
  ];

  if (loading) {
    return (
      <Layout style={{ minHeight: "50vh" }}>
        <Content
          style={{
            padding: "24px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "24px" }}>
        <Table
          size="small"
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: "No events found matching your criteria" }}
        />
      </Content>
    </Layout>
  );
}
