"use client";

import React from "react";
import User from "../../../screen/user/User";
import { getAllUser } from "../../../graphql/actions/user";

const page = () => {
  const { data, loading } = getAllUser({});
  return <User data={data?.getAllUser} loading={loading} />;
};

export default page;
