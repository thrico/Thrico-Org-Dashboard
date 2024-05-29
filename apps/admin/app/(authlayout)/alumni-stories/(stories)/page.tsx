"use client";

import React from "react";
import AllStories from "../../../../screen/stories/stories/AllStories";
import { getAllAlumniStories } from "../../../../graphql/actions/alumniStories/stories";

const page = () => {
  const { loading, data } = getAllAlumniStories({});
  return <AllStories loading={loading} data={data} />;
};

export default page;
