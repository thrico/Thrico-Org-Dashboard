"use client";

import { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Skeleton,
} from "antd";
import { EditOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

export default function SeoManager() {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [seoData, setSeoData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    // Simulate API call to get SEO data
    setTimeout(() => {
      const homeSeo = JSON.parse(
        localStorage.getItem("thrico-seo-home") ||
          '{"title":"Thrico - Connect with Your Community","description":"Join events, groups, and meet like-minded people in your area","keywords":"community, events, groups, networking"}'
      );
      const aboutSeo = JSON.parse(
        localStorage.getItem("thrico-seo-about") ||
          '{"title":"About Us - Thrico","description":"Learn more about Thrico and our mission to connect communities","keywords":"about, mission, team, community platform"}'
      );
      const contactSeo = JSON.parse(
        localStorage.getItem("thrico-seo-contact") ||
          '{"title":"Contact Us - Thrico","description":"Get in touch with the Thrico team for support, feedback, or partnership inquiries","keywords":"contact, support, help, feedback, inquiries"}'
      );
      const privacySeo = JSON.parse(
        localStorage.getItem("thrico-seo-privacy") ||
          '{"title":"Privacy Policy - Thrico","description":"Learn about how Thrico collects, uses, and protects your personal information","keywords":"privacy policy, data protection, personal information, cookies, GDPR"}'
      );

      const customPages = JSON.parse(
        localStorage.getItem("thrico-custom-pages") || "[]"
      );

      const allSeoData = [
        { key: "home", path: "/", name: "Home", ...homeSeo },
        { key: "about", path: "/about", name: "About Us", ...aboutSeo },
        { key: "contact", path: "/contact", name: "Contact Us", ...contactSeo },
        {
          key: "privacy",
          path: "/privacy",
          name: "Privacy Policy",
          ...privacySeo,
        },
        ...customPages.map((page) => ({
          key: `page-${page.slug}`,
          path: `/pages/${page.slug}`,
          name: page.title,
          title: page.title,
          description: page.description || "",
          keywords: page.keywords || "",
          isCustomPage: true,
          slug: page.slug,
        })),
      ];

      setSeoData(allSeoData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const columns = [
    {
      title: "Page",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <div>
            <Text type="secondary">{record.path}</Text>
          </div>
        </div>
      ),
    },
    {
      title: "Meta Title",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: "Meta Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        >
          Edit
        </Button>
      ),
    },
  ];

  const handleEdit = (record) => {
    setCurrentPage(record);
    form.setFieldsValue({
      title: record.title,
      description: record.description,
      keywords: record.keywords,
    });
    setIsModalVisible(true);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      setLoading(true);

      setTimeout(() => {
        if (currentPage.isCustomPage) {
          const customPages = JSON.parse(
            localStorage.getItem("thrico-custom-pages") || "[]"
          );
          const updatedPages = customPages.map((page) => {
            if (page.slug === currentPage.slug) {
              return {
                ...page,
                title: values.title,
                description: values.description,
                keywords: values.keywords,
              };
            }
            return page;
          });
          localStorage.setItem(
            "thrico-custom-pages",
            JSON.stringify(updatedPages)
          );
        } else {
          localStorage.setItem(
            `thrico-seo-${currentPage.key}`,
            JSON.stringify({
              title: values.title,
              description: values.description,
              keywords: values.keywords,
            })
          );
        }

        setSeoData((prevData) =>
          prevData.map((item) =>
            item.key === currentPage.key ? { ...item, ...values } : item
          )
        );

        message.success("SEO settings updated successfully!");
        setLoading(false);
        setIsModalVisible(false);
      }, 1000);
    });
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
        <Card title="SEO Manager">
          <Card>
            <Paragraph style={{ marginBottom: 24 }}>
              Manage SEO settings for all pages on your website. Optimize your
              meta titles, descriptions, and keywords to improve search engine
              visibility.
            </Paragraph>

            <Table
              columns={columns}
              dataSource={seoData}
              rowKey="key"
              pagination={false}
            />
          </Card>

          <Modal
            title={`Edit SEO for ${currentPage?.name || ""}`}
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={[
              <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                Cancel
              </Button>,
              <Button
                key="save"
                type="primary"
                loading={loading}
                onClick={handleSave}
              >
                Save
              </Button>,
            ]}
          >
            <Form form={form} layout="vertical">
              <Form.Item
                label="Meta Title"
                name="title"
                rules={[
                  { required: true, message: "Please enter a meta title" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Meta Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please enter a meta description",
                  },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item
                label="Meta Keywords"
                name="keywords"
                rules={[
                  { required: true, message: "Please enter meta keywords" },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      </Content>
    </Layout>
  );
}
