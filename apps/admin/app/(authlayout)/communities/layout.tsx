"use client";

import { Breadcrumb, Card, Tabs, TabsProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import MainBreadcrumb from "../../../screen/comman/BreadCrumb";
import { MdDashboard } from "react-icons/md";
import { CiSquareCheck } from "react-icons/ci";
import { RiEditCircleFill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import IconView from "../../../screen/comman/IconView";
import { FcFeedback } from "react-icons/fc";
import { FaListOl, FaRegCheckCircle } from "react-icons/fa";

function RootLayout({ children }: { children: React.ReactNode }) {
  const items: TabsProps["items"] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <IconView icon={MdDashboard} />,
    },
    {
      key: "approval",
      label: "Manage Approval",
      icon: <IconView icon={FaRegCheckCircle} />,
    },

    {
      key: "customization/sort",
      label: "Customization",
      icon: <IconView icon={RiEditCircleFill} />,
    },

    {
      key: "settings",
      label: "Settings",
      icon: <IconView icon={IoSettingsOutline} />,
    },
    {
      key: "feedback",
      label: "Voice of User",
      icon: <IconView icon={FcFeedback} />,
    },
  ];
  const router = useRouter();
  const onChange = (key: string) => {
    if (key === "dashboard") router.push(`/communities`);
    else router.push(`/communities/${key}`);
  };
  const pathname = usePathname();
  const activeTab = pathname.replace("/communities/", "");
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
