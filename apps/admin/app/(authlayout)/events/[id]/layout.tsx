"use client";
import React, { useState } from "react";
import { Card, Drawer, Tabs } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { Breadcrumb } from "antd/lib";

const tabItems = [
  { key: "general-info", label: "General Info" },
  { key: "hosts", label: "Hosts" },
  { key: "agenda", label: "Agenda" },
  { key: "speakers", label: "Speakers" },
  { key: "sponsors/tier", label: "Sponsorship" },
  // { key: "ticketing", label: "Ticketing" },
  { key: "venue/physical", label: "Venue" },
  { key: "attendees", label: "Attendees" },
  { key: "team", label: "Team" },
  // { key: "payment", label: "Payment" },
  // { key: "payment-tracking", label: "Payment Tracking" },
  // { key: "ticket-tracking", label: "Ticket Tracking" },
  { key: "media", label: "Media" },
  { key: "analytics", label: "Analytics" },
  { key: "settings", label: "Settings" },
];

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState<string>("general-info");

  const router = useRouter();
  const pathname = usePathname(); // e.g., /events/hosts

  const currentTab = pathname?.split("/")[2] || active;

  return (
    <Card title="Event Management" style={{ minHeight: "100vh" }}>
      <Drawer width={"100%"} open={true} closable={false}>
        <Breadcrumb />
        <div style={{ padding: 16 }}>
          <Tabs
            activeKey={pathname?.split("/")[3]}
            onChange={(key) => {
              router.push(`/events/sddsd/${key}`);
            }}
            items={tabItems.map((tab) => ({
              key: tab.key,
              label: tab.label,
            }))}
            tabBarGutter={20}
            className="custom-tabs"
          />
          <div style={{ paddingTop: 16 }}>{children}</div>
        </div>
      </Drawer>
    </Card>
  );
}
