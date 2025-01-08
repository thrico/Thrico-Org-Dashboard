import React, { useState } from "react";
import {
  Button,
  Descriptions,
  DescriptionsProps,
  Drawer,
  Dropdown,
  MenuProps,
  Space,
} from "antd";
import {
  CaretDownOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { mentorShipActions } from "../../../graphql/actions/mentorship/category";

const ApproveDrawer = ({ data, onClose, open }) => {
  const [actions, { loading }] = mentorShipActions({});
  const {
    user,
    category,
    displayName,
    about,
    featuredArticle,
    greatestAchievement,
    intro,
    introVideo,
    whyDoWantBecomeMentor,
  } = data;

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Name",
      children: (
        <p>
          {user?.user?.firstName} {user?.user?.lastName}
        </p>
      ),
    },
    {
      key: "1",
      label: "Display Name",
      children: <p>{displayName}</p>,
    },
    {
      key: "1",
      label: "About",
      children: <p>{about}</p>,
    },
    {
      key: "2",
      label: "Mentorship intro",
      children: <p>{intro}</p>,
    },
    {
      key: "3",
      label: "Category",
      children: <p>{category?.title}</p>,
    },
    {
      span: 3,

      key: "4",
      label:
        " Intro Video Url  (Add Youtube and vimeo  video for your future mentees)",
      children: <p>{introVideo}</p>,
    },
    {
      span: 1,
      key: "5",
      label: "Why do you want a become a mentor? (Not publicly visible)",
      children: <p>{whyDoWantBecomeMentor}</p>,
    },
    {
      span: 1,
      key: "5",
      label:
        "What, in your opinion, has been your greatest achievements so far? (Not publicly visible)",
      children: <p>{greatestAchievement}</p>,
    },
    {
      span: 1,
      key: "5",
      label: "Featured Article",
      children: <p>{featuredArticle}</p>,
    },
  ];

  console.log(data);
  return (
    <>
      <Drawer
        extra={
          <Space>
            <Button
              loading={loading}
              onClick={() =>
                actions({
                  variables: {
                    input: {
                      action: "BLOCK",
                      mentorshipID: data?.id,
                    },
                  },
                })
              }
              danger
              icon={<StopOutlined />}
            >
              Block
            </Button>

            {!data?.isApproved && (
              <>
                <Button
                  loading={loading}
                  onClick={() =>
                    actions({
                      variables: {
                        input: {
                          action: "REJECT",
                          mentorshipID: data?.id,
                        },
                      },
                    })
                  }
                  icon={<CloseCircleOutlined />}
                >
                  Reject
                </Button>
                <Button
                  loading={loading}
                  onClick={() =>
                    actions({
                      variables: {
                        input: {
                          action: "APPROVE",
                          mentorshipID: data?.id,
                        },
                      },
                    })
                  }
                  icon={<CheckCircleOutlined />}
                  type="primary"
                >
                  Approve
                </Button>
              </>
            )}
          </Space>
        }
        width={1000}
        title="User Details"
        onClose={onClose}
        open={open}
      >
        <Descriptions
          bordered
          layout="vertical"
          title="User Info"
          items={items}
        />
      </Drawer>
    </>
  );
};

export default ApproveDrawer;
