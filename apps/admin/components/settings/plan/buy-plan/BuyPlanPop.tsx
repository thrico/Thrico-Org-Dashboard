"use client";

import type React from "react";
import { useState } from "react";
import {
  Modal,
  Radio,
  Input,
  Button,
  Space,
  Tooltip,
  Typography,
  Alert,
} from "antd";
import {
  InfoCircleOutlined,
  CalendarOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import type { RadioChangeEvent } from "antd";
import { CountryPackage, UpgradePlanSummary } from "../ts-types";
import moment from "moment";
import {
  billingOptionStyle,
  calendarIconStyle,
  creditStyle,
  effectiveImmediatelyStyle,
  nextBillingStyle,
  planCardStyle,
  priceAmountStyle,
  priceDetailStyle,
  priceStyle,
  RazorpayData,
  savingsStyle,
  sectionTitleStyle,
  summaryLabelStyle,
  summaryRowStyle,
  summaryValueStyle,
  totalLabelStyle,
  totalRowStyle,
  totalValueStyle,
} from "../stye";
import { getYearlySavings } from "../utils";
import { RazorpayOrderOptions, useRazorpay } from "react-razorpay";
import {
  updateTrialToPackage,
  verifyRazorpayPayment,
} from "../../../../graphql/actions/plan";
import { checkEntitySubscription } from "../../../../graphql/actions";
import PaymentLoading from "../Loading";

interface UpgradeModalProps {
  visible: boolean;
  onClose: () => void;
  activePackage: CountryPackage | null;
}

export default function BuyPlanPopUp({
  visible,
  onClose,
  activePackage,
}: UpgradeModalProps) {
  enum BillingCycle {
    Monthly = "monthly",
    Yearly = "yearly",
  }

  const [billingCycle, setBillingCycle] = useState<BillingCycle>(
    BillingCycle.Monthly
  );

  const handleBillingChange = (e: RadioChangeEvent) => {
    setBillingCycle(e.target.value);
  };
  const currentDate = moment();

  // Styles

  const { Razorpay } = useRazorpay();
  const { refetch, loading: statusLoader } = checkEntitySubscription();
  const [verify, { loading: verificationLoader }] = verifyRazorpayPayment({
    onCompleted: (data: { verifyRazorpayPayment: boolean }) => {
      if (data?.verifyRazorpayPayment) {
        refetch();
        onClose();
      } else {
        // Handle verification failure
        alert("Payment verification failed. Please try again.");
      }
    },
  });
  const [upgrade, { loading: joinLoading }] = updateTrialToPackage({
    onCompleted: (data: { updateTrialToPackage: RazorpayData }) => {
      if (data?.updateTrialToPackage) {
        const options: RazorpayOrderOptions = {
          key: "rzp_test_AVIthfNy85rAR2",
          amount: data?.updateTrialToPackage.amount, // Amount in paise
          currency: data?.updateTrialToPackage
            ?.currency as RazorpayOrderOptions["currency"],
          name: "Test Company",
          description: "Test Transaction",
          order_id: data?.updateTrialToPackage.id, // Generate order_id on server
          handler: (response) => {
            if (!response.razorpay_payment_id) {
              alert("Payment failed. Please try again.");
              return;
            } else {
              // Call the verify mutation with the payment details
              verify({
                variables: {
                  input: {
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                  },
                },
              });
            }
            onClose();
          },

          prefill: {
            name: "John Doe",
            email: "john.doe@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#F37254",
          },
        };

        const razorpayInstance = new Razorpay(options);
        razorpayInstance.open();
        // You can add any additional logic here after the mutation completes
      }

      // open razorpayModal()
      // You can add any additional logic here after the mutation completes
    },
  });

  const { Paragraph } = Typography;
  return (
    <>
      {verificationLoader || statusLoader ? <PaymentLoading /> : null}
      <Modal
        open={visible}
        onCancel={onClose}
        footer={null}
        width={800}
        centered
        title={`Buy ${activePackage?.name} Plan`}
      >
        <Paragraph>
          Choose your billing cycle and review your plan details before
          purchase.
        </Paragraph>

        <div style={{ display: "flex", gap: "24px" }}>
          {/* Left Column */}
          <div style={{ flex: 1 }}>
            <div style={sectionTitleStyle}>Plan Details</div>

            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  marginBottom: "16px",
                }}
              >
                Select Billing Cycle
              </div>

              <Radio.Group
                onChange={handleBillingChange}
                value={billingCycle}
                style={{ width: "100%" }}
              >
                <div style={billingOptionStyle}>
                  <Radio value="monthly">Monthly</Radio>
                  <div style={priceStyle}>
                    <div style={priceAmountStyle}>
                      {activePackage?.currency}
                      {activePackage?.monthlyPrice}/month
                    </div>
                    <div style={priceDetailStyle}>Billed monthly</div>
                  </div>
                </div>

                <div style={billingOptionStyle}>
                  <Radio value="yearly">Yearly</Radio>
                  <div style={priceStyle}>
                    <div style={priceAmountStyle}>
                      {activePackage?.currency}
                      {activePackage?.yearlyPrice}/year
                    </div>
                    <div style={savingsStyle}>
                      Save{" "}
                      {getYearlySavings(
                        activePackage?.monthlyPrice,
                        activePackage?.yearlyPrice,
                        activePackage?.currency
                      )}
                    </div>
                  </div>
                </div>
              </Radio.Group>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ flex: 1 }}>
            <div style={sectionTitleStyle}>Payment Summary</div>

            <div style={planCardStyle}>
              <div style={summaryRowStyle}>
                <div style={summaryLabelStyle}>Plan ({billingCycle})</div>
                <div style={summaryValueStyle}>
                  {activePackage?.currency}
                  {billingCycle === "monthly"
                    ? activePackage?.monthlyPrice
                    : activePackage?.yearlyPrice}
                </div>
              </div>

              <div style={totalRowStyle}>
                <div style={totalLabelStyle}>Total due today</div>
                <div style={totalValueStyle}>
                  {activePackage?.currency}
                  {billingCycle === "monthly"
                    ? activePackage?.monthlyPrice
                    : activePackage?.yearlyPrice}
                </div>
              </div>

              <div style={nextBillingStyle}>
                Your next billing date will be{" "}
                {billingCycle === "monthly" ? (
                  <>
                    {moment(currentDate.clone().add(1, "month")).format(
                      "MMM Do YY"
                    )}
                  </>
                ) : (
                  <>
                    {moment(currentDate.clone().add(1, "year")).format(
                      "MMM Do YY"
                    )}
                  </>
                )}{" "}
                for {activePackage?.currency}
                {billingCycle === "monthly"
                  ? activePackage?.monthlyPrice
                  : activePackage?.yearlyPrice}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "32px",
          }}
        >
          <div style={effectiveImmediatelyStyle}>
            <CalendarOutlined style={calendarIconStyle} />
            <span>Effective immediately</span>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              loading={joinLoading}
              onClick={() =>
                upgrade({
                  variables: {
                    input: {
                      packageId: activePackage?.packageId,
                      billingCycle,
                    },
                  },
                })
              }
              type="primary"
            >
              <CreditCardOutlined />
              Buy Now
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
