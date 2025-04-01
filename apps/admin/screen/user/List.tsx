import React, { useState } from "react";
import { Avatar, Button, Space, Table, Tag, Typography } from "antd";
import type { TableColumnsType } from "antd";


import ApproveUser from "./drawer/ApproveDrawer";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import Actions from "./drawer/Actions";

interface userData {
  status: string;
  user: {
    avatar: string;
    firstName: string;
    lastName: string;
    email: string;
    id: string;
  };
}

const columns: TableColumnsType<userData> = [
  {
    title: "Status",
    dataIndex: "status",
    render: (props, record) => (
      <Space>
        <Avatar src={`https://cdn.thrico.network/${record?.user?.avatar}`} />

        <Typography>
          {record?.user?.firstName} {record?.user?.lastName}
        </Typography>
        {props === "APPROVED" && (
          <Tag color="green" icon={<CheckCircleOutlined />}>
            {props}
          </Tag>
        )}
        {props === "BLOCKED" && (
          <Tag color="red" icon={<StopOutlined />}>
            {props}
          </Tag>
        )}
        {props === "PENDING" && (
          <Tag color="orange" icon={<StopOutlined />}>
            {props}
          </Tag>
        )}
        {props === "REJECTED" && (
          <Tag color="red" icon={<CloseCircleOutlined />}>
            {props}
          </Tag>
        )}
      </Space>
    ),
  },

  {
    title: "Email",
    dataIndex: "user",
    render: (props) => <>{props?.email}</>,
  },
  {
    title: "Action",
    dataIndex: "user",
    render: (props) => (
      <>
        <Actions id={props.id} />
      </>
    ),
  },
];

const List = ({ dataSource, setDataSource, loading }: list) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  console.log(dataSource);
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table
        loading={loading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  );
};

export default List;
