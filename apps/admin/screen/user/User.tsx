import React, { useEffect } from "react";
import List from "./List";
import { userData, userProps } from "./ts-types";

const User = ({ data, loading }: userProps) => {
  const [dataSource, setDataSource] = React.useState<userData[]>([]);
  const [loadData, setLoadData] = React.useState(true);
  useEffect(() => {
    setDataSource(data);
    setLoadData(false);
  }, [loading]);

  return (
    <List
      loading={loadData}
      dataSource={dataSource}
      setDataSource={setDataSource}
    />
  );
};

export default User;
