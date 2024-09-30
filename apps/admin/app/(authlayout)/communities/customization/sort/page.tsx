"use client";

import React from "react";
import Approval from "../../../../../screen/communities/approval/Approval";
import { getAllGroup } from "../../../../../graphql/actions/faq";
import { Card } from "antd";
import Add from "../../../../../screen/communities/featured/Add";

const page = () => {
  const { data, loading } = getAllGroup({
    variables: {
      input: {
        status: "ALL",
      },
    },
  });
  return (
    <Card extra={<Add />}>
      <Approval data={data?.getAllGroupStatus} loading={loading} />;
    </Card>
  );
};

export default page;
