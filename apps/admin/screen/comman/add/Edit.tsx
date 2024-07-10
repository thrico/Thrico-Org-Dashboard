import React from "react";
import { Button, Card, Form, Input, Modal, Space } from "antd";

const Edit = ({
  isModalOpen,
  handleCancel,
  id,
  title,
  record,
  loading,
  edit,
}) => {
  const onFinish = (values: any) => {
    edit({
      variables: {
        input: {
          title: values.title,
          id: record.id,
        },
      },
    });
  };
  return (
    <>
      <Modal closeIcon={false} open={isModalOpen} footer={[]}>
        <Form onFinish={onFinish} layout="vertical">
          <Card
            title={`Edit Theme`}
            extra={
              <Space>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button loading={loading} htmlType="submit" type="primary">
                  Update
                </Button>
              </Space>
            }
          >
            <Form.Item
              style={{ width: 300 }}
              name="title"
              label="Title"
              initialValue={record?.title}
              rules={[
                { required: true, message: "Please enter Category Name" },
              ]}
            >
              <Input placeholder="Please enter Category Name" />
            </Form.Item>
          </Card>
        </Form>
      </Modal>
    </>
  );
};

export default Edit;
