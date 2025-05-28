import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  Radio,
  Select,
  Space,
  TimePicker,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";

const { Title, Text } = Typography;

import React from "react";
import { Question } from "../../../../store/ts-types";

const FormTitle = ({ question }: { question: Question }) => {
  return (
    <Title level={5}>
      {question?.question}{" "}
      {question?.required && <span style={{ color: "red" }}>*</span>}
    </Title>
  );
};

export const ScrollView = (question: Question) => {
  switch (question.type) {
    case "SHORT_TEXT":
      return (
        <Space direction="vertical" style={{ width: "100%" }}>
          <FormTitle question={question} />
          <Input placeholder="Type your answer here..." disabled />
          <Text type="secondary">
            Max length: {question.maxLength || 255} characters
          </Text>
        </Space>
      );

    case "LONG_TEXT":
      return (
        <Space direction="vertical" style={{ width: "100%" }}>
          <FormTitle question={question} />
          <TextArea placeholder="Type your answer here..." disabled rows={4} />
          <Text type="secondary">
            Max length: {question.maxLength || 4000} characters
          </Text>
        </Space>
      );

    case "EMAIL":
      return (
        <Space direction="vertical" style={{ width: "100%" }}>
          <FormTitle question={question} />
          <Input type="email" placeholder="email@example.com" disabled />
        </Space>
      );

    case "PHONE":
      return (
        <Space direction="vertical" style={{ width: "100%" }}>
          <FormTitle question={question} />
          <Input type="tel" placeholder="+1 (555) 123-4567" disabled />
        </Space>
      );

    case "WEBSITE":
      return (
        <Space direction="vertical" style={{ width: "100%" }}>
          <FormTitle question={question} />
          <Input type="url" placeholder="https://example.com" disabled />
        </Space>
      );

    case "NUMBER":
      return (
        <Space direction="vertical" style={{ width: "100%" }}>
          <FormTitle question={question} />
          <Input type="number" placeholder="0" disabled />
        </Space>
      );

    case "OPINION_SCALE":
      return (
        <Space direction="vertical" style={{ width: "100%" }}>
          <FormTitle question={question} />
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text type="secondary">
                {question.labels?.start || "Not at all likely"}
              </Text>
              <Text type="secondary">
                {question.labels?.end || "Extremely likely"}
              </Text>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              {Array.from({
                length: (question.max || 10) - (question.min || 1) + 1,
              }).map((_, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Button shape="circle" style={{ width: 40, height: 40 }}>
                    {(question.min || 1) + index}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Space>
      );

    case "MULTIPLE_CHOICE":
      return (
        <Space direction="vertical" style={{ width: "100%" }}>
          <FormTitle question={question} />
          {question.allowMultiple ? (
            <Checkbox.Group>
              {question?.options?.map((option, index) => (
                <div key={index} style={{ marginBottom: 8 }}>
                  <Checkbox value={option}>{option}</Checkbox>
                </div>
              ))}
            </Checkbox.Group>
          ) : (
            <Radio.Group>
              {question?.options?.map((option, index) => (
                <div key={index} style={{ marginBottom: 8 }}>
                  <Radio value={option}>{option}</Radio>
                </div>
              ))}
            </Radio.Group>
          )}
        </Space>
      );

    case "ISOPTION":
      return (
        <Space direction="vertical" style={{ width: "100%" }}>
          <FormTitle question={question} />
          <Radio.Group>
            {question?.options?.map((option, index) => (
              <div key={index} style={{ marginBottom: 8 }}>
                <Radio value={option}>{option}</Radio>
              </div>
            ))}
          </Radio.Group>
        </Space>
      );

    case "RATING":
      return (
        <Space direction="vertical" style={{ width: "100%" }}>
          <FormTitle question={question} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {Array.from({ length: question.scale || 5 }).map((_, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Button shape="circle" style={{ width: 40, height: 40 }}>
                  {index + 1}
                </Button>
                <Text type="secondary">
                  {index === 0
                    ? "Poor"
                    : index === (question.scale || 5) - 1
                      ? "Excellent"
                      : ""}
                </Text>
              </div>
            ))}
          </div>
        </Space>
      );

    case "DROPDOWN":
      return (
        <Space direction="vertical" style={{ width: "100%" }}>
          <FormTitle question={question} />
          <Select
            placeholder="Select an option"
            disabled
            style={{ width: "100%" }}
            options={question?.options?.map((option) => ({
              label: option,
              value: option,
            }))}
          />
        </Space>
      );

    case "DATE":
      return (
        <Space direction="vertical" style={{ width: "100%" }}>
          <FormTitle question={question} />
          <DatePicker style={{ width: "100%" }} />
        </Space>
      );

    case "TIME":
      return (
        <Space direction="vertical" style={{ width: "100%" }}>
          <FormTitle question={question} />
          <TimePicker style={{ width: "100%" }} />
        </Space>
      );

    case "YES-NO":
      return (
        <Space direction="vertical" style={{ width: "100%" }}>
          <FormTitle question={question} />
          <Space>
            <Button>Yes</Button>
            <Button>No</Button>
          </Space>
        </Space>
      );

      return (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Title level={5}>Hidden Field (not visible to respondents)</Title>
          <div style={{ padding: 16, background: "#f5f5f5", borderRadius: 8 }}>
            <Text type="secondary">
              Field name: {question.fieldName || "user_id"}
            </Text>
            <br />
            <Text type="secondary">
              Default value: {question.defaultValue || ""}
            </Text>
          </div>
        </Space>
      );
    default:
      return null;
  }
};
