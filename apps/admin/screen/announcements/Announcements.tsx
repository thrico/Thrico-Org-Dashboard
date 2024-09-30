import { Card } from "antd";
import React from "react";
import Add from "./Add";

const Announcements = () => {
  return <Card extra={<Add />} title="Announcements"></Card>;
};

export default Announcements;
