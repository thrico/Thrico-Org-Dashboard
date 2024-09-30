"use client";
import { Button, Card, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { CiInstagram, CiLinkedin, CiYoutube } from "react-icons/ci";
import {
  getSocialMedia,
  updateSocialMedia,
} from "../../../../graphql/actions/user";
import Cover from "../../../../screen/comman/Cover";
import { getFaviconIcon, updateFiviconIcon } from "../../../../graphql/actions";

const Customization = () => {
  const { data, loading } = getFaviconIcon();
  const [update, { loading: loadingBtn }] = updateFiviconIcon({});
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);

    update({
      variables: {
        input: { ...values, logo: coverLogo, favicon: coverFavicon },
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

  const [coverLogo, setCoverLogo] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [coverFavicon, setCoverFavicon] = useState("");
  const [faviconUrl, setFaviconUrl] = useState(``);
  useEffect(() => {
    setImageUrl(
      `https://thrico.blr1.cdn.digitaloceanspaces.com/${data?.getFaviconIcon?.logo}`
    );
    setFaviconUrl(
      `https://thrico.blr1.cdn.digitaloceanspaces.com/${data?.getFaviconIcon?.logo}`
    );
  }, [data?.getFaviconIcon]);

  return (
    <Card loading={loading}>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          ...data?.getFaviconIcon,
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
            name="website"
            label="Organization Website"
          >
            <Input />
          </Form.Item>
          <Form.Item label="Organization Logo">
            <Cover
              title={false}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              setCover={setCoverLogo}
              buttonText="Update Image"
            />
          </Form.Item>

          <Form.Item
            help="Favicon should be a square and atleast 48px*48px."
            label="Favicon"
          >
            <Cover
              title={false}
              imageUrl={faviconUrl}
              setImageUrl={setFaviconUrl}
              setCover={setCoverFavicon}
              buttonText="Update Image"
            />
          </Form.Item>
        </Card>
      </Form>
    </Card>
  );
};

export default Customization;
