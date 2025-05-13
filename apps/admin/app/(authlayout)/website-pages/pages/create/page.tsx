"use client";

import { useState } from "react";
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
} from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import { useRouter } from "next/navigation";

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default function CreatePage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);

    // Generate a slug from the title if not provided
    if (!values.slug) {
      values.slug = values.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-");
    }

    // Simulate API call
    setTimeout(() => {
      // Get existing pages or initialize empty array
      const existingPages = JSON.parse(
        localStorage.getItem("thrico-custom-pages") || "[]"
      );

      // Check if slug already exists
      if (existingPages.some((page) => page.slug === values.slug)) {
        message.error(
          "A page with this URL already exists. Please choose a different URL slug."
        );
        setLoading(false);
        return;
      }

      // Add new page
      const newPage = {
        ...values,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      existingPages.push(newPage);
      localStorage.setItem(
        "thrico-custom-pages",
        JSON.stringify(existingPages)
      );

      message.success("Page created successfully!");
      setLoading(false);
      router.push(`/pages/${values.slug}`);
    }, 1000);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "32px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <Title level={2} style={{ marginBottom: 32 }}>
            Create New Page
          </Title>

          <Card>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                sections: [{ title: "", content: "" }],
              }}
            >
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
                extra="Leave blank to generate automatically from title. Example: about-us"
              >
                <Input placeholder="Enter URL slug (optional)" />
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
                  Create Page
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Content>
    </Layout>
  );
}
