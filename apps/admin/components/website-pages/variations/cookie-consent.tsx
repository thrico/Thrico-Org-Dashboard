"use client";

import { useState, useEffect } from "react";
import { Alert, Button, Space, Typography } from "antd";

interface CookieConsentProps {
  variation?: string;
}

export default function CookieConsent({
  variation = "default",
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem("cookie-consent");
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  // Minimal variation
  if (variation === "minimal") {
    return (
      <div
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1000,
          maxWidth: 300,
          boxShadow:
            "0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <Alert
          message="Cookies"
          description="We use cookies to enhance your experience."
          type="info"
          showIcon
          action={
            <Button size="small" type="primary" onClick={acceptCookies}>
              Accept
            </Button>
          }
          closable
          onClose={() => setIsVisible(false)}
        />
      </div>
    );
  }

  // Banner variation
  if (variation === "banner") {
    return (
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: "#1890ff",
          padding: "12px 24px",
          color: "white",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <Typography.Text style={{ color: "white" }}>
            We use cookies to enhance your experience. By continuing to visit
            this site you agree to our use of cookies.
          </Typography.Text>
          <Space>
            <Button size="small" onClick={() => setIsVisible(false)}>
              Decline
            </Button>
            <Button
              size="small"
              type="primary"
              onClick={acceptCookies}
              style={{ background: "white", color: "#1890ff" }}
            >
              Accept
            </Button>
          </Space>
        </div>
      </div>
    );
  }

  // Default variation
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "#fff",
        padding: "16px 24px",
        boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.15)",
        borderTop: "1px solid #f0f0f0",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <Typography.Text style={{ flex: 1 }}>
          We use cookies to enhance your experience. By continuing to visit this
          site you agree to our use of cookies.
        </Typography.Text>
        <Space>
          <Button onClick={() => setIsVisible(false)}>Decline</Button>
          <Button type="primary" onClick={acceptCookies}>
            Accept
          </Button>
        </Space>
      </div>
    </div>
  );
}
