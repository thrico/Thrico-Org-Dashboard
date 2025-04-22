import { Card, List, Space, Tag } from "antd";
import React from "react";
import DomainChange from "./DomainChange";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { CheckCircleOutlined } from "@ant-design/icons";
import { getThricoDomain } from "../../../../graphql/actions/domain";

const ThricoDomain = () => {
  const { data, loading } = getThricoDomain();

  return (
    <Card loading={loading}>
      <List.Item
        extra={<Tag color="success" icon={<CheckCircleOutlined />}></Tag>}
      >
        <List.Item.Meta
          avatar={<BsGlobeCentralSouthAsia size={20} />}
          title={`https://${data?.getThricoDomain?.domain}.thrico.community`}
          description={"Primary"}
        />
        <Space style={{ marginRight: 10 }}>
          <DomainChange />
        </Space>
      </List.Item>
    </Card>
  );
};

export default ThricoDomain;
