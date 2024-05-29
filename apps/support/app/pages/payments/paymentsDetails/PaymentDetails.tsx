"use client";

import { Flex } from "antd";
import React from "react";
import PaymentTimeline from "./Timeline";
import Details from "./Details";

const PaymentDetails = () => {
  return (
    <Flex gap={20}>
      <Details />
      <PaymentTimeline />
    </Flex>
  );
};

export default PaymentDetails;
