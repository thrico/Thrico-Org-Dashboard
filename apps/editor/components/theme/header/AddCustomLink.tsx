import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { v4 as uuid } from "uuid";
type FieldType = {
  link?: string;
  name?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const AddCustomLink = ({ addMenu }) => {
  const [form] = Form.useForm();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    addMenu({
      key: uuid(),
      ...values,
    });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Link"
        name="link"
        rules={[
          { required: true, message: "Please input your link!" },
          { type: "url", warningOnly: true },
          { type: "string", min: 6 },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Add Menu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddCustomLink;
