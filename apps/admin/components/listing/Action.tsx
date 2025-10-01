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

import {
  MarketPlaceListing,
  useChangeListingStatus,
  useChangeListingVerification,
} from "../../graphql/actions/listing";
import { getModalDescription, getModalTitle } from "./utils";
import Analytics from "./Analytics";
import { BsGraphUp } from "react-icons/bs";
import Details from "./Details";

// import Details from "./Details";
// import { MarketPlaceListing } from "../ts-types";
// import {
//   changeDiscussionCommunityStatus,
//   changeDiscussionCommunityVerification,
// } from "../../../graphql/actions/discussion-form";
// import Edit from "../post/Edit";

const Actions = (record: MarketPlaceListing) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isAnalytics, setIsAnalytics] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [listing, setListing] = useState<MarketPlaceListing | null>(null);

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
    listing: MarketPlaceListing | null
  ) => {
    setListing(listing);
    setDialogAction(action);
    setIsModalOpen(true);
  };

  const handleViewDetails = (user: MarketPlaceListing) => {
    setListing(user);
    setIsDrawerOpen(true);
    setIsModalOpen(false);
  };
  const router = useRouter();

  const handleViewSettings = (user: MarketPlaceListing) => {
    router.push(`/communities/${user.id}/manage`);
  };

  const handleAnalytics = (user: MarketPlaceListing) => {
    setListing(user);
    setIsAnalytics(true);
  };

  const items: MenuProps["items"] = [
    {
      key: "view",
      label: "View Details",
      icon: <EyeOutlined />,
      onClick: () => handleViewDetails(record),
    },

    {
      key: "Analytics",
      label: "View Analytics",
      icon: <BsGraphUp />,
      onClick: () => handleAnalytics(record),
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
        label: "Approve Listing",
        icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
        onClick: () => handleAction("APPROVE", record),
      },
      {
        key: "reject",
        label: "Reject Listing",
        icon: <DislikeOutlined style={{ color: "#722ed1" }} />,
        onClick: () => handleAction("REJECT", record),
      }
    );
  }

  if (record?.status === "REJECTED") {
    items.push({
      key: "approve",
      label: "Re-approve Listing",
      icon: <UndoOutlined />,
      onClick: () => handleAction("REAPPROVE", record),
    });
  }

  if (record?.status === "APPROVED") {
    items.push({
      key: "disable",
      label: "Disable Listing",
      icon: <UserDeleteOutlined style={{ color: "#faad14" }} />,
      onClick: () => handleAction("DISABLE", record),
    });

    items.push({
      key: "Manage Settings",
      label: "Manage Settings",
      icon: <SettingOutlined style={{ color: colorPrimary }} />,
      onClick: () => handleViewSettings(record),
    });
  }

  if (record?.status === "DISABLED") {
    items.push({
      key: "approve",
      label: "Enable Listing",
      icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
      onClick: () => handleAction("ENABLE", record),
    });
  }

  const [actionReason, setActionReason] = useState("");

  const onCompleted = () => {
    setIsModalOpen(false);
    setActionReason("");
    setListing(null);
    setIsDrawerOpen(false);
  };

  const [action, { loading }] = useChangeListingStatus({
    onCompleted,
  });
  const [changeVerification, { loading: verifyBtn }] =
    useChangeListingVerification({
      onCompleted,
    });
  const confirmAction = () => {
    if (dialogAction === "VERIFY" || dialogAction === "UNVERIFY") {
      return changeVerification({
        variables: {
          input: {
            reason: actionReason,
            listingId: listing?.id,
            action: dialogAction,
          },
        },
      });
    } else {
      action({
        variables: {
          input: {
            listingId: listing?.id,
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
            {dialogAction === "APPROVE" && "Approve Listing"}
            {dialogAction === "DISABLE" && "Disable Listing"}
            {dialogAction === "ENABLE" && "Enable Listing"}
            {dialogAction === "REJECT" && "Reject Listing"}
            {dialogAction === "VERIFY" && "Verify Listing"}
            {dialogAction === "UNVERIFY" && "Remove Verification"}
            {dialogAction === "REAPPROVE" && "Re-approve Listing"}
            {dialogAction === "PAUSE" && "Pause Listing"}
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
      {listing && (
        <>
          <Analytics
            id={listing?.id}
            open={isAnalytics}
            onClose={() => {
              setListing(null);
              setIsAnalytics(false);
            }}
          />

          <Details
            listing={listing}
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            handleAction={handleAction}
          />
        </>
      )}
    </>
  );
};

export default Actions;
