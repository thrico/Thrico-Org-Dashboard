import {
  CheckCircleOutlined,
  DeleteFilled,
  EditOutlined,
  MoreOutlined,
  OrderedListOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Form, List, MenuProps, Modal } from "antd";
import React, { useState } from "react";

import TextArea from "antd/es/input/TextArea";

import { getModalDescription, getModalTitle } from "./utils";
import { poll } from "./ts-types";
import { MdReport } from "react-icons/md";
import Edit from "./Edit";
import { changePollStatus, deletePoll } from "../../graphql/actions/polls";
import PollResultsPage from "./Result";
// import Details from "./Details";

// import {
//   changeDiscussionForumStatus,
//   changeDiscussionForumVerification,
// } from "../../../graphql/actions/discussion-form";
// import Edit from "../post/Edit";

const Actions = (record: poll) => {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [isEdit, setEditOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState<poll | null>(null);
  const [dialogAction, setDialogAction] = useState<
    "DISABLE" | "ENABLE" | "DELETE"
  >();

  const handleAction = (
    action: "DISABLE" | "ENABLE" | "DELETE",
    user: poll | null
  ) => {
    setSelectedPoll(user);
    setDialogAction(action);
    setIsModalOpen(true);
  };

  const handleViewDetails = (user: poll) => {
    setSelectedPoll(user);
    setIsDrawerOpen(true);
  };

  const handleEdit = (user: poll) => {
    setSelectedPoll(user);
    setEditOpen(true);
  };
  const handleViewResult = (user: poll) => {
    setSelectedPoll(user);
    setIsResult(true);
  };

  const items: MenuProps["items"] = [
    {
      key: "view",
      label: "View Result",
      icon: <MdReport />,
      onClick: () => handleViewResult(record),
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

  if (record?.status === "DISABLED") {
    items.push({
      key: "approve",
      label: "Enable Poll",
      icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
      onClick: () => handleAction("ENABLE", record),
    });
  }

  if (record?.status === "APPROVED") {
    items.push({
      key: "disable",
      label: "Disable Poll",
      icon: <UserDeleteOutlined style={{ color: "#faad14" }} />,
      onClick: () => handleAction("DISABLE", record),
    });
  }

  items.push({
    type: "divider",
  });

  items.push({
    key: "flag",
    label: "Delete Poll",
    danger: true,
    icon: <DeleteFilled />,
    onClick: () => handleAction("DELETE", record),
  });

  const [actionReason, setActionReason] = useState("");

  const onCompleted = () => {
    setIsModalOpen(false);
    setActionReason("");
    setSelectedPoll(null);
    setIsDrawerOpen(false);
  };

  const [action, { loading }] = deletePoll({
    onCompleted,
  });
  const [changeStatus, { loading: verifyBtn }] = changePollStatus({
    onCompleted,
  });
  const confirmAction = () => {
    if (dialogAction === "ENABLE" || dialogAction === "DISABLE") {
      return changeStatus({
        variables: {
          input: {
            reason: actionReason,
            pollId: selectedPoll?.id,
            action: dialogAction,
          },
        },
      });
    } else {
      action({
        variables: {
          input: {
            pollId: selectedPoll?.id,
            reason: actionReason,
          },
        },
      });
    }
  };

  const isReasonRequired =
    dialogAction === "ENABLE" ||
    dialogAction === "DISABLE" ||
    dialogAction === "DELETE";

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
              dialogAction === "DISABLE" || dialogAction === "DELETE"
                ? "primary"
                : dialogAction === "ENABLE"
                  ? "primary"
                  : "default"
            }
            danger={dialogAction === "DISABLE" || dialogAction === "DELETE"}
            onClick={confirmAction}
            disabled={isReasonRequired && !actionReason.trim()}
          >
            {dialogAction === "DELETE" && "Delete Forum"}

            {dialogAction === "DISABLE" && "Disable Forum"}
            {dialogAction === "ENABLE" && "Enable Poll"}
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

      {selectedPoll && (
        <Edit
          poll={selectedPoll}
          open={isEdit}
          onClose={() => setEditOpen(false)}
        />
      )}
      {selectedPoll && isResult && (
        <PollResultsPage
          poll={selectedPoll}
          open={isResult}
          onClose={() => setIsResult(false)}
        />
      )}
      {/* <Details
        selectedPoll={selectedPoll}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        handleAction={handleAction}
      />

      {selectedPoll && (
        <Edit
          forum={selectedPoll}
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
