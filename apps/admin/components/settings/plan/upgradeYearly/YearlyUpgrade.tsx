import React from "react";
import { getYearlySavings } from "../utils";
import { Alert, Button, Space } from "antd";
import {
  updateToYearly,
  verifyRazorpayPayment,
} from "../../../../graphql/actions/plan";
import { checkEntitySubscription } from "../../../../graphql/actions";
import { RazorpayOrderOptions, useRazorpay } from "react-razorpay";
import PaymentLoading from "../Loading";

const YearlyUpgrade = ({ planOverview }) => {
  const { refetch, loading: statusLoader } = checkEntitySubscription();
  const [verify, { loading: verificationLoader }] = verifyRazorpayPayment({
    onCompleted: (data: { verifyRazorpayPayment: boolean }) => {
      if (data?.verifyRazorpayPayment) {
        refetch();
      } else {
        // Handle verification failure
        alert("Payment verification failed. Please try again.");
      }
    },
  });
  interface RazorpayData {
    id: string;
    entity: string;
    amount: number;
    currency: string;
    receipt: string;
    status: string;
    created_at: number;
  }
  const { Razorpay } = useRazorpay();
  const [upgrade, { loading: joinLoading }] = updateToYearly({
    onCompleted: (data: { updateToYearly: RazorpayData }) => {
      if (data?.updateToYearly) {
        const options: RazorpayOrderOptions = {
          key: "rzp_test_AVIthfNy85rAR2",
          amount: data?.updateToYearly.amount, // Amount in paise
          currency: data?.updateToYearly
            ?.currency as RazorpayOrderOptions["currency"],
          name: "Test Company",
          description: "Test Transaction",
          order_id: data?.updateToYearly.id, // Generate order_id on server
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
  return (
    <>
      {verificationLoader || statusLoader ? <PaymentLoading /> : null}
      <Space direction="vertical" size={8}>
        <Alert
          description={`Switch to yearly billing and save ${getYearlySavings(planOverview.package?.monthlyPrice, planOverview.package?.yearlyPrice, planOverview?.package?.currency)} on your subscription.`}
          type="info"
          showIcon
        />

        <Button
          onClick={() => {
            upgrade({
              variables: {
                input: {
                  packageId: planOverview?.package?.packageId,
                },
              },
            });
          }}
          type="primary"
        >
          Switch to Yearly Billing
        </Button>
      </Space>
    </>
  );
};

export default YearlyUpgrade;
