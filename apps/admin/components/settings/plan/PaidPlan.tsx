import React from "react";
import SubscriptionPan from "./ActivePlan";
import Upgrade from "./Upgrade/Upgrade";
import { Flex } from "antd";

const PaidPlan = () => {
  return (
    <Flex align="center" justify="center" vertical style={{ padding: 24 }}>
      <SubscriptionPan />
      <Upgrade />
    </Flex>
  );
};

export default PaidPlan;
