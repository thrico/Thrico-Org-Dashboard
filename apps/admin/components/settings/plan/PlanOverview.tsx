import {
  Card,
  Typography,
  Row,
  Col,
  Progress,
  Alert,
  Space,
  Tag,
  List,
  Flex,
  Button,
} from "antd";
import { getPlanOverview } from "../../../graphql/actions/plan";
import { Crown } from "lucide-react";
import moment from "moment";
import { getYearlySavings } from "./utils";
import YearlyUpgrade from "./upgradeYearly/YearlyUpgrade";

const { Title, Text } = Typography;

const PlanOverview = () => {
  const { data, loading } = getPlanOverview();
  const planOverview = data?.getPlanOverview;

  const title = (
    <Space>
      <Title level={3}>{planOverview?.planName}</Title>
      <Tag
        color={
          planOverview?.status === "active"
            ? "green"
            : planOverview?.status === "scheduled_upgrade"
              ? "blue"
              : planOverview?.status === "scheduled_downgrade"
                ? "orange"
                : planOverview?.status === "cancelled"
                  ? "red"
                  : planOverview?.status === "suspended"
                    ? "volcano"
                    : "default"
        }
      >
        {planOverview?.status}
      </Tag>
    </Space>
  );
  const description = (
    <>
      {planOverview?.status === "active" && (
        <>
          {planOverview?.subscriptionType === "trail" ? (
            <Text type="warning">
              You are currently on a trial. Your trial will end on{" "}
              {moment(
                planOverview?.nextPaymentDate || planOverview?.nextPaymentDate
              ).format("MMM Do YY")}
            </Text>
          ) : (
            <Text type="secondary">
              Your plan is active and will renew on{" "}
              {moment(planOverview?.nextPaymentDate).format("MMM Do YY")}.{" "}
              <br />
              <span>
                {planOverview?.subscriptionType === "paid" && (
                  <>
                    <strong>Billing Cycle:</strong>{" "}
                    {planOverview?.billingCycle?.charAt(0).toUpperCase() +
                      planOverview?.billingCycle?.slice(1)}
                  </>
                )}
              </span>
            </Text>
          )}
        </>
      )}
    </>
  );
  return (
    <>
      <Card
        loading={loading}
        style={{
          width: "100%",
          borderRadius: 10,
          minWidth: 600,
          marginBottom: 24,
        }}
      >
        <Row gutter={[16, 16]} align="middle">
          <Flex
            style={{ width: "100%" }}
            align="center"
            justify="space-between"
          >
            <List style={{ width: "70%" }}>
              <List.Item>
                <List.Item.Meta
                  avatar={<Crown />}
                  title={title}
                  description={description}
                />
              </List.Item>
            </List>
          </Flex>
          <Col span={8}>
            <Title level={4} style={{ color: "#1890ff", marginBottom: 0 }}>
              {planOverview?.userUsage?.used}/{planOverview?.userUsage?.limit}
            </Title>
            <Text>Team Members</Text>
          </Col>
          <Col span={8}>
            <Title level={4} style={{ color: "#1890ff", marginBottom: 0 }}>
              {planOverview?.adminUsers?.used}/{planOverview?.adminUsers?.limit}
            </Title>
            <Text>Admin Users</Text>
          </Col>
          <Col span={8}>
            <Title level={4} style={{ color: "#1890ff", marginBottom: 0 }}>
              {planOverview?.modulesUsed?.used}/
              {planOverview?.modulesUsed?.limit}
            </Title>
            <Text>Module Used</Text>
            <br />
          </Col>
        </Row>

        <div style={{ marginTop: 32 }}>
          <Text strong>Team Member Usage</Text>
          <Progress
            percent={
              planOverview?.userUsage?.used !== undefined &&
              planOverview?.userUsage?.limit
                ? (planOverview.userUsage.used / planOverview.userUsage.limit) *
                  100
                : 0
            }
            showInfo={false}
            strokeColor={
              planOverview?.userUsage?.used !== undefined &&
              planOverview?.userUsage?.limit
                ? (planOverview.userUsage.used / planOverview.userUsage.limit) *
                    100 >
                  80
                  ? "#ff4d4f"
                  : (planOverview.userUsage.used /
                        planOverview.userUsage.limit) *
                        100 >=
                      50
                    ? "#faad14"
                    : "#52c41a"
                : "#d9d9d9"
            }
          />

          {(() => {
            const percent =
              planOverview?.userUsage?.used !== undefined &&
              planOverview?.userUsage?.limit
                ? (planOverview.userUsage.used / planOverview.userUsage.limit) *
                  100
                : 0;
            if (percent > 80) {
              return (
                <Alert
                  style={{ marginTop: 8 }}
                  type="error"
                  showIcon
                  message={`You're at ${Math.round(percent)}% capacity (${planOverview?.userUsage?.used ?? 0}/${planOverview?.userUsage?.limit ?? 0}). Consider upgrading to avoid hitting limits.`}
                />
              );
            } else if (percent >= 50) {
              return (
                <Alert
                  style={{ marginTop: 8 }}
                  type="warning"
                  showIcon
                  message={`You're at ${Math.round(percent)}% capacity (${planOverview?.userUsage?.used ?? 0}/${planOverview?.userUsage?.limit ?? 0}).`}
                />
              );
            } else {
              return (
                <Alert
                  style={{ marginTop: 8 }}
                  type="success"
                  showIcon
                  message={`You're at ${Math.round(percent)}% capacity (${planOverview?.userUsage?.used ?? 0}/${planOverview?.userUsage?.limit ?? 0}).`}
                />
              );
            }
          })()}
        </div>

        {planOverview?.status === "active" &&
          planOverview.subscriptionType === "paid" &&
          planOverview?.billingCycle === "monthly" && (
            <YearlyUpgrade planOverview={planOverview} />
          )}
      </Card>
    </>
  );
};

export default PlanOverview;
