"use client";

import { Button, Card, Form, Space, Spin } from "antd";
import React from "react";
import Razorpay from "./Razorpay";
import Stripe from "./Stripe";
import {
  addPaymentDetails,
  checkPaymentDetails,
  updateCurrency,
} from "../../../graphql/actions";
import Currency from "./Currency";

const Settings = () => {
  const { data: details, loading: load } = checkPaymentDetails();

  const [add, { data, loading }] = addPaymentDetails({});
  const onFinish = (values: any) => {
    add({
      variables: {
        input: values,
      },
    });
  };
  const [form] = Form.useForm();
  const enabledStripe = Form.useWatch("enabledStripe", form);
  const enabledRazorpay = Form.useWatch("enabledRazorpay", form);

  return (
    <>
      <Currency />
      {load && <Spin />}
      {!load && (
        <Form
          form={form}
          name="validate_other"
          onFinish={onFinish}
          initialValues={{
            ...details?.checkPaymentDetails,
          }}
        >
          <Card
            extra={
              <Button loading={loading} htmlType="submit" type="primary">
                Update
              </Button>
            }
            title="Update Payments Details"
          >
            <Space style={{ width: "100%" }} direction="vertical">
              <Razorpay enabledRazorpay={enabledRazorpay} />
              <Stripe enabledStripe={enabledStripe} />
            </Space>
          </Card>
        </Form>
      )}
    </>
  );
};

export default Settings;
