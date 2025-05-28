import {
  CheckCircleOutlined,
  DislikeOutlined,
  EditOutlined,
  EyeOutlined,
  FlagOutlined,
  LockOutlined,
  MoreOutlined,
  OrderedListOutlined,
  UndoOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Form, List, MenuProps, Modal } from "antd";
import React, { useState } from "react";

import TextArea from "antd/es/input/TextArea";

import { getModalDescription, getModalTitle } from "../utils";
import Details from "./Details";
import { discussionForm } from "../ts-types";
import {
  changeDiscussionForumStatus,
  changeDiscussionForumVerification,
} from "../../../graphql/actions/discussion-form";
import Edit from "../post/Edit";

const Actions = (record: discussionForm) => {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isEdit, setEditOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedForum, setSelectedForum] = useState<discussionForm | null>(
    null
  );
  const [dialogAction, setDialogAction] = useState<
    | "APPROVE"
    | "DISABLE"
    | "ENABLE"
    | "REJECT"
    | "VERIFY"
    | "UNVERIFY"
    | "REAPPROVE"
  >();

  const handleAction = (
    action:
      | "APPROVE"
      | "DISABLE"
      | "ENABLE"
      | "REJECT"
      | "VERIFY"
      | "UNVERIFY"
      | "REAPPROVE",
    user: discussionForm | null
  ) => {
    setSelectedForum(user);
    setDialogAction(action);
    setIsModalOpen(true);
  };

  const handleViewDetails = (user: discussionForm) => {
    setSelectedForum(user);
    setIsDrawerOpen(true);
  };

  const handleEdit = (user: discussionForm) => {
    setSelectedForum(user);
    setEditOpen(true);
  };

  const items: MenuProps["items"] = [
    {
      key: "view",
      label: "View Details",
      icon: <EyeOutlined />,
      onClick: () => handleViewDetails(record),
    },

    {
      key: "edit",
      label: "Edit",
      icon: <EditOutlined />,
      onClick: () => handleEdit(record),
    },

    {
      key: "audit Log",
      label: "Audit Log",
      icon: <OrderedListOutlined />,
      onClick: () => setIsAuditModalOpen(true),
    },
  ];

  if (record?.status === "PENDING") {
    items.push(
      {
        key: "approve",
        label: "Approve Forum",
        icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
        onClick: () => handleAction("APPROVE", record),
      },
      {
        key: "reject",
        label: "Reject Forum",
        icon: <DislikeOutlined style={{ color: "#722ed1" }} />,
        onClick: () => handleAction("REJECT", record),
      }
    );
  }

  if (record?.status === "REJECTED") {
    items.push({
      key: "approve",
      label: "Re-approve Forum",
      icon: <UndoOutlined />,
      onClick: () => handleAction("REAPPROVE", record),
    });
  }

  if (record?.status === "APPROVED") {
    items.push({
      key: "disable",
      label: "Disable Forum",
      icon: <UserDeleteOutlined style={{ color: "#faad14" }} />,
      onClick: () => handleAction("DISABLE", record),
    });
  }

  if (record?.status === "DISABLED") {
    items.push({
      key: "approve",
      label: "Enable Forum",
      icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
      onClick: () => handleAction("ENABLE", record),
    });
  }

  const [actionReason, setActionReason] = useState("");

  const onCompleted = () => {
    setIsModalOpen(false);
    setActionReason("");
    setSelectedForum(null);
    setIsDrawerOpen(false);
  };

  const [action, { loading }] = changeDiscussionForumStatus({
    onCompleted,
  });
  const [changeVerification, { loading: verifyBtn }] =
    changeDiscussionForumVerification({
      onCompleted,
    });
  const confirmAction = () => {
    if (dialogAction === "VERIFY" || dialogAction === "UNVERIFY") {
      return changeVerification({
        variables: {
          input: {
            reason: actionReason,
            discussionForumId: selectedForum?.id,
            action: dialogAction,
          },
        },
      });
    } else {
      action({
        variables: {
          input: {
            discussionForumId: selectedForum?.id,
            action: dialogAction,
            reason: actionReason,
          },
        },
      });
    }
  };

  const isReasonRequired =
    dialogAction === "APPROVE" ||
    dialogAction === "REJECT" ||
    dialogAction === "VERIFY" ||
    dialogAction === "REAPPROVE";

  return (
    <>
      <Dropdown menu={{ items }} placement="bottomRight">
        <Button type="dashed" icon={<MoreOutlined />} />
      </Dropdown>
      <Modal
        zIndex={1000}
        title={getModalTitle(dialogAction)}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            loading={loading || verifyBtn}
            key="submit"
            type={
              dialogAction === "DISABLE" || dialogAction === "REJECT"
                ? "primary"
                : dialogAction === "VERIFY" || dialogAction === "REAPPROVE"
                  ? "primary"
                  : "default"
            }
            danger={dialogAction === "DISABLE" || dialogAction === "REJECT"}
            onClick={confirmAction}
            disabled={isReasonRequired && !actionReason.trim()}
          >
            {dialogAction === "APPROVE" && "Approve Forum"}

            {dialogAction === "DISABLE" && "Disable Forum"}
            {dialogAction === "ENABLE" && "Enable Forum"}

            {dialogAction === "REJECT" && "Reject Forum"}

            {dialogAction === "VERIFY" && "Verify Forum"}
            {dialogAction === "UNVERIFY" && "Remove Verification"}
            {dialogAction === "REAPPROVE" && "Re-approve Forum"}
          </Button>,
        ]}
      >
        <p>{getModalDescription(dialogAction)}</p>
        <Form layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            label="Reason for action"
            required={isReasonRequired}
            rules={[
              { required: isReasonRequired, message: "Please enter a reason" },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Enter reason for this action..."
              value={actionReason}
              onChange={(e) => setActionReason(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Details
        selectedForum={selectedForum}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        handleAction={handleAction}
      />

      {selectedForum && (
        <Edit
          forum={selectedForum}
          open={isEdit}
          onClose={() => setEditOpen(false)}
        />
      )}

      {/* <AuditLogSidebar
        isAuditModalOpen={isAuditModalOpen}
        userId={selectedLog?.id}
        onViewAll={handleViewAllLogs}
        onViewDetails={handleViewAuditLog}
        setIsAuditModalOpen={setIsAuditModalOpen}
      />  */}
    </>
  );
};

export default Actions;
