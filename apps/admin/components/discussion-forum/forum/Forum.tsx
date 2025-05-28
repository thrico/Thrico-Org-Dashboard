import React from "react";
import { getDiscussionForum } from "../../../graphql/actions/discussion-form";
import { discussionForumStatus } from "../ts-types";
import TableLoading from "../../skeleton/TableLoading";
import List from "./List";

const Forum = ({ status }: { status: discussionForumStatus }) => {
  const { data, loading } = getDiscussionForum({
    variables: {
      input: {
        status: status,
      },
    },
  });
  return (
    <>
      {loading && <TableLoading />}
      {!loading && <List data={data?.getDiscussionForum} />}
    </>
  );
};

export default Forum;
