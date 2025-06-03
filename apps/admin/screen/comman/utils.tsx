import { Tag } from "antd";
import { communitiesForumStatus } from "../../components/communities/ts-types";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  PauseCircleFilled,
} from "@ant-design/icons";

export const getStatusTag = (status: communitiesForumStatus) => {
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
