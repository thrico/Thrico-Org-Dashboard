import React from "react";
import type { FormProps } from "antd";
import { Button, Card, Checkbox, Form, Input, Space } from "antd";

type FieldType = {
  link?: string;
  name?: string;
};

interface DataType {
  key: string;
  name: string;

  link: string;
}
const List = ({ data, deleteMenu, updateMenu }: DataType) => {
  const onFinish = (values: any) => {
    updateMenu({
      key: data.key,
      ...values,
    });
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ ...data }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Card
        extra={
          <Space>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
            <Button
              onClick={() => deleteMenu(data.key)}
              danger
              type="primary"
              htmlType="submit"
            >
              Delete
            </Button>
          </Space>
        }
        style={{ margin: 0 }}
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

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}></Form.Item>
      </Card>
    </Form>
  );
};

export default List;
