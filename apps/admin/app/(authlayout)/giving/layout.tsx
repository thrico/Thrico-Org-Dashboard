"use client";

import { Breadcrumb, Card, Tabs, TabsProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import MainBreadcrumb from "../../../screen/comman/BreadCrumb";

function RootLayout({ children }: { children: React.ReactNode }) {
  const items: TabsProps["items"] = [
    { key: "stories", label: "Stories" },

    { key: "category", label: "Category" },
    { key: "help", label: "Help" },
  ];
  const router = useRouter();
  const onChange = (key: string) => {
    if (key === "stories") router.push(`/alumni-stories`);
    else router.push(`/alumni-stories/${key}`);
  };
  const pathname = usePathname();
  const activeTab = pathname.replace("/stories", "");
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
