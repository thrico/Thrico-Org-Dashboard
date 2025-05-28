import { Button, Form, Input, Modal, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { addDiscussionForumCategory } from "../../../graphql/actions/discussion-form";

const Add = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const [form] = Form.useForm();
  const handleCancel = () => {
    onClose();
    form.resetFields();
  };
  const onCompleted = () => {
    onClose();
    form.resetFields();
  };
  const [add, { loading }] = addDiscussionForumCategory({
    onCompleted,
  });

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        add({
          variables: {
            input: {
              ...values,
            },
          },
        });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Add
      </Button>
      <Modal
        confirmLoading={loading}
        title={"Add Category"}
        open={open}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Form form={form} initialValues={{ isActive: true }} layout="vertical">
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: "Please enter category name" }]}
          >
            <Input placeholder="e.g. Programming" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter category description" },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Describe what this category is about"
            />
          </Form.Item>
          <Form.Item name="isActive" label="Status" valuePropName="checked">
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Add;
