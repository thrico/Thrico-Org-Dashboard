import {
  CheckCircleOutlined,
  DislikeOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
  OrderedListOutlined,
  SettingOutlined,
  StopOutlined,
  UndoOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Form, List, MenuProps, Modal, theme } from "antd";
import React, { useState } from "react";

import TextArea from "antd/es/input/TextArea";
import { communityEntity } from "./ts-types";
import { getModalDescription, getModalTitle } from "./utils";
import Manage from "./settings/Manage";
import { useRouter } from "next/navigation";
import {
  changeDiscussionCommunityStatus,
  changeDiscussionCommunityVerification,
} from "../../graphql/actions/group";

// import Details from "./Details";
// import { communityEntity } from "../ts-types";
// import {
//   changeDiscussionCommunityStatus,
//   changeDiscussionCommunityVerification,
// } from "../../../graphql/actions/discussion-form";
// import Edit from "../post/Edit";

const Actions = (record: communityEntity) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isEdit, setEditOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCommunity, setSelectedCommunity] =
    useState<communityEntity | null>(null);

  const [dialogAction, setDialogAction] = useState<
    | "APPROVE"
    | "DISABLE"
    | "ENABLE"
    | "REJECT"
    | "VERIFY"
    | "UNVERIFY"
    | "REAPPROVE"
    | "PAUSE"
  >();

  const handleAction = (
    action:
      | "APPROVE"
      | "DISABLE"
      | "ENABLE"
      | "REJECT"
      | "VERIFY"
      | "UNVERIFY"
      | "REAPPROVE"
      | "PAUSE",
    user: communityEntity | null
  ) => {
    setSelectedCommunity(user);
    setDialogAction(action);
    setIsModalOpen(true);
  };

  const handleViewDetails = (user: communityEntity) => {
    router.push(`/communities/${user.id}/discussion`);
  };
  const router = useRouter();

  const handleViewSettings = (user: communityEntity) => {
    router.push(`/communities/${user.id}/manage`);
  };

  const handleEdit = (user: communityEntity) => {
    setSelectedCommunity(user);
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
        label: "Approve Community",
        icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
        onClick: () => handleAction("APPROVE", record),
      },
      {
        key: "reject",
        label: "Reject Community",
        icon: <DislikeOutlined style={{ color: "#722ed1" }} />,
        onClick: () => handleAction("REJECT", record),
      }
    );
  }

  if (record?.status === "REJECTED") {
    items.push({
      key: "approve",
      label: "Re-approve Community",
      icon: <UndoOutlined />,
      onClick: () => handleAction("REAPPROVE", record),
    });
  }

  if (record?.status === "APPROVED") {
    items.push({
      key: "disable",
      label: "Disable Community",
      icon: <UserDeleteOutlined style={{ color: "#faad14" }} />,
      onClick: () => handleAction("DISABLE", record),
    });

    items.push({
      key: "pause",
      label: "Pause Community",
      icon: <StopOutlined style={{ color: "#faad14" }} />,
      onClick: () => handleAction("PAUSE", record),
    });

    items.push({
      key: "Mange Settings",
      label: "Manage Settings",
      icon: <SettingOutlined style={{ color: colorPrimary }} />,
      onClick: () => handleViewSettings(record),
    });
  }

  if (record?.status === "DISABLED") {
    items.push({
      key: "approve",
      label: "Enable Community",
      icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
      onClick: () => handleAction("ENABLE", record),
    });
  }

  const [actionReason, setActionReason] = useState("");

  const onCompleted = () => {
    setIsModalOpen(false);
    setActionReason("");
    setSelectedCommunity(null);
    setIsDrawerOpen(false);
  };

  const [action, { loading }] = changeDiscussionCommunityStatus({
    onCompleted,
  });
  const [changeVerification, { loading: verifyBtn }] =
    changeDiscussionCommunityVerification({
      onCompleted,
    });
  const confirmAction = () => {
    if (dialogAction === "VERIFY" || dialogAction === "UNVERIFY") {
      return changeVerification({
        variables: {
          input: {
            reason: actionReason,
            communityId: selectedCommunity?.id,
            action: dialogAction,
          },
        },
      });
    } else {
      action({
        variables: {
          input: {
            communityId: selectedCommunity?.id,
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
      <Dropdown size menu={{ items }} placement="bottomRight">
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
            // loading={loading || verifyBtn}
            key="submit"
            type={
              dialogAction === "DISABLE" || dialogAction === "REJECT"
                ? "primary"
                : dialogAction === "VERIFY" ||
                    dialogAction === "REAPPROVE" ||
                    dialogAction === "PAUSE"
                  ? "primary"
                  : "default"
            }
            danger={
              dialogAction === "DISABLE" ||
              dialogAction === "REJECT" ||
              dialogAction === "PAUSE"
            }
            onClick={confirmAction}
            disabled={isReasonRequired && !actionReason.trim()}
          >
            {dialogAction === "APPROVE" && "Approve Community"}

            {dialogAction === "DISABLE" && "Disable Community"}
            {dialogAction === "ENABLE" && "Enable Community"}

            {dialogAction === "REJECT" && "Reject Community"}

            {dialogAction === "VERIFY" && "Verify Community"}
            {dialogAction === "UNVERIFY" && "Remove Verification"}
            {dialogAction === "REAPPROVE" && "Re-approve Community"}
            {dialogAction === "PAUSE" && "Pause Community"}
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
      {/* <Details
                selectedCommunity={selectedCommunity}
                isDrawerOpen={isDrawerOpen}
                setIsDrawerOpen={setIsDrawerOpen}
                handleAction={handleAction}
            />

            {selectedCommunity && (
                <Edit
                    community={selectedCommunity}
                    open={isEdit}
                    onClose={() => setEditOpen(false)}
                />
            )} */}

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
