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
import ApproveDrawer from "./ApproveDrawer";

const Actions = ({ data }) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const items: MenuProps["items"] = [
    {
      label: "View Details",
      key: "1",
      onClick: () => showDrawer(),
    },
    {
      type: "divider",
    },
    {
      label: "View  Services",
      key: "2",
      onClick: () => showDrawer(),
    },
    {
      type: "divider",
    },
    {
      label: "View  Log",
      key: "3",
      onClick: () => showDrawer(),
    },
  ];

  return (
    <>
      <Dropdown
        overlayStyle={{ width: 200 }}
        menu={{ items }}
        trigger={["click"]}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Button icon={<DownOutlined />}>Action</Button>
          </Space>
        </a>
      </Dropdown>
      <ApproveDrawer data={data} onClose={onClose} open={open} />
    </>
  );
};

export default Actions;
