"use client";

import React, { useState } from "react";
import { Button, Drawer, Tabs, TabsProps } from "antd";

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Design",
      children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: "Preview",
      children: "Content of Tab Pane 2",
    },
    // {
    //   key: "3",
    //   label: "Tab 3",
    //   children: "Content of Tab Pane 3",
    // },
  ];

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer
        width={"100vw"}
        style={{ width: "100vw" }}
        title="Create FeedBack"
        onClose={onClose}
        open={open}
      >
        <Tabs defaultActiveKey="1" items={items} />
      </Drawer>
    </>
  );
};

export default App;
