import React, { useState } from "react";

import { Table, Pagination, Avatar } from "antd";

import { getAllMentor } from "../../../graphql/actions/mentorship/category";
import { CheckCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";
import Actions from "./Actions";
import { MentorStatus } from "../../../components/layout/constants/ts-types";

const columns = [
  {
    title: "Status",
    dataIndex: "isApproved",
    key: "isApproved",
    render: (text) => (
      <>
        {text && (
          <CheckCircleOutlined style={{ color: "yellowgreen", fontSize: 20 }} />
        )}
        {!text && (
          <PauseCircleOutlined style={{ color: "orange", fontSize: 20 }} />
        )}
      </>
    ),
  },

  {
    title: "Avatar",
    dataIndex: "user",
    key: "user",
    render: (text) => (
      <Avatar src={`https://cdn.thrico.network/${text?.user?.avatar}`} />
    ),
  },

  {
    title: "Name",
    dataIndex: "user",
    key: "name",
    render: (text, record) => (
      <>
        {text?.user?.firstName} {text?.user?.lastName}
      </>
    ),
  },
  {
    title: "Display Name",
    dataIndex: "displayName",
    key: "displayName",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (text, record) => <> {text?.title}</>,
  },

  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <>
        <Actions data={record} />
      </>
    ),
  },
];

interface AllMentorProps {
  status: MentorStatus;
}

const AllMentor = ({ status }: AllMentorProps) => {
  const { loading, data } = getAllMentor({
    variables: {
      input: {
        status,
      },
    },
  });
  const [current, setCurrent] = useState(1);

  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data?.getAllMentor}
        pagination={false}
      />
    </>
  );
};

export default AllMentor;
