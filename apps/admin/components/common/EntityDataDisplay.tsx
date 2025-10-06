import React from "react";
import {
  Card,
  Row,
  Col,
  Spin,
  Alert,
  Typography,
  Tag,
  Descriptions,
  Avatar,
} from "antd";
import { useQuery } from "@apollo/client";
import {
  GET_ORGANIZATION,
  GET_USER,
  GET_ENTITY_SETTINGS,
  CHECK_ENTITY_SUBSCRIPTIONS,
} from "../../graphql/quries";

const { Title, Text } = Typography;

const EntityDataDisplay: React.FC = () => {
  // Fetch organization data
  const {
    data: orgData,
    loading: orgLoading,
    error: orgError,
  } = useQuery(GET_ORGANIZATION);

  // Fetch user data
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_USER);

  // Fetch entity settings
  const {
    data: settingsData,
    loading: settingsLoading,
    error: settingsError,
  } = useQuery(GET_ENTITY_SETTINGS);

  // Fetch subscription data
  const {
    data: subscriptionData,
    loading: subscriptionLoading,
    error: subscriptionError,
  } = useQuery(CHECK_ENTITY_SUBSCRIPTIONS);

  if (orgLoading || userLoading || settingsLoading || subscriptionLoading) {
    return (
      <div style={{ padding: "24px", textAlign: "center" }}>
        <Spin size="large" />
        <div style={{ marginTop: "16px" }}>
          <Text>Loading entity data...</Text>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {orgData?.getEntity?.logo && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Avatar
              src={orgData.getEntity.logo}
              size={64}
              style={{ border: "2px solid #1890ff" }}
            />
            <div>
              <Text strong style={{ display: "block" }}>
                {orgData.getEntity.name}
              </Text>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                Organization Logo
              </Text>
            </div>
          </div>
        )}
      </div>

      {/* Logo Preview Section */}
      {orgData?.getEntity?.logo && (
        <Card
          title="Organization Logo Preview"
          style={{ marginBottom: "16px" }}
        >
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={8} md={6}>
              <div style={{ textAlign: "center" }}>
                <Avatar
                  src={orgData.getEntity.logo}
                  size={120}
                  style={{ border: "3px solid #1890ff", marginBottom: "8px" }}
                />
                <div>
                  <Text strong>{orgData.getEntity.name}</Text>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={16} md={18}>
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Logo URL">
                  <Text
                    copyable
                    style={{ fontSize: "12px", wordBreak: "break-all" }}
                  >
                    {orgData.getEntity.logo}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label="Preview Sizes">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <Avatar src={orgData.getEntity.logo} size={24} />
                      <div style={{ fontSize: "10px", marginTop: "2px" }}>
                        24px
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <Avatar src={orgData.getEntity.logo} size={32} />
                      <div style={{ fontSize: "10px", marginTop: "2px" }}>
                        32px
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <Avatar src={orgData.getEntity.logo} size={48} />
                      <div style={{ fontSize: "10px", marginTop: "2px" }}>
                        48px
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <Avatar src={orgData.getEntity.logo} size={64} />
                      <div style={{ fontSize: "10px", marginTop: "2px" }}>
                        64px
                      </div>
                    </div>
                  </div>
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Card>
      )}

      <Row gutter={[16, 16]}>
        {/* Organization Data */}
        <Col xs={24} lg={12}>
          <Card title="Organization Information" size="small">
            {orgError ? (
              <Alert
                message="Error loading organization data"
                description={orgError.message}
                type="error"
              />
            ) : orgData?.getEntity ? (
              <Descriptions column={1} size="small">
                <Descriptions.Item label="ID">
                  {orgData.getEntity.id}
                </Descriptions.Item>
                <Descriptions.Item label="Name">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    {orgData.getEntity.logo && (
                      <Avatar src={orgData.getEntity.logo} size={48} />
                    )}
                    <Text strong style={{ fontSize: "16px" }}>
                      {orgData.getEntity.name}
                    </Text>
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Logo">
                  {orgData.getEntity.logo ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <Avatar src={orgData.getEntity.logo} size={32} />
                      <div>
                        <Text style={{ display: "block", fontSize: "12px" }}>
                          {orgData.getEntity.logo}
                        </Text>
                        <Tag color="green">Available</Tag>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Avatar
                        size={32}
                        style={{ backgroundColor: "#f5f5f5", color: "#999" }}
                      >
                        ?
                      </Avatar>
                      <Tag color="orange">No logo</Tag>
                    </div>
                  )}
                </Descriptions.Item>
                {orgData.getEntity.subscription && (
                  <>
                    <Descriptions.Item label="Subscription">
                      <Tag
                        color={
                          orgData.getEntity.subscription.status === "active"
                            ? "green"
                            : "orange"
                        }
                      >
                        {orgData.getEntity.subscription.planName} -{" "}
                        {orgData.getEntity.subscription.status}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Plan Type">
                      {orgData.getEntity.subscription.planType}
                    </Descriptions.Item>
                    <Descriptions.Item label="Billing Cycle">
                      {orgData.getEntity.subscription.billingCycle}
                    </Descriptions.Item>
                  </>
                )}
              </Descriptions>
            ) : (
              <Text type="secondary">No organization data available</Text>
            )}
          </Card>
        </Col>

        {/* User Data */}
        <Col xs={24} lg={12}>
          <Card title="User Information" size="small">
            {userError ? (
              <Alert
                message="Error loading user data"
                description={userError.message}
                type="error"
              />
            ) : userData?.getUser ? (
              <Descriptions column={1} size="small">
                <Descriptions.Item label="ID">
                  {userData.getUser.id}
                </Descriptions.Item>
                <Descriptions.Item label="Name">
                  {userData.getUser.firstName} {userData.getUser.lastName}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {userData.getUser.email}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Tag
                    color={
                      userData.getUser.status === "active" ? "green" : "orange"
                    }
                  >
                    {userData.getUser.status}
                  </Tag>
                </Descriptions.Item>
              </Descriptions>
            ) : (
              <Text type="secondary">No user data available</Text>
            )}
          </Card>
        </Col>

        {/* Entity Settings */}
        <Col xs={24} lg={12}>
          <Card title="Entity Settings" size="small">
            {settingsError ? (
              <Alert
                message="Error loading settings data"
                description={settingsError.message}
                type="error"
              />
            ) : settingsData?.getEntitySettings ? (
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Auto Approve Users">
                  <Tag
                    color={
                      settingsData.getEntitySettings.autoApproveUser
                        ? "green"
                        : "red"
                    }
                  >
                    {settingsData.getEntitySettings.autoApproveUser
                      ? "Yes"
                      : "No"}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Auto Approve Groups">
                  <Tag
                    color={
                      settingsData.getEntitySettings.autoApproveGroup
                        ? "green"
                        : "red"
                    }
                  >
                    {settingsData.getEntitySettings.autoApproveGroup
                      ? "Yes"
                      : "No"}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Auto Approve Events">
                  <Tag
                    color={
                      settingsData.getEntitySettings.autoApproveEvents
                        ? "green"
                        : "red"
                    }
                  >
                    {settingsData.getEntitySettings.autoApproveEvents
                      ? "Yes"
                      : "No"}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Allow New Users">
                  <Tag
                    color={
                      settingsData.getEntitySettings.allowNewUser
                        ? "green"
                        : "red"
                    }
                  >
                    {settingsData.getEntitySettings.allowNewUser ? "Yes" : "No"}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Allow Discussion Forum">
                  <Tag
                    color={
                      settingsData.getEntitySettings.allowDiscussionForum
                        ? "green"
                        : "red"
                    }
                  >
                    {settingsData.getEntitySettings.allowDiscussionForum
                      ? "Yes"
                      : "No"}
                  </Tag>
                </Descriptions.Item>
              </Descriptions>
            ) : (
              <Text type="secondary">No settings data available</Text>
            )}
          </Card>
        </Col>

        {/* Subscription Details */}
        <Col xs={24} lg={12}>
          <Card title="Subscription Details" size="small">
            {subscriptionError ? (
              <Alert
                message="Error loading subscription data"
                description={subscriptionError.message}
                type="error"
              />
            ) : subscriptionData?.checkEntitySubscription ? (
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Plan">
                  {subscriptionData.checkEntitySubscription.planName}
                </Descriptions.Item>
                <Descriptions.Item label="Type">
                  {subscriptionData.checkEntitySubscription.planType}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Tag
                    color={
                      subscriptionData.checkEntitySubscription.status ===
                      "active"
                        ? "green"
                        : "orange"
                    }
                  >
                    {subscriptionData.checkEntitySubscription.status}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Billing Cycle">
                  {subscriptionData.checkEntitySubscription.billingCycle}
                </Descriptions.Item>
                <Descriptions.Item label="Start Date">
                  {new Date(
                    subscriptionData.checkEntitySubscription.startDate
                  ).toLocaleDateString()}
                </Descriptions.Item>
                <Descriptions.Item label="End Date">
                  {new Date(
                    subscriptionData.checkEntitySubscription.endDate
                  ).toLocaleDateString()}
                </Descriptions.Item>
                {subscriptionData.checkEntitySubscription.modules && (
                  <Descriptions.Item label="Modules">
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}
                    >
                      {subscriptionData.checkEntitySubscription.modules.map(
                        (module: any) => (
                          <Tag key={module.id} color="blue">
                            {module.name}
                          </Tag>
                        )
                      )}
                    </div>
                  </Descriptions.Item>
                )}
              </Descriptions>
            ) : (
              <Text type="secondary">No subscription data available</Text>
            )}
          </Card>
        </Col>
      </Row>

      {/* Raw Data Display (Development Only) */}
      {process.env.NODE_ENV === "development" && (
        <Card title="Raw Data (Development Mode)" style={{ marginTop: "16px" }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Text strong>Organization Data:</Text>
              <pre
                style={{
                  background: "#f5f5f5",
                  padding: "8px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  overflow: "auto",
                  maxHeight: "200px",
                }}
              >
                {JSON.stringify(orgData, null, 2)}
              </pre>
            </Col>
            <Col xs={24} md={12}>
              <Text strong>User Data:</Text>
              <pre
                style={{
                  background: "#f5f5f5",
                  padding: "8px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  overflow: "auto",
                  maxHeight: "200px",
                }}
              >
                {JSON.stringify(userData, null, 2)}
              </pre>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
};

export default EntityDataDisplay;
