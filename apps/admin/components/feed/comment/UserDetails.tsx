import { Comment } from "@ant-design/compatible";
import { Avatar, Button, Tooltip, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import React, { useState } from "react";
import { commentProps } from "../types";
import { getEntity } from "../../../graphql/actions";
import UserAvatar from "../../../screen/comman/UserAvatar";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteCommentFeed } from "../../../graphql/actions/feed";

const UserDetails = ({
  id,
  user,
  createdAt,
  addedBy,
  content,
}: commentProps) => {
  const { data, loading } = getEntity();
  const { Text } = Typography;
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleEdit = (id: string) => {
    setEditingId(id);
    setEditValue(content);
  };
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };
  const [deleteComment, { loading: deleteBtnLoading }] = deleteCommentFeed({});

  return (
    <Comment
      author={
        <>
          {addedBy === "USER" && (
            <Text strong>
              {user?.firstName} {user?.lastName}
            </Text>
          )}
          {addedBy === "ENTITY" && <Text strong>{data?.getEntity?.name}</Text>}
        </>
      }
      avatar={
        addedBy === "USER" ? (
          <UserAvatar size={48} src={user?.avatar} />
        ) : (
          <UserAvatar size={48} src={data?.getEntity?.logo} />
        )
      }
      content={
        editingId === id ? (
          <div>
            <TextArea
              rows={3}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
            <Button
              //   onClick={() => handleSaveEdit(item.id)}
              type="primary"
              style={{ marginTop: 8, marginRight: 8 }}
            >
              Save
            </Button>
            <Button onClick={handleCancelEdit} style={{ marginTop: 8 }}>
              Cancel
            </Button>
          </div>
        ) : (
          <p>{content}</p>
        )
      }
      datetime={
        <Tooltip title={moment(createdAt).format("YYYY-MM-DD HH:mm:ss")}>
          <span>{moment(createdAt).fromNow()}</span>
        </Tooltip>
      }
      actions={
        editingId !== id
          ? [
              <Button
                key="edit"
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleEdit(id)}
              >
                Edit
              </Button>,
              <Button
                key="delete"
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() =>
                  deleteComment({
                    variables: {
                      input: {
                        commentId: id,
                      },
                    },
                  })
                }
                loading={deleteBtnLoading}
              >
                Delete
              </Button>,
            ]
          : []
      }
    />
  );
};

export default UserDetails;
