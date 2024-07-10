"use client";

import { Button, Card, Flex } from "antd";
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Menus from "./menus/Menu";
import { updateHeaderLinks } from "../../../graphql/actions/user";
interface DataType {
  key: string;
  name: string;
  link: string;
  subMenu: [DataType];
}
const Header = ({ loading, data }) => {
  const [dataSource, setDataSource] = React.useState<DataType[]>(data);
  const addMenu = (value: DataType) => {
    setDataSource([...dataSource, value]);
  };
  const [update, { loading: btn }] = updateHeaderLinks();

  return (
    <Card
      loading={loading}
      extra={
        <Button
          loading={btn}
          onClick={() =>
            update({
              variables: {
                input: dataSource.map((set) => ({
                  id: set.key,
                  name: set.name,
                  link: set.link,
                  subMenu: set.subMenu?.map((set) => ({
                    id: set.key,
                    name: set.name,
                    link: set.link,
                  })),
                })),
              },
            })
          }
          disabled={dataSource?.length === 0}
          type="primary"
        >
          Update
        </Button>
      }
      title="Header Menu"
    >
      <Flex style={{ width: "100%", gap: 20 }}>
        <Card style={{ width: "30%" }} title="Header menu items">
          <Sidebar addMenu={addMenu} />
        </Card>
        <Card style={{ width: "70%" }} title="Header menu">
          <Menus dataSource={dataSource} setDataSource={setDataSource} />
        </Card>
      </Flex>
    </Card>
  );
};

export default Header;
