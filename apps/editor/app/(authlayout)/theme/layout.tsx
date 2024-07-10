"use client";

import { Breadcrumb, Card, Tabs, TabsProps } from "antd";
import { usePathname, useRouter } from "next/navigation";

function RootLayout({ children }: { children: React.ReactNode }) {
  const items: TabsProps["items"] = [
    { key: "customize-theme", label: "Customize Theme" },

    { key: "header", label: "Navbar" },
    { key: "Footer", label: "Footer" },

    { key: "social-media", label: "Social Media" },
  ];
  const router = useRouter();
  const onChange = (key: string) => {
    if (key === "customize-theme") router.push(`/theme`);
    else router.push(`/theme/${key}`);
  };
  const pathname = usePathname();
  const activeTab = pathname.replace("/theme/", "");
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
