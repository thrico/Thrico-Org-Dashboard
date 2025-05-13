"use client";

import { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Card,
  Tabs,
  Form,
  Input,
  Button,
  Select,
  message,
  Skeleton,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

export default function StandardPages() {
  const [activeTab, setActiveTab] = useState("home");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [homeForm] = Form.useForm();
  const [aboutForm] = Form.useForm();
  const [contactForm] = Form.useForm();
  const [privacyForm] = Form.useForm();

  useEffect(() => {
    // Simulate API call to get page data
    setTimeout(() => {
      // Load Home page data
      const homeSeo = JSON.parse(
        localStorage.getItem("thrico-seo-home") ||
          '{"title":"Thrico - Connect with Your Community","description":"Join events, groups, and meet like-minded people in your area","keywords":"community, events, groups, networking"}'
      );
      homeForm.setFieldsValue({
        title: homeSeo.title,
        description: homeSeo.description,
        keywords: homeSeo.keywords,
        variation: localStorage.getItem("thrico-variation") || "balanced",
      });

      // Load About page data
      const aboutSeo = JSON.parse(
        localStorage.getItem("thrico-seo-about") ||
          '{"title":"About Us - Thrico","description":"Learn more about Thrico and our mission to connect communities","keywords":"about, mission, team, community platform"}'
      );
      aboutForm.setFieldsValue({
        title: aboutSeo.title,
        description: aboutSeo.description,
        keywords: aboutSeo.keywords,
        variation: localStorage.getItem("thrico-about-variation") || "default",
      });

      // Load Contact page data
      const contactSeo = JSON.parse(
        localStorage.getItem("thrico-seo-contact") ||
          '{"title":"Contact Us - Thrico","description":"Get in touch with the Thrico team for support, feedback, or partnership inquiries","keywords":"contact, support, help, feedback, inquiries"}'
      );
      contactForm.setFieldsValue({
        title: contactSeo.title,
        description: contactSeo.description,
        keywords: contactSeo.keywords,
        variation:
          localStorage.getItem("thrico-contact-variation") || "default",
      });

      // Load Privacy page data
      const privacySeo = JSON.parse(
        localStorage.getItem("thrico-seo-privacy") ||
          '{"title":"Privacy Policy - Thrico","description":"Learn about how Thrico collects, uses, and protects your personal information","keywords":"privacy policy, data protection, personal information, cookies, GDPR"}'
      );
      privacyForm.setFieldsValue({
        title: privacySeo.title,
        description: privacySeo.description,
        keywords: privacySeo.keywords,
        variation:
          localStorage.getItem("thrico-privacy-variation") || "default",
      });

      setIsLoading(false);
    }, 1000);
  }, [homeForm, aboutForm, contactForm, privacyForm]);

  const saveHome = (values) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem(
        "thrico-seo-home",
        JSON.stringify({
          title: values.title,
          description: values.description,
          keywords: values.keywords,
        })
      );
      localStorage.setItem("thrico-variation", values.variation);

      message.success("Home page settings saved successfully!");
      setLoading(false);
    }, 1000);
  };

  const saveAbout = (values) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem(
        "thrico-seo-about",
        JSON.stringify({
          title: values.title,
          description: values.description,
          keywords: values.keywords,
        })
      );
      localStorage.setItem("thrico-about-variation", values.variation);

      message.success("About page settings saved successfully!");
      setLoading(false);
    }, 1000);
  };

  const saveContact = (values) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem(
        "thrico-seo-contact",
        JSON.stringify({
          title: values.title,
          description: values.description,
          keywords: values.keywords,
        })
      );
      localStorage.setItem("thrico-contact-variation", values.variation);

      message.success("Contact page settings saved successfully!");
      setLoading(false);
    }, 1000);
  };

  const savePrivacy = (values) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem(
        "thrico-seo-privacy",
        JSON.stringify({
          title: values.title,
          description: values.description,
          keywords: values.keywords,
        })
      );
      localStorage.setItem("thrico-privacy-variation", values.variation);

      message.success("Privacy page settings saved successfully!");
      setLoading(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ padding: "32px 0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <Skeleton active paragraph={{ rows: 20 }} />
          </div>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "32px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <Title level={2} style={{ marginBottom: 32 }}>
            Manage Standard Pages
          </Title>

          <Card>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane tab="Home Page" key="home">
                <Form form={homeForm} layout="vertical" onFinish={saveHome}>
                  <Title level={4}>Home Page Settings</Title>

                  <Form.Item name="variation" label="Layout Variation">
                    <Select>
                      <Option value="balanced">
                        Balanced Layout (Classic)
                      </Option>
                      <Option value="community">
                        Community Focused (Social-Driven)
                      </Option>
                      <Option value="business">
                        Business First (Professional)
                      </Option>
                    </Select>
                  </Form.Item>

                  <Title level={4}>SEO Settings</Title>
                  <Form.Item
                    name="title"
                    label="Meta Title"
                    rules={[
                      { required: true, message: "Please enter a meta title" },
                    ]}
                  >
                    <Input placeholder="Enter meta title" />
                  </Form.Item>

                  <Form.Item
                    name="description"
                    label="Meta Description"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a meta description",
                      },
                    ]}
                  >
                    <TextArea rows={3} placeholder="Enter meta description" />
                  </Form.Item>

                  <Form.Item name="keywords" label="Meta Keywords">
                    <Input placeholder="keyword1, keyword2, keyword3" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SaveOutlined />}
                      loading={loading && activeTab === "home"}
                    >
                      Save Home Page Settings
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>

              <TabPane tab="About Us Page" key="about">
                <Form form={aboutForm} layout="vertical" onFinish={saveAbout}>
                  <Title level={4}>About Page Settings</Title>

                  <Form.Item name="variation" label="Layout Variation">
                    <Select>
                      <Option value="default">Default</Option>
                      <Option value="modern">Modern</Option>
                      <Option value="minimal">Minimal</Option>
                    </Select>
                  </Form.Item>

                  <Title level={4}>SEO Settings</Title>
                  <Form.Item
                    name="title"
                    label="Meta Title"
                    rules={[
                      { required: true, message: "Please enter a meta title" },
                    ]}
                  >
                    <Input placeholder="Enter meta title" />
                  </Form.Item>

                  <Form.Item
                    name="description"
                    label="Meta Description"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a meta description",
                      },
                    ]}
                  >
                    <TextArea rows={3} placeholder="Enter meta description" />
                  </Form.Item>

                  <Form.Item name="keywords" label="Meta Keywords">
                    <Input placeholder="keyword1, keyword2, keyword3" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SaveOutlined />}
                      loading={loading && activeTab === "about"}
                    >
                      Save About Page Settings
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>

              <TabPane tab="Contact Us Page" key="contact">
                <Form
                  form={contactForm}
                  layout="vertical"
                  onFinish={saveContact}
                >
                  <Title level={4}>Contact Page Settings</Title>

                  <Form.Item name="variation" label="Layout Variation">
                    <Select>
                      <Option value="default">Default</Option>
                      <Option value="split">Split</Option>
                      <Option value="centered">Centered</Option>
                    </Select>
                  </Form.Item>

                  <Title level={4}>SEO Settings</Title>
                  <Form.Item
                    name="title"
                    label="Meta Title"
                    rules={[
                      { required: true, message: "Please enter a meta title" },
                    ]}
                  >
                    <Input placeholder="Enter meta title" />
                  </Form.Item>

                  <Form.Item
                    name="description"
                    label="Meta Description"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a meta description",
                      },
                    ]}
                  >
                    <TextArea rows={3} placeholder="Enter meta description" />
                  </Form.Item>

                  <Form.Item name="keywords" label="Meta Keywords">
                    <Input placeholder="keyword1, keyword2, keyword3" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SaveOutlined />}
                      loading={loading && activeTab === "contact"}
                    >
                      Save Contact Page Settings
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>

              <TabPane tab="Privacy Policy Page" key="privacy">
                <Form
                  form={privacyForm}
                  layout="vertical"
                  onFinish={savePrivacy}
                >
                  <Title level={4}>Privacy Policy Page Settings</Title>

                  <Form.Item name="variation" label="Layout Variation">
                    <Select>
                      <Option value="default">Default</Option>
                      <Option value="accordion">Accordion</Option>
                      <Option value="sidebar">Sidebar</Option>
                    </Select>
                  </Form.Item>

                  <Title level={4}>SEO Settings</Title>
                  <Form.Item
                    name="title"
                    label="Meta Title"
                    rules={[
                      { required: true, message: "Please enter a meta title" },
                    ]}
                  >
                    <Input placeholder="Enter meta title" />
                  </Form.Item>

                  <Form.Item
                    name="description"
                    label="Meta Description"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a meta description",
                      },
                    ]}
                  >
                    <TextArea rows={3} placeholder="Enter meta description" />
                  </Form.Item>

                  <Form.Item name="keywords" label="Meta Keywords">
                    <Input placeholder="keyword1, keyword2, keyword3" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SaveOutlined />}
                      loading={loading && activeTab === "privacy"}
                    >
                      Save Privacy Page Settings
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>
          </Card>
        </div>
      </Content>
    </Layout>
  );
}
