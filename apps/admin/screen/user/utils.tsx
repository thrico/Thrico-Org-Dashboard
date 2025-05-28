"use client";

import { Tag } from "antd";
import {
  CheckCircleOutlined,
  StopOutlined,
  PauseCircleFilled,
  CloseCircleOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { Status } from "./ts-types";

export const getStatusTag = (status: Status) => {
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
    case "BLOCKED":
      return (
        <Tag icon={<StopOutlined />} color="error">
          Blocked
        </Tag>
      );
    case "REJECTED":
      return (
        <Tag icon={<CloseCircleOutlined />} color="purple">
          Rejected
        </Tag>
      );
    case "FLAGGED":
      return (
        <Tag icon={<CloseCircleOutlined />} color="orange">
          Flagged
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
    | "BLOCK"
    | "DISABLE"
    | "ENABLE"
    | "UNBLOCK"
    | "REJECT"
    | "FLAG"
    | "VERIFY"
    | "UNVERIFY"
    | "REAPPROVE"
) => {
  switch (dialogAction) {
    case "APPROVE":
      return "Approve User Account";
    case "BLOCK":
      return "Block User Account";
    case "DISABLE":
      return "Disable User Account";
    case "ENABLE":
      return "Enable User Account";
    case "UNBLOCK":
      return "Unblock User Account";
    case "REJECT":
      return "Reject User Registration";
    case "FLAG":
      return "Flag User for Review";
    case "VERIFY":
      return "Verify User";
    case "UNVERIFY":
      return "Remove User Verification";
    case "REAPPROVE":
      return "RE-approve User Account";
    default:
      return "Confirm Action";
  }
};

export const getModalDescription = (
  dialogAction?:
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
) => {
  switch (dialogAction) {
    case "APPROVE":
      return "This will approve the user's account and grant them access to the platform.";
    case "BLOCK":
      return "This will block the user from accessing the platform. They will not be able to log in.";
    case "DISABLE":
      return "This will temporarily disable the user's account. They will not be able to log in until re-enabled.";
    case "ENABLE":
      return "This will re-enable the user's account and restore their access to the platform.";
    case "UNBLOCK":
      return "This will unblock the user's account and restore their access to the platform.";
    case "REJECT":
      return "This will reject the user's registration. They will need to register again to access the platform.";
    case "FLAG":
      return "This will flag the user's account for further review by the admin team.";
    case "VERIFY":
      return "This will add a verification badge to the user's profile, indicating they are a verified user.";
    case "UNVERIFY":
      return "This will remove the verification badge from the user's profile.";
    case "REAPPROVE":
      return "This will change the user's status from rejected to approved, allowing them to access the platform.";
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
