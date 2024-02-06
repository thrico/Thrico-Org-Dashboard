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
    style={{
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
    }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    layout="vertical"
  >
    <Form.Item<FieldType>
      label="Email"
      name="username"
      style={{ width: "100%", marginBottom: "3rem" }}
      rules={[{ type: "email", required: true }]}
      hasFeedback
      help="Kindly provide your official email address; avoid using email services such as Gmail, Outlook, or Yahoo."
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="First Name"
      style={{ width: "48%" }}
      name="username"
      rules={[{ type: "email", required: true }]}
      hasFeedback
    >
      <Input />
    </Form.Item>
    <Form.Item<FieldType>
      label="Last Name"
      name="username"
      style={{ width: "48%" }}
      rules={[{ type: "email", required: true }]}
      hasFeedback
    >
      <Input />
    </Form.Item>
    <Form.Item<FieldType>
      label="Password"
      name="username"
      style={{ width: "48%" }}
      rules={[{ type: "email", required: true }]}
      hasFeedback
    >
      <Input />
    </Form.Item>
    <Form.Item<FieldType>
      label="Confirm Password"
      style={{ width: "48%", marginBottom: "3rem" }}
      name="username"
      rules={[{ type: "email", required: true }]}
      hasFeedback
    >
      <Input />
    </Form.Item>

    <Form.Item style={{ width: "100%" }}>
      <Button style={{ width: "100%" }} type="primary" htmlType="submit">
        Create Account
      </Button>
    </Form.Item>
  </Form>
);

export default LoginForm;
