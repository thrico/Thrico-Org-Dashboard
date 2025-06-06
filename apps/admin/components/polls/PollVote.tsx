"use client";

import { useState } from "react";
import {
  Card,
  Radio,
  Button,
  Progress,
  Tabs,
  Badge,
  Space,
  Typography,
  Divider,
  Row,
  Col,
} from "antd";
import { EyeInvisibleOutlined, ReloadOutlined } from "@ant-design/icons";
import type { RadioChangeEvent } from "antd";
import { poll } from "./ts-types";
import { voteOnPoll } from "../../graphql/actions/polls";
import { useApolloClient } from "@apollo/client";
import { GET_POLL_BY_USER } from "../../graphql/quries/polls";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

type PollOption = {
  id: string;
  text: string;
  votes: number;
};

type ViewMode = "ALWAYS" | "AFTER_VOTE" | "AFTER_END" | "ADMIN";

export default function PollVote({ data }: { data?: poll }) {
  const [currentMode, setCurrentMode] = useState<ViewMode>("ALWAYS");

  const handleTabChange = (key: string) => {
    setCurrentMode(key as ViewMode);
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px" }}>
      <PollComponent
        mode={data?.resultVisibility}
        options={data?.options}
        title={data?.title}
        description={data?.question}
        id={data?.id}
        isVoted={data?.isVoted}
        votedOptionId={data?.votedOptionId}
        totalVotes={data?.totalVotes}
      />
    </div>
  );
}

function PollComponent({
  mode,
  options,
  title,
  description,
  id,
  isVoted,
  votedOptionId,
  totalVotes,
}: {
  mode?: ViewMode;
  options: PollOption[] | undefined;
  title?: string;
  description?: string;
  id?: string;
  isVoted?: boolean;
  votedOptionId?: string;
  totalVotes?: number;
}) {
  const client = useApolloClient();
  r;

  const [selectedOption, setSelectedOption] = useState<string>(
    votedOptionId ?? ""
  );

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleVote = async () => {
    if (!selectedOption) return;

    const data = client.readQuery<{
      getPollByIdForUser: poll;
    }>({
      query: GET_POLL_BY_USER,
      variables: {
        input: {
          pollId: id,
        },
      },
    });

    let newValue = data?.getPollByIdForUser;
    if (!newValue) return;

    let updatedIsVoted = newValue.isVoted || false;
    let updatedVotedOptionId = newValue.votedOptionId || "";
    let updatedOptions = newValue.options;

    updatedIsVoted = true;
    updatedVotedOptionId = selectedOption;
    updatedOptions = newValue.options?.map((set) =>
      set.id === selectedOption ? { ...set, votes: set.votes + 1 } : set
    );

    console.log(updatedOptions);
    await client.writeQuery({
      query: GET_POLL_BY_USER,
      variables: {
        input: {
          pollId: id,
        },
      },
      data: {
        getPollByIdForUser: {
          ...newValue,
          options: updatedOptions,
          isVoted: updatedIsVoted,
          votedOptionId: updatedVotedOptionId,
          totalVotes: newValue.totalVotes + 1,
        },
      },
    });
    await vote({
      variables: {
        input: {
          pollId: id,
          optionId: selectedOption,
        },
      },
    });
  };

  const handleSubmit = () => {
    // if (!isVoted) {
    //   handleVote();
    // }
    setIsSubmitted(true);
  };

  const shouldShowResults = () => {
    switch (mode) {
      case "ALWAYS":
        return true;
      case "AFTER_VOTE":
        return isVoted;
      case "AFTER_END":
        return isSubmitted;

      default:
        return false;
    }
  };

  const resetPoll = () => {
    setSelectedOption("");

    setIsSubmitted(false);
  };

  const getModeDescription = () => {
    switch (mode) {
      case "ALWAYS":
        return "Results are visible at all times";
      case "AFTER_VOTE":
        return "Results appear immediately after voting";
      case "AFTER_END":
        return "Results appear only after submitting the poll";
      case "ADMIN":
        return "Results are never shown - anonymous voting";
    }
  };

  const getBadgeColor = () => {
    switch (mode) {
      case "ALWAYS":
        return "blue";
      case "AFTER_VOTE":
        return "green";
      case "AFTER_END":
        return "orange";
      case "ADMIN":
        return "purple";
      default:
        return "default";
    }
  };

  const handleRadioChange = (e: RadioChangeEvent) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      <div>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={4} style={{ margin: 0 }}>
              {title}
            </Title>
          </Col>
          <Col>
            <Badge
              color={getBadgeColor()}
              text={
                <Space size={4}>
                  {mode === "ADMIN" && <EyeInvisibleOutlined />}
                  {getModeDescription()}
                </Space>
              }
            />
          </Col>
        </Row>
        <Paragraph type="secondary" style={{ marginTop: 3, marginBottom: 10 }}>
          {description}
        </Paragraph>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <Radio.Group
          value={selectedOption}
          onChange={handleRadioChange}
          disabled={!!isVoted}
          style={{ width: "100%" }}
        >
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            {options?.map((option) => (
              <div key={option.id} style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <Radio value={option.id} style={{ fontWeight: 500 }}>
                    {option.text}
                  </Radio>
                  {shouldShowResults() && (
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      {option.votes} votes
                    </Text>
                  )}
                </div>

                {shouldShowResults() && (
                  <div style={{ marginLeft: "24px", marginBottom: "8px" }}>
                    <Progress
                      percent={
                        totalVotes > 0
                          ? Math.round((option.votes / totalVotes) * 100)
                          : 0
                      }
                      size="small"
                      showInfo={true}
                      format={(percent) => `${percent}%`}
                    />
                  </div>
                )}
              </div>
            ))}
          </Space>
        </Radio.Group>
      </div>

      {shouldShowResults() && (
        <>
          <Divider />
          <div style={{ textAlign: "center" }}>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              Total votes: {totalVotes}
            </Text>
          </div>
        </>
      )}

      {mode === "ADMIN" && isVoted && (
        <>
          <Divider />
          <div style={{ textAlign: "center" }}>
            <Space direction="vertical" size="small">
              <Space size="small">
                <EyeInvisibleOutlined />
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  Results are kept private
                </Text>
              </Space>
              <Text type="secondary" style={{ fontSize: "11px" }}>
                Your vote has been recorded anonymously
              </Text>
            </Space>
          </div>
        </>
      )}

      <div style={{ marginTop: "24px" }}>
        <Space style={{ width: "100%" }}>
          {mode === "AFTER_VOTE" && !isVoted && (
            <Button
              type="primary"
              onClick={handleVote}
              disabled={!selectedOption}
              style={{ flex: 1 }}
            >
              Vote
            </Button>
          )}

          {mode === "AFTER_END" && (
            <Button
              type="primary"
              onClick={handleSubmit}
              disabled={!selectedOption}
              style={{ flex: 1 }}
            >
              {isVoted ? "Submit Poll" : "Vote & Submit"}
            </Button>
          )}

          {(mode === "ALWAYS" || mode === "ADMIN") && (
            <Button
              type="primary"
              onClick={handleVote}
              disabled={!selectedOption || isVoted}
              style={{ flex: 1 }}
            >
              {isVoted ? "Voted" : "Vote"}
            </Button>
          )}

          <Button onClick={resetPoll} icon={<ReloadOutlined />}>
            Reset
          </Button>
        </Space>
      </div>
    </>
  );
}
