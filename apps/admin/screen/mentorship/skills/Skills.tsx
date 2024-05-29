"use client";

import React from "react";

import { Card, Space, Table, TableProps, Tag } from "antd";

import Actions from "./Actions";
import { getAllMentorCategory } from "../../../graphql/actions/mentorship/category";
import moment from "moment";
import AddSkills from "./AddSkills";
import { getAllMentorSkills } from "../../../graphql/actions/mentorship/skills";

const Skills = () => {
  const { data, loading } = getAllMentorSkills({});
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
    <Card title="Mentorship Skills" extra={<AddSkills />}>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data?.getAllMentorSkills}
      />
    </Card>
  );
};

export default Skills;
