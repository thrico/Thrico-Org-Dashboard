import React, { useState } from "react";
import type { DrawerProps, FormProps, RadioChangeEvent } from "antd";
import { Button, Card, Drawer, Flex, Form, Input, Radio, Space } from "antd";
import SerpPreview from "react-serp-preview";
import TextArea from "antd/es/input/TextArea";

const ManageSeo = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  type FieldType = {
    titleTag?: string;
    titleDescription?: string;
  };
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const titleTag = Form.useWatch("titleTag", form);
  const titleDescription = Form.useWatch("titleDescription", form);
  return (
    <>
      <Space>
        <Button type="primary" onClick={showDrawer}>
          Edit
        </Button>
      </Space>
      <Drawer
        closable={false}
        style={{ width: 1000 }}
        placement={"left"}
        onClose={onClose}
        open={open}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ height: "100%" }}
          initialValues={{
            titleTag: "Example Domain",
            titleDescription:
              "Example Domain. This domain is established to be used for illustrative examples in documents. You may use this domain in examples without prior coordination or asking for permission.",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Card
            extra={
              <Space>
                <Button onClick={onClose} htmlType="submit">
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Space>
            }
            style={{ height: "100%" }}
          >
            <SerpPreview
              title={titleTag ? titleTag : ""}
              metaDescription={titleDescription ? titleDescription : ""}
              url="https://example.com/"
            />

            <Flex style={{ width: 600, marginTop: 100 }} vertical>
              <Form.Item<FieldType>
                label="Title Tag"
                name="titleTag"
                rules={[
                  { required: true, message: "Please input your titleTag!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Meta Description Tag"
                name="titleDescription"
                rules={[
                  {
                    required: true,
                    message: "Please input your titleDescription!",
                  },
                ]}
              >
                <TextArea rows={5} />
              </Form.Item>
            </Flex>
          </Card>
        </Form>
      </Drawer>
    </>
  );
};

export default ManageSeo;
