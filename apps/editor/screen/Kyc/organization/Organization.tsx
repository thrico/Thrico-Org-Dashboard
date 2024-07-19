import {
  AutoComplete,
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  Select,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import Logo from "../Logo";
const { Option } = Select;
const Organization = ({
  setCurrent,
  organization,
  setOrganization,
  logo,
  setLogo,
  logoPreview,
  setLogoPreview,
}) => {
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
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    setOrganization(values);
    setCurrent(2);
  };

  return (
    <Form
      form={form}
      name="register"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      style={{
        width: "95%",
        display: "flex",
        flexDirection: "column",
      }}
      scrollToFirstError
    >
      <Form.Item
        hasFeedback
        initialValue={organization.organizationName}
        name="organizationName"
        label="Organization Name"
        rules={[{ required: true, message: "Please input Organization Name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="entityType"
        label="Organization Category"
        rules={[{ required: true }]}
        initialValue={organization}
      >
        <Select placeholder="Organization Category (Select any one)" allowClear>
          <Option value="Education">Education </Option>
          <Option value="Corporate">Corporate</Option>
          <Option value="Professional Community">Professional Community</Option>
          <Option value="Not For Profit">Not For Profit</Option>
        </Select>
      </Form.Item>
      <Form.Item
        initialValue={organization.website}
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
        initialValue={organization.address}
        name="address"
        label="Address"
        rules={[{ required: true, message: "Please input address" }]}
      >
        <TextArea />
      </Form.Item>
      <Logo
        logo={logo}
        setLogo={setLogo}
        setLogoPreview={setLogoPreview}
        logoPreview={logoPreview}
      />
      <Form.Item
        initialValue={organization.agreement}
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
      >
        <Checkbox>
          I have read the{" "}
          <a target="_blank" href="https://thrico.com/privacy-policy/">
            agreement
          </a>
        </Checkbox>
      </Form.Item>
      <Flex gap={20} style={{ width: "100%" }} justify="center" align="center">
        <Button onClick={() => setCurrent(0)}>Previous</Button>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Flex>
    </Form>
  );
};

export default Organization;
