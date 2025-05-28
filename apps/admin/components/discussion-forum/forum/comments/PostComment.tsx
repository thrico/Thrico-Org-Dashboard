import { Button, Card, Form, Typography } from "antd";
import Title from "antd/es/skeleton/Title";
import React from "react";
import {
  getDiscussionForumComments,
  postDiscussionForumComments,
} from "../../../../graphql/actions/discussion-form";
import TextArea from "antd/es/input/TextArea";

interface PostCommentProps {
  id: string;
}

const PostComment = ({ id }: PostCommentProps) => {
  const [form] = Form.useForm();
  const { Title, Text, Paragraph } = Typography;
  const onCompleted = () => {
    form.resetFields();
  };
  const [postComment, { loading }] = postDiscussionForumComments({
    onCompleted,
  });

  const onFinish = (values: any) => {
    postComment({
      variables: {
        input: {
          ...values,
          discussionForumId: id,
        },
      },
    });
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Title level={4}>Comments </Title>
      <Card style={{ marginBottom: 24 }}>
        <Form.Item
          name="content"
          label=""
          rules={[
            {
              required: true,
              message: "Please enter a title for your post",
            },
          ]}
        >
          <TextArea
            rows={4}
            placeholder="What are your thoughts?"
            style={{ marginBottom: 16 }}
          />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            loading={loading}
            onClick={() => form.submit()}
            type="primary"
          >
            Comment
          </Button>
        </div>
      </Card>
    </Form>
  );
};

export default PostComment;
