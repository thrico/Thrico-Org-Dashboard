"use client";

import React, { useState } from "react";
import {
  Layout,
  Card,
  Typography,
  Button,
  Space,
  Checkbox,
  Modal,
  List,
  Alert,
} from "antd";
import { InfoCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { getEntity } from "../../../graphql/actions";
import Link from "next/link";

const { Title, Text } = Typography;
const { Content } = Layout;

export default function CurrentPlan() {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const showCancelModal = () => {
    setIsCancelModalOpen(true);
  };

  const handleCancel = () => {
    setIsCancelModalOpen(false);
  };

  const handleContinue = () => {
    // Handle the cancellation process
    setIsCancelModalOpen(false);
  };

  const { data, loading } = getEntity();
  return (
    <Layout
      style={{ minHeight: "100vh", background: "#f5f5f5", padding: "24px" }}
    >
      <Content>
        <Card style={{ maxWidth: "100%", margin: "0 auto" }}>
          <Title level={3} style={{ marginBottom: 24 }}>
            Plan details
          </Title>

          <Card style={{ marginBottom: 24 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Text strong style={{ fontSize: 18, marginRight: 16 }}>
                  Trial
                </Text>
                <Button type="primary">
                  {data?.getEntity?.trailEndDate &&
                  !isNaN(new Date(data.getEntity.trailEndDate).getTime())
                    ? Math.max(
                        0,
                        Math.ceil(
                          (new Date(data.getEntity.trailEndDate).getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24)
                        )
                      )
                    : "N/A"}{" "}
                  days remaining
                </Button>
              </div>

              <Space>
                <Button type="primary" ghost onClick={showCancelModal}>
                  Cancel trial
                </Button>
                <Link href="/settings/plan/select-plan">
                  <Button type="primary">Choose plan</Button>
                </Link>
              </Space>
            </div>
          </Card>

          <Text>
            View the <Link href="#">terms of service</Link> and{" "}
            <Link href="#">privacy policy</Link>
          </Text>
        </Card>
      </Content>

      <Modal
        title={"Cancel trial"}
        open={isCancelModalOpen}
        onCancel={handleCancel}
        footer={
          <div
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Checkbox
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
            >
              I've reviewed the information above
            </Checkbox>

            <Button
              type="primary"
              onClick={handleContinue}
              disabled={!isConfirmed}
            >
              Continue
            </Button>
          </div>
        }
        width={600}
        closable={true}
      >
        <div style={{ padding: "16px 0" }}>
          <Title level={4}>Avoid unwanted charges</Title>
          <List
            itemLayout="horizontal"
            split={false}
            dataSource={[
              "Cancel any app subscriptions you signed up for outside of Thrcio",
              <React.Fragment key="store-link">
                Cancel additional{" "}
                <Link href="#">stores connected to your account</Link>
              </React.Fragment>,
              <React.Fragment key="domain-link">
                Turn off automatic renewals for any{" "}
                <Link href="#">domains with Thrcio</Link>
              </React.Fragment>,
            ]}
            renderItem={(item) => (
              <List.Item style={{ padding: "8px 0" }}>
                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: 8, fontSize: 20 }}>•</div>
                  <div>{item}</div>
                </div>
              </List.Item>
            )}
          />
          <Title level={4} style={{ marginTop: 24 }}>
            Domains
          </Title>
          <Text>
            Any domains connected to your account will be disconnected if you
            cancel your plan. As well, all auto renewals will be turned off for
            any domains bought through Thrcio.
          </Text>
          <Title level={4} style={{ marginTop: 24 }}>
            Remember
          </Title>
          <Link href="#">Review steps</Link> to take before canceling, including
          exporting store data as CSV files
          <Alert
            icon={<InfoCircleOutlined />}
            message={
              <>
                If you need help, <Link href="#">contact support</Link>.
              </>
            }
            type="info"
            style={{ marginTop: 24 }}
          />
        </div>
      </Modal>
    </Layout>
  );
}
