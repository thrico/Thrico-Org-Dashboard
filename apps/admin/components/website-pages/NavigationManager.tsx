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
} from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import { useRouter } from "next/navigation";

import { Footer } from "antd/es/layout/layout";
import Navbar from "./variations/navbar";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

export default function NavigationManager() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [customPages, setCustomPages] = useState([]);

  const iconOptions = [
    { label: "Home", value: "HomeOutlined" },
    { label: "Calendar", value: "CalendarOutlined" },
    { label: "Team", value: "TeamOutlined" },
    { label: "Shopping", value: "ShoppingOutlined" },
    { label: "Read", value: "ReadOutlined" },
    { label: "Picture", value: "PictureOutlined" },
    { label: "Comment", value: "CommentOutlined" },
    { label: "Phone", value: "PhoneOutlined" },
    { label: "Info", value: "InfoCircleOutlined" },
    { label: "File", value: "FileTextOutlined" },
  ];

  useEffect(() => {
    // Simulate API call to get navigation data
    setTimeout(() => {
      const savedNavItems = localStorage.getItem("thrico-navbar-items");
      const savedPages = JSON.parse(
        localStorage.getItem("thrico-custom-pages") || "[]"
      );

      setCustomPages(savedPages);

      if (savedNavItems) {
        form.setFieldsValue({ items: JSON.parse(savedNavItems) });
      } else {
        // Default navigation items
        form.setFieldsValue({
          items: [
            { key: "home", label: "Home", icon: "HomeOutlined", href: "/" },
            {
              key: "events",
              label: "Events",
              icon: "CalendarOutlined",
              href: "/events",
            },
            {
              key: "groups",
              label: "Groups",
              icon: "TeamOutlined",
              href: "/groups",
            },
            {
              key: "jobs",
              label: "Jobs",
              icon: "ShoppingOutlined",
              href: "/jobs",
            },
            { key: "news", label: "News", icon: "ReadOutlined", href: "/news" },
            {
              key: "gallery",
              label: "Gallery",
              icon: "PictureOutlined",
              href: "/gallery",
            },
            {
              key: "testimonials",
              label: "Testimonials",
              icon: "CommentOutlined",
              href: "/testimonials",
            },
            {
              key: "about",
              label: "About",
              icon: "InfoCircleOutlined",
              children: [
                { key: "about-us", label: "About Us", href: "/about" },
                { key: "contact-us", label: "Contact Us", href: "/contact" },
                { key: "privacy", label: "Privacy Policy", href: "/privacy" },
              ],
            },
          ],
        });
      }

      setIsLoading(false);
    }, 1000);
  }, [form]);

  const onFinish = (values) => {
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("thrico-navbar-items", JSON.stringify(values.items));

      message.success("Navigation updated successfully!");
      setLoading(false);
    }, 1000);
  };

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
            >
              Save Navigation
            </Button>
          }
          title="Navigation Manager"
        >
          <Card>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Paragraph>
                Customize your website's navigation menu. You can add, remove,
                and reorder menu items, create dropdowns, and link to pages.
              </Paragraph>

              <Form.List name="items">
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
                            Menu Item {index + 1}
                          </Title>
                          <Space>
                            <Button
                              type="text"
                              disabled={index === 0}
                              onClick={() => move(index, index - 1)}
                            >
                              Move Up
                            </Button>
                            <Button
                              type="text"
                              disabled={index === fields.length - 1}
                              onClick={() => move(index, index + 1)}
                            >
                              Move Down
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

                        <Space
                          direction="vertical"
                          style={{ width: "100%" }}
                          size={16}
                        >
                          <div style={{ display: "flex", gap: 16 }}>
                            <Form.Item
                              {...restField}
                              name={[name, "key"]}
                              label="Key (unique identifier)"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter a key",
                                },
                              ]}
                              style={{ width: "50%" }}
                            >
                              <Input placeholder="e.g., home, about, contact" />
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              name={[name, "label"]}
                              label="Label (display text)"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter a label",
                                },
                              ]}
                              style={{ width: "50%" }}
                            >
                              <Input placeholder="e.g., Home, About Us, Contact" />
                            </Form.Item>
                          </div>

                          <div style={{ display: "flex", gap: 16 }}>
                            <Form.Item
                              {...restField}
                              name={[name, "icon"]}
                              label="Icon"
                              style={{ width: "50%" }}
                            >
                              <Select placeholder="Select an icon">
                                {iconOptions.map((option) => (
                                  <Option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              name={[name, "href"]}
                              label="Link (URL)"
                              style={{ width: "50%" }}
                              dependencies={[["items", name, "children"]]}
                              rules={[
                                ({ getFieldValue }) => ({
                                  validator(_, value) {
                                    const hasChildren =
                                      getFieldValue(["items", name, "children"])
                                        ?.length > 0;
                                    if (hasChildren && value) {
                                      return Promise.reject(
                                        "Items with dropdown cannot have a link"
                                      );
                                    }
                                    if (!hasChildren && !value) {
                                      return Promise.reject(
                                        "Please enter a URL"
                                      );
                                    }
                                    return Promise.resolve();
                                  },
                                }),
                              ]}
                            >
                              <Input placeholder="e.g., /, /about, /contact" />
                            </Form.Item>
                          </div>

                          <Divider orientation="left">
                            Dropdown Items (Optional)
                          </Divider>

                          <Form.List name={[name, "children"]}>
                            {(subFields, subOpt) => (
                              <div style={{ marginLeft: 24 }}>
                                {subFields.map((subField, subIndex) => (
                                  <div
                                    key={subField.key}
                                    style={{
                                      marginBottom: 16,
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
                                      <Text strong>
                                        Dropdown Item {subIndex + 1}
                                      </Text>
                                      <Button
                                        type="text"
                                        danger
                                        icon={<MinusCircleOutlined />}
                                        onClick={() =>
                                          subOpt.remove(subField.name)
                                        }
                                      >
                                        Remove
                                      </Button>
                                    </div>

                                    <div style={{ display: "flex", gap: 16 }}>
                                      <Form.Item
                                        {...restField}
                                        name={[subField.name, "key"]}
                                        label="Key"
                                        rules={[
                                          {
                                            required: true,
                                            message: "Please enter a key",
                                          },
                                        ]}
                                        style={{ width: "50%" }}
                                      >
                                        <Input placeholder="e.g., about-us, contact-us" />
                                      </Form.Item>

                                      <Form.Item
                                        {...restField}
                                        name={[subField.name, "label"]}
                                        label="Label"
                                        rules={[
                                          {
                                            required: true,
                                            message: "Please enter a label",
                                          },
                                        ]}
                                        style={{ width: "50%" }}
                                      >
                                        <Input placeholder="e.g., About Us, Contact Us" />
                                      </Form.Item>
                                    </div>

                                    <Form.Item
                                      {...restField}
                                      name={[subField.name, "href"]}
                                      label="Link (URL)"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please enter a URL",
                                        },
                                      ]}
                                    >
                                      <Input placeholder="e.g., /about, /contact" />
                                    </Form.Item>
                                  </div>
                                ))}

                                <Button
                                  type="dashed"
                                  onClick={() =>
                                    subOpt.add({ key: "", label: "", href: "" })
                                  }
                                  block
                                  icon={<PlusOutlined />}
                                >
                                  Add Dropdown Item
                                </Button>
                              </div>
                            )}
                          </Form.List>
                        </Space>
                      </div>
                    ))}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() =>
                          add({ key: "", label: "", icon: "", href: "" })
                        }
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Menu Item
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Divider />

              <Title level={4}>Quick Links</Title>
              <Paragraph>
                Here are links to your pages that you can use in the navigation:
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

              <Form.Item></Form.Item>
            </Form>
          </Card>
        </Card>
      </Content>
      <Footer />
    </Layout>
  );
}
