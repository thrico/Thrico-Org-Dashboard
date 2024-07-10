import { Button } from "antd";
import React from "react";
import StripeSvgIcon from "./svg/StripeSvgIcon";

const StripeButton = () => {
  return (
    <Button
      style={{ height: 50, width: 150 }}
      icon={<StripeSvgIcon />}
    ></Button>
  );
};

export default StripeButton;
