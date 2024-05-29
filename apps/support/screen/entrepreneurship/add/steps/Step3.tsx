"use client";

import {
  AutoComplete,
  Avatar,
  Button,
  Card,
  DatePicker,
  Flex,
  Form,
  Input,
  List,
  Segmented,
  Space,
} from "antd";
import React, { useState } from "react";

import {
  GlobalOutlined,
  LockOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  ProfileOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import SubmitButton from "./SubmitButton";

import Cover from "../../../comman/Cover";
import { step3Props } from "../../ts-type";

interface props {
  submit: (values: step3Props) => void;
  step3Data: step3Props;

  prev: any;
}
const Step3 = ({ submit, step3Data, prev }: props) => {
  const [form] = Form.useForm();
  const participationType = Form.useWatch("participationType", form);
  const minMember = Form.useWatch("minMember", form);
  const maxMember = Form.useWatch("maxMember", form);

  const onFinish = (values: any) => {
    console.log(values);
  };
  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

  const { RangePicker } = DatePicker;
  return (
    <Form
      style={{ width: "100%" }}
      form={form}
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
    >
      <Flex style={{ width: "100%" }} gap={20} wrap="wrap">
        <Form.Item
          style={{ width: "47%" }}
          name="participationType"
          label="Participation Type"
          hasFeedback
          rules={[{ required: true }]}
        >
          <Segmented
            options={[
              {
                label: "Individual",
                icon: <ProfileOutlined />,
                value: "Individual",
              },
              {
                label: "Participation as a team",
                icon: <UsergroupAddOutlined />,
                value: "team",
              },
            ]}
          />
        </Form.Item>

        {participationType === "team" && (
          <Space
            direction="vertical"
            title="Participation as a team"
            style={{ width: "47%" }}
          >
            <>Participation as a team </>
            <Space>
              <Form.Item
                rules={[{ required: true }]}
                name="minMember"
                hasFeedback
                initialValue={1}
              >
                <Input
                  max={maxMember}
                  addonAfter="Min"
                  type="number"
                  min={1}
                ></Input>
              </Form.Item>
              <Form.Item
                rules={[{ required: true }]}
                name="maxMember"
                hasFeedback
                initialValue={20}
              >
                <Input min={minMember} type="number" addonAfter="Max"></Input>
              </Form.Item>
            </Space>
          </Space>
        )}

        <Form.Item
          style={{ width: "47%" }}
          name="time"
          label="Registration date and Time "
          hasFeedback
          rules={[{ required: true }]}
        >
          <RangePicker showTime />
        </Form.Item>
        <Form.Item
          style={{ width: "47%" }}
          name="noOfRegistrations"
          label="Number of Registrations  Allowed"
          hasFeedback
          rules={[{ required: true }]}
        >
          <Input type="number" min={1}></Input>
        </Form.Item>
        <Form.Item style={{ width: "100%" }}>
          <Flex style={{ width: "100%" }} justify="center">
            <Space>
              <Button onClick={() => prev()}>Previous</Button>
              <Button htmlType="submit" type="primary">
                Next
              </Button>
            </Space>
          </Flex>
        </Form.Item>
      </Flex>
    </Form>
  );
};

export default Step3;
