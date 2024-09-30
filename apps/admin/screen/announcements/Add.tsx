"use client";
import React, { useState } from "react";
import { Alert, Button, Card, Drawer } from "antd";
import { Form, Input, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CloseCircleOutlined } from "@ant-design/icons";
import { addAnnouncement } from "../../graphql/actions/announcement";

const { Option } = Select;
const Add: React.FC = () => {
  const [add, { loading }] = addAnnouncement({});
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    add({
      variables: {
        input: {
          ...values,
        },
      },
    });
  };

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Add
      </Button>
      <Drawer
        closeIcon={false}
        width={600}
        title=""
        onClose={onClose}
        open={open}
      >
        <Form
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Card
            title={<CloseCircleOutlined />}
            extra={
              <Space>
                <Button loading={loading} type="primary" htmlType="submit">
                  Add
                </Button>
              </Space>
            }
          >
            <Alert
              style={{ margin: 10 }}
              type="info"
              message="Announcement will automatically added to highlight"
            />

            <Form.Item name="note" label="Note" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <TextArea rows={5} />
            </Form.Item>

            <Form.Item
              name="ttl"
              label="TTL (Time to live highlights)"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select ttl" allowClear>
                <Option value="1">1 Day</Option>
                <Option value="2">2 days</Option>
                <Option value="7">7 days</Option>
                <Option value="15">15 days</Option>
                <Option value="no">No Expiry</Option>
              </Select>
            </Form.Item>
          </Card>
        </Form>
      </Drawer>
    </>
  );
};

export default Add;
