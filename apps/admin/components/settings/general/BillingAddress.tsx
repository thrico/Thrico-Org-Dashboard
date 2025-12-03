import { EditOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Input } from "antd";
import React, { useState } from "react";

const BillingAddress: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [country, setCountry] = useState("India");

  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue({ country });
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      setCountry(values.country);
      setIsModalOpen(false);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 0",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <EnvironmentOutlined
            style={{
              fontSize: "20px",
              marginRight: "16px",
              marginTop: "4px",
              color: "#666",
            }}
          />
          <div style={{ fontWeight: 500, marginRight: 8 }}>Billing address</div>
          <div>{country}</div>
        </div>
        <Button type="text" icon={<EditOutlined />} onClick={showModal} />
      </div>
      <Modal
        title="Edit Billing Address"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Billing Address"
            name="country"
            rules={[
              { required: true, message: "Please enter billing address" },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Enter billing address" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BillingAddress;
