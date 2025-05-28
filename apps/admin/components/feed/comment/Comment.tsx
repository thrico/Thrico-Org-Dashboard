"use client";
import { Comment } from "@ant-design/compatible";
import { useState } from "react";
import { Avatar, Button, Form, Input, List, Modal, Tooltip } from "antd";

import {
  DeleteOutlined,
  EditOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { FaRegCommentAlt } from "react-icons/fa";
import UserAvatar from "../../../screen/comman/UserAvatar";
import { getEntity } from "../../../graphql/actions";
import { addComment, getFeedComment } from "../../../graphql/actions/feed";
import CommentSkeleton from "../../skeleton/Comment-Skeleton";
import UserDetails from "./UserDetails";

const { TextArea } = Input;

interface CommentItem {
  id: string;
  author: string;
  avatar: string;
  content: string;
  datetime: string;
}

const Comments = ({ id }: number) => {
  const { data: feed, loading: feedLoading } = getFeedComment({
    variables: {
      input: {
        id,
      },
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: "1",
      author: "John Doe",
      avatar: "https://joeschmoe.io/api/v1/random",
      content: "This is a great post! Thanks for sharing.",
      datetime: moment().subtract(2, "hours").format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      id: "2",
      author: "Jane Smith",
      avatar: "https://joeschmoe.io/api/v1/random",
      content: "I completely agree with your points. Very insightful!",
      datetime: moment().subtract(1, "hours").format("YYYY-MM-DD HH:mm:ss"),
    },
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setEditValue("");
  };

  const onCompleted = () => {
    setValue("");
  };
  const [add, { loading }] = addComment({
    onCompleted,
  });
  const handleSubmit = () => {
    add({
      variables: {
        input: {
          comment: value,
          feedID: id,
        },
      },
    });
  };

  const handleEdit = (id: string) => {
    const comment = comments.find((c) => c.id === id);
    if (comment) {
      setEditingId(id);
      setEditValue(comment.content);
    }
  };

  const handleSaveEdit = (id: string) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, content: editValue } : comment
      )
    );
    setEditingId(null);
    setEditValue("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const handleDelete = (id: string) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };
  const { data } = getEntity();
  return (
    <>
      <Button
        type="text"
        onClick={showModal}
        icon={<FaRegCommentAlt size={17} />}
      >
        Comment
      </Button>

      <Modal
        title="Comments"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        <Comment
          avatar={<UserAvatar size={56} src={data?.getEntity?.logo} />}
          content={
            <Form.Item>
              <TextArea
                rows={4}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Write a comment..."
                maxLength={1000}
                showCount
              />
              <Button
                htmlType="submit"
                loading={loading}
                onClick={handleSubmit}
                type="primary"
                style={{ marginTop: 16 }}
              >
                Add Comment
              </Button>
            </Form.Item>
          }
        />

        {feedLoading && <CommentSkeleton />}
        <List
          className="comment-list"
          header={`${feed?.getFeedComment?.length} ${feed?.getFeedComment?.length > 1 ? "comments" : "comment"}`}
          itemLayout="horizontal"
          dataSource={feed?.getFeedComment}
          renderItem={(item) => <UserDetails {...item} />}
        />
      </Modal>
    </>
  );
};

export default Comments;
