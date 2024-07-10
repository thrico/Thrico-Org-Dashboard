"use client";

import React from "react";
import Approval from "../../../../../screen/communities/approval/Approval";
import { getAllGroup } from "../../../../../graphql/actions/faq";

const page = () => {
  const { data, loading } = getAllGroup({
    variables: {
      input: {
        all: false,
        isApproved: false,
        isBlocked: false,
      },
    },
  });
  return <Approval data={data?.getAllGroupStatus} loading={loading} />;
};

export default page;
