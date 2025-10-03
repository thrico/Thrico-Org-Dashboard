import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { registerAsAdmin } from "../../../components/graphql/actions";
import toast from "react-hot-toast";
import { Redirect } from "../../../components/Redirect/Redirect";
import { useRouter } from "next/navigation";
// const tempEmailDomains = [
//   "mailinator.com",
//   "duck.com",
//   "gmail.com",
//   "outlook.com",
//   "yahoo.com",
//   // add more temp email domains here
// ];
const LoginForm = () => {
  const router = useRouter();
  const [register, { data, loading }] = registerAsAdmin({
    onCompleted() {
      toast.success(
        "User successfully registered. Please proceed to login to continue."
      );
      router.push("/login");
    },
  });

  const onFinish = (values: any) => {
    // router.push("/auth/otp/sdsdds");
    register({
      variables: { input: values },
    });
  };
  return (
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
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item
        label="Email"
        name="email"
        style={{ width: "100%" }}
        rules={[
          {
            required: true,
            type: "email",
            message: "The input is not valid E-mail!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              const email = getFieldValue("email").split("@")[1];

              if (!value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(
                  "Kindly provide your official email address; avoid using email services such as Gmail, Outlook, or Yahoo."
                )
              );
            },
          }),
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="First Name"
        style={{ width: "48%" }}
        name="firstName"
        rules={[{ required: true, message: "" }]}
        hasFeedback
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        style={{ width: "48%" }}
        rules={[{ required: true, message: "" }]}
        hasFeedback
      >
        <Input />
      </Form.Item>
      <Form.Item
        style={{ width: "48%" }}
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          {
            min: 6,
            max: 12,
            message: "Password must be between 6 and 12 characters!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        style={{ width: "48%" }}
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          { required: true, message: "Please confirm your password" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item style={{ width: "100%", marginTop: "1rem" }}>
        <Button
          loading={loading}
          style={{ width: "100%" }}
          type="primary"
          htmlType="submit"
        >
          Create Account
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
