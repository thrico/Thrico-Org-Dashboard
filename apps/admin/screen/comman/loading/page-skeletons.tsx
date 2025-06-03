"use client";

import { Layout, Row, Col, Card, Space, Tabs } from "antd";
import {
  CommunityCardSkeleton,
  TableRowSkeleton,
  PostSkeleton,
  StatsCardSkeleton,
  EventCardSkeleton,
  MemberCardSkeleton,
  FormSkeleton,
  SkeletonAvatar,
  SkeletonText,
  SkeletonButton,
} from "./skeleton-loader";

const { Header, Content } = Layout;
const { TabPane } = Tabs;

// Communities page skeleton
export function CommunitiesPageSkeleton() {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Mobile Header Skeleton */}
      <div className="mobile-header">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <SkeletonButton size="small" />
          <SkeletonText lines={1} width="150px" />
        </div>
        <SkeletonButton size="small" />
      </div>

      {/* Desktop Header Skeleton */}
      <Header
        className="desktop-only"
        style={{
          backgroundColor: "white",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <SkeletonText lines={1} width="200px" />
            <SkeletonButton />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ flex: 1, maxWidth: "384px" }}>
              <SkeletonButton style={{ width: "100%", height: "32px" }} />
            </div>
            <SkeletonButton style={{ width: "160px" }} />
          </div>
        </div>
      </Header>

      <Content
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "24px 16px 80px",
          width: "100%",
        }}
      >
        {/* Mobile Search Skeleton */}
        <div style={{ marginBottom: "16px" }} className="mobile-only">
          <div style={{ marginBottom: "12px" }}>
            <SkeletonButton style={{ width: "100%", height: "32px" }} />
          </div>
          <SkeletonButton style={{ width: "100%", height: "32px" }} />
        </div>

        {/* Tabs Skeleton */}
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              display: "flex",
              gap: "24px",
              borderBottom: "1px solid #f0f0f0",
              paddingBottom: "12px",
            }}
          >
            <SkeletonButton style={{ width: "120px" }} />
            <SkeletonButton style={{ width: "120px" }} />
            <SkeletonButton style={{ width: "120px" }} />
          </div>
        </div>

        {/* Communities Grid Skeleton */}
        <Row gutter={[16, 16]}>
          {Array.from({ length: 9 }).map((_, index) => (
            <Col key={index} xs={24} sm={12} lg={8}>
              <CommunityCardSkeleton />
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
}

// Community detail page skeleton
export function CommunityDetailSkeleton() {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Mobile Header Skeleton */}
      <div className="mobile-header">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <SkeletonButton size="small" />
          <SkeletonText lines={1} width="150px" />
        </div>
        <Space>
          <SkeletonButton size="small" />
          <SkeletonButton size="small" />
        </Space>
      </div>

      {/* Cover Image Skeleton */}
      <div
        style={{
          position: "relative",
          height: "192px",
          background: "linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)",
        }}
      />

      {/* Community Header Skeleton */}
      <div
        style={{
          position: "relative",
          backgroundColor: "white",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 16px" }}
        >
          <div style={{ display: "flex", alignItems: "flex-end", gap: "24px" }}>
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                backgroundColor: "#f0f0f0",
                marginTop: "-64px",
                border: "4px solid white",
              }}
            />

            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div>
                  <SkeletonText lines={1} width="300px" />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      marginBottom: "12px",
                    }}
                  >
                    <SkeletonText lines={1} width="100px" />
                    <SkeletonButton size="small" />
                    <SkeletonButton size="small" />
                  </div>
                  <SkeletonText lines={2} width="512px" />
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <SkeletonButton />
                  <SkeletonButton />
                  <SkeletonButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Content
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "24px 16px 80px",
          width: "100%",
        }}
      >
        {/* Tabs Skeleton */}
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              display: "flex",
              gap: "24px",
              borderBottom: "1px solid #f0f0f0",
              paddingBottom: "12px",
            }}
          >
            <SkeletonButton style={{ width: "80px" }} />
            <SkeletonButton style={{ width: "80px" }} />
            <SkeletonButton style={{ width: "80px" }} />
            <SkeletonButton style={{ width: "80px" }} />
          </div>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              {/* Create Post Skeleton */}
              <Card>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <SkeletonAvatar />
                  <div style={{ flex: 1 }}>
                    <SkeletonButton style={{ width: "100%", height: "32px" }} />
                  </div>
                  <SkeletonButton />
                </div>
              </Card>

              {/* Posts Skeleton */}
              {Array.from({ length: 3 }).map((_, index) => (
                <PostSkeleton key={index} />
              ))}
            </Space>
          </Col>

          <Col xs={24} lg={8} className="desktop-only">
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              {/* Community Info Skeleton */}
              <Card title={<SkeletonText lines={1} width="80px" />}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index}>
                      <SkeletonText lines={1} width="60px" />
                      <SkeletonText lines={1} width="120px" />
                    </div>
                  ))}
                </Space>
              </Card>

              {/* Tags Skeleton */}
              <Card title={<SkeletonText lines={1} width="60px" />}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <SkeletonButton
                      key={index}
                      size="small"
                      style={{ width: `${60 + index * 20}px` }}
                    />
                  ))}
                </div>
              </Card>
            </Space>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

