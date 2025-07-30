"use client";

import { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Card,
  Form,
  Input,
  Button,
  Space,
  message,
  Divider,
  Select,
  Skeleton,
  Switch,
  Row,
  Col,
} from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  SaveOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Footer } from "antd/es/layout/layout";
import TextArea from "antd/es/input/TextArea";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

export default function FooterManager() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [customPages, setCustomPages] = useState([]);

  const socialMediaOptions = [
    { label: "Facebook", value: "facebook", icon: "FacebookOutlined" },
    { label: "Twitter", value: "twitter", icon: "TwitterOutlined" },
    { label: "Instagram", value: "instagram", icon: "InstagramOutlined" },
    { label: "LinkedIn", value: "linkedin", icon: "LinkedinOutlined" },
    { label: "YouTube", value: "youtube", icon: "YoutubeOutlined" },
    { label: "TikTok", value: "tiktok", icon: "TikTokOutlined" },
    { label: "WhatsApp", value: "whatsapp", icon: "WhatsAppOutlined" },
    { label: "Telegram", value: "telegram", icon: "SendOutlined" },
    { label: "Discord", value: "discord", icon: "MessageOutlined" },
    { label: "GitHub", value: "github", icon: "GithubOutlined" },
  ];

  const iconOptions = [
    { label: "Home", value: "HomeOutlined" },
    { label: "Info", value: "InfoCircleOutlined" },
    { label: "Phone", value: "PhoneOutlined" },
    { label: "Mail", value: "MailOutlined" },
    { label: "Environment", value: "EnvironmentOutlined" },
    { label: "Customer Service", value: "CustomerServiceOutlined" },
    { label: "Question", value: "QuestionCircleOutlined" },
    { label: "File", value: "FileTextOutlined" },
    { label: "Safety", value: "SafetyOutlined" },
    { label: "Team", value: "TeamOutlined" },
  ];

  useEffect(() => {
    // Simulate API call to get footer data
    setTimeout(() => {
      const savedFooterData = localStorage.getItem("thrico-footer-data");
      const savedPages = JSON.parse(
        localStorage.getItem("thrico-custom-pages") || "[]"
      );
      setCustomPages(savedPages);

      if (savedFooterData) {
        form.setFieldsValue(JSON.parse(savedFooterData));
      } else {
        // Default footer data
        form.setFieldsValue({
          companyInfo: {
            name: "Your Company Name",
            description:
              "Brief description about your company and what you do.",
            logo: "",
          },
          contactInfo: {
            address: "123 Main Street, City, State 12345",
            phone: "+1 (555) 123-4567",
            email: "info@yourcompany.com",
          },
          socialMedia: [
            { platform: "facebook", url: "https://facebook.com/yourcompany" },
            { platform: "twitter", url: "https://twitter.com/yourcompany" },
            { platform: "instagram", url: "https://instagram.com/yourcompany" },
          ],
          footerSections: [
            {
              title: "Quick Links",
              links: [
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Contact", href: "/contact" },
              ],
            },
            {
              title: "Support",
              links: [
                { label: "Help Center", href: "/help" },
                { label: "FAQ", href: "/faq" },
                { label: "Contact Support", href: "/support" },
              ],
            },
            {
              title: "Legal",
              links: [
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Cookie Policy", href: "/cookies" },
              ],
            },
          ],
          copyright: {
            text: "© 2024 Your Company Name. All rights reserved.",
            showYear: true,
          },
          newsletter: {
            enabled: true,
            title: "Subscribe to our Newsletter",
            description:
              "Get the latest updates and news delivered to your inbox.",
          },
        });
      }
      setIsLoading(false);
    }, 1000);
  }, [form]);

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("thrico-footer-data", JSON.stringify(values));
      message.success("Footer updated successfully!");
      setLoading(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ width: "100%" }}>
          <Card>
            <Skeleton active />
          </Card>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ width: "100%" }}>
        <Card
          extra={
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={loading}
              onClick={() => form.submit()}
            >
              Save Footer
            </Button>
          }
          title="Footer Manager"
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Paragraph>
              Customize your website's footer. Manage company information,
              social media links, footer sections, and more.
            </Paragraph>

            {/* Company Information */}
            <Card title="Company Information" style={{ marginBottom: 24 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name={["companyInfo", "name"]}
                    label="Company Name"
                    rules={[
                      { required: true, message: "Please enter company name" },
                    ]}
                  >
                    <Input placeholder="Your Company Name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name={["companyInfo", "logo"]} label="Logo URL">
                    <Input placeholder="https://example.com/logo.png" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name={["companyInfo", "description"]}
                label="Company Description"
              >
                <TextArea
                  rows={3}
                  placeholder="Brief description about your company"
                />
              </Form.Item>
            </Card>

            {/* Contact Information */}
            <Card title="Contact Information" style={{ marginBottom: 24 }}>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item name={["contactInfo", "phone"]} label="Phone">
                    <Input placeholder="+1 (555) 123-4567" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name={["contactInfo", "email"]} label="Email">
                    <Input placeholder="info@yourcompany.com" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name={["contactInfo", "address"]} label="Address">
                    <Input placeholder="123 Main Street, City, State" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Social Media Links */}
            <Card title="Social Media Links" style={{ marginBottom: 24 }}>
              <Form.List name="socialMedia">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <div
                        key={key}
                        style={{
                          marginBottom: 16,
                          border: "1px dashed #d9d9d9",
                          padding: 16,
                          borderRadius: 8,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 16,
                          }}
                        >
                          <Text strong>Social Media {index + 1}</Text>
                          <Button
                            type="text"
                            danger
                            icon={<MinusCircleOutlined />}
                            onClick={() => remove(name)}
                          >
                            Remove
                          </Button>
                        </div>
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, "platform"]}
                              label="Platform"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select platform",
                                },
                              ]}
                            >
                              <Select placeholder="Select platform">
                                {socialMediaOptions.map((option) => (
                                  <Option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, "url"]}
                              label="URL"
                              rules={[
                                { required: true, message: "Please enter URL" },
                                {
                                  type: "url",
                                  message: "Please enter valid URL",
                                },
                              ]}
                            >
                              <Input placeholder="https://facebook.com/yourcompany" />
                            </Form.Item>
                          </Col>
                        </Row>
                      </div>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add({ platform: "", url: "" })}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Social Media Link
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Card>

            {/* Footer Sections */}
            <Card title="Footer Sections" style={{ marginBottom: 24 }}>
              <Form.List name="footerSections">
                {(fields, { add, remove, move }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <div
                        key={key}
                        style={{
                          marginBottom: 24,
                          border: "1px dashed #d9d9d9",
                          padding: 16,
                          borderRadius: 8,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 16,
                          }}
                        >
                          <Title level={5} style={{ margin: 0 }}>
                            Section {index + 1}
                          </Title>
                          <Space>
                            <Button
                              type="dashed"
                              disabled={index === 0}
                              onClick={() => move(index, index - 1)}
                            >
                              <ArrowUpOutlined /> Move Up
                            </Button>
                            <Button
                              type="dashed"
                              disabled={index === fields.length - 1}
                              onClick={() => move(index, index + 1)}
                            >
                              <ArrowDownOutlined /> Move Down
                            </Button>
                            <Button
                              type="text"
                              danger
                              icon={<MinusCircleOutlined />}
                              onClick={() => remove(name)}
                            >
                              Remove
                            </Button>
                          </Space>
                        </div>

                        <Form.Item
                          {...restField}
                          name={[name, "title"]}
                          label="Section Title"
                          rules={[
                            {
                              required: true,
                              message: "Please enter section title",
                            },
                          ]}
                        >
                          <Input placeholder="e.g., Quick Links, Support, Legal" />
                        </Form.Item>

                        <Form.List name={[name, "links"]}>
                          {(linkFields, linkOpt) => (
                            <div style={{ marginLeft: 24 }}>
                              <Text strong>Links:</Text>
                              {linkFields.map((linkField, linkIndex) => (
                                <div
                                  key={linkField.key}
                                  style={{
                                    marginBottom: 16,
                                    marginTop: 8,
                                    border: "1px dotted #d9d9d9",
                                    padding: 16,
                                    borderRadius: 8,
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      marginBottom: 16,
                                    }}
                                  >
                                    <Text>Link {linkIndex + 1}</Text>
                                    <Button
                                      type="text"
                                      danger
                                      icon={<MinusCircleOutlined />}
                                      onClick={() =>
                                        linkOpt.remove(linkField.name)
                                      }
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                  <Row gutter={16}>
                                    <Col span={12}>
                                      <Form.Item
                                        {...restField}
                                        name={[linkField.name, "label"]}
                                        label="Label"
                                        rules={[
                                          {
                                            required: true,
                                            message: "Please enter label",
                                          },
                                        ]}
                                      >
                                        <Input placeholder="e.g., Home, About Us" />
                                      </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                      <Form.Item
                                        {...restField}
                                        name={[linkField.name, "href"]}
                                        label="URL"
                                        rules={[
                                          {
                                            required: true,
                                            message: "Please enter URL",
                                          },
                                        ]}
                                      >
                                        <Input placeholder="e.g., /, /about" />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                </div>
                              ))}
                              <Button
                                type="dashed"
                                onClick={() =>
                                  linkOpt.add({ label: "", href: "" })
                                }
                                block
                                icon={<PlusOutlined />}
                              >
                                Add Link
                              </Button>
                            </div>
                          )}
                        </Form.List>
                      </div>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() =>
                          add({
                            title: "",
                            links: [{ label: "", href: "" }],
                          })
                        }
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Footer Section
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Card>

            {/* Newsletter Signup */}
            <Card title="Newsletter Signup" style={{ marginBottom: 24 }}>
              <Form.Item
                name={["newsletter", "enabled"]}
                label="Enable Newsletter Signup"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name={["newsletter", "title"]}
                    label="Newsletter Title"
                  >
                    <Input placeholder="Subscribe to our Newsletter" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={["newsletter", "description"]}
                    label="Newsletter Description"
                  >
                    <Input placeholder="Get the latest updates..." />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Copyright */}
            <Card title="Copyright Information" style={{ marginBottom: 24 }}>
              <Row gutter={16}>
                <Col span={18}>
                  <Form.Item
                    name={["copyright", "text"]}
                    label="Copyright Text"
                    rules={[
                      {
                        required: true,
                        message: "Please enter copyright text",
                      },
                    ]}
                  >
                    <Input placeholder="© 2024 Your Company Name. All rights reserved." />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={["copyright", "showYear"]}
                    label="Auto Update Year"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Divider />

            <Title level={4}>Quick Links Reference</Title>
            <Paragraph>
              Here are links to your pages that you can use in the footer
              sections:
            </Paragraph>
            <div style={{ marginBottom: 24 }}>
              <Text strong>Standard Pages:</Text>
              <ul style={{ marginTop: 8 }}>
                <li>
                  <Text copyable>/ (Home)</Text>
                </li>
                <li>
                  <Text copyable>/about (About Us)</Text>
                </li>
                <li>
                  <Text copyable>/contact (Contact Us)</Text>
                </li>
                <li>
                  <Text copyable>/privacy (Privacy Policy)</Text>
                </li>
                <li>
                  <Text copyable>/terms (Terms of Service)</Text>
                </li>
                <li>
                  <Text copyable>/services (Services)</Text>
                </li>
                <li>
                  <Text copyable>/help (Help Center)</Text>
                </li>
                <li>
                  <Text copyable>/faq (FAQ)</Text>
                </li>
              </ul>
            </div>

            {customPages.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <Text strong>Custom Pages:</Text>
                <ul style={{ marginTop: 8 }}>
                  {customPages.map((page, index) => (
                    <li key={index}>
                      <Text
                        copyable
                      >{`/pages/${page.slug} (${page.title})`}</Text>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Form>
        </Card>
      </Content>
      <Footer />
    </Layout>
  );
}
