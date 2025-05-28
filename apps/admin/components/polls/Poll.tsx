"use client";
import React from "react";
import { getPolls } from "../../graphql/actions/polls";
import TableLoading from "../skeleton/TableLoading";
import List from "./List";

enum By {
  ENTITY = "ENTITY",
  ALL = "ALL",
  USER = "USER",
}

interface PollProps {
  by: By;
}

const Poll: React.FC<PollProps> = ({ by }) => {
  const { data, loading } = getPolls({
    variables: {
      input: {
        by: by,
      },
    },
  });
  return <>{loading ? <TableLoading /> : <List data={data?.getPolls} />}</>;
};

export default Poll;
