"use client";

import React, { useEffect, useState } from "react";
import { Typography, Card, Button, Space, Row, Col } from "antd";
import { useRouter } from "next/navigation";
const { Title, Paragraph } = Typography;
const page = () => {
  useEffect(() => {
    const savedPages = JSON.parse(
      localStorage.getItem("thrico-custom-pages") || "[]"
    );

    setCustomPages(savedPages);
  }, []);

  const [customPages, setCustomPages] = useState([]);
  const router = useRouter();
  return (
    <Row gutter={[24, 24]}>
      <Col xs={24}>
        <Card title="Page Management">
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
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
                onClick={() => router.push("/website-pages/pages/standard")}
              >
                Manage Standard Pages
              </Button>
            </div>
            <Paragraph>
              Manage content and variations for standard pages like Home, About
              Us, Contact, and Privacy Policy.
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
                onClick={() => router.push("/website-pages/pages/create")}
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
                          router.push(`/website-pages/pages/edit/${page.slug}`)
                        }
                      >
                        Edit
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Paragraph type="secondary" style={{ fontStyle: "italic" }}>
                No custom pages created yet.
              </Paragraph>
            )}
          </Space>
        </Card>
      </Col>
    </Row>
  );
};

export default page;
