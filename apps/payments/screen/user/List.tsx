import React, { useState } from "react";
import { Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import { list, userData } from "./ts-types";

const columns: TableColumnsType<userData> = [
  {
    title: "FullName",
    dataIndex: "alumni",
    render: (props) => (
      <>
        {" "}
        {props?.firstName} {props?.lastName}
      </>
    ),
  },
  {
    title: "Email",
    dataIndex: "age",
  },
  {
    title: "DOB",
    dataIndex: "address",
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

  console.log();
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
