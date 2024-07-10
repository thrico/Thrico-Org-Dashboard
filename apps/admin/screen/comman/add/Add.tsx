import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Drawer, Form, Input, Row, Select, Space } from "antd";

const Add = ({ add, loading, title, showDrawer, onClose, open }) => {
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
        {title ? title : "Add"}
      </Button>
      <Drawer
        closable={false}
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form onFinish={onFinish} layout="vertical">
          <Card
            title={title}
            extra={
              <Space>
                <Button onClick={onClose}>Cancel</Button>
                <Button loading={loading} htmlType="submit" type="primary">
                  Add
                </Button>
              </Space>
            }
          >
            <Form.Item
              style={{ width: 300 }}
              name="title"
              label="Title"
              rules={[
                { required: true, message: "Please enter Category Name" },
              ]}
            >
              <Input placeholder="Please enter Category Name" />
            </Form.Item>
          </Card>
        </Form>
      </Drawer>
    </>
  );
};

export default Add;
