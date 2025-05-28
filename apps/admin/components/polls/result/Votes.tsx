import React, { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  Button,
  Card,
  Col,
  Layout,
  Modal,
  Row,
  Space,
  Statistic,
  Tabs,
  Typography,
} from "antd";
import { result } from "../ts-types";
import TabPane from "antd/es/tabs/TabPane";
import { getRandomColor } from "../../../hooks/getRandomColor";
import moment from "moment";
import { FilterOutlined } from "@ant-design/icons";
import { getEntity } from "../../../graphql/actions";
import UserAvatar from "../../../screen/comman/UserAvatar";
const { Title, Text, Paragraph } = Typography;
export const Votes = (data: result) => {
  const [activeTab, setActiveTab] = useState("summary");
  const optionsData = data?.options?.map((set) => ({
    name: set.text,
    value: set.votes,
  }));
  const { data: entity } = getEntity();
  return (
    <Tabs defaultActiveKey="summary" onChange={setActiveTab}>
      <TabPane tab="Summary" key="summary">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Card title="Vote Distribution" extra="Votes by option">
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={optionsData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis type="number" />
                  <YAxis
                    dataKey="name"
                    type="category"
                    scale="band"
                    width={100}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {optionsData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getRandomColor(index)}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Space>
      </TabPane>

      <TabPane tab="Individual Votes" key="votes">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Title level={5}>Individual Votes</Title>
            <Button icon={<FilterOutlined />}>Filter</Button>
          </div>

          <Card title="All Votes" extra="Individual vote details">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th
                    style={{
                      padding: "12px 8px",
                      textAlign: "left",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    Voter
                  </th>
                  <th
                    style={{
                      padding: "12px 8px",
                      textAlign: "left",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    Vote
                  </th>
                  <th
                    style={{
                      padding: "12px 8px",
                      textAlign: "left",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.individualVotes.map((vote) => (
                  <tr key={vote?.createdAt}>
                    <td
                      style={{
                        padding: "12px 8px",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      <Space>
                        {vote.votedBy === "USER" && (
                          <>
                            <Text strong>
                              <UserAvatar size={48} src={vote?.user?.avatar} />
                              {vote?.user?.firstName} {vote?.user?.lastName}
                            </Text>
                          </>
                        )}
                        {vote.votedBy === "ENTITY" && (
                          <>
                            <UserAvatar
                              size={48}
                              src={entity?.getEntity?.logo}
                            />
                            <Text strong>{entity?.getEntity?.name}</Text>
                          </>
                        )}
                      </Space>
                    </td>
                    <td
                      style={{
                        padding: "12px 8px",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      {vote?.pollOptions?.text}
                    </td>
                    <td
                      style={{
                        padding: "12px 8px",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      {moment(vote?.createdAt).fromNow()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Space>
      </TabPane>
    </Tabs>
  );
};
