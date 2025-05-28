import {
  CheckCircleOutlined,
  DislikeOutlined,
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
import { userStatus } from "../ts-types";

import TextArea from "antd/es/input/TextArea";
import UserDetails from "./UserDetails";
import {
  changeUserStatus,
  changeUserVerification,
} from "../../../graphql/actions/user";
import AuditLog from "./AuditLog";
import { AuditLogSidebar } from "./AuditLogSidebar";
import { MdOutlineVerified } from "react-icons/md";
import { getModalDescription, getModalTitle } from "../utils";

const Actions = (record: userStatus) => {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<userStatus | null>(null);
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

  const handleAction = (
    action:
      | "APPROVE"
      | "BLOCK"
      | "DISABLE"
      | "ENABLE"
      | "UNBLOCK"
      | "REJECT"
      | "FLAG"
      | "REAPPROVE",

    user: userStatus | null
  ) => {
    setSelectedUser(user);
    setDialogAction(action);
    setIsModalOpen(true);
  };

  const handleViewAuditLog = (log: any) => {
    setSelectedLog(log);
    setIsAuditModalOpen(true);
  };

  const handleViewDetails = (user: userStatus) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  const items: MenuProps["items"] = [
    {
      key: "view",
      label: "View Details",
      icon: <EyeOutlined />,
      onClick: () => handleViewDetails(record),
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
        label: "Approve User",
        icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
        onClick: () => handleAction("APPROVE", record),
      },
      {
        key: "reject",
        label: "Reject User",
        icon: <DislikeOutlined style={{ color: "#722ed1" }} />,
        onClick: () => handleAction("REJECT", record),
      }
    );
  }

  if (record?.status === "BLOCKED") {
    items.push({
      key: "unblock",
      label: "Unblock User",
      icon: <UnlockOutlined style={{ color: "#52c41a" }} />,
      onClick: () => handleAction("UNBLOCK", record),
    });
  } else if (record?.status === "REJECTED") {
    items.push(
      {
        key: "block",
        label: "Block User",
        icon: <LockOutlined style={{ color: "#f5222d" }} />,
        onClick: () => handleAction("BLOCK", record),
      },
      {
        key: "approve",
        label: "   Re-approve User",
        icon: <UndoOutlined />,
        onClick: () => handleAction("REAPPROVE", record),
      }
    );
  }

  if (record?.status === "APPROVED") {
    items.push(
      {
        key: "disable",
        label: "Disable Account",
        icon: <UserDeleteOutlined style={{ color: "#faad14" }} />,
        onClick: () => handleAction("DISABLE", record),
      },
      {
        key: "block",
        label: "Block User",
        icon: <LockOutlined style={{ color: "#f5222d" }} />,
        onClick: () => handleAction("BLOCK", record),
      }
    );
  }

  if (record?.status === "DISABLED") {
    items.push({
      key: "approve",
      label: "Enable User",
      icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
      onClick: () => handleAction("ENABLE", record),
    });
  }

  items.push({
    type: "divider",
  });

  items.push({
    key: "flag",
    label: "Flag for Review",
    icon: <FlagOutlined style={{ color: "#fa8c16" }} />,
    onClick: () => handleAction("FLAG", record),
  });

  const [actionReason, setActionReason] = useState("");

  const onCompleted = () => {
    setIsModalOpen(false);
    setActionReason("");
    setSelectedUser(null);
    setIsDrawerOpen(false);
  };
  const [action, { loading }] = changeUserStatus({
    onCompleted,
  });
  const [changeVerification, { loading: verifyBtn }] = changeUserVerification({
    onCompleted,
  });
  const confirmAction = () => {
    if (dialogAction === "VERIFY" || dialogAction === "UNVERIFY") {
      return changeVerification({
        variables: {
          input: {
            reason: actionReason,
            userId: selectedUser?.id,
            action: dialogAction,
          },
        },
      });
    } else {
      action({
        variables: {
          input: {
            userId: selectedUser?.id,
            action: dialogAction,
            reason: actionReason,
          },
        },
      });
    }
  };

  const isReasonRequired =
    dialogAction === "BLOCK" ||
    dialogAction === "APPROVE" ||
    dialogAction === "REJECT" ||
    dialogAction === "FLAG" ||
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
      </Modal>
      <UserDetails
        selectedUser={selectedUser}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        handleAction={handleAction}
      />

      <AuditLogSidebar
        isAuditModalOpen={isAuditModalOpen}
        userId={selectedLog?.id}
        onViewAll={handleViewAllLogs}
        onViewDetails={handleViewAuditLog}
        setIsAuditModalOpen={setIsAuditModalOpen}
      />
    </>
  );
};

export default Actions;
