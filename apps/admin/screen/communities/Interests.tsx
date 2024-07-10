"use client";

import React, { useState } from "react";

import { Card, message } from "antd";

import Add from "../comman/add/Add";
import List from "../comman/add/List";
import {
  addGroupInterests,
  deleteGroupInterests,
  duplicateGroupInterests,
  editGroupInterests,
  getAllGroupInterests,
} from "../../graphql/actions/group/interest";

const Interests = ({}) => {
  const key = "updatable";
  const [messageApi, contextHolder] = message.useMessage();
  const { data, loading } = getAllGroupInterests({});

  const onComplete = (callBack) => {
    callBack();
  };

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [add, { loading: load }] = addGroupInterests({
    onCompleted() {
      onClose();
    },
  });

  const onCompleted = () => {
    messageApi.open({
      key,
      type: "success",
      content: "Created",
      duration: 10,
    });
  };
  const [duplicate, { loading: duplicateLoading }] = duplicateGroupInterests({
    onCompleted,
  });

  const [isModalDelete, setIsModalDelete] = useState(false);

  const handleOkDelete = () => {
    setIsModalDelete(true);
  };

  const handleCancelDelete = () => {
    setIsModalDelete(false);
  };

  const [deleteCat, { loading: deleteLoading }] = deleteGroupInterests({
    onCompleted() {
      handleCancelDelete();
    },
  });

  const deleteCategory = (id) => {
    deleteCat({
      variables: {
        input: {
          id,
        },
      },
    });
  };

  const [isModalEdit, setIsModalEdit] = useState(false);

  const handleOkEdit = () => {
    setIsModalEdit(true);
  };

  const handleCancelEdit = () => {
    setIsModalEdit(false);
  };

  const [edit, { loading: editLoading }] = editGroupInterests({
    onCompleted() {
      handleCancelEdit();
    },
  });

  return (
    <Card
      style={{ width: "100%" }}
      title="Group Interests"
      extra={
        <Add
          title="Add  Interests"
          loading={load}
          add={add}
          open={open}
          onClose={close}
          showDrawer={showDrawer}
        />
      }
    >
      {contextHolder}
      <List
        duplicate={duplicate}
        loading={loading}
        duplicateLoading={duplicateLoading}
        dataSource={data?.getAllGroupInterests}
        title="Interests"
        deleteCategory={deleteCategory}
        handleOkDelete={handleOkDelete}
        handleCancelDelete={handleCancelDelete}
        isModalDelete={isModalDelete}
        deleteLoading={deleteLoading}
        isModalEdit={isModalEdit}
        handleCancelEdit={handleCancelEdit}
        handleOkEdit={handleOkEdit}
        editLoading={editLoading}
        edit={edit}
      />
    </Card>
  );
};

export default Interests;
