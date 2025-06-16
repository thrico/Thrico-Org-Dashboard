"use client";

import { useState } from "react";
import {
  Steps,
  Card,
  Modal,
  Typography,
  Flex,
  Button,
  Drawer,
  Space,
  Alert,
} from "antd";
import TeamRequirements from "./team-requirements";
import FeaturesIntegrations from "./features-integrations";
import BudgetTimeline from "./budget-timeline";
import SecurityRequirements from "./security-requirements";
import ContactInformation from "./contact-information";
import ThankYou from "./thank-you";
import FormHeader from "./form-header";
import { useCustomFormStore } from "../../../../store/customFormStore";

const { Step } = Steps;

export default function CustomRequestForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 6;

  const steps = [
    { title: "Requirement" },
    { title: "Features" },
    { title: "Budget" },
    { title: "Security" },
    { title: "Contact" },
  ];

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <TeamRequirements onNext={nextStep} />;
      case 1:
        return <FeaturesIntegrations onNext={nextStep} onPrevious={prevStep} />;
      case 2:
        return <BudgetTimeline onNext={nextStep} onPrevious={prevStep} />;
      case 3:
        return <SecurityRequirements onNext={nextStep} onPrevious={prevStep} />;
      case 4:
        return <ContactInformation onNext={nextStep} onPrevious={prevStep} />;
      case 5:
        return <ThankYou />;
      default:
        return <TeamRequirements onNext={nextStep} />;
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { Title, Text, Paragraph } = Typography;

  return (
    <>
      <Card
        style={{
          marginTop: 32,
          backgroundColor: "#f9f0ff",
          borderColor: "#d3adf7",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <Title level={3} style={{ marginBottom: 4 }}>
            Need a Custom Plan?
          </Title>
        </div>

        <Flex align="center" justify="center" vertical gap={20}>
          <Flex vertical align="center" justify="center">
            <Text>For teams with 100,000+ members or special requirements</Text>

            {/* <ShieldOutlined /> */}
            <Text>
              • Unlimited team members • Custom integrations • Dedicated support
            </Text>
          </Flex>

          <Button
            onClick={showModal}
            type="primary"
            style={{ backgroundColor: "#722ed1" }}
          >
            Contact Sales
          </Button>
        </Flex>
      </Card>

      <Drawer
        onClose={handleCancel}
        width={"100%"}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
      >
        <Flex align="center" justify="center" vertical>
          <Space direction="vertical" style={{ width: "70%" }}>
            <FormHeader />
            {currentStep < totalSteps - 1 && (
              <Card style={{ marginBottom: 24 }}>
                <div style={{ marginBottom: 16 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 16,
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 500 }}>
                      Step {currentStep + 1} of {totalSteps}
                    </span>
                    <span style={{ fontSize: 14, color: "#666" }}>
                      {Math.round(((currentStep + 1) / totalSteps) * 100)}%
                      complete
                    </span>
                  </div>
                  <Steps current={currentStep} size="small">
                    {steps.map((step, index) => (
                      <Step key={index} title={step.title} />
                    ))}
                  </Steps>
                </div>
              </Card>
            )}
            {renderStep()}

            <Alert
              type="info"
              showIcon
              message={
                <span>
                  <strong>Need help?</strong> Our sales team is available to
                  assist you. Call us at +1 (555) 123-4567 or email
                  enterprise@thrico.com
                </span>
              }
              style={{ marginTop: 24 }}
            />
          </Space>
        </Flex>
      </Drawer>
    </>
  );
}
