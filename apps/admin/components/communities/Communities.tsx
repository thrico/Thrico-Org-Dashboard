import React from "react";

import List from "./List";
import { getCommunities } from "../../graphql/actions/group";
import TableLoading from "../skeleton/TableLoading";
import { communitiesForumStatus } from "./ts-types";

const Communities = ({ status }: { status: communitiesForumStatus }) => {
  const { data, loading } = getCommunities({
    variables: {
      input: {
        status,
      },
    },
  });
  return (
    <>
      {loading && <TableLoading />}
      {!loading && <List data={data?.getCommunities} />}
    </>
  );
};

export default Communities;
