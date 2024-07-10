import React from "react";
import { DownOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Badge, Button, Card, Dropdown, Space, Table } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import ManageSeo from "./seo/ManageSeo";
import AddPage from "./add/AddPage";
import moment from "moment";
interface DataType {
  key: React.Key;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number;
  creator: string;
  createdAt: string;
}

interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
}

const items = [
  { key: "1", label: "Action 1" },
  { key: "2", label: "Action 2" },
];

const AllPages = ({ data }) => {
  const columns: TableColumnsType<DataType> = [
    { title: "Title", dataIndex: "title", key: "name" },

    {
      title: "Seo",
      dataIndex: "creator",
      render: () => <ManageSeo />,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: () => <>{moment().format("MMMM Do YYYY, h:mm:ss a")}</>,
    },
    {
      title: "Action",
      key: "operation",
      render: () => (
        <Space size="middle">
          <Dropdown menu={{ items }}>
            <Button>
              <BsThreeDotsVertical />
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <Card title={<>Pages</>} extra={<AddPage />}>
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};

export default AllPages;
