"use client";

import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useParams, useRouter } from "next/navigation";
import { loginAsAdmin, otpLogin } from "../../../components/graphql/actions";
import toast from "react-hot-toast";
import { InputOTP } from "antd-input-otp";
import { useTokenStore } from "../../../components/store/store";
const tempEmailDomains = [
  "mailinator.com",
  "duck.com",
  "gmail.com",
  "outlook.com",
  "yahoo.com",
  // add more temp email domains here
];

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const OtpForm = () => {
  const storeToken = useTokenStore((state) => state.storeToken);
  const { id } = useParams();
  const router = useRouter();
  const [login, { data, loading }] = otpLogin({
    async onCompleted(data: any) {
      await toast.success("Login Success");
      await storeToken(data?.otpLogin?.token);
      await router.push(
        `http://localhost:20242/auth/callback?code=${data?.otpLogin?.token}`
      );
    },
  });
  const [form] = Form.useForm();
  const email = Form.useWatch("email", form);

  const [disable, isDisable] = React.useState(true);

  const onFinish = (values: any) => {
    const { otp } = values;
    const value = { otp: otp.toString().replaceAll(",", ""), id: id };

    login({
      variables: { input: value },
    });
  };

  return (
    <Form
      name="basic"
      form={form}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
      size="large"
    >
      {process.env.DASHBOARD_URL}
      <Form.Item
        style={{ marginTop: 20 }}
        name="otp"
        className="center-error-message"
        rules={[
          {
            required: true,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              console.log(getFieldValue("otp").length);

              if (getFieldValue("otp").length === 4) {
                isDisable(false);
                return Promise.resolve();
              }

              return Promise.reject(isDisable(true));
            },
          }),
        ]}
      >
        <InputOTP
          autoFocus
          wrapperClassName={"otp-input"}
          inputType="numeric"
          length={4}
        />
      </Form.Item>

      <Form.Item style={{ width: "50%" }}>
        <Button
          loading={loading}
          disabled={disable}
          style={{ width: "100%" }}
          type="primary"
          htmlType="submit"
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default OtpForm;
