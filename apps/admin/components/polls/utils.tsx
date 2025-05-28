"use client";

import { Tag } from "antd";
import {
  CheckCircleOutlined,
  StopOutlined,
  PauseCircleFilled,
  CloseCircleOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";

export const getStatusTag = (status: "DISABLED" | "APPROVED") => {
  switch (status) {
    case "DISABLED":
      return (
        <Tag icon={<CloseCircleOutlined />} color="orange">
          Disabled
        </Tag>
      );
    case "APPROVED":
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
  dialogAction?: "DISABLE" | "ENABLE" | "DELETE"
) => {
  switch (dialogAction) {
    case "DISABLE":
      return "Disable Poll";
    case "ENABLE":
      return "Enable Poll";

    case "DELETE":
      return "Delete Poll";

    default:
      return "Confirm Action";
  }
};

export const getModalDescription = (
  dialogAction?: "DISABLE" | "ENABLE" | "DELETE"
) => {
  switch (dialogAction) {
    case "DISABLE":
      return "This will temporarily disable the Poll. It will not be visible until re-enabled.";
    case "ENABLE":
      return "This will re-enable the Poll and make it visible again.";

    case "DELETE":
      return "Will permanently delete the Poll and all its associated data. This action cannot be undone.";

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
