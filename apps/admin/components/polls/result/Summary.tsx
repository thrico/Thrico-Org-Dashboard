import { Card, Col, Row, Space, Typography } from "antd";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Option, poll } from "../ts-types";
import { getRandomColor } from "../../../hooks/getRandomColor";

const { Title, Text, Paragraph } = Typography;

const Summary = ({
  selectedPoll,
  options,
}: {
  selectedPoll: poll;
  options: Option[];
}) => {
  const optionsData = options?.map((set) => ({
    name: set.text,
    value: set.votes,
  }));
  return (
    <Card
      title={selectedPoll?.question}
      extra={`${selectedPoll?.totalVotes} total votes`}
    >
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={optionsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {optionsData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getRandomColor(index)} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Col>

        <Col xs={24} md={12}>
          <Title level={5}>Vote Breakdown</Title>
          <Space direction="vertical" style={{ width: "100%" }}>
            {optionsData?.map((option, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: getRandomColor(index),
                      marginRight: 8,
                    }}
                  />
                  <span>{option.name}</span>
                </div>
                <div>
                  <Text strong>{option.value}</Text>
                  <Text type="secondary" style={{ marginLeft: 8 }}>
                    (
                    {Math.round(
                      (option.value /
                        optionsData.reduce(
                          (acc, curr) => acc + curr.value,
                          0
                        )) *
                        100
                    )}
                    %)
                  </Text>
                </div>
              </div>
            ))}
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default Summary;
