"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  Button,
  Typography,
  Avatar,
  List,
  Dropdown,
  message,
  Popconfirm,
} from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { commentProps } from "../../../feed/types";
import { formComment } from "../../ts-types";
import { getEntity } from "../../../../graphql/actions";
import UserAvatar from "../../../../screen/comman/UserAvatar";
import moment from "moment";

const { Text } = Typography;

function CommentCard({ comment, id }: { comment: formComment; id: String }) {
  const [deleteComment, { loading }] = deleteDiscussionForumComments({});
  const { data, loading: loadBtn } = getEntity();

  const items: MenuProps["items"] = [
    {
      key: "view",
      label: (
        <Popconfirm
          title="Are you sure you want to delete this item?"
          onConfirm={async () => {
            try {
              await deleteComment({
                variables: {
                  input: { commentId: comment.id, discussionForumId: id },
                },
              });
              message.success("Comment deleted");
            } catch (error) {
              message.error("Failed to delete comment");
            }
          }}
          okText="Yes"
          cancelText="No"
          placement="left"
          okButtonProps={{ loading }}
        >
          <span>Delete</span>
        </Popconfirm>
      ),

      icon: <DeleteOutlined />,
      danger: true,
    },

    {
      key: "edit",
      label: "Edit",
      icon: <EditOutlined />,
    },
  ];

  return (
    <Card style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ position: "absolute", right: 10 }}>
          <Dropdown menu={{ items }} placement="bottomRight">
            <Button type="dashed" icon={<MoreOutlined />} />
          </Dropdown>
        </div>
        {comment?.commentedBy === "USER" ? (
          <UserAvatar size={30} src={comment?.user?.avatar} />
        ) : (
          <UserAvatar size={30} src={data?.getEntity?.logo} />
        )}
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            {comment?.commentedBy === "ENTITY" && (
              <Link href={""}>
                <Text strong>u/{data?.getEntity?.name}</Text>
              </Link>
            )}

            <Text type="secondary">•</Text>
            <Text type="secondary">{moment(comment?.createdAt).fromNow()}</Text>
          </div>
          <Text style={{ display: "block", marginBottom: 16 }}>
            {comment?.content}
          </Text>
        </div>
      </div>
    </Card>
  );
}

import React from "react";
import {
  deleteDiscussionForumComments,
  getDiscussionForumComments,
} from "../../../../graphql/actions/discussion-form";
import { MenuProps } from "antd/lib";

const Comment = ({ id }: { id: string }) => {
  const { data, loading } = getDiscussionForumComments({
    variables: {
      input: {
        id: id,
      },
    },
  });

  return (
    <List
      itemLayout="vertical"
      dataSource={data?.getDiscussionForumComments}
      renderItem={(comment: formComment) => (
        <CommentCard comment={comment} id={id} />
      )}
    />
  );
};

export default Comment;
