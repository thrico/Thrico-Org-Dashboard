"use client";

import React from "react";

import { Card, Space, Table, TableProps, Tag } from "antd";
import AddCategory from "./AddCategory";
import Actions from "./Actions";

import moment from "moment";
import { getAllAlumniStoriesCategory } from "../../../graphql/actions/alumniStories/category";

const Category = () => {
  const { data, loading } = getAllAlumniStoriesCategory({});
  interface DataType {
    title: string;
    createdAt: Date;
    updatedAt: Date;
    id: String;
  }

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (props) => <>{moment(props).format("MMMM Do YYYY")}</>,
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (props) => <>{moment(props).format("MMMM Do YYYY")}</>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Actions id={record.id} />
        </Space>
      ),
    },
  ];

  return (
    <Card title="Stories Category" extra={<AddCategory />}>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data?.getAllAlumniStoriesCategory}
      />
    </Card>
  );
};

export default Category;
