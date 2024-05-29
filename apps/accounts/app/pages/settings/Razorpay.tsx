import { Button, Card, Flex, Form, Input, List, Space, Switch } from "antd";
import Link from "next/link";
import React from "react";

const Razorpay = ({ enabledRazorpay }) => {
  console.log(enabledRazorpay);
  return (
    <Card
      style={{ width: "100%" }}
      actions={[]}
      title={
        <>
          <Flex vertical>
            <span>Razorpay</span>
            <span style={{ fontSize: 12, fontWeight: 400 }}>
              Unlock full access and enable extensive interaction with your
              account by creating a key form Razorpay.{" "}
              <Link
                target="_blank"
                href="https://razorpay.com/docs/api/customers/"
              >
                Learn more.
              </Link>
            </span>
          </Flex>
        </>
      }
      extra={
        <Form.Item
          style={{ marginTop: 30 }}
          name="enabledRazorpay"
          label="Enable Razorpay"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      }
    >
      <Form.Item
        style={{ width: "30%" }}
        rules={[{ required: enabledRazorpay, message: "Please input!" }]}
        label={` Key Id`}
        name="razorpayKeyId"
      >
        <Input disabled={!enabledRazorpay} />
      </Form.Item>
      <Form.Item
        style={{ width: "30%" }}
        rules={[{ required: enabledRazorpay, message: "Please input!" }]}
        label={` Key Secret`}
        name="razorpayKeySecret"
      >
        <Input disabled={!enabledRazorpay} />
      </Form.Item>
    </Card>
  );
};

export default Razorpay;
