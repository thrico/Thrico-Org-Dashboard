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
  UnlockOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Form, List, MenuProps, Modal } from "antd";
import React, { useState } from "react";

import TextArea from "antd/es/input/TextArea";

// import {
//   changediscussionCategory,
//   changeUserVerification,
// } from "../../../graphql/actions/user";

import { discussionCategory } from "../ts-types";
import Edit from "./Edit";
import {
  changeStatusDiscussionForumCategory,
  editDiscussionForumCategory,
} from "../../../graphql/actions/discussion-form";

const Actions = (record: discussionCategory) => {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  const [dialogAction, setDialogAction] = useState<
    | "APPROVE"
    | "BLOCK"
    | "DISABLE"
    | "ENABLE"
    | "UNBLOCK"
    | "REJECT"
    | "FLAG"
    | "VERIFY"
    | "UNVERIFY"
    | "REAPPROVE"
  >();
  const handleViewAllLogs = () => {
    // Navigate to the audit logs page filtered for this user
    // router.push(`/admin/audit?entity=${user.id}`)
  };

  const [changeStatus, {}] = changeStatusDiscussionForumCategory({});

  const items: MenuProps["items"] = [];

  if (!record?.isActive) {
    items.push({
      key: "active",
      label: "Active Category",
      icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
      onClick: () =>
        changeStatus({
          variables: {
            input: {
              id: record.id,
              isActive: true,
            },
          },
        }),
    });
  }

  if (record?.isActive) {
    items.push({
      key: "Inactive",
      label: "InActive Category",
      icon: <DislikeOutlined style={{ color: "#722ed1" }} />,
      onClick: () =>
        changeStatus({
          variables: {
            input: {
              id: record.id,
              isActive: false,
            },
          },
        }),
    });
  }

  items.push({
    key: "edit",
    label: "Edit",
    icon: <EditOutlined />,
    onClick: () => showDrawer(),
  });

  const onCompleted = () => {
    onClose();
  };
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [edit, { loading }] = editDiscussionForumCategory({
    onCompleted,
  });

  return (
    <>
      <Dropdown menu={{ items }} placement="bottomRight">
        <Button type="dashed" icon={<MoreOutlined />} />
      </Dropdown>
      {/* <Modal
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
              dialogAction === "BLOCK" ||
              dialogAction === "DISABLE" ||
              dialogAction === "REJECT"
                ? "primary"
                : dialogAction === "VERIFY" || dialogAction === "REAPPROVE"
                  ? "primary"
                  : "default"
            }
            danger={
              dialogAction === "BLOCK" ||
              dialogAction === "DISABLE" ||
              dialogAction === "REJECT"
            }
            onClick={confirmAction}
            disabled={isReasonRequired && !actionReason.trim()}
          >
            {dialogAction === "APPROVE" && "Approve"}
            {dialogAction === "BLOCK" && "Block User"}
            {dialogAction === "DISABLE" && "Disable Account"}
            {dialogAction === "ENABLE" && "Enable Account"}
            {dialogAction === "UNBLOCK" && "Unblock User"}
            {dialogAction === "REJECT" && "Reject Registration"}
            {dialogAction === "FLAG" && "Flag for Review"}
            {dialogAction === "VERIFY" && "Verify User"}
            {dialogAction === "UNVERIFY" && "Remove Verification"}
            {dialogAction === "REAPPROVE" && "Re-approve User"}
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
      </Modal> */}
      {/* <UserDetails
        selectedUser={selectedUser}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        handleAction={handleAction}
      /> */}
      <Edit
        record={record}
        edit={edit}
        open={open}
        onClose={onClose}
        loading={loading}
      />
    </>
  );
};

export default Actions;
