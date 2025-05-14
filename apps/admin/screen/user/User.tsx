import React, { useEffect } from "react";
import List from "./List";
import { userData, userProps } from "./ts-types";
import { getAllUser } from "../../graphql/actions/user";

const User = ({ status }) => {
  const { data, loading } = getAllUser({
    variables: {
      input: {
        status: status,
      },
    },
  });

  const setDataSource = (about: userData[]) => {
    console.log("Setting data source:", about);
  };

  return (
    <List
      loading={loading}
      dataSource={data?.getAllUser}
      setDataSource={setDataSource}
    />
  );
};

export default User;
