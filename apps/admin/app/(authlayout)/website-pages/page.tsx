"use client";

import { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Card,
  Button,
  Select,
  Space,
  Row,
  Col,
  message,
  Tabs,
  Skeleton,
} from "antd";
import {
  SaveOutlined,
  CheckOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  MenuOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

import { useRouter } from "next/navigation";
import BusinessFirst from "../../../components/website-pages/variations/business-first";
import BalancedLayout from "../../../components/website-pages/variations/balanced-layout";
import Layouts from "../../../components/mange-webiste/Layouts";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

export default function AdminDashboard() {
  const router = useRouter();

  const [selectedNavbar, setSelectedNavbar] = useState<string>("default");
  const [selectedFooter, setSelectedFooter] = useState<string>("default");
  const [selectedCookie, setSelectedCookie] = useState<string>("default");
  const [isSaving, setIsSaving] = useState(false);
  const [selectedVariation, setSelectedVariation] =
    useState<string>("balanced");
  const [activeTab, setActiveTab] = useState("layouts");
  const [customPages, setCustomPages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved variations on mount
  useEffect(() => {
    const savedVariation =
      localStorage.getItem("thrico-variation") || "balanced";
    const savedNavbar = localStorage.getItem("thrico-navbar") || "default";
    const savedFooter = localStorage.getItem("thrico-footer") || "default";
    const savedCookie = localStorage.getItem("thrico-cookie") || "default";
    const savedPages = JSON.parse(
      localStorage.getItem("thrico-custom-pages") || "[]"
    );

    setSelectedVariation(savedVariation);
    setSelectedNavbar(savedNavbar);
    setSelectedFooter(savedFooter);
    setSelectedCookie(savedCookie);
    setCustomPages(savedPages);

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSave = () => {
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem("thrico-variation", selectedVariation);
      localStorage.setItem("thrico-navbar", selectedNavbar);
      localStorage.setItem("thrico-footer", selectedFooter);
      localStorage.setItem("thrico-cookie", selectedCookie);

      setIsSaving(false);
      message.success("Settings saved successfully");
    }, 1000);
  };

  // Preview the selected variation

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ width: "100%" }}>
        <Card title="Manage">
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane
              tab={
                <span>
                  <AppstoreOutlined />
                  Layouts
                </span>
              }
              key="layouts"
            >
              <Layouts />
            </TabPane>

            <TabPane
              tab={
                <span>
                  <FileTextOutlined />
                  Pages
                </span>
              }
              key="pages"
            >
              {isLoading ? (
                <Skeleton active paragraph={{ rows: 10 }} />
              ) : (
                <Row gutter={[24, 24]}>
                  <Col xs={24}>
                    <Card title="Page Management">
                      <Space
                        direction="vertical"
                        size={16}
                        style={{ width: "100%" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Title level={4} style={{ margin: 0 }}>
                            Standard Pages
                          </Title>
                          <Button
                            type="primary"
                            onClick={() =>
                              router.push("/website-pages/pages/standard")
                            }
                          >
                            Manage Standard Pages
                          </Button>
                        </div>
                        <Paragraph>
                          Manage content and variations for standard pages like
                          Home, About Us, Contact, and Privacy Policy.
                        </Paragraph>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 16,
                          }}
                        >
                          <Title level={4} style={{ margin: 0 }}>
                            Custom Pages
                          </Title>
                          <Button
                            type="primary"
                            onClick={() =>
                              router.push("/website-pages/pages/create")
                            }
                          >
                            Create New Page
                          </Button>
                        </div>
                        <Paragraph>
                          Create and manage custom pages for your website.
                        </Paragraph>

                        {customPages.length > 0 ? (
                          <div>
                            <Title level={5}>Your Custom Pages:</Title>
                            <ul style={{ paddingLeft: 20 }}>
                              {customPages.map((page, index) => (
                                <li key={index} style={{ marginBottom: 8 }}>
                                  <a
                                    href={`/pages/${page.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {page.title}
                                  </a>
                                  {" - "}
                                  <Button
                                    type="link"
                                    size="small"
                                    onClick={() =>
                                      router.push(
                                        `/website-pages/pages/edit/${page.slug}`
                                      )
                                    }
                                  >
                                    Edit
                                  </Button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <Paragraph
                            type="secondary"
                            style={{ fontStyle: "italic" }}
                          >
                            No custom pages created yet.
                          </Paragraph>
                        )}
                      </Space>
                    </Card>
                  </Col>
                </Row>
              )}
            </TabPane>

            <TabPane
              tab={
                <span>
                  <MenuOutlined />
                  Navigation
                </span>
              }
              key="navigation"
            >
              {isLoading ? (
                <Skeleton active paragraph={{ rows: 10 }} />
              ) : (
                <Row gutter={[24, 24]}>
                  <Col xs={24}>
                    <Card title="Navigation Management">
                      <Button
                        type="primary"
                        onClick={() => router.push("/website-pages/navigation")}
                      >
                        Manage Navigation Items
                      </Button>
                      <Paragraph style={{ marginTop: 16 }}>
                        Customize your website's navigation menu, including
                        dropdown items and links.
                      </Paragraph>
                    </Card>
                  </Col>
                </Row>
              )}
            </TabPane>

            <TabPane
              tab={
                <span>
                  <GlobalOutlined />
                  SEO
                </span>
              }
              key="seo"
            >
              {isLoading ? (
                <Skeleton active paragraph={{ rows: 10 }} />
              ) : (
                <Row gutter={[24, 24]}>
                  <Col xs={24}>
                    <Card title="SEO Management">
                      <Button
                        type="primary"
                        onClick={() => router.push("/website-pages/seo")}
                      >
                        Manage SEO Settings
                      </Button>
                      <Paragraph style={{ marginTop: 16 }}>
                        Optimize your website's search engine visibility by
                        managing meta titles, descriptions, and keywords for all
                        pages.
                      </Paragraph>
                    </Card>
                  </Col>
                </Row>
              )}
            </TabPane>
          </Tabs>
        </Card>
      </Content>
    </Layout>
  );
}
