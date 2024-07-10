"use client";

import React from "react";
import AllPages from "../../../components/customPages/AllPage";
import { getCustomPages } from "../../../graphql/actions";

const page = () => {
  const { data, loading } = getCustomPages();
  return <>{!loading && <AllPages data={data?.getCustomPages} />}</>;
};

export default page;
