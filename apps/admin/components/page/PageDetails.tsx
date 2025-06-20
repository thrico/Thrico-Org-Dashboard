import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  GetProp,
  Input,
  message,
  Row,
  Select,
  Typography,
  Upload,
  UploadProps,
} from "antd";
import { Option } from "antd/es/mentions";
import {
  InfoCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import GooglePlacesInput from "../comman/location/Google-places-autocomplete";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const { Title, Text } = Typography;
const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
function PageDetails({
  formData,
  onFinish,
  form,
}: {
  formData: any;
  onFinish: (values: any) => void;
  form: any;
}) {
  const name = Form.useWatch("name", form);
  const industry = Form.useWatch("industry", form);
  const tagline = Form.useWatch("tagline", form);
  const logo = Form.useWatch("logo", form);
  const location = Form.useWatch("location", form);
  const beforeUpload = (file: FileType) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/webp";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG/WEBP file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as FileType, (url) => {
        form.setFieldsValue({
          logo: { file: info.file.originFileObj as FileType, url },
        });
      });
    }
  };

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  const userEditedSlug = useRef(false);

  // Watch for `url` edits
  useEffect(() => {
    const unsubscribe = form.watch?.((_, allValues) => {
      if (allValues?.url && allValues?.url !== slugify(allValues?.name || "")) {
        userEditedSlug.current = true;
      }
    });
    return () => unsubscribe?.();
  }, [form]);

  // Auto-generate slug from name
  useEffect(() => {
    if (!userEditedSlug.current && name) {
      const slug = slugify(name);
      form.setFieldsValue({ url: slug });
    }
  }, [name, form]);
  return (
    <Row gutter={24}>
      {/* <Cover setCover={setCover} /> */}
      <Col xs={24} md={12}>
        <Form
          form={form}
          layout="vertical"
          initialValues={formData}
          onFinish={onFinish}
        >
          <div style={{ marginBottom: 8 }}>
            <Text type="secondary">* indicates required</Text>
          </div>

          <Form.Item
            label="Name*"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter your organization name",
              },
            ]}
          >
            <Input placeholder="Add your organization's name" />
          </Form.Item>

          <Form.Item
            label="thrico.com/company/*"
            name="url"
            rules={[{ required: true, message: "Please enter thrico URL" }]}
          >
            <Input placeholder="Add your unique Thrico address" />
          </Form.Item>

          <div style={{ marginBottom: 16 }}>
            <a href="#" style={{ color: "#0077B5" }}>
              Learn more about the Page Public URL
            </a>
          </div>

          <Form.Item
            name="location"
            rules={[{ required: true, message: "Please enter Location" }]}
            label="Location"
          >
            <GooglePlacesInput
              onChange={(value) => form.setFieldsValue({ location: value })}
            />
          </Form.Item>

          <Form.Item label="Website" name="website">
            <Input placeholder="Begin with http://, https:// or www." />
          </Form.Item>

          <Form.Item
            label="Industry*"
            name="industry"
            rules={[{ required: true, message: "Please select an industry" }]}
          >
            <Select placeholder="Select industry" showSearch>
              <Option value="accounting">Accounting</Option>
              <Option value="technology">Information Technology</Option>
              <Option value="healthcare">Healthcare</Option>
              <Option value="education">Education</Option>
              <Option value="finance">Finance</Option>
              <Option value="marketing">Marketing</Option>
              <Option value="consulting">Consulting</Option>
              <Option value="retail">Retail</Option>
              <Option value="manufacturing">Manufacturing</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Organization size*"
            name="size"
            rules={[
              { required: true, message: "Please select organization size" },
            ]}
          >
            <Select placeholder="Select size">
              <Option value="1">Self-employed only</Option>
              <Option value="2-10">2-10 employees</Option>
              <Option value="11-50">11-50 employees</Option>
              <Option value="51-200">51-200 employees</Option>
              <Option value="201-500">201-500 employees</Option>
              <Option value="501-1000">501-1,000 employees</Option>
              <Option value="1001-5000">1,001-5,000 employees</Option>
              <Option value="5001-10000">5,001-10,000 employees</Option>
              <Option value="10001+">10,001+ employees</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Organization type*"
            name="type"
            rules={[
              { required: true, message: "Please select organization type" },
            ]}
          >
            <Select placeholder="Select type">
              <Option value="public">Public company</Option>
              <Option value="private">Private company</Option>
              <Option value="nonprofit">Nonprofit</Option>
              <Option value="government">Government agency</Option>
              <Option value="partnership">Partnership</Option>
              <Option value="selfEmployed">Self-employed</Option>
              <Option value="soleProprietorship">Sole proprietorship</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Logo" name="logo">
            <Upload
              onChange={handleChange}
              listType="picture-card"
              showUploadList={false}
              beforeUpload={beforeUpload}
            >
              <div style={{ textAlign: "center" }}>
                <UploadOutlined style={{ fontSize: 24 }} />
                <div style={{ marginTop: 8 }}>Choose file</div>
                <div style={{ fontSize: 12, color: "rgba(0, 0, 0, 0.45)" }}>
                  Upload (100x100)
                </div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item label="Tagline" name="tagline">
            <TextArea
              rows={4}
              placeholder="ex: An information services firm helping small businesses succeed."
              maxLength={120}
            />
          </Form.Item>

          <div
            style={{
              marginBottom: 16,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Text type="secondary" style={{ fontSize: 12 }}>
              Use your tagline to briefly describe what your organization does.
              This can be changed later.
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {tagline?.length} /120
            </Text>
          </div>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("You must accept the terms")),
              },
            ]}
          >
            <Checkbox>
              I verify that I am an authorized representative of this
              organization and have the right to act on its behalf in the
              creation and management of this page. The organization and I agree
              to the additional terms for Pages.
            </Checkbox>
          </Form.Item>

          <div style={{ marginBottom: 24 }}>
            <a href="#" style={{ color: "#0077B5" }}>
              Read the Thrico Pages Terms
            </a>
          </div>
        </Form>
      </Col>

      <Col
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          paddingTop: 24,
          paddingLeft: 16,
          paddingRight: 16,
          overflowY: "auto",
        }}
        xs={24}
        md={12}
      >
        <Card
          title="Page preview"
          extra={<InfoCircleOutlined />}
          style={{ background: "#f5f5f5" }}
        >
          <div style={{ background: "white", padding: 16, borderRadius: 4 }}>
            <div style={{ display: "flex", marginBottom: 16 }}>
              <div style={{ width: 80, height: 80, marginRight: 16 }}>
                {logo?.url ? (
                  <img
                    src={logo?.url}
                    alt="Logo"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 4,
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <img
                    src={"https://cdn.thrico.network/defaultPageImage.png"}
                    alt="Placeholder"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 4,
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
            </div>
            <Title level={4}>{name || "Company name"}</Title>
            <div style={{ marginBottom: 8 }}>
              <Text>{tagline || "Tagline"}</Text>
            </div>
            <div style={{ marginBottom: 8 }}>
              <Text type="secondary">{industry || "Industry"}</Text>
            </div>
            <div style={{ marginBottom: 16 }}>
              <Text type="secondary">{location?.name || "Location"}</Text>
            </div>
            <Button type="primary" icon={<PlusOutlined />}>
              Follow
            </Button>
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default PageDetails;
