"use client";

import React, { useState } from "react";

import { Card, message } from "antd";

import {
  addGroupTheme,
  deleteGroupTheme,
  duplicateGroupTheme,
  editGroupTheme,
  getAllGroupTheme,
} from "../../graphql/actions/group/theme";
import Add from "../comman/add/Add";
import List from "../comman/add/List";

const Theme = ({}) => {
  const key = "updatable";
  const [messageApi, contextHolder] = message.useMessage();
  const { data, loading } = getAllGroupTheme({});

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

  const [add, { loading: load }] = addGroupTheme({
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
  const [duplicate, { loading: duplicateLoading }] = duplicateGroupTheme({
    onCompleted,
  });

  const [isModalDelete, setIsModalDelete] = useState(false);

  const handleOkDelete = () => {
    setIsModalDelete(true);
  };

  const handleCancelDelete = () => {
    setIsModalDelete(false);
  };

  const [deleteCat, { loading: deleteLoading }] = deleteGroupTheme({
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

  const [edit, { loading: editLoading }] = editGroupTheme({
    onCompleted() {
      handleCancelEdit();
    },
  });

  return (
    <Card
      style={{ width: "100%" }}
      title="Group Theme"
      extra={
        <Add
          title="Add Theme"
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
        dataSource={data?.getAllGroupTheme}
        title="theme"
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

export default Theme;
