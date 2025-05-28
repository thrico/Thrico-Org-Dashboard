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
import { useState } from "react";
import {
  addDiscussionForum,
  getDiscussionForumCategory,
} from "../../../graphql/actions/discussion-form";
import { discussionCategory } from "../ts-types";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function Post() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
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
  const [add, { loading: loadBtn }] = addDiscussionForum({
    onCompleted,
  });

  const onFinish = (values: any) => {
    add({
      variables: {
        input: {
          ...values,
        },
      },
    });
  };
  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Post
      </Button>
      <Drawer
        title="Create a Post"
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
              Post
            </Button>
          </Space>
        }
      >
        <Card>
          <Title level={3}></Title>
          <Text type="secondary" style={{ marginBottom: 24, display: "block" }}>
            Share your thoughts with the community
          </Text>

          <Form
            initialValues={{
              isAnonymous: false,
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
