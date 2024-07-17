import { Button, Flex, Form, Input, Segmented, Space } from "antd";
import React from "react";
import Editor from "../../../comman/Editor";
import { step2Props } from "../../ts-type";

interface props {
  next: any;
  prev: any;
  step2Data: step2Props;
  setStep2Data: any;
}
const Step2 = ({ next, prev, step2Data, setStep2Data }: props) => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    setStep2Data(values);
    next();
  };

  return (
    <Form
      style={{ width: "100%" }}
      form={form}
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
    >
      <Flex style={{ width: "100%" }} gap={10} wrap="wrap">
        <Form.Item style={{ width: "100%" }} hasFeedback label="Description">
          <Editor />
        </Form.Item>

        <Form.Item
          style={{ width: "47%" }}
          rules={[{ required: true }]}
          name="contactPersonFullName"
          label="Contact Person FullName"
          hasFeedback
          initialValue={step2Data.contactPersonEmail}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          style={{ width: "47%" }}
          rules={[{ required: true, type: "email" }]}
          name="contactPersonEmail"
          label="Contact Person Email"
          hasFeedback
          initialValue={step2Data.contactPersonFullName}
        >
          <Input></Input>
        </Form.Item>

        <Form.Item
          style={{ width: "47%" }}
          rules={[{ required: true }]}
          name="contactPersonPhone"
          label="Contact Person Phone Number"
          hasFeedback
          initialValue={step2Data.contactPersonPhone}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item style={{ width: "100%" }}>
          <Flex style={{ width: "100%" }} justify="center">
            <Space>
              <Button htmlType="submit">Previous</Button>
              <Button onClick={() => next()} type="primary">
                Next
              </Button>
            </Space>
          </Flex>
        </Form.Item>
      </Flex>
    </Form>
  );
};

export default Step2;
