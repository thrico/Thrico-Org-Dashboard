import Link from "next/link";
import { Layout, Row, Col, Typography, Button, Space, Divider } from "antd";
import {
  AppleOutlined,
  AndroidOutlined,
  TwitterOutlined,
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

const { Footer: AntFooter } = Layout;
const { Title, Text, Paragraph } = Typography;

interface FooterProps {
  variation?: string;
}

export default function Footer({ variation = "default" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  // Centered variation
  if (variation === "centered") {
    return (
      <AntFooter style={{ background: "#f0f2f5", padding: "48px 0 24px" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
          <Title level={3} style={{ marginBottom: 24 }}>
            Powered by Thrico
          </Title>

          <Paragraph
            style={{ maxWidth: 600, margin: "0 auto", marginBottom: 32 }}
          >
            Connect with your community, find events, join groups, and discover
            opportunities.
          </Paragraph>

          <Space size="large" style={{ marginBottom: 32 }}>
            <Button icon={<AndroidOutlined />} size="large">
              Google Play
            </Button>
            <Button icon={<AppleOutlined />} size="large">
              App Store
            </Button>
          </Space>

          <Divider style={{ margin: "24px 0" }} />

          <Space size="large" style={{ marginBottom: 24 }}>
            <Link href="/terms" style={{ color: "rgba(0, 0, 0, 0.65)" }}>
              Terms of Service
            </Link>
            <Link href="/privacy" style={{ color: "rgba(0, 0, 0, 0.65)" }}>
              Privacy Policy
            </Link>
            <Link href="/contact" style={{ color: "rgba(0, 0, 0, 0.65)" }}>
              Contact Us
            </Link>
          </Space>

          <Space size="middle" style={{ marginBottom: 24 }}>
            <Link href="#" style={{ color: "rgba(0, 0, 0, 0.65)" }}>
              <FacebookOutlined style={{ fontSize: 24 }} />
            </Link>
            <Link href="#" style={{ color: "rgba(0, 0, 0, 0.65)" }}>
              <TwitterOutlined style={{ fontSize: 24 }} />
            </Link>
            <Link href="#" style={{ color: "rgba(0, 0, 0, 0.65)" }}>
              <InstagramOutlined style={{ fontSize: 24 }} />
            </Link>
            <Link href="#" style={{ color: "rgba(0, 0, 0, 0.65)" }}>
              <LinkedinOutlined style={{ fontSize: 24 }} />
            </Link>
          </Space>

          <Text type="secondary">
            © {currentYear} Thrico. All rights reserved.
          </Text>
        </div>
      </AntFooter>
    );
  }

  // Dark variation
  if (variation === "dark") {
    return (
      <AntFooter style={{ background: "#001529", padding: "48px 0 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <Row gutter={[48, 32]}>
            <Col xs={24} sm={24} md={8}>
              <Title level={3} style={{ color: "white", marginBottom: 16 }}>
                Powered by Thrico
              </Title>
              <Paragraph
                style={{ color: "rgba(255, 255, 255, 0.65)", marginBottom: 24 }}
              >
                Connect with your community, find events, join groups, and
                discover opportunities.
              </Paragraph>
              <Space size="middle">
                <Link href="#" style={{ color: "rgba(255, 255, 255, 0.65)" }}>
                  <FacebookOutlined style={{ fontSize: 24 }} />
                </Link>
                <Link href="#" style={{ color: "rgba(255, 255, 255, 0.65)" }}>
                  <TwitterOutlined style={{ fontSize: 24 }} />
                </Link>
                <Link href="#" style={{ color: "rgba(255, 255, 255, 0.65)" }}>
                  <InstagramOutlined style={{ fontSize: 24 }} />
                </Link>
                <Link href="#" style={{ color: "rgba(255, 255, 255, 0.65)" }}>
                  <LinkedinOutlined style={{ fontSize: 24 }} />
                </Link>
              </Space>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Title level={4} style={{ color: "white", marginBottom: 16 }}>
                Download Our App
              </Title>
              <Space direction="vertical" size="middle">
                <Button icon={<AndroidOutlined />} block>
                  Google Play
                </Button>
                <Button icon={<AppleOutlined />} block>
                  App Store
                </Button>
              </Space>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Title level={4} style={{ color: "white", marginBottom: 16 }}>
                Legal
              </Title>
              <Space direction="vertical">
                <Link
                  href="/terms"
                  style={{ color: "rgba(255, 255, 255, 0.65)" }}
                >
                  Terms of Service
                </Link>
                <Link
                  href="/privacy"
                  style={{ color: "rgba(255, 255, 255, 0.65)" }}
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/contact"
                  style={{ color: "rgba(255, 255, 255, 0.65)" }}
                >
                  Contact Us
                </Link>
              </Space>
            </Col>
          </Row>

          <Divider
            style={{
              borderColor: "rgba(255, 255, 255, 0.2)",
              margin: "32px 0 24px",
            }}
          />

          <Text
            style={{
              color: "rgba(255, 255, 255, 0.45)",
              display: "block",
              textAlign: "center",
            }}
          >
            © {currentYear} Thrico. All rights reserved.
          </Text>
        </div>
      </AntFooter>
    );
  }

  // Default variation
  return (
    <AntFooter style={{ background: "#f0f2f5", padding: "48px 0 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <Row gutter={[48, 32]}>
          <Col xs={24} sm={24} md={8}>
            <Title level={3} style={{ marginBottom: 16 }}>
              Powered by Thrico
            </Title>
            <Paragraph
              style={{ color: "rgba(0, 0, 0, 0.65)", marginBottom: 0 }}
            >
              Connect with your community, find events, join groups, and
              discover opportunities.
            </Paragraph>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Title level={4} style={{ marginBottom: 16 }}>
              Download Our App
            </Title>
            <Space direction="vertical" size="middle">
              <Button
                icon={<AndroidOutlined />}
                style={{ display: "flex", alignItems: "center" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    marginLeft: 8,
                  }}
                >
                  <span style={{ fontSize: 12 }}>Get it on</span>
                  <span style={{ fontWeight: 500 }}>Google Play</span>
                </div>
              </Button>
              <Button
                icon={<AppleOutlined />}
                style={{ display: "flex", alignItems: "center" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    marginLeft: 8,
                  }}
                >
                  <span style={{ fontSize: 12 }}>Download on the</span>
                  <span style={{ fontWeight: 500 }}>App Store</span>
                </div>
              </Button>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Title level={4} style={{ marginBottom: 16 }}>
              Legal
            </Title>
            <Space direction="vertical">
              <Link href="/terms" style={{ color: "rgba(0, 0, 0, 0.65)" }}>
                Terms of Service
              </Link>
              <Link href="/privacy" style={{ color: "rgba(0, 0, 0, 0.65)" }}>
                Privacy Policy
              </Link>
              <Link href="/contact" style={{ color: "rgba(0, 0, 0, 0.65)" }}>
                Contact Us
              </Link>
            </Space>
          </Col>
        </Row>

        <Divider style={{ margin: "32px 0 24px" }} />

        <Text
          type="secondary"
          style={{ display: "block", textAlign: "center" }}
        >
          © {currentYear} Thrico. All rights reserved.
        </Text>
      </div>
    </AntFooter>
  );
}
