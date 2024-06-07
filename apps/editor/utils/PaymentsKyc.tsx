import React, { useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { addPaymentDetails } from "../graphql/actions";

const PaymentKyc = ({ open, setOpen, refresh }) => {
  const [add, { data, loading }] = addPaymentDetails({
    onCompleted(data) {
      refresh();
    },
  });
  const [form] = Form.useForm<{ paymentMod: string }>();
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const onFinish = (values: any) => {
    add({
      variables: {
        input: values,
      },
    });
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const primaryMode = Form.useWatch("primaryMode", form);
  const formItemLayout = {
    labelCol: {
      xs: { span: 10 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  return (
    <>
      <Modal
        footer={[]}
        title="Title"
        width={800}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Please enabled Payment to continue</p>
        <Form
          style={{ width: 700 }}
          {...formItemLayout}
          form={form}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Primary Payment Mode"
            name="primaryMode"
            rules={[
              { required: true, message: "Please input your Primary Mode" },
            ]}
          >
            <Select placeholder="Select Payment Mode">
              <Select.Option value="Razorpay">Razorpay</Select.Option>
              <Select.Option d value="Stripe">
                Stripe
              </Select.Option>
              <Select.Option value="Paypal">Paypal</Select.Option>
            </Select>
          </Form.Item>
          {primaryMode && (
            <>
              <Form.Item
                rules={[{ required: true, message: "Please input!" }]}
                label={`${primaryMode} Key Id`}
                name="keyId"
              >
                <Input />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "Please input!" }]}
                label={`${primaryMode} Key Secret`}
                name="keySecret"
              >
                <Input />
              </Form.Item>
            </>
          )}

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PaymentKyc;
