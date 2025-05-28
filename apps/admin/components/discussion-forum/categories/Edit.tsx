import { Button, Form, Input, Modal, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { editDiscussionForumCategory } from "../../../graphql/actions/discussion-form";
import { discussionCategory } from "../ts-types";

interface EditProps {
  record: discussionCategory;
  edit: (options: { variables: { input: any } }) => void;
  open: boolean;
  onClose: () => void;
  loading: boolean;
}

const Edit: React.FC<EditProps> = ({
  record,
  edit,
  open,
  onClose,
  loading,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        edit({
          variables: {
            input: {
              id: record.id,
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
      <Modal
        title={"Edit Category"}
        open={open}
        confirmLoading={loading}
        onOk={handleSubmit}
        onCancel={onClose}
        okText="Save"
      >
        <Form
          form={form}
          initialValues={{
            isActive: record.isActive,
            name: record.name,
            description: record.description,
          }}
          layout="vertical"
        >
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

export default Edit;
