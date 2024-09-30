import React, { useState } from "react";
import { Button, Form, Modal, Select, Space } from "antd";
import { getAllGroup } from "../../../graphql/actions/faq";
import { addFeaturedGroup } from "../../../graphql/actions/group/interest";

const Add = () => {
  const { data, loading, refetch } = getAllGroup({
    variables: {
      input: {
        status: "ALL",
      },
    },
  });
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
  const onCompleted = () => {
    refetch();
    handleCancel();
  };

  const [add] = addFeaturedGroup({
    onCompleted,
  });

  const onFinish = (values: any) => {
    add({
      variables: {
        input: values.groups,
      },
    });
  };

  const options = data?.getAllGroupStatus?.map((item) => ({
    value: item.id,
    label: item.title,
  }));

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add
      </Button>
      <Modal
        footer={[]}
        title="Add Featured Group"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item
            name="groups"
            style={{ width: "100%" }}
            label="Select Groups"
            rules={[
              {
                type: "array",
                required: true,
              },
            ]}
          >
            <Select
              loading={loading}
              mode="multiple"
              style={{ width: "100%" }}
              options={options}
              optionRender={(option) => (
                <Space>
                  <span role="img" aria-label={option.data.label}>
                    {option.label}
                  </span>
                </Space>
              )}
            />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Add;
