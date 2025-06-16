"use client";

import { useState } from "react";
import { Card, Typography, Button, Space, List, theme } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { checkEntitySubscription, getEntity } from "../../graphql/actions";
import moment from "moment";

export default function TrialBanner() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Data for the list items
  const items = [
    { content: "Unlimited team members" },
    { content: "All features unlocked" },
    { content: "Priority support" },
  ];
  const { token } = theme.useToken();
  const { colorPrimary } = token;

  const { data } = checkEntitySubscription();

  const subscription = data?.checkEntitySubscription;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: "100%",
        maxWidth: 250,
        zIndex: 1000,
      }}
    >
      {subscription?.subscriptionType === "trial" && (
        <Card
          style={{
            backgroundColor: colorPrimary,
            borderRadius: 12,
            border: isExpanded ? "1px solid #1890ff" : "1px solid transparent",
          }}
          styles={{ body: { padding: isExpanded ? 20 : "8px 10px" } }}
        >
          <div
            onClick={toggleExpand}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Typography.Text style={{ color: "white", fontSize: 13 }}>
              {data?.checkEntitySubscription?.endDate &&
              !isNaN(new Date(data?.checkEntitySubscription?.endDate).getTime())
                ? Math.max(
                    0,
                    Math.ceil(
                      (new Date(
                        data?.checkEntitySubscription?.endDate
                      ).getTime() -
                        new Date().getTime()) /
                        (1000 * 60 * 60 * 24)
                    )
                  )
                : "N/A"}{" "}
              days left in your trial
            </Typography.Text>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#333",
                borderRadius: 8,
                width: 25,
                height: 25,
              }}
            >
              {isExpanded ? (
                <DownOutlined style={{ color: "white" }} />
              ) : (
                <UpOutlined style={{ color: "white" }} />
              )}
            </div>
          </div>

          {isExpanded && (
            <div style={{ marginTop: 16, animation: "antFadeIn 0.3s" }}>
              <Typography.Text
                style={{
                  color: "white",
                  fontSize: 15,
                  display: "block",
                  marginBottom: 16,
                }}
              >
                Your trial ends on{" "}
                <Typography.Text strong style={{ color: "white" }}>
                  {moment(data?.checkEntitySubscription?.endDate).format(
                    "DD MMM YYYY"
                  )}
                </Typography.Text>
              </Typography.Text>

              <Typography.Text
                style={{
                  color: "white",
                  fontSize: 15,
                  display: "block",
                  marginBottom: 12,
                }}
              >
                Select a plan and get:
              </Typography.Text>

              <List
                itemLayout="horizontal"
                dataSource={items}
                renderItem={(item) => (
                  <List.Item style={{ border: "none", padding: "4px 0" }}>
                    <Space>
                      <div
                        style={{
                          color: "white",
                          fontSize: 20,
                          lineHeight: "24px",
                        }}
                      >
                        •
                      </div>
                      <Typography.Text style={{ color: "white" }}>
                        {item.content}
                      </Typography.Text>
                    </Space>
                  </List.Item>
                )}
              />

              <Button
                type="primary"
                block
                style={{
                  marginTop: 20,

                  backgroundColor: "white",
                  color: "#1a1a1a",
                }}
                href="/settings/plan"
              >
                Select a plan
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
