import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Divider,
  Drawer,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import React, { useState } from "react";
import { getStatusTag } from "../utils";
import {
  CheckCircleFilled,
  CheckCircleOutlined,
  DislikeOutlined,
  FlagOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
  UndoOutlined,
  UnlockOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { userStatus } from "../ts-types";
import moment from "moment";

const UserDetails = ({
  selectedUser,
  isDrawerOpen,
  setIsDrawerOpen,
  handleAction,
}: {
  selectedUser: userStatus | null;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  handleAction: (
    action:
      | "APPROVE"
      | "BLOCK"
      | "DISABLE"
      | "ENABLE"
      | "UNBLOCK"
      | "REJECT"
      | "FLAG"
      | "VERIFY"
      | "UNVERIFY"
      | "REAPPROVE",
    user: userStatus | null
  ) => void;
}) => {
  const { Title, Text, Paragraph } = Typography;
  return (
    <Drawer
      title="User Details"
      placement="right"
      onClose={() => setIsDrawerOpen(false)}
      open={isDrawerOpen}
      width={800}
      extra={
        <Space wrap>
          {selectedUser?.status === "PENDING" && (
            <>
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                onClick={() => handleAction("APPROVE", selectedUser)}
              >
                Approve
              </Button>
              <Button
                danger
                icon={<DislikeOutlined />}
                onClick={() => handleAction("REJECT", selectedUser)}
              >
                Reject
              </Button>
            </>
          )}

          {selectedUser?.status === "BLOCKED" ? (
            <Button
              type="primary"
              icon={<UnlockOutlined />}
              onClick={() => handleAction("UNBLOCK", selectedUser)}
            >
              Unblock
            </Button>
          ) : (
            selectedUser?.status === "REJECTED" && (
              <>
                <Button
                  danger
                  icon={<LockOutlined />}
                  onClick={() => handleAction("BLOCK", selectedUser)}
                >
                  Block
                </Button>
                <Button
                  type="primary"
                  icon={<UndoOutlined />}
                  onClick={() => handleAction("REAPPROVE", selectedUser)}
                >
                  Re-approve User
                </Button>
              </>
            )
          )}

          {selectedUser?.status === "APPROVED" && (
            <>
              {selectedUser?.verification?.isVerified ? (
                <Button
                  danger
                  icon={<SafetyCertificateOutlined />}
                  onClick={() => handleAction("UNVERIFY", selectedUser)}
                >
                  Remove Verification
                </Button>
              ) : (
                <Button
                  type="primary"
                  icon={<SafetyCertificateOutlined />}
                  onClick={() => handleAction("VERIFY", selectedUser)}
                >
                  Verify User
                </Button>
              )}
              <Button
                icon={<UserDeleteOutlined />}
                onClick={() => handleAction("DISABLE", selectedUser)}
              >
                Disable
              </Button>
            </>
          )}

          {selectedUser?.status === "DISABLED" && (
            <>
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                onClick={() => handleAction("ENABLE", selectedUser)}
              >
                Enable
              </Button>
            </>
          )}

          <Button
            icon={<FlagOutlined />}
            onClick={() => handleAction("FLAG", selectedUser)}
          >
            Flag for Review
          </Button>
        </Space>
      }
    >
      {selectedUser && (
        <div>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <Avatar
              size={80}
              src={`https://cdn.thrico.network/${selectedUser?.user?.avatar}`}
            ></Avatar>
            <Title level={4} style={{ marginTop: 16, marginBottom: 4 }}>
              {selectedUser?.verification?.isVerified && (
                <Tooltip title="Verified User">
                  <CheckCircleFilled style={{ color: "#1890ff" }} />
                </Tooltip>
              )}
              {selectedUser?.user?.firstName} {selectedUser?.user?.lastName}
            </Title>
            {/* <Text type="secondary">{selectedUser?.user}</Text> */}
            <div style={{ marginTop: 8 }}>
              {getStatusTag(selectedUser?.status)}
            </div>
          </div>

          <Divider />

          <Title level={5}>Contact Information</Title>
          <Descriptions column={{ xs: 1, sm: 2 }}>
            <Descriptions.Item label="Email">
              {selectedUser?.user?.email}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {/* {selectedUser?.phone} */}
              {selectedUser?.user?.profile?.phone?.countryCode}-
              {selectedUser?.user?.profile?.phone?.areaCode}-
              {selectedUser?.user?.profile?.phone?.phoneNumber}
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          <Title level={5}>Personal Information</Title>
          <Descriptions column={{ xs: 1, sm: 2 }}>
            <Descriptions.Item label="Date of Birth">
              {selectedUser?.user?.profile?.DOB
                ? moment(selectedUser?.user?.profile?.DOB).format("YYYY-MM-DD")
                : "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">
              {selectedUser?.user?.profile?.gender}
            </Descriptions.Item>
            <Descriptions.Item label="Pronouns">
              {selectedUser?.user?.about?.pronouns}
            </Descriptions.Item>
            <Descriptions.Item label="Location">
              {selectedUser?.user?.location?.name}
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          <Title level={5}>Professional Information</Title>
          <Descriptions column={1}>
            <Descriptions.Item label="Current Position">
              {selectedUser?.user?.about?.currentPosition}
            </Descriptions.Item>
            <Descriptions.Item label="About">
              {selectedUser?.user?.about?.about}
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          <Title level={5}>Education</Title>
          {selectedUser?.user?.profile?.education.map((edu, index) => (
            <Card key={index} size="small" style={{ marginBottom: 16 }}>
              <Title level={5} style={{ marginTop: 0 }}>
                {edu.school.name}
              </Title>
              <Text>{edu.degree}</Text>
              <br />
              <Text type="secondary">{edu.duration[0]}</Text>
            </Card>
          ))}

          <Divider />

          <Title level={5}>Experience</Title>
          {selectedUser?.user?.profile.experience.map((exp, index) => (
            <Card key={index} size="small" style={{ marginBottom: 16 }}>
              <Title level={5} style={{ marginTop: 0 }}>
                {exp.company.name}
              </Title>
              <Text>{exp.title}</Text>
              <br />
              <Text type="secondary">{exp.startDate}</Text>
            </Card>
          ))}

          <Divider />

          <Title level={5}>Skills & Interests</Title>
          <Descriptions column={1}>
            <Descriptions.Item label="Skills">
              <Space wrap>
                {/* {selectedUser?.user?.profile?.skills.map((skill, index) => (
                  <Tag key={index} color="blue">
                    {skill}
                  </Tag>
                ))} */}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Interests">
              <Space wrap>
                {/* {selectedUser?.user?.profile?.categories.map(
                  (interest, index) => <Tag key={index}>{interest}</Tag>
                )} */}
              </Space>
            </Descriptions.Item>
          </Descriptions>

          <Divider />
          <Title level={5}>Kyc Details</Title>
          <Descriptions column={{ xs: 1, sm: 2 }}>
            <Descriptions.Item label="Affliction">
              {selectedUser?.userKyc?.affliction}
            </Descriptions.Item>
            <Descriptions.Item label="Referral Source">
              {selectedUser?.userKyc?.referralSource}
            </Descriptions.Item>
            <Descriptions.Item label="Comment">
              {selectedUser?.userKyc?.comment}
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </Drawer>
  );
};

export default UserDetails;
