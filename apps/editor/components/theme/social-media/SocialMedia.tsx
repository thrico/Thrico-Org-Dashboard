"use client";
import { Button, Card, Form, Input } from "antd";
import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { CiInstagram, CiLinkedin, CiYoutube } from "react-icons/ci";
import {
  getSocialMedia,
  updateSocialMedia,
} from "../../../graphql/actions/user";
const SocialMedia = () => {
  const { data, loading } = getSocialMedia();
  const [update, { loading: loadingBtn }] = updateSocialMedia();
  const [form] = Form.useForm();
  console.log(data?.getSocialMedia);
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
        style={{ maxWidth: 600 }}
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
            name="twitter"
            label="Twitter"
          >
            <Input addonAfter={<FaXTwitter />} />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true },
              { type: "url", warningOnly: true },
              { type: "string", min: 6 },
            ]}
            name="linkedin"
            label="linkedin"
          >
            <Input addonAfter={<CiLinkedin />} />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true },
              { type: "url", warningOnly: true },
              { type: "string", min: 6 },
            ]}
            name="instagram"
            label="Instagram"
          >
            <Input addonAfter={<CiInstagram />} />
          </Form.Item>

          <Form.Item
            rules={[
              { required: true },
              { type: "url", warningOnly: true },
              { type: "string", min: 6 },
            ]}
            name="youtube"
            label="Youtube"
          >
            <Input addonAfter={<CiYoutube />} />
          </Form.Item>
        </Card>
      </Form>
    </Card>
  );
};

export default SocialMedia;
