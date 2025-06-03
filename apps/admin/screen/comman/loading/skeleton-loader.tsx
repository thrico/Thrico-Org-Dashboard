"use client";

import { Skeleton, Card, Space, Layout } from "antd";

const { Header, Content } = Layout;

// Basic skeleton components
export function SkeletonAvatar({
  size = "default",
}: {
  size?: "small" | "default" | "large";
}) {
  const avatarSize = size === "small" ? 32 : size === "large" ? 64 : 40;
  return <Skeleton.Avatar active size={avatarSize} />;
}

export function SkeletonText({
  lines = 2,
  width = "100%",
}: {
  lines?: number;
  width?: string | number;
}) {
  return <Skeleton active paragraph={{ rows: lines, width }} title={false} />;
}

export function SkeletonButton({
  size = "default",
}: {
  size?: "small" | "default" | "large";
}) {
  return <Skeleton.Button active size={size} />;
}

export function SkeletonImage({
  width = "100%",
  height = 200,
}: {
  width?: string | number;
  height?: number;
}) {
  return <Skeleton.Image active style={{ width, height }} />;
}

// Community card skeleton
export function CommunityCardSkeleton() {
  return (
    <Card>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Cover image */}
        <div
          style={{
            padding: "24px",
            textAlign: "center",
            background: "linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)",
          }}
        >
          <SkeletonAvatar size="large" />
        </div>

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Title and badges */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Skeleton active title={{ width: "60%" }} paragraph={false} />
            <Skeleton.Button active size="small" />
          </div>

          {/* Description */}
          <SkeletonText lines={2} />

          {/* Rating and category */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Skeleton.Button active size="small" style={{ width: 80 }} />
              <Skeleton.Button active size="small" style={{ width: 40 }} />
            </div>
            <Skeleton.Button active size="small" style={{ width: 80 }} />
          </div>

          {/* Members and activity */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Skeleton.Button active size="small" style={{ width: 60 }} />
            <Skeleton.Button active size="small" style={{ width: 80 }} />
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: "8px" }}>
            <Skeleton.Button active size="small" style={{ width: 60 }} />
            <Skeleton.Button active size="small" style={{ width: 80 }} />
            <Skeleton.Button active size="small" style={{ width: 40 }} />
          </div>
        </div>
      </div>
    </Card>
  );
}

// Table row skeleton
export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index} style={{ padding: "16px" }}>
          {index === 0 ? (
            // First column with avatar and text
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <SkeletonAvatar />
              <div style={{ flex: 1 }}>
                <Skeleton
                  active
                  title={{ width: "80%" }}
                  paragraph={{ rows: 1, width: "60%" }}
                />
              </div>
            </div>
          ) : index === columns - 1 ? (
            // Last column with action buttons
            <Space>
              <SkeletonButton size="small" />
              <SkeletonButton size="small" />
            </Space>
          ) : (
            // Other columns
            <Skeleton active title={{ width: "70%" }} paragraph={false} />
          )}
        </td>
      ))}
    </tr>
  );
}

// Post skeleton
export function PostSkeleton() {
  return (
    <Card>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <SkeletonAvatar />
        <div style={{ flex: 1 }}>
          <Skeleton
            active
            title={{ width: "40%" }}
            paragraph={{ rows: 1, width: "30%" }}
          />
        </div>
      </div>

      {/* Post content */}
      <SkeletonText lines={3} />

      {/* Post image */}
      <div style={{ marginTop: "16px", marginBottom: "16px" }}>
        <SkeletonImage height={200} />
      </div>

      {/* Actions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          paddingTop: "12px",
          borderTop: "1px solid #f0f0f0",
        }}
      >
        <SkeletonButton size="small" />
        <SkeletonButton size="small" />
        <SkeletonButton size="small" />
      </div>
    </Card>
  );
}

// Stats card skeleton
export function StatsCardSkeleton() {
  return (
    <Card>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Skeleton active title={{ width: "60%" }} paragraph={false} />
        <Skeleton active title={{ width: "40%" }} paragraph={false} />
      </div>
    </Card>
  );
}

// Event card skeleton
export function EventCardSkeleton() {
  return (
    <Card>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Skeleton active title={{ width: "80%" }} paragraph={false} />
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Skeleton.Button active size="small" style={{ width: 20 }} />
          <Skeleton active title={{ width: "60%" }} paragraph={false} />
        </div>
        <Skeleton active title={{ width: "50%" }} paragraph={false} />
        <Skeleton active title={{ width: "40%" }} paragraph={false} />
      </div>
    </Card>
  );
}

// Member card skeleton
export function MemberCardSkeleton() {
  return (
    <Card>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <SkeletonAvatar size="large" />
        <div>
          <Skeleton
            active
            title={{ width: "70%" }}
            paragraph={{ rows: 1, width: "50%" }}
          />
        </div>
        <SkeletonButton size="small" />
      </div>
    </Card>
  );
}

// Form skeleton
export function FormSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          style={{ display: "flex", flexDirection: "column", gap: "8px" }}
        >
          <Skeleton active title={{ width: "20%" }} paragraph={false} />
          <Skeleton.Input active />
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
        <SkeletonButton />
        <SkeletonButton />
      </div>
    </div>
  );
}
