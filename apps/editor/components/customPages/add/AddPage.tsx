import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import slugify from "react-slugify";
import { addCustomPages } from "../../../graphql/actions";
const { Option } = Select;

const AddPage = () => {
  const [add, { loading }] = addCustomPages({});
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const [form] = Form.useForm();
  const title = Form.useWatch("title", form);

  useEffect(() => {
    form.setFieldValue("slug", slugify(title));
  }, [title]);
  const onFinish = (values: any) => {
    add({
      variables: {
        input: values,
      },
    });
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New Page
      </Button>
      <Drawer
        width={720}
        onClose={onClose}
        closable={false}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form onFinish={onFinish} form={form} layout="vertical">
          <Card
            title="Create New Page"
            extra={
              <Space>
                <Button onClick={onClose}>Cancel</Button>
                <Button loading={loading} htmlType="submit" type="primary">
                  Add
                </Button>
              </Space>
            }
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="title"
                  label="Page Title"
                  rules={[{ required: true, message: "Please enter title" }]}
                >
                  <Input placeholder="Please enter title" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="slug"
                  label="Slug"
                  rules={[{ required: true, message: "Please enter url" }]}
                >
                  <Input
                    style={{ width: "100%" }}
                    addonBefore="http://exapmple.com/"
                    placeholder="Please enter url"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Card title="Seo">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Title Tag"
                    name="metaTitle"
                    rules={[
                      {
                        required: true,
                        message: "Please input your metaTitle!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                {/* <Col span={12}>
                  <Form.Item
                    name="type"
                    label="Type"
                    rules={[
                      { required: true, message: "Please choose the type" },
                    ]}
                  >
                    <Select placeholder="Please choose the type">
                      <Option value="private">Private</Option>
                      <Option value="public">Public</Option>
                    </Select>
                  </Form.Item>
                </Col> */}
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    label="Meta Description Tag"
                    name="metaDescription"
                    rules={[
                      {
                        required: true,
                        message: "Please input your metaDescription!",
                      },
                    ]}
                  >
                    <TextArea rows={5} />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Card>
        </Form>
      </Drawer>
    </>
  );
};

export default AddPage;
