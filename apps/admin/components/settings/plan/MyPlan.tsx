import { useState } from "react";
import { Alert, Typography, Row, Col } from "antd";
import { ClockCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { checkEntitySubscription } from "../../../graphql/actions";

const { Title, Text } = Typography;

const MyPlan = () => {
  const { data, loading } = checkEntitySubscription();

  const subscription = data?.checkEntitySubscription;
  const now = new Date().getTime();
  const endDate = subscription?.endDate
    ? new Date(subscription.endDate).getTime()
    : null;
  const graceUntil = subscription?.graceUntil
    ? new Date(subscription.graceUntil).getTime()
    : null;

  const isTrialEnded =
    subscription?.subscriptionType === "trial" &&
    endDate !== null &&
    endDate < now;
  const isTrialActive =
    subscription?.subscriptionType === "trial" &&
    endDate !== null &&
    endDate > now;
  const isSuspended = subscription?.status === "suspended";
  const isInGracePeriod =
    subscription?.status === "cancelled" && graceUntil && graceUntil > now;
  const isCancelledAndExpired =
    subscription?.status === "cancelled" && (!graceUntil || graceUntil <= now);
  const isActivePaid =
    subscription?.subscriptionType === "paid" &&
    subscription?.status === "active";

  return (
    <>
      {isSuspended && (
        <Alert
          type="error"
          showIcon
          icon={<WarningOutlined />}
          message={
            <div>
              <strong>Your account is suspended.</strong>
              <div>
                Your subscription has been suspended. Please select a plan to
                continue using Thrico.
              </div>
            </div>
          }
          style={{ marginBottom: 24 }}
        />
      )}

      {isTrialEnded && (
        <Alert
          type="error"
          showIcon
          icon={<WarningOutlined />}
          message={
            <div>
              <strong>Your trial has ended!</strong>
              <div>
                You can no longer use Thrico. Select a plan to continue.
              </div>
            </div>
          }
          style={{ marginBottom: 24 }}
        />
      )}

      {isTrialActive && (
        <Alert
          banner
          type="warning"
          showIcon
          icon={<WarningOutlined />}
          message={
            <div>
              <strong>
                Your trial ends on{" "}
                {new Date(subscription!.endDate).toLocaleDateString()}
              </strong>
              <div>
                You can continue using Thrico until then. Select a plan to stay
                subscribed.
              </div>
            </div>
          }
          style={{ marginBottom: 24 }}
        />
      )}

      {isInGracePeriod && (
        <Alert
          type="warning"
          showIcon
          icon={<WarningOutlined />}
          message={
            <div>
              <strong>You're in a grace period.</strong>
              <div>
                Your subscription is cancelled. Grace period ends on{" "}
                {new Date(subscription!.graceUntil!).toLocaleDateString()}.
              </div>
            </div>
          }
          style={{ marginBottom: 24 }}
        />
      )}

      {isCancelledAndExpired && (
        <Alert
          type="error"
          showIcon
          icon={<WarningOutlined />}
          message={
            <div>
              <strong>Your subscription and grace period have ended.</strong>
              <div>Please subscribe to regain access to Thrico.</div>
            </div>
          }
          style={{ marginBottom: 24 }}
        />
      )}

      {isActivePaid && (
        <Alert
          type="success"
          showIcon
          message={
            <div>
              <strong>You're on an active plan: {subscription.planName}</strong>
              <div>Billing cycle: {subscription.billingCycle}</div>
            </div>
          }
          style={{ marginBottom: 24 }}
        />
      )}
    </>
  );
};

export default MyPlan;
