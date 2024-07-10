import { Button } from "antd";
import React from "react";
import RazorPaySvg from "./svg/RazorPaySvg";

const RazorPayButton = () => {
  return (
    <Button style={{ height: 50, width: 150 }} icon={<RazorPaySvg />}></Button>
  );
};

export default RazorPayButton;
