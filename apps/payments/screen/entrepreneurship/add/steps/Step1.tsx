"use client";

import {
  AutoComplete,
  Avatar,
  Button,
  Card,
  Flex,
  Form,
  Input,
  List,
  Segmented,
  Space,
} from "antd";
import React, { useState } from "react";
import Editor from "../../../comman/editor/Editor";
import {
  GlobalOutlined,
  LockOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import SubmitButton from "./SubmitButton";

import Cover from "../../../comman/Cover";
import { stepProps } from "../../ts-type";

interface props {
  next: any;
  step1Data: stepProps;
  setStep1Data: any;
}
const Step1 = ({ next, step1Data, setStep1Data }: props) => {
  const [form] = Form.useForm();
  const challengeMode = Form.useWatch("challengeMode", form);
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
    next();
    setStep1Data(values);
  };
  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

  const onWebsiteChange = (value: string) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net", ".tech", ".in", "edu.in"].map(
          (domain) => `${value}${domain}`
        )
      );
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  const [imageUrl, setImageUrl] = useState<string>("");
  const [cover, setCover] = useState<string>();
  return (
    <Form
      style={{ width: "100%" }}
      form={form}
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
    >
      <Cover
        setCover={setCover}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        buttonText="Update Challenge Image"
      />
      <Flex style={{ width: "100%" }} gap={20} wrap="wrap">
        <Form.Item
          style={{ width: "47%" }}
          hasFeedback
          name="title"
          label="Program/Challenge Title"
          initialValue={step1Data.title}
          rules={[
            {
              required: true,
              message: "Please input Job Title",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          initialValue={step1Data.visibility}
          style={{ width: "47%" }}
          name="visibility"
          label="Visibility"
          hasFeedback
          rules={[{ required: true }]}
        >
          <Segmented
            options={[
              {
                label: "Open Publicly",
                icon: <GlobalOutlined />,
                value: "public",
              },
              {
                label: "Invite Only",
                icon: <LockOutlined />,
                value: "private",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          initialValue={step1Data.website}
          style={{ width: "47%" }}
          name="website"
          label="Website"
          rules={[{ required: true, message: "Please input website!" }]}
        >
          <AutoComplete options={websiteOptions} onChange={onWebsiteChange}>
            <Input addonBefore="https://" />
          </AutoComplete>
        </Form.Item>

        <Form.Item
          initialValue={step1Data.challengeMode}
          style={{ width: "47%" }}
          name="challengeMode"
          label="Program/Challenge Mode"
          hasFeedback
          rules={[{ required: true }]}
        >
          <Segmented
            options={[
              {
                label: "Online",
                value: "online",
              },
              {
                label: "In person",
                value: "offline",
              },
            ]}
          />
        </Form.Item>
        {challengeMode === "offline" && (
          <Card style={{ width: "100%" }}>
            <Flex style={{ width: "100%" }} gap={20} wrap="wrap">
              <Form.Item
                initialValue={step1Data.location}
                style={{ width: "47%" }}
                name="location"
                label="Location"
                hasFeedback
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                initialValue={step1Data.city}
                style={{ width: "47%" }}
                name="city"
                label="City"
                hasFeedback
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                initialValue={step1Data.state}
                style={{ width: "47%" }}
                name="state"
                label="State"
                hasFeedback
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                initialValue={step1Data.country}
                style={{ width: "47%" }}
                name="country"
                label="Country"
                hasFeedback
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Flex>
          </Card>
        )}

        <Form.Item style={{ width: "100%" }}>
          <Flex style={{ width: "100%" }} justify="center">
            <SubmitButton form={form}>Next</SubmitButton>
          </Flex>
        </Form.Item>
      </Flex>
    </Form>
  );
};

export default Step1;
