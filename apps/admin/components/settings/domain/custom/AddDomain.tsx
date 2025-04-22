"use client";

import type React from "react";
import { useState } from "react";
import { Modal, Input, Button, Typography, Form } from "antd";
import { addCustomDomain } from "../../../../graphql/actions/domain";
import { useRouter } from "next/navigation";

const { Text } = Typography;

interface ConnectDomainModalProps {
  open: boolean;
  onCancel: () => void;
  onConnect: (domain: string) => void;
}

export const AddDomain = ({}) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [domain, setDomain] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const plainDomainRegex =
    /^(?!https?:\/\/)(?!www\.)[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;

  const [add, { loading, data }]: [
    (options: { variables: { input: { domain: string } } }) => void,
    { loading: boolean; data?: { addCustomDomain?: { id: string } } },
  ] = addCustomDomain({
    onCompleted: (data: { addCustomDomain?: { id: string } }) => {
      router.push(`/settings/domains/${data?.addCustomDomain?.id}`);
    },
  });

  const handleFinish = (values: { website: string }) => {
    console.log("Domain connected:", values.website);

    add({
      variables: {
        input: {
          domain: values.website,
        },
      },
    });
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Connect existing domain
      </Button>
      <Form form={form} onFinish={handleFinish}>
        <Modal
          title="Connect existing domain"
          open={isModalOpen}
          footer={
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
              }}
            >
              <Button onClick={handleCancel}>Cancel</Button>
              <Button
                loading={loading}
                type="primary"
                onClick={() => form.submit()}
              >
                Add
              </Button>
            </div>
          }
          onCancel={handleCancel}
          closeIcon={<span style={{ fontSize: "20px" }}>×</span>}
          width={600}
          style={{ top: 100 }}
        >
          <div style={{ marginBottom: "24px" }}>
            <Form.Item
              name="website"
              label="Website Domain"
              rules={[
                { required: true, message: "Please input a website domain!" },
                {
                  pattern: plainDomainRegex,
                  message:
                    "Enter a domain like example.com without https:// or www.",
                },
              ]}
            >
              <Input placeholder="example.com" />
            </Form.Item>
          </div>
        </Modal>
      </Form>
    </>
  );
};
