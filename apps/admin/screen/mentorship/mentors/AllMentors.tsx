import React, { useState } from "react";

import { Table, Divider, Tag, Pagination, Avatar } from "antd";

import Delete from "../category/Delete";
import { getAllMentor } from "../../../graphql/actions/mentorship/category";
import {
  BlockOutlined,
  CheckCircleOutlined,
  PauseCircleOutlined,
} from "@ant-design/icons";
import Actions from "./Actions";

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
    render: (text) => <Avatar src={text?.alumni?.avatar} />,
  },

  {
    title: "Name",
    dataIndex: "user",
    key: "name",
    render: (text, record) => (
      <>
        {text?.alumni?.firstName} {text?.alumni?.lastName}
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

const pageSize = 2;

const getData = (current, pageSize) => {
  // Normally you should get the data from the server
  return data.slice((current - 1) * pageSize, current * pageSize);
};

// Custom pagination component
const MyPagination = ({ total, onChange, current }) => {
  return (
    <Pagination
      onChange={onChange}
      total={total}
      current={current}
      pageSize={pageSize}
    />
  );
};

const AllMentor = () => {
  const { loading, data } = getAllMentor({});
  const [current, setCurrent] = useState(1);

  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data?.getAllMentor}
        pagination={false}
      />
      {/* <MyPagination
        total={data.length}
        current={current}
        onChange={setCurrent}
      /> */}
    </>
  );
};

export default AllMentor;
