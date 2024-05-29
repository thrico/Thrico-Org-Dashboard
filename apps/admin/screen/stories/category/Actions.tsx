import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, message, Space } from "antd";
import { BsThreeDots } from "react-icons/bs";

import Delete from "./Delete";
import { duplicateAlumniStoryCategory } from "../../../graphql/actions/alumniStories/category";

const Actions = ({ id }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const onCompleted = () => {
    messageApi.open({
      key,
      type: "success",
      content: "Created",
      duration: 10,
    });
  };
  const [add, { loading, error }] = duplicateAlumniStoryCategory({
    onCompleted,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const [isModalDelete, setIsModalDelete] = useState(false);

  const handleOkDelete = () => {
    setIsModalDelete(false);
  };

  const handleCancelDelete = () => {
    setIsModalDelete(false);
  };
  const showModalDelete = () => {
    setIsModalDelete(true);
  };

  const items: MenuProps["items"] = [
    {
      label: "Duplicate",
      key: "5",
      dashed: true,
      onClick: () =>
        add({
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
      onClick: () => showModal(),
    },
    {
      type: "divider",
    },
    {
      label: "Delete",
      key: "8",
      onClick: () => showModalDelete(),
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
      />
    </>
  );
};

export default Actions;
