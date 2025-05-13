"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
  Popconfirm,
  Skeleton,
} from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  SaveOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default function EditPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get page data
    setTimeout(() => {
      const savedPages = JSON.parse(
        localStorage.getItem("thrico-custom-pages") || "[]"
      );
      const page = savedPages.find((p) => p.slug === slug);

      if (page) {
        setPageData(page);
        form.setFieldsValue(page);
      } else {
        message.error("Page not found");
        router.push("/admin/pages");
      }

      setIsLoading(false);
    }, 1000);
  }, [slug, form, router]);

  const onFinish = (values) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Get existing pages
      const existingPages = JSON.parse(
        localStorage.getItem("thrico-custom-pages") || "[]"
      );

      // Check if slug changed and if new slug already exists
      if (
        values.slug !== slug &&
        existingPages.some((page) => page.slug === values.slug)
      ) {
        message.error(
          "A page with this URL already exists. Please choose a different URL slug."
        );
        setLoading(false);
        return;
      }

      // Update the page
      const updatedPages = existingPages.map((page) => {
        if (page.slug === slug) {
          return {
            ...values,
            createdAt: page.createdAt,
            updatedAt: new Date().toISOString(),
          };
        }
        return page;
      });

      localStorage.setItem("thrico-custom-pages", JSON.stringify(updatedPages));

      message.success("Page updated successfully!");
      setLoading(false);

      // If slug changed, redirect to new page
      if (values.slug !== slug) {
        router.push(`/pages/${values.slug}`);
      } else {
        router.push(`/pages/${slug}`);
      }
    }, 1000);
  };

  const handleDelete = () => {
    // Simulate API call
    setTimeout(() => {
      // Get existing pages
      const existingPages = JSON.parse(
        localStorage.getItem("thrico-custom-pages") || "[]"
      );

      // Filter out the page to delete
      const updatedPages = existingPages.filter((page) => page.slug !== slug);

      localStorage.setItem("thrico-custom-pages", JSON.stringify(updatedPages));

      message.success("Page deleted successfully!");
      router.push("/admin/pages");
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
      <Navbar />
      <Content style={{ padding: "32px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 32,
            }}
          >
            <Title level={2}>Edit Page</Title>
            <Popconfirm
              title="Delete this page?"
              description="Are you sure you want to delete this page? This action cannot be undone."
              onConfirm={handleDelete}
              okText="Yes, delete"
              cancelText="Cancel"
              okButtonProps={{ danger: true }}
            >
              <Button danger icon={<DeleteOutlined />}>
                Delete Page
              </Button>
            </Popconfirm>
          </div>

          <Card>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Title level={4}>Page Details</Title>
              <Form.Item
                name="title"
                label="Page Title"
                rules={[
                  { required: true, message: "Please enter a page title" },
                ]}
              >
                <Input placeholder="Enter page title" />
              </Form.Item>

              <Form.Item
                name="slug"
                label="URL Slug"
                rules={[{ required: true, message: "Please enter a URL slug" }]}
              >
                <Input placeholder="Enter URL slug" />
              </Form.Item>

              <Divider />

              <Title level={4}>SEO Settings</Title>
              <Form.Item
                name="description"
                label="Meta Description"
                extra="A brief description of the page for search engines (recommended: 150-160 characters)"
              >
                <TextArea rows={3} placeholder="Enter meta description" />
              </Form.Item>

              <Form.Item
                name="keywords"
                label="Meta Keywords"
                extra="Comma-separated keywords related to this page"
              >
                <Input placeholder="keyword1, keyword2, keyword3" />
              </Form.Item>

              <Divider />

              <Title level={4}>Page Content</Title>
              <Form.List name="sections">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div
                        key={key}
                        style={{
                          marginBottom: 24,
                          border: "1px dashed #d9d9d9",
                          padding: 16,
                          borderRadius: 8,
                        }}
                      >
                        <Space
                          direction="vertical"
                          style={{ width: "100%" }}
                          size={16}
                        >
                          <Form.Item
                            {...restField}
                            name={[name, "title"]}
                            label="Section Title (optional)"
                          >
                            <Input placeholder="Enter section title" />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[name, "content"]}
                            label="Section Content"
                            rules={[
                              {
                                required: true,
                                message: "Please enter section content",
                              },
                            ]}
                          >
                            <TextArea
                              rows={6}
                              placeholder="Enter section content"
                            />
                          </Form.Item>

                          {fields.length > 1 && (
                            <Button
                              type="text"
                              danger
                              icon={<MinusCircleOutlined />}
                              onClick={() => remove(name)}
                            >
                              Remove Section
                            </Button>
                          )}
                        </Space>
                      </div>
                    ))}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Section
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  loading={loading}
                  size="large"
                >
                  Update Page
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}
