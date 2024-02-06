"use client";

import React, { useState } from "react";
import type { CascaderProps } from "antd";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import PhoneNumber from "./PhoneNumber";
import TimeZone from "./TimeZone";
import Language from "./Language";
import TextArea from "antd/es/input/TextArea";
import Logo from "./Logo";
const { Option } = Select;

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const residences: CascaderProps<DataNodeType>["options"] = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const KycForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

  const onWebsiteChange = (value: string) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      style={{
        width: "80%",
        display: "flex",
        flexDirection: "column",
      }}
      scrollToFirstError
    >
      <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
        <Input style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name="designation"
        label="Your Designation"
      >
        <Input readOnly style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="OrganizationCategory"
        label="Organization Category"
        rules={[{ required: true }]}
      >
        <Select placeholder="Organization Category (Select any one)" allowClear>
          <Option value="Education">Education </Option>
          <Option value="Corporate">Corporate</Option>
          <Option value="Professional Community">Professional Community</Option>
          <Option value="Not For Profit">Not For Profit</Option>
        </Select>
      </Form.Item>

      <PhoneNumber />
      <TimeZone />
      <Language />

      <Form.Item
        name="website"
        label="Website"
        rules={[{ required: true, message: "Please input website!" }]}
      >
        <AutoComplete
          options={websiteOptions}
          onChange={onWebsiteChange}
          placeholder="website"
        >
          <Input />
        </AutoComplete>
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        rules={[{ required: true, message: "Please input address" }]}
      >
        <TextArea />
      </Form.Item>

      <Logo />

      <Form.Item
        rules={[{ required: true }]}
        name="designation"
        label="Choose Domain"
      >
        <Input
          addonBefore="http://"
          addonAfter=".alumnithirve.com"
          defaultValue="mysite"
        />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Should accept agreement")),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the{" "}
          <a target="_blank" href="https://alumnithrive.com/privacy-policy/">
            agreement
          </a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default KycForm;
