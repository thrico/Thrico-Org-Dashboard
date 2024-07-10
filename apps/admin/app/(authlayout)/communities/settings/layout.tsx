"use client";

import { Breadcrumb, Card, Tabs, TabsProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import IconView from "../../../../screen/comman/IconView";
import {
  IoChatboxEllipsesOutline,
  IoDocumentTextOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { MdOutlineDocumentScanner } from "react-icons/md";

function RootLayout({ children }: { children: React.ReactNode }) {
  const items: TabsProps["items"] = [
    {
      key: "settings",
      label: "Settings",
      icon: <IconView icon={IoSettingsOutline} />,
    },
    {
      key: "guideline",
      label: "Guideline",
      icon: <IconView icon={MdOutlineDocumentScanner} />,
    },
    {
      key: "term_and_conditions",
      label: "Term and Conditions",
      icon: <IconView icon={IoDocumentTextOutline} />,
    },
    {
      key: "faq",
      label: "FAQ",
      icon: <IconView icon={IoChatboxEllipsesOutline} />,
    },
  ];
  const router = useRouter();
  const onChange = (key: string) => {
    if (key === "settings") router.push(`/communities/settings`);
    else router.push(`/communities/settings/${key}`);
  };
  const pathname = usePathname();
  const activeTab = pathname.replace("/communities/settings/", "");
  return (
    <>
      <Card extra="">
        <Tabs defaultActiveKey={activeTab} items={items} onChange={onChange} />
        {children}
      </Card>
    </>
  );
}

export default RootLayout;
