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

import { useRouter } from "next/navigation";

import { BsGraphUp } from "react-icons/bs";
// import Details from "./Details";
import {
  useChangeJobStatus,
  useChangeJobVerification,
} from "../../graphql/actions/jobs";
import { getModalDescription, getModalTitle } from "./utils";
import { Offer, useChangeOfferStatus } from "../../graphql/actions/offers";
import CreateOffer from "./post/Create";

const Actions = (record: Offer) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const onCompleted = () => {
    setIsModalOpen(false);
    setActionReason("");
    setactiveOffer(null);
  };

  const [action, { loading }] = useChangeOfferStatus({
    onCompleted,
  });
  const [activeOffer, setactiveOffer] = useState<Offer | null>(null);
  const confirmAction = () => {
    action({
      variables: {
        input: {
          id: activeOffer?.id,
          isActive: !activeOffer?.isActive,
        },
      },
    });
  };

  const [dialogAction, setDialogAction] = useState<"DISABLE" | "ENABLE">();

  const handleAction = (
    action: "DISABLE" | "ENABLE",
    listing: Offer | null
  ) => {
    setactiveOffer(listing);
    setDialogAction(action);
    setIsModalOpen(true);
  };

  const router = useRouter();

  const handleEdit = (user: Offer) => {
    setactiveOffer(user);
    setIsEdit(true);
  };

  const items: MenuProps["items"] = [
    {
      key: "edit",
      label: "Edit",
      icon: <EditOutlined />,
      onClick: () => handleEdit(record),
    },
  ];

  if (record?.isActive) {
    items.push({
      key: "disable",
      label: "Disable Job",
      icon: <UserDeleteOutlined style={{ color: "#faad14" }} />,
      onClick: () => handleAction("DISABLE", record),
    });
  }

  if (!record?.isActive) {
    items.push({
      key: "approve",
      label: "Enable Job",
      icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
      onClick: () => handleAction("ENABLE", record),
    });
  }

  const [actionReason, setActionReason] = useState("");

  const isReasonRequired =
    dialogAction === "DISABLE" || dialogAction === "ENABLE";

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
            loading={loading}
            key="submit"
            type={
              dialogAction === "DISABLE"
                ? "primary"
                : dialogAction === "ENABLE"
                  ? "primary"
                  : "default"
            }
            danger={dialogAction === "DISABLE"}
            onClick={confirmAction}
            disabled={isReasonRequired && !actionReason.trim()}
          >
            {dialogAction === "DISABLE" && "Disable Offer  "}
            {dialogAction === "ENABLE" && "Enable Offer"}
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
      {isEdit && (
        <>
          <CreateOffer
            type="edit"
            initialValues={activeOffer}
            onClose={() => {
              setactiveOffer(null);
              setIsEdit(false);
            }}
            open={!!activeOffer}
          />
        </>
      )}
    </>
  );
};

export default Actions;
