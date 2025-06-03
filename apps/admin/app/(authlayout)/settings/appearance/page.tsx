"use client";

import React from "react";
import Appearance from "../../../../screen/settings/appearance/Appearance";
import { getEntityTheme } from "../../../../graphql/actions/theme";

const page = () => {
  const { data, loading } = getEntityTheme();
  console.log(data);
  return !loading && <Appearance theme={data?.getEntityTheme} />;
};

export default page;
