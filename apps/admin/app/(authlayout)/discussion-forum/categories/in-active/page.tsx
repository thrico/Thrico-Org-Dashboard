"use client";

import React from "react";
import { getDiscussionForumCategory } from "../../../../../graphql/actions/discussion-form";
import TableLoading from "../../../../../components/skeleton/TableLoading";
import List from "../../../../../components/discussion-forum/categories/List";

const page = () => {
  const { data, loading } = getDiscussionForumCategory({
    variables: {
      input: {
        status: "INACTIVE",
      },
    },
  });
  return (
    <>
      {loading && <TableLoading />}
      {!loading && <List data={data?.getDiscussionForumCategory} />}
    </>
  );
};

export default page;
