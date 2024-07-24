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
  EllipsisOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { mentorShipActions } from "../../../graphql/actions/mentorship/category";
import Preview from "./Preview";
import { alumniStoriesActions } from "../../../graphql/actions/alumniStories/stories";

const ApproveDrawer = ({ data, onClose, open }) => {
  const [actions, { loading }] = alumniStoriesActions({});
  const { user } = data;

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Name",
      children: (
        <p>
          {user?.alumni?.firstName} {user?.alumni?.lastName}
        </p>
      ),
    },

    {
      key: "1",
      label: "Current Position",
      children: <p>{user?.alumni?.aboutUser?.currentPosition}</p>,
    },
  ];

  return (
    <>
      <Drawer
        extra={
          <Space>
            {!data?.isApproved && (
              <>
                <Button
                  loading={loading}
                  onClick={() =>
                    actions({
                      variables: {
                        input: {
                          action: "REJECT",
                          ID: data?.id,
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
                          ID: data?.id,
                        },
                      },
                    })
                  }
                  type="primary"
                >
                  <EllipsisOutlined />
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
        <Space direction="vertical" style={{ gap: 20, width: "100%" }}>
          <Descriptions
            bordered
            layout="vertical"
            title="User Info"
            items={items}
          />
          <Preview data={data} />
        </Space>
      </Drawer>
    </>
  );
};

export default ApproveDrawer;
