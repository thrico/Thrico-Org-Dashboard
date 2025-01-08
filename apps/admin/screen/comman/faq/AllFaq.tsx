import React from "react";
import { Divider, Popconfirm, Space, Table, Tag, notification } from "antd";
import type { TableProps } from "antd";
import { deleteFaq, getModuleFaq } from "../../../graphql/actions/faq";

interface DataType {
  id: String;
  title: string;
  description: string;
}

interface AllFaqProps {
  type: string;
  loading: boolean;
  data: DataType[];
}

const AllFaq: React.FC<AllFaqProps> = ({ type, loading, data }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: "FAQ Deleted",
      placement: "bottomRight",
      type: "success",
      closeIcon: true,
    });
  };
  const onCompleted = () => {
    openNotification();
  };
  const [deleteItem, { loading: deleteLoading }] = deleteFaq({
    onCompleted: onCompleted,
    module: type,
  });
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space split={<Divider type="vertical" />} size="middle">
          <a>Edit</a>
          <Popconfirm
            okButtonProps={{ loading: deleteLoading }}
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
            onConfirm={() =>
              deleteItem({
                variables: {
                  input: {
                    id: record.id,
                  },
                },
              })
            }
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Table loading={loading} columns={columns} dataSource={data} />{" "}
    </>
  );
};

export default AllFaq;
