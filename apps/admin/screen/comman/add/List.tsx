import { Space, Table, TableProps } from "antd";
import moment from "moment";
import React from "react";
import Actions from "./Actions";

const List = ({
  loading,
  dataSource,
  duplicate,
  duplicateLoading,
  title,
  deleteCategory,
  handleOkDelete,
  handleCancelDelete,
  isModalDelete,
  deleteLoading,
  isModalEdit,
  handleCancelEdit,
  handleOkEdit,
  edit,
  editLoading,
}) => {
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
          <Actions
            title={title}
            loading={duplicateLoading}
            duplicate={duplicate}
            id={record.id}
            deleteCategory={deleteCategory}
            handleOkDelete={handleOkDelete}
            handleCancelDelete={handleCancelDelete}
            isModalDelete={isModalDelete}
            deleteLoading={deleteLoading}
            isModalEdit={isModalEdit}
            handleCancelEdit={handleCancelEdit}
            handleOkEdit={handleOkEdit}
            record={record}
            edit={edit}
            editLoading={editLoading}
          />
        </Space>
      ),
    },
  ];
  return <Table loading={loading} columns={columns} dataSource={dataSource} />;
};

export default List;
