"use client";
import { useRouter } from "next/navigation";
import {
  Card,
  Form,
  Input,
  Button,
  Select,
  Switch,
  Typography,
  Space,
  Drawer,
} from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  addDiscussionForum,
  editDiscussionForum,
  getDiscussionForumCategory,
} from "../../../graphql/actions/discussion-form";
import { discussionCategory, discussionForm } from "../ts-types";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function Edit({
  forum,
  open,
  onClose,
}: {
  forum: discussionForm | null;
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [form] = Form.useForm();

  const { data, loading } = getDiscussionForumCategory({
    variables: {
      input: {
        status: "ALL",
      },
    },
  });
  const onCompleted = () => {
    onClose();
  };
  const [add, { loading: loadBtn }] = editDiscussionForum({
    onCompleted,
  });

  const onFinish = (values: any) => {
    add({
      variables: {
        input: {
          id: forum?.id,
          ...values,
        },
      },
    });
  };

  return (
    <>
      <Drawer
        title="Edit a Post"
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
        width={800}
        extra={
          <Space>
            <Button onClick={() => router.back()}>Cancel</Button>
            <Button
              loading={loadBtn}
              onClick={() => form.submit()}
              type="primary"
            >
              Save
            </Button>
          </Space>
        }
      >
        <Card>
          <Title level={3}></Title>

          <Form
            initialValues={{
              title: forum?.title,
              isAnonymous: forum?.isAnonymous,
              content: forum?.content,
              category: forum?.category?.id,
            }}
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Please enter a title for your post",
                },
              ]}
            >
              <Input placeholder="Give your post a title" />
            </Form.Item>

            <Form.Item
              name="content"
              label="Content"
              rules={[
                {
                  required: true,
                  message: "Please enter content for your post",
                },
              ]}
            >
              <TextArea
                maxLength={500}
                showCount
                rows={8}
                placeholder="What would you like to discuss?"
              />
            </Form.Item>

            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select loading={loading} placeholder="Select a category">
                {data?.getDiscussionForumCategory.map(
                  (category: discussionCategory) => (
                    <Option key={category.id} value={category.id}>
                      {category.name}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>

            <Form.Item name="isAnonymous" valuePropName="checked">
              <Space align="center">
                <Switch />
                <Space>
                  <Text>Make this post Anonymous</Text>
                  <LockOutlined />
                </Space>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </Drawer>
    </>
  );
}
