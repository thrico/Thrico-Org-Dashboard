"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeftOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, Layout, Modal, Space, Tabs, Typography } from "antd";

import Summary from "./Summary";
import { getPollResult } from "../../../graphql/actions/polls";
import { poll } from "../ts-types";
import { Votes } from "./Votes";

const { Header, Content } = Layout;
const { Title } = Typography;

export default function PollResultsPage({
  open,
  onClose,
  selectedPoll,
}: {
  open: boolean;
  onClose: () => void;
  selectedPoll: poll;
}) {
  const { data, loading } = getPollResult({
    variables: {
      input: {
        pollId: selectedPoll?.id,
      },
    },
  });

  // Mock data for the poll

  // Mock data for poll options

  // Mock data for individual votes

  return (
    <Modal
      title={selectedPoll.title}
      open={open}
      onCancel={onClose}
      footer={null}
      width={1200}
      loading={loading}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Title level={4} style={{ margin: 0 }}></Title>
          <Space>
            <Button icon={<ArrowLeftOutlined />}>
              <Link href="/polls">Back to Polls</Link>
            </Button>
            <Button type="primary" icon={<DownloadOutlined />}>
              Export Results
            </Button>
          </Space>
        </Header>

        <Content style={{ padding: "24px", background: "#f5f5f5" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            {/* <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Total Votes"
                    value={selectedPoll?.totalVotes}
                    suffix={
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        +12 from yesterday
                      </Text>
                    }
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Participation Rate"
                    // value={poll.participationRate}
                    suffix={
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        +5% from last poll
                      </Text>
                    }
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Avg. Time to Vote"
                    // value={poll.averageTime}
                    suffix={
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        -3s from last poll
                      </Text>
                    }
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Leading Option"
                    value={
                      optionsData.sort((a, b) => b.value - a.value)[0].name
                    }
                    suffix={
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {Math.round(
                          (optionsData.sort((a, b) => b.value - a.value)[0]
                            .value /
                            optionsData.reduce(
                              (acc, curr) => acc + curr.value,
                              0
                            )) *
                            100
                        )}
                        % of votes
                      </Text>
                    }
                  />
                </Card>
              </Col>
            </Row> */}

            <Summary
              selectedPoll={selectedPoll}
              options={data?.getPollResult.options}
            />
            <div style={{ marginTop: 24 }}>
              <Votes {...data?.getPollResult} />
            </div>
          </div>
        </Content>
      </Layout>
    </Modal>
  );
}
