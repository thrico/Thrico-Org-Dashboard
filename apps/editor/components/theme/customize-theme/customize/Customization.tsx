"use client";
import { Button, Card, Form, Input } from "antd";
import React, { useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { CiInstagram, CiLinkedin, CiYoutube } from "react-icons/ci";
import {
  getSocialMedia,
  updateSocialMedia,
} from "../../../../graphql/actions/user";
import Cover from "../../../../screen/comman/Cover";

const Customization = () => {
  const [imageUrl, setImageUrl] = useState(
    "https://cdn.thrico.network/20240612-aibxc%7D"
  );
  const [cover, setCover] = useState("");
  const { data, loading } = getSocialMedia();
  const [update, { loading: loadingBtn }] = updateSocialMedia();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);

    update({
      variables: {
        input: values,
      },
    });
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <Card loading={loading}>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          ...data?.getSocialMedia,
        }}
        style={{ maxWidth: "70%" }}
        scrollToFirstError
      >
        <Card
          extra={
            <Button loading={loadingBtn} htmlType="submit" type="primary">
              Update
            </Button>
          }
        >
          <Form.Item
            rules={[
              { required: true },
              { type: "url", warningOnly: true },
              { type: "string", min: 6 },
            ]}
            name="organizationWebsite"
            label="Organization Website"
          >
            <Input />
          </Form.Item>
          <Form.Item label="Organization Logo">
            <Cover
              title={false}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              setCover={setCover}
              buttonText="Update Image"
            />
          </Form.Item>

          <Form.Item
            help="Favicon should be a square and atleast 48px*48px."
            label="Favicon"
          >
            <Cover
              title={false}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              setCover={setCover}
              buttonText="Update Image"
            />
          </Form.Item>
        </Card>
      </Form>
    </Card>
  );
};

export default Customization;
