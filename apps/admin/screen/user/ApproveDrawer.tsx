import React, { useState } from "react";
import { Button, Descriptions, DescriptionsProps, Drawer, Space } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
const items: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "Name",
    children: <p>Zhou Maomao</p>,
  },

  {
    key: "1",
    label: "About",
    children: <p>Zhou Maomao</p>,
  },
  {
    key: "2",
    label: "Mentorship intro",
    children: <p>1810000000</p>,
  },
  {
    key: "3",
    label: "Category",
    children: <p>Hangzhou, Zhejiang</p>,
  },
  {
    span: 3,

    key: "4",
    label: "Add Youtube and vimeo  video for your future mentees",
    children: <p>empty</p>,
  },
  {
    span: 1,
    key: "5",
    label: "Why do you want a become a mentor? (Not publicly visible)",
    children: (
      <p>No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</p>
    ),
  },
  {
    span: 1,
    key: "5",
    label:
      "What, in your opinion, has been your greatest achievements so far? (Not publicly visible)",
    children: (
      <p>No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</p>
    ),
  },
];

const ApproveUser = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Approve
      </Button>
      <Drawer
        extra={
          <Space>
            <Button icon={<CloseCircleOutlined />}>Reject</Button>
            <Button icon={<CheckCircleOutlined />} type="primary">
              Approve
            </Button>
          </Space>
        }
        width={1000}
        title="Approve User"
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

export default ApproveUser;
