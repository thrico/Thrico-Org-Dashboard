import React from "react";
import { Button, Checkbox, Form, Input } from "antd";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const LoginForm = () => (
  <Form
    name="basic"
    style={{ width: "100%" }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    layout="vertical"
    size="large"
  >
    <Form.Item<FieldType>
      label="Email"
      name="username"
      rules={[{ type: "email", required: true }]}
      hasFeedback
    >
      <Input />
    </Form.Item>

    <Form.Item style={{ width: "100%" }}>
      <Button style={{ width: "100%" }} type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default LoginForm;
