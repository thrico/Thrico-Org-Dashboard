"use client";

import { Breadcrumb, Card, Menu, Tabs, TabsProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import MainBreadcrumb from "../../../screen/comman/BreadCrumb";
import { MdDashboard } from "react-icons/md";

import { IoSettingsOutline } from "react-icons/io5";
import IconView from "../../../screen/comman/IconView";
import { FaRegCheckCircle } from "react-icons/fa";

function RootLayout({ children }: { children: React.ReactNode }) {
  const items: TabsProps["items"] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <IconView icon={MdDashboard} />,
    },
    {
      key: "all",
      label: "listing",
      icon: <IconView icon={FaRegCheckCircle} />,
    },

    {
      key: "reports",
      label: "Report",
      icon: <IconView icon={IoSettingsOutline} />,
    },
    {
      key: "audit-logs",
      icon: <IconView icon={IoSettingsOutline} />,
      label: "Audit Logs",
    },
    {
      key: "analytics",
      icon: <IconView icon={IoSettingsOutline} />,
      label: "Analytics",
    },
    {
      key: "terms",
      icon: <IconView icon={IoSettingsOutline} />,
      label: "Terms & Conditions",
    },
    {
      key: "settings",
      label: "Settings",
      icon: <IconView icon={IoSettingsOutline} />,
    },
  ];
  const router = useRouter();
  const onChange = ({ key }: any) => {
    if (key === "dashboard") router.push(`/listing`);
    else router.push(`/listing/${key}`);
  };
  const pathname = usePathname();
  const activeTab = pathname.replace("/feed/", "");
  return (
    <>
      <MainBreadcrumb />
      <Card extra="">
        {/* <Tabs defaultActiveKey={activeTab} items={items} onChange={onChange} /> */}
        <Menu onClick={onChange} mode="horizontal" items={items} />
        {children}
      </Card>
    </>
  );
}

export default RootLayout;