// Manage community page skeleton
export function ManageCommunityPageSkeleton() {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Mobile Header Skeleton */}
      <div className="mobile-header">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <SkeletonButton size="small" />
          <SkeletonText lines={1} width="150px" />
        </div>
      </div>

      {/* Desktop Header Skeleton */}
      <Header
        className="desktop-only"
        style={{
          backgroundColor: "white",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <SkeletonAvatar size="large" />
            <div>
              <SkeletonText lines={1} width="200px" />
              <SkeletonText lines={1} width="150px" />
            </div>
          </div>
        </div>
      </Header>

      <Content
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "24px 16px 80px",
          width: "100%",
        }}
      >
        {/* Stats Overview Skeleton */}
        <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Col key={index} xs={12} sm={6}>
              <StatsCardSkeleton />
            </Col>
          ))}
        </Row>

        {/* Tabs Skeleton */}
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              display: "flex",
              gap: "24px",
              borderBottom: "1px solid #f0f0f0",
              paddingBottom: "12px",
            }}
          >
            <SkeletonButton style={{ width: "80px" }} />
            <SkeletonButton style={{ width: "80px" }} />
            <SkeletonButton style={{ width: "100px" }} />
            <SkeletonButton style={{ width: "80px" }} />
          </div>
        </div>

        {/* Tab Content Skeleton */}
        <Card>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {/* Table Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <SkeletonText lines={1} width="200px" />
              <SkeletonButton />
            </div>

            {/* Table Skeleton */}
            <div
              style={{
                border: "1px solid #f0f0f0",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#fafafa" }}>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <th
                        key={index}
                        style={{
                          padding: "16px",
                          textAlign: "left",
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        <SkeletonText lines={1} width="80px" />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <TableRowSkeleton key={index} columns={6} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Skeleton */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <SkeletonText lines={1} width="100px" />
              <div style={{ display: "flex", gap: "8px" }}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <SkeletonButton
                    key={index}
                    size="small"
                    style={{ width: "32px" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>
      </Content>
    </Layout>
  );
}

// Create community page skeleton
export function CreateCommunityPageSkeleton() {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Mobile Header Skeleton */}
      <div className="mobile-header">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <SkeletonButton size="small" />
          <SkeletonText lines={1} width="150px" />
        </div>
      </div>

      {/* Desktop Header Skeleton */}
      <Header
        className="desktop-only"
        style={{
          backgroundColor: "white",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{ maxWidth: "1024px", margin: "0 auto", padding: "0 16px" }}
        >
          <SkeletonText lines={1} width="250px" />
        </div>
      </Header>

      <Content
        style={{
          maxWidth: "1024px",
          margin: "0 auto",
          padding: "24px 16px 80px",
          width: "100%",
        }}
      >
        <Card>
          {/* Steps Skeleton */}
          <div style={{ marginBottom: "32px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "#f0f0f0",
                    }}
                  />
                  <SkeletonText lines={1} width="80px" />
                </div>
              ))}
            </div>
          </div>

          {/* Form Skeleton */}
          <div style={{ maxWidth: "512px", margin: "0 auto" }}>
            <FormSkeleton />
          </div>
        </Card>
      </Content>
    </Layout>
  );
}

// Events tab skeleton
export function EventsTabSkeleton() {
  return (
    <Row gutter={[16, 16]}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Col key={index} xs={24} md={12} lg={8}>
          <EventCardSkeleton />
        </Col>
      ))}
    </Row>
  );
}

// Members tab skeleton
export function MembersTabSkeleton() {
  return (
    <Row gutter={[16, 16]}>
      {Array.from({ length: 8 }).map((_, index) => (
        <Col key={index} xs={24} sm={12} md={8} lg={6}>
          <MemberCardSkeleton />
        </Col>
      ))}
    </Row>
  );
}

// Media tab skeleton
export function MediaTabSkeleton() {
  return (
    <Row gutter={[16, 16]}>
      {Array.from({ length: 12 }).map((_, index) => (
        <Col key={index} xs={12} sm={8} md={6} lg={4}>
          <Card hoverable>
            <div
              style={{
                height: "128px",
                backgroundColor: "#f0f0f0",
                marginBottom: "12px",
              }}
            />
            <SkeletonText lines={1} width="80%" />
          </Card>
        </Col>
      ))}
    </Row>
  );
}
