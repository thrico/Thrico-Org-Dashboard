"use client";
import * as React from "react";
import { Card, Tabs, TabsProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import MainBreadcrumb from "../../../screen/comman/BreadCrumb";
import { TbHistory } from "react-icons/tb";
import { FaBullhorn } from "react-icons/fa";
function RootLayout({ children }: { children: React.ReactNode }) {
  const items: TabsProps["items"] = [
    {
      key: "announcements",
      label: "Announcements",
      icon: <FaBullhorn />,
    },
    {
      key: "highlights",
      label: "Highlight",
      icon: <TbHistory />,
    },
  ];
  const router = useRouter();
  const onChange = (key: string) => {
    if (key === "announcements") router.push(`/announcements`);
    else router.push(`/announcements/${key}`);
  };
  const pathname = usePathname();
  const activeTab = pathname.replace("/announcements/", "");
  return (
    <>
      <MainBreadcrumb />
      <Card extra="">
        <Tabs defaultActiveKey={activeTab} items={items} onChange={onChange} />
        {children}
      </Card>
    </>
  );
}

export default RootLayout;
