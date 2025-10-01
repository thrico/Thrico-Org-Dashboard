"use client";

import { Layout, Table, Avatar, List as AntList } from "antd";
import type { TableProps } from "antd";
import moment from "moment";

import { Offer } from "../../graphql/actions/offers"; // Import Offer type (GraphQL)
import Actions from "./Action";

const { Content } = Layout;

// 🎁 Main Offers Table Component
export default function Offers({ data }: { data: Offer[] | undefined }) {
  // Define table columns
  const columns: TableProps<Offer>["columns"] = [
    {
      title: "Offer Title",
      dataIndex: "title",
      key: "title",
      width: 300,
      render: (_, record) => {
        const description = (
          <span style={{ textTransform: "capitalize", fontSize: 10 }}>
            {record?.location?.name}
          </span>
        );

        return (
          <AntList style={{ width: "100%" }}>
            <AntList.Item>
              <AntList.Item.Meta
                avatar={
                  <Avatar
                    shape="square"
                    style={{ width: 60 }}
                    src={
                      `https://cdn.thrico.network/${record.cover}` ||
                      "/placeholder.svg"
                    }
                  />
                }
                title={record?.title}
                description={description}
              />
            </AntList.Item>
          </AntList>
        );
      },
    },

    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (_, record) => <>{record.company.name}</>,
    },

    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (_, record) => <>{record.location?.address}</>,
    },

    // {
    //   title: "Status",
    //   key: "status",
    //   render: (_, record) =>
    //     getStatusTag(record?.isActive ? "active" : "inactive"),
    //   filters: [
    //     { text: "Active", value: true },
    //     { text: "Inactive", value: false },
    //   ],
    //   onFilter: (value, record) => record.isActive === value,
    // },

    {
      title: "Validity",
      key: "timelineStart",
      render: (_, record) => (
        <>
          {record.timeline?.[0] &&
            moment(record.timeline[0]).format("MMM Do YYYY")}{" "}
          -{" "}
          {record.timeline?.[1] &&
            moment(record.timeline[1]).format("MMM Do YYYY")}
        </>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => <Actions {...record} />,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "24px" }}>
        <Table
          size="small"
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: "No Offers found matching your criteria" }}
        />
      </Content>
    </Layout>
  );
}
