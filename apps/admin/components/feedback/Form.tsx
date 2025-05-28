"use client";
import React from "react";
import { getPolls } from "../../graphql/actions/polls";
import TableLoading from "../skeleton/TableLoading";
import List from "./List";
import { getCustomForms } from "../../graphql/actions/customForm";

enum By {
  ENTITY = "ENTITY",
  ALL = "ALL",
  USER = "USER",
}

interface PollProps {
  by: By;
}

const Form: React.FC<PollProps> = ({ by }) => {
  const { data, loading } = getCustomForms({
    variables: {
      input: {
        by: by,
      },
    },
  });
  return (
    <>{loading ? <TableLoading /> : <List data={data?.getCustomForms} />}</>
  );
};

export default Form;
