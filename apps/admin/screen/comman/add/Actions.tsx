import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, message, Space } from "antd";
import { BsThreeDots } from "react-icons/bs";

import Delete from "./Delete";
import { duplicateMentorShipCategory } from "../../../graphql/actions/mentorship/category";
import Edit from "./Edit";

const Actions = ({
  id,
  duplicate,
  loading,
  title,
  handleOkDelete,
  handleCancelDelete,
  isModalDelete,
  deleteCategory,
  deleteLoading,
  isModalEdit,
  handleCancelEdit,
  handleOkEdit,
  record,
  edit,
  editLoading,
}) => {
  const { active, setActive } = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const stateSave = (data) => {
    setActive(data);
  };
  const items: MenuProps["items"] = [
    {
      label: "Duplicate",
      key: "5",
      dashed: true,
      onClick: () =>
        duplicate({
          variables: {
            input: {
              id,
            },
          },
        }),
    },
    {
      label: "Rename",
      key: "7",
      onClick: () => {
        handleOkEdit();
      },
    },
    {
      type: "divider",
    },
    {
      label: "Delete",
      key: "8",
      onClick: () => {
        handleOkDelete();
      },

      danger: true,
    },
  ];
  const key = "updatable";
  return (
    <>
      {contextHolder}
      <Dropdown
        overlayStyle={{ width: 200 }}
        menu={{ items }}
        trigger={["click"]}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Button type="text">
              <BsThreeDots />
            </Button>
          </Space>
        </a>
      </Dropdown>
      {console.log(active, record)}
      {loading &&
        messageApi.open({
          key,
          type: "loading",
          content: "Duplicating Category",
        })}

      <Delete
        id={id}
        isModalOpen={isModalDelete}
        handleOk={handleOkDelete}
        handleCancel={handleCancelDelete}
        title={title}
        deleteCategory={deleteCategory}
        loading={deleteLoading}
      />
      <Edit
        record={record}
        isModalOpen={isModalEdit}
        handleOk={handleOkEdit}
        handleCancel={handleCancelEdit}
        title={title}
        loading={editLoading}
        edit={edit}
      />
    </>
  );
};

export default Actions;
