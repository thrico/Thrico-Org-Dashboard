"use client";

import { Tag } from "antd";
import {
  CheckCircleOutlined,
  StopOutlined,
  PauseCircleFilled,
  CloseCircleOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { discussionForumStatus } from "./ts-types";

export const getStatusTag = (status: discussionForumStatus) => {
  switch (status) {
    case "APPROVED":
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          APPROVED
        </Tag>
      );
    case "PENDING":
      return (
        <Tag icon={<PauseCircleFilled />} color="warning">
          Pending
        </Tag>
      );

    case "REJECTED":
      return (
        <Tag icon={<CloseCircleOutlined />} color="purple">
          Rejected
        </Tag>
      );

    case "DISABLED":
      return (
        <Tag icon={<CloseCircleOutlined />} color="orange">
          Disabled
        </Tag>
      );
    case "ENABLED":
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          APPROVED
        </Tag>
      );
    default:
      return <Tag>{status}</Tag>;
  }
};

export const getModalTitle = (
  dialogAction?:
    | "APPROVE"
    | "DISABLE"
    | "ENABLE"
    | "REJECT"
    | "VERIFY"
    | "UNVERIFY"
    | "REAPPROVE"
) => {
  switch (dialogAction) {
    case "APPROVE":
      return "Approve Discussion";

    case "DISABLE":
      return "Disable Discussion";
    case "ENABLE":
      return "Enable Discussion";

    case "REJECT":
      return "Reject Discussion";

    case "VERIFY":
      return "Verify Discussion";
    case "UNVERIFY":
      return "Remove Discussion Verification";
    case "REAPPROVE":
      return "Re-approve Discussion";

    default:
      return "Confirm Action";
  }
};

export const getModalDescription = (
  dialogAction?:
    | "APPROVE"
    | "DISABLE"
    | "ENABLE"
    | "REJECT"
    | "VERIFY"
    | "UNVERIFY"
    | "REAPPROVE"
) => {
  switch (dialogAction) {
    case "APPROVE":
      return "This will approve the discussion and make it visible to all users.";

    case "DISABLE":
      return "This will temporarily disable the discussion. It will not be visible until re-enabled.";
    case "ENABLE":
      return "This will re-enable the discussion and make it visible again.";

    case "REJECT":
      return "This will reject the discussion. It will not be published on the platform.";

    case "VERIFY":
      return "This will mark the discussion as verified, indicating it meets platform guidelines.";
    case "UNVERIFY":
      return "This will remove the verified status from the discussion.";
    case "REAPPROVE":
      return "This will change the discussion's status from rejected to approved, making it visible to users.";
    default:
      return "";
  }
};

export const getVerificationTag = (verified: boolean) => {
  if (verified) {
    return (
      <Tag color="blue" icon={<CheckCircleFilled />}>
        Verified
      </Tag>
    );
  }
  return <Tag color="default">Unverified</Tag>;
};
