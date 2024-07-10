import { Collapse, CollapseProps } from "antd";
import React from "react";
import AddCustomLink from "./AddCustomLink";
import AddPage from "./AddPage";

const Sidebar = ({ addMenu }) => {
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Pages",
      children: <AddPage addMenu={addMenu} />,
    },
    {
      key: "2",
      label: "Custom Link",
      children: <AddCustomLink addMenu={addMenu} />,
    },
  ];
  return <Collapse items={items} />;
};

export default Sidebar;
