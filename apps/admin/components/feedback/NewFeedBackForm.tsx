"use client";

import { useState } from "react";
import Link from "next/link";
import { SaveOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Space } from "antd";

import NewFormPage from "../comman/form/Create";
import { AddCustomForm } from "../../graphql/actions/customForm";
import { useFormStore } from "../../store/useFormStore";

export default function NewForm() {
  const {
    formTitle,
    formDescription,
    questions,
    formSettings,
    endDate,
    previewType,
  } = useFormStore();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [form] = Form.useForm();

  const onCompleted = () => {
    setOpen(false);
  };
  const onFinish = () => {
    add({
      variables: {
        input: {
          title: formTitle,
          description: formDescription,
          endDate,
          previewType,
          appearance: formSettings,
          fields: questions,
        },
      },
    });
  };

  const [add, { loading }] = AddCustomForm({
    onCompleted,
  });

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Create New Form
      </Button>
      <Drawer
        title="Create New Form"
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
        width={"100%"}
        extra={
          <Space>
            <Button>
              <Link href="/polls">Cancel</Link>
            </Button>
            <Button
              onClick={() => onFinish()}
              type="primary"
              icon={<SaveOutlined />}
              loading={loading}
            >
              Create New Form
            </Button>
          </Space>
        }
      >
        <NewFormPage add={add} />
      </Drawer>
    </>
  );
}
