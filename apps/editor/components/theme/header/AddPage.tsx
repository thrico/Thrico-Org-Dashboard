import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { v4 as uuid } from "uuid";
import { getCustomPages } from "../../../graphql/actions";
import { Option } from "antd/es/mentions";
type FieldType = {
  id?: string;
  name?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const AddPage = ({ addMenu }) => {
  const { data, loading } = getCustomPages();
  const [form] = Form.useForm();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const filter = data?.getCustomPages.find((set) => set.id === values.page);

    addMenu({
      key: uuid(),
      name: filter.title,
      link: `http://harley-davidson.localhost:4000/${filter.slug}`,
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
      {!loading && (
        <Form.Item
          name="page"
          label="Page"
          rules={[{ required: true, message: "Set Page" }]}
        >
          <Select loading={loading} placeholder="select Page">
            {data?.getCustomPages.map((set) => (
              <Option value={set?.id}>{set?.title}</Option>
            ))}
          </Select>
        </Form.Item>
      )}
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Add Page
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddPage;
