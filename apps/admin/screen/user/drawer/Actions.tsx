import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import { PiDotsThreeOutline } from "react-icons/pi";
import ApproveUser from "./ApproveDrawer";

const Actions = ({ id }) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const items: MenuProps["items"] = [
    {
      label: <a onClick={showDrawer}>View</a>,
      key: "0",
    },
    {
      label: <a onClick={showDrawer}>Approvals</a>,
      key: "2",
    },

    {
      type: "divider",
    },
    {
      label: "Delete",
      key: "3",

      danger: true,
    },
  ];
  return (
    <>
      <Dropdown.Button
        title=""
        type="dashed"
        onClick={(e) => e.preventDefault()}
        menu={{ items }}
      ></Dropdown.Button>
      <ApproveUser id={id} onClose={onClose} open={open} />
    </>
  );
};

export default Actions;
