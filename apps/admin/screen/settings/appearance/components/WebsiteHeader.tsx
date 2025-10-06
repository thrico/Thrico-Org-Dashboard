import React from "react";
import { Input, Button, Badge, Avatar, Typography, Spin } from "antd";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { GET_ORGANIZATION } from "../../../../graphql/quries";
import type { EntityTheme } from "../../../../store/ts-types";

const { Text } = Typography;

interface WebsiteHeaderProps {
  theme: EntityTheme;
}

const WebsiteHeader: React.FC<WebsiteHeaderProps> = ({ theme }) => {
  const { data, loading, error } = useQuery(GET_ORGANIZATION);

  if (loading) {
    return (
      <div
        style={{
          padding: "24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "24px",
          textAlign: "center",
          color: "#ff4d4f",
        }}
      >
        <Text>Error loading organization data: {error.message}</Text>
      </div>
    );
  }

  const organization = data?.getEntity;

  // Debug: Log the fetched data
  console.log("Organization data:", organization);

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.secondaryColor} 100%)`,
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            background: "rgba(255,255,255,0.2)",
            padding: "8px 12px",
            borderRadius: theme.borderRadius,
            backdropFilter: "blur(10px)",
          }}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: (theme.fontSize || 16) + 4,
              fontWeight: "bold",
              margin: 0,
            }}
          >
            {organization?.name || "Organization"}
          </Text>
        </div>
        <Button
          icon={<MenuOutlined />}
          type="text"
          style={{
            color: "#ffffff",
            borderRadius: theme.Button?.borderRadius,
          }}
        />
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {organization?.subscription && (
          <div
            style={{
              background: "rgba(255,255,255,0.2)",
              padding: "4px 8px",
              borderRadius: theme.borderRadius,
              backdropFilter: "blur(10px)",
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 12,
                textTransform: "uppercase",
                fontWeight: "500",
              }}
            >
              {organization.subscription.planName} -{" "}
              {organization.subscription.status}
            </Text>
          </div>
        )}
        <Input
          placeholder="Search community..."
          prefix={<SearchOutlined />}
          style={{
            width: 200,
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: theme.borderRadius,
            border: "none",
          }}
        />

        <Badge count={3}>
          <Avatar
            size={36}
            src={
              `https://cdn.thrico.network/${organization?.logo}` ||
              "https://via.placeholder.com/36"
            }
            style={{
              border: "2px solid rgba(255,255,255,0.3)",
            }}
          />
        </Badge>
      </div>

      {/* Debug: Display raw data */}
      {process.env.NODE_ENV === "development" && organization && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "rgba(0,0,0,0.8)",
            color: "#fff",
            padding: "16px",
            fontSize: "12px",
            fontFamily: "monospace",
            zIndex: 1000,
            maxHeight: "200px",
            overflow: "auto",
          }}
        >
          <div>
            <strong>Organization Data:</strong>
          </div>
          <div>ID: {organization.id}</div>
          <div>Name: {organization.name}</div>
          <div>Logo: {organization.logo || "No logo"}</div>
          {organization.subscription && (
            <div>
              <strong>Subscription:</strong>
              <div>Plan: {organization.subscription.planName}</div>
              <div>Type: {organization.subscription.planType}</div>
              <div>Status: {organization.subscription.status}</div>
              <div>Billing: {organization.subscription.billingCycle}</div>
              <div>Start: {organization.subscription.startDate}</div>
              <div>End: {organization.subscription.endDate}</div>
            </div>
          )}
          <div>
            <strong>Full Data:</strong>
          </div>
          <pre>{JSON.stringify(organization, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default WebsiteHeader;
