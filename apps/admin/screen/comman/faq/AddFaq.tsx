import React, { useState } from "react";
import { Button, Form, FormProps, Input, Modal, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { addFaq, getModuleFaq } from "../../../graphql/actions/faq";
import { useForm } from "antd/es/form/Form";

const FAQ = ({ type }) => {
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  type FieldType = {
    title?: string;
    description?: string;
  };

  const onCompleted = () => {
    handleCancel();
    form.resetFields();
  };
  const [add, { loading }] = addFaq({
    onCompleted,
    module: type,
  });
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    add({
      variables: {
        input: {
          ...values,
          module: "communities",
        },
      },
    });
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add
      </Button>
      <Modal
        footer={[]}
        title="Add Faq"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Title"
            name="title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="description"
            name="description"
            rules={[{ required: true }]}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button loading={loading} type="primary" htmlType="submit">
                Add
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FAQ;
