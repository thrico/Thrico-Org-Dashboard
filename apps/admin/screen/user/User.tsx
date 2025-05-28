import React, { useEffect } from "react";

import { getAllUser } from "../../graphql/actions/user";
import UsersPage from "./Ui";
import { Table } from "antd";
import TableLoading from "../../components/skeleton/TableLoading";

const User = ({ status }: any) => {
  const { data, loading } = getAllUser({
    variables: {
      input: {
        status: status,
      },
    },
  });

  const setDataSource = (about) => {
    console.log("Setting data source:", about);
  };

  return (
    <>
      {loading && <TableLoading />}
      {/* <List
        loading={loading}
        dataSource={data?.getAllUser}
        setDataSource={setDataSource}
      /> */}
      {!loading && <UsersPage users={data?.getAllUser} />}
    </>
  );
};

export default User;
