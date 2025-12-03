"use client";

import { useState, useEffect } from "react";
import {
  useGetNavigationMenus,
  useSaveNavigationMenus,
} from "../../graphql/website/website-quiries";
import * as LucideIcons from "lucide-react";
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
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Footer } from "antd/es/layout/layout";
import Navbar from "./variations/navbar";

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;
const { Option } = Select;

export default function NavigationManager() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // Remove customPages state if not needed

  // Call the GraphQL query hook
  const [saveNavigationMenus, { loading: saveLoading }] =
    useSaveNavigationMenus();
  const { data, loading: navLoading, error } = useGetNavigationMenus();

  // Lucide icon names for the form dropdown
  const iconOptions = [
    { label: "Home", value: "home" },
    { label: "Calendar", value: "calendar" },
    { label: "Users", value: "users" },
    { label: "Shopping Cart", value: "shopping-cart" },
    { label: "Book", value: "book" },
    { label: "Image", value: "image" },
    { label: "Message Circle", value: "message-circle" },
    { label: "Phone", value: "phone" },
    { label: "Info", value: "info" },
    { label: "File Text", value: "file-text" },
    { label: "Settings", value: "settings" },
    { label: "Star", value: "star" },
    { label: "Bell", value: "bell" },
    { label: "Check", value: "check" },
    { label: "X", value: "x" },
    { label: "Search", value: "search" },
    { label: "Chevron Down", value: "chevron-down" },
    { label: "Chevron Up", value: "chevron-up" },
    { label: "Chevron Left", value: "chevron-left" },
    { label: "Chevron Right", value: "chevron-right" },
  ];

  useEffect(() => {
    if (data?.getNavigationMenus) {
      form.setFieldsValue({ items: data.getNavigationMenus });
      setIsLoading(false);
    }
  }, [data, form]);
  // Utility to recursively remove __typename from menu items
  const cleanMenuItems = (items: any[]): any[] => {
    return items.map(({ __typename, children, ...rest }) => ({
      ...rest,
      ...(children ? { children: cleanMenuItems(children) } : {}),
    }));
  };

  const onFinish = async (values: { items: any[] }) => {
    setLoading(true);
    try {
      const cleanedItems = cleanMenuItems(values.items);
      await saveNavigationMenus({ variables: { input: cleanedItems } });
      message.success("Navigation updated successfully!");
    } catch (err) {
      message.error("Failed to save navigation menu");
    }
    setLoading(false);
  };

  const renderNavbarPreview = () => {
    const items = Form.useWatch("items", form);
    if (navLoading) return <Skeleton active paragraph={{ rows: 1 }} />;
    if (error) return <div>Error loading navigation menu</div>;
    if (!items?.length) return <div>No navigation menu data</div>;

    return (
      <nav
        style={{
          background: "#fafafa",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: "24px",
        }}
      >
        <Text strong style={{ marginBottom: 8, display: "block" }}>
          Navbar Preview:
        </Text>
        <ul
          style={{
            display: "flex",
            gap: "24px",
            listStyle: "none",
            padding: 0,
          }}
        >
          {items.map((menu: any) => {
            // Convert icon name to Lucide component name (e.g., "home" -> "HomeIcon")
            const Icon = menu.icon
              ? LucideIcons[
                  menu.icon
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join("") + "Icon"
                ]
              : null;
            return (
              <li key={menu.key} style={{ position: "relative" }}>
                <a
                  href={menu.href || "#"}
                  style={{
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {Icon && <Icon size={18} style={{ marginRight: 4 }} />}
                  {menu.label}
                </a>
                {menu.children && menu.children.length > 0 && (
                  <ul
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      background: "#fff",
                      boxShadow: "0 2px 8px #eee",
                      padding: "8px",
                      borderRadius: "4px",
                      minWidth: "120px",
                      zIndex: 1,
                    }}
                  >
                    {menu.children.map((child: any) => {
                      const ChildIcon = child.icon
                        ? LucideIcons[
                            child.icon
                              .split("-")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join("") + "Icon"
                          ]
                        : null;
                      return (
                        <li key={child.key} style={{ marginBottom: 4 }}>
                          <a
                            href={child.href || "#"}
                            style={{
                              fontWeight: 400,
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                            }}
                          >
                            {ChildIcon && (
                              <ChildIcon size={16} style={{ marginRight: 4 }} />
                            )}
                            {child.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    );
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ width: "100%" }}>
          <Card
            extra={
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={loading || saveLoading}
              >
                Save Navigation
              </Button>
            }
            title="Navigation Manager"
          >
            <Card>
              {/* Navbar Preview Section */}
              {renderNavbarPreview()}
              <Title level={4}>Quick Links</Title>
              <Paragraph>
                Here are links to your pages that you can use in the navigation:
              </Paragraph>

              {/* Custom Pages section removed since localStorage logic is gone. Add your own logic if needed. */}

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
            </Card>
          </Card>
        </Content>
        <Footer />
      </Layout>
    </Form>
  );
}
