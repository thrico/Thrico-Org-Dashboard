import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Drawer, Form, Input, Row, Select, Space } from "antd";
import { addMentorShipCategory } from "../../../graphql/actions/mentorship/category";

const { Option } = Select;

const AddCategory = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [add, { loading }] = addMentorShipCategory({
    onCompleted() {
      setOpen(false);
    },
  });

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
        New category
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
            title="New Category"
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

export default AddCategory;
