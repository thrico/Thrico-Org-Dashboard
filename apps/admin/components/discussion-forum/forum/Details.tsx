import { Button, Card, Divider, Drawer, List, Space, Typography } from "antd";
import React, { useState } from "react";

import {
  CheckCircleOutlined,
  DislikeOutlined,
  LockOutlined,
  MessageOutlined,
  SafetyCertificateOutlined,
  UndoOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { TiArrowUpOutline, TiArrowDownOutline } from "react-icons/ti";
import moment from "moment";
import Link from "next/link";

import { discussionForm, formComment } from "../ts-types";
import { getDiscussionForumComments } from "../../../graphql/actions/discussion-form";
import PostComment from "./comments/PostComment";
import { getEntity } from "../../../graphql/actions";

import Vote from "./votes/Vote";
import Comment from "./comments/comment";

const Details = ({
  selectedForum,
  isDrawerOpen,
  setIsDrawerOpen,
  handleAction,
}: {
  selectedForum: discussionForm | null;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  handleAction: (
    action:
      | "APPROVE"
      | "DISABLE"
      | "ENABLE"
      | "REJECT"
      | "VERIFY"
      | "UNVERIFY"
      | "REAPPROVE",
    user: discussionForm | null
  ) => void;
}) => {
  const { Title, Text, Paragraph } = Typography;

  const { data: entity } = getEntity();
  return (
    <Drawer
      title="User Details"
      placement="right"
      onClose={() => setIsDrawerOpen(false)}
      open={isDrawerOpen}
      width={800}
      extra={
        <Space wrap>
          {selectedForum?.status === "PENDING" && (
            <>
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                onClick={() => handleAction("APPROVE", selectedForum)}
              >
                Approve
              </Button>
              <Button
                danger
                icon={<DislikeOutlined />}
                onClick={() => handleAction("REJECT", selectedForum)}
              >
                Reject
              </Button>
            </>
          )}

          {selectedForum?.status === "REJECTED" && (
            <>
              <Button
                type="primary"
                icon={<UndoOutlined />}
                onClick={() => handleAction("REAPPROVE", selectedForum)}
              >
                Re-approve
              </Button>
            </>
          )}

          {selectedForum?.status === "APPROVED" && (
            <>
              {selectedForum?.verification?.isVerified ? (
                <Button
                  danger
                  icon={<SafetyCertificateOutlined />}
                  onClick={() => handleAction("UNVERIFY", selectedForum)}
                >
                  Remove Verification
                </Button>
              ) : (
                <Button
                  type="primary"
                  icon={<SafetyCertificateOutlined />}
                  onClick={() => handleAction("VERIFY", selectedForum)}
                >
                  Verify
                </Button>
              )}
              <Button
                icon={<UserDeleteOutlined />}
                onClick={() => handleAction("DISABLE", selectedForum)}
              >
                Disable
              </Button>
            </>
          )}

          {selectedForum?.status === "DISABLED" && (
            <>
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                onClick={() => handleAction("ENABLE", selectedForum)}
              >
                Enable
              </Button>
            </>
          )}
        </Space>
      }
    >
      {selectedForum && (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 0" }}>
          <Card style={{ marginBottom: 24 }}>
            <div style={{ display: "flex" }}>
              <Vote id={selectedForum.id} />

              <div className="post-content" style={{ padding: "0 16px" }}>
                <Space>
                  <Link href={`#`}>{selectedForum.category?.name}</Link>
                  <span>•</span>
                  <span>
                    Posted by
                    {selectedForum.addedBy === "ENTITY" &&
                      entity?.getEntity?.name}
                  </span>
                  {/* <Link href={`/user/${post.author}`}>u/{post.author}</Link> */}
                  <span>•</span>
                  <span>{moment(selectedForum.createdAt).fromNow()}</span>
                  {selectedForum?.isAnonymous && (
                    <>
                      <span>•</span>
                      <Space>
                        <LockOutlined />
                        <span>Private</span>
                      </Space>
                    </>
                  )}
                </Space>

                <Title level={3} style={{ marginTop: 8, marginBottom: 16 }}>
                  {selectedForum.title}
                </Title>

                <Paragraph style={{ whiteSpace: "pre-line" }}>
                  {selectedForum.content}
                </Paragraph>

                <Divider style={{ margin: "16px 0" }} />
              </div>
            </div>
          </Card>

          <PostComment id={selectedForum?.id} />

          {selectedForum?.id && <Comment id={selectedForum?.id} />}
        </div>
      )}
    </Drawer>
  );
};

export default Details;
