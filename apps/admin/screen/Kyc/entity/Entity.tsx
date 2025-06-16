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
import { entityKYC } from "../../../graphql/actions";

const { Option } = Select;
const Entity = ({
  setCurrent,
  organization,
  setOrganization,
  logo,
  setLogo,
  logoPreview,
  setLogoPreview,
}: any) => {
  const { data, loading } = entityKYC();
  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

  const onWebsiteChange = (value: string) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net", ".tech", ".in", "edu.in"].map(
          (domain) => `${value.toLowerCase()}${domain}`
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

  const entity =
    data?.getEntityType.length > 0
      ? data?.getEntityType
      : [
          {
            title: "Enterprise",
          },
          {
            title: "Creator",
          },
          {
            title: "Association",
          },
          {
            title: "Public Enterprise",
          },
          {
            title: "Professional",
          },
        ];
  const industry =
    data?.getIndustryType.length > 0
      ? data?.getIndustryType
      : [
          {
            title: "Technology",
          },
          {
            title: "Retail",
          },

          {
            title: "Education",
          },
          {
            title: "FMCG",
          },
          {
            title: "Electronics",
          },
          {
            title: "Telecommunications",
          },
        ];

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
        initialValue={organization?.name}
        name="name"
        label="Entity Name"
        rules={[{ required: true, message: "Please input Entity Name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="entityType"
        label="Entity Category"
        rules={[{ required: true }]}
        initialValue={organization?.entityType}
      >
        <Select
          loading={loading}
          showSearch
          placeholder="Entity Category (Select any one)"
          allowClear
        >
          {entity?.map((set: { title: string }) => (
            <Option value={set?.title}>{set?.title}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="industryType"
        label="Entity Industry"
        rules={[{ required: true }]}
        initialValue={organization?.industryType}
      >
        <Select
          loading={loading}
          showSearch
          placeholder="Entity Industry (Select any one)"
          allowClear
        >
          {industry.map((set: { title: string }) => (
            <Option value={set?.title}>{set?.title}</Option>
          ))}
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

      {/* <Logo
        logo={logo}
        setLogo={setLogo}
        setLogoPreview={setLogoPreview}
        logoPreview={logoPreview}
      /> */}
      <Logo
        setCover={setLogo}
        imageUrl={logoPreview}
        setImageUrl={setLogoPreview}
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
          I have read and accept{" "}
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

export default Entity;
