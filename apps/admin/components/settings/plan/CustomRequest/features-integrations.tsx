"use client";

import { Button, Form, Card, Checkbox, Row, Col, Typography } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useCustomFormStore } from "../../../../store/customFormStore";

const { Title } = Typography;

interface FeaturesIntegrationsProps {
  onNext: () => void;
  onPrevious: () => void;
}

export default function FeaturesIntegrations({
  onNext,
  onPrevious,
}: FeaturesIntegrationsProps) {
  const { features, setFeatures } = useCustomFormStore();
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log("Features Integrations:", values);
    setFeatures({ features: values.features });
    onNext();
  };

  const featureOptions = [
    { label: "Custom branding/white-label", value: "branding" },
    { label: "Advanced analytics & reporting", value: "analytics" },
    { label: "API access & integrations", value: "api" },
    { label: "Mobile applications", value: "mobile" },
    { label: "Single Sign-On (SSO)", value: "sso" },
    { label: "Advanced security features", value: "security" },
    { label: "Custom workflows", value: "workflows" },
    { label: "Multi-language support", value: "multilanguage" },
    { label: "Dedicated infrastructure", value: "infrastructure" },
    { label: "24/7 priority support", value: "support" },
    { label: "Custom training & onboarding", value: "training" },
    { label: "Data export & migration tools", value: "export" },
  ];

  return (
    <Card>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 24,
        }}
      >
        <SettingOutlined style={{ color: "#1890ff", fontSize: 20 }} />
        <Title level={2} style={{ margin: 0 }}>
          Features
        </Title>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
        initialValues={{ ...features }}
      >
        <Form.Item
          label="Required Features (Select all that apply)"
          name="features"
        >
          <Checkbox.Group>
            <Row gutter={[16, 16]}>
              {featureOptions.map((option) => (
                <Col xs={24} md={12} key={option.value}>
                  <Checkbox value={option.value}>{option.label}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 30,
            gap: 16,
          }}
        >
          <Button onClick={onPrevious}>Previous</Button>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </div>
      </Form>
    </Card>
  );
}
