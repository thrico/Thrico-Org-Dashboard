import React from "react";
import { Card, Space, Table, Tag, Typography } from "antd";
import { DataType } from "../theme/header/menus/ts-types";
import type { TableProps } from "antd";

const { Title } = Typography;
const Instructions = () => {
  interface DataType {
    value: string;
    name: string;
  }

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Host Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
  ];

  const data: DataType[] = [
    {
      name: "CNAME Record",
      value: "thrico.network",
    },
  ];
  return (
    <>
      <Card>
        <Space style={{ margin: 30 }} direction="vertical">
          <Title level={2}>Follow these instructions:</Title>
          <Typography>
            You can map your domain to thrico by adding the following DNS
            record.
          </Typography>
        </Space>
        <Space style={{ margin: 30 }}>
          <Table pagination={false} columns={columns} dataSource={data} />
        </Space>

        <Space style={{ margin: 30 }} direction="vertical">
          <Title level={2}>How long does it take?</Title>
          <Typography>
            It may take up to 24 hours for DNS changes to propagate fully. But
            it's usually pretty quick. You can check the progress by using a
            service like this.
          </Typography>
        </Space>

        <Space style={{ margin: 30 }} direction="vertical">
          <Title level={2}>What about SSL certificate?</Title>
          <Typography>
            We'll automatically provision an SSL certificate for your domain
            using Let's Encrypt when you visit your blog for the first time.
          </Typography>
        </Space>
        <Space style={{ margin: 30 }} direction="vertical">
          <Title level={2}>Using Cloudflare?</Title>
          <Typography>
            If you are using something like Cloudflare, please bypass it for
            this route by clicking on the "Orange Cloud". Make sure that it
            appears grayed out and the "Proxy Status" is "DNS Only".
          </Typography>
        </Space>
      </Card>
    </>
  );
};

export default Instructions;
