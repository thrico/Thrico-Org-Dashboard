import {
  Button,
  Card,
  Col,
  message,
  Row,
  Select,
  Skeleton,
  Space,
  Typography,
} from "antd";
import { Option } from "antd/es/mentions";

import React, { useEffect, useState } from "react";
import CommunityFocused from "../website-pages/variations/community-focused";
import BusinessFirst from "../website-pages/variations/business-first";
import BalancedLayout from "../website-pages/variations/balanced-layout";
import { CheckOutlined, SaveOutlined } from "@ant-design/icons";
import renderPreview from "./Preview";
import Navbar from "../website-pages/variations/navbar";
import CookieConsent from "../website-pages/variations/cookie-consent";
import Footer from "../website-pages/variations/footer";

const { Title, Text, Paragraph } = Typography;
const Layouts = () => {
  const [selectedVariation, setSelectedVariation] =
    useState<string>("balanced");
  const [selectedNavbar, setSelectedNavbar] = useState<string>("default");
  const [selectedFooter, setSelectedFooter] = useState<string>("default");
  const [selectedCookie, setSelectedCookie] = useState<string>("default");
  const [isSaving, setIsSaving] = useState(false);
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

    // Simulate loading
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

  return (
    <Row gutter={[32, 32]}>
      <Col xs={24} lg={8}>
        <Space direction="vertical" size={24} style={{ width: "100%" }}>
          <Card title="Current Active Layout">
            <Paragraph>
              {selectedVariation === "balanced" &&
                "Variation 1: Balanced Layout (Classic)"}
              {selectedVariation === "community" &&
                "Variation 2: Community Focused (Social-Driven)"}
              {selectedVariation === "business" &&
                "Variation 3: Business First (Professional)"}
            </Paragraph>
          </Card>

          <Card title="Switch Landing Page Layout">
            <Space direction="vertical" size={16} style={{ width: "100%" }}>
              <div>
                <Text strong>Page Layout</Text>
                <Select
                  value={selectedVariation}
                  onChange={setSelectedVariation}
                  style={{ width: "100%", marginTop: 8 }}
                >
                  <Option value="balanced">
                    Variation 1: Balanced Layout (Classic)
                  </Option>
                  <Option value="community">
                    Variation 2: Community Focused (Social-Driven)
                  </Option>
                  <Option value="business">
                    Variation 3: Business First (Professional)
                  </Option>
                </Select>
              </div>

              <div>
                <Text strong>Navbar Style</Text>
                <Select
                  value={selectedNavbar}
                  onChange={setSelectedNavbar}
                  style={{ width: "100%", marginTop: 8 }}
                >
                  <Option value="default">Default</Option>
                  <Option value="centered">Centered</Option>
                  <Option value="dark">Dark</Option>
                </Select>
              </div>

              <div>
                <Text strong>Footer Style</Text>
                <Select
                  value={selectedFooter}
                  onChange={setSelectedFooter}
                  style={{ width: "100%", marginTop: 8 }}
                >
                  <Option value="default">Default</Option>
                  <Option value="centered">Centered</Option>
                  <Option value="dark">Dark</Option>
                </Select>
              </div>

              <div>
                <Text strong>Cookie Consent Style</Text>
                <Select
                  value={selectedCookie}
                  onChange={setSelectedCookie}
                  style={{ width: "100%", marginTop: 8 }}
                >
                  <Option value="default">Default</Option>
                  <Option value="minimal">Minimal</Option>
                  <Option value="banner">Banner</Option>
                </Select>
              </div>
            </Space>
          </Card>
        </Space>
      </Col>

      <Col xs={24} lg={16}>
        <Card
          extra={
            <Button
              type="primary"
              icon={isSaving ? <CheckOutlined /> : <SaveOutlined />}
              loading={isSaving}
              onClick={handleSave}
              block
            >
              {isSaving ? "Saving..." : "Save & Apply"}
            </Button>
          }
          title="Layout Preview"
        >
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: 8,
              height: "70vh",
              overflowX: "hidden",
            }}
          >
            <div
              style={{
                transform: "scale(0.5)",
                transformOrigin: "top left",
                width: "200%",
                height: "200%",
              }}
            >
              <Navbar />
              {renderPreview(selectedVariation)}
              <div style={{ position: "fixed" }}>
                <CookieConsent />
              </div>

              <Footer />
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Layouts;
