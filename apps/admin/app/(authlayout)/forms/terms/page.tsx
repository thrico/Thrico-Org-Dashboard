"use client";

import { useState } from "react";
import { Typography, Button, Card, Tabs, Space } from "antd";
import { Input } from "antd";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { TabPane } = Tabs;

export default function TermsPage() {
  const [activeTab, setActiveTab] = useState("edit");

  // Mock terms data
  const [terms, setTerms] = useState({
    termsContent: `# Terms and Conditions

## 1. Introduction

Welcome to our Form Management Platform. By using our service, you agree to these Terms and Conditions.

## 2. Definitions

- **Platform**: The Form Management Platform and all its features.
- **User**: Any individual or entity that uses the Platform.
- **Content**: All information collected through forms.

## 3. User Responsibilities

Users are responsible for:
- Maintaining the confidentiality of their account information
- All activities that occur under their account
- Ensuring that their use of the Platform complies with applicable laws

## 4. Data Privacy

We take data privacy seriously. All data collected through forms is:
- Stored securely
- Only accessible to authorized users
- Processed in accordance with our Privacy Policy

## 5. Intellectual Property

The Platform and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.

## 6. Termination

We may terminate or suspend your account and access to the Platform immediately, without prior notice or liability, for any reason.

## 7. Limitation of Liability

In no event shall we be liable for any indirect, incidental, special, consequential or punitive damages.

## 8. Changes to Terms

We reserve the right to modify these terms at any time. We will provide notice of significant changes.

## 9. Contact Us

If you have any questions about these Terms, please contact us.

Last updated: May 6, 2025`,
    privacyContent: `# Privacy Policy

## 1. Introduction

This Privacy Policy explains how we collect, use, and disclose information about users of our Form Management Platform.

## 2. Information We Collect

We collect the following types of information:

- **Account Information**: Name, email address, and other contact details.
- **Form Data**: Information submitted through forms created on our platform.
- **Usage Data**: Information about how you use our platform.

## 3. How We Use Information

We use the information we collect to:

- Provide, maintain, and improve our services
- Communicate with you about our services
- Monitor and analyze trends and usage
- Enhance the security of our services

## 4. Information Sharing

We do not sell your personal information. We may share information in the following circumstances:

- With your consent
- To comply with legal obligations
- To protect our rights, privacy, safety, or property

## 5. Data Security

We implement appropriate security measures to protect your information.

## 6. Your Rights

Depending on your location, you may have certain rights regarding your personal information, such as:

- Access to your data
- Correction of inaccurate data
- Deletion of your data
- Restriction of processing

## 7. Changes to This Policy

We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.

## 8. Contact Us

If you have any questions about this Privacy Policy, please contact us.

Last updated: May 6, 2025`,
  });

  // Update terms content
  const updateTerms = (field: string, value: string) => {
    setTerms({
      ...terms,
      [field]: value,
    });
  };

  // Save terms
  const saveTerms = () => {
    console.log("Saving terms:", terms);
    // In a real app, you would save to your backend here
    alert("Terms saved successfully!");
  };

  // Simple markdown renderer
  const renderMarkdown = (content: string) => {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: content
            .replace(/^# (.*$)/gm, "<h1>$1</h1>")
            .replace(/^## (.*$)/gm, "<h2>$1</h2>")
            .replace(/^### (.*$)/gm, "<h3>$1</h3>")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>")
            .replace(/\n- (.*)/g, "<ul><li>$1</li></ul>")
            .replace(/<\/ul><ul>/g, "")
            .replace(/\n/g, "<br />"),
        }}
      />
    );
  };

  return (
    <Card
      extra={
        <Button type="primary" onClick={saveTerms}>
          Save Changes
        </Button>
      }
      title="Terms & Conditions"
    >
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Edit" key="edit">
          <Card>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text type="secondary">
                Edit your terms and conditions below. Markdown formatting is
                supported.
              </Text>
              <TextArea
                value={terms.termsContent}
                onChange={(e) => updateTerms("termsContent", e.target.value)}
                style={{ minHeight: 500, fontFamily: "monospace" }}
              />
            </Space>
          </Card>
        </TabPane>

        <TabPane tab="Preview" key="preview">
          <Card>
            <div className="markdown-preview">
              {renderMarkdown(terms.termsContent)}
            </div>
          </Card>
        </TabPane>

        <TabPane tab="Privacy Policy" key="privacy">
          <Card>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text type="secondary">
                Edit your privacy policy below. Markdown formatting is
                supported.
              </Text>
              <TextArea
                value={terms.privacyContent}
                onChange={(e) => updateTerms("privacyContent", e.target.value)}
                style={{ minHeight: 500, fontFamily: "monospace" }}
              />
            </Space>
          </Card>
        </TabPane>
      </Tabs>
    </Card>
  );
}
