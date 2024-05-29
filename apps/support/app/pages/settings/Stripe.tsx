import { Card, Flex, Form, Input, Switch } from "antd";
import Link from "next/link";
import React from "react";

const Stripe = ({ enabledStripe }) => {
  return (
    <Card
      extra={
        <Form.Item
          style={{ marginTop: 30 }}
          name="enabledStripe"
          label="Enable Stripe"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      }
      title={
        <>
          <Flex vertical>
            <span>Stripe</span>
            <span style={{ fontSize: 12, fontWeight: 400 }}>
              Unlock full access and enable extensive interaction with your
              account by creating a key form Stripe.{" "}
              <Link target="_blank" href="">
                Learn more.
              </Link>
            </span>
          </Flex>
        </>
      }
    >
      <Form.Item
        style={{ width: "30%" }}
        rules={[{ required: enabledStripe, message: "Please input!" }]}
        label={`Publishable key`}
        name="stripeKeyId"
      >
        <Input disabled={!enabledStripe} />
      </Form.Item>
      <Form.Item
        style={{ width: "30%" }}
        rules={[{ required: enabledStripe, message: "Please input!" }]}
        label={`Secret key`}
        name="stripeKeySecret"
      >
        <Input disabled={!enabledStripe} />
      </Form.Item>
    </Card>
  );
};

export default Stripe;
