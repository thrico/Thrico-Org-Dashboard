"use client";

import { Breadcrumb, Card, Tabs, TabsProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import IconView from "../../../../screen/comman/IconView";
import { LuPaintbrush2 } from "react-icons/lu";
import { MdOutlineInterests } from "react-icons/md";
import { IoMdTrendingUp } from "react-icons/io";
function RootLayout({ children }: { children: React.ReactNode }) {
  const items: TabsProps["items"] = [
    {
      key: "featured",
      label: "Featured",
    },
    {
      key: "trending",
      label: "trending",
      icon: <IconView icon={IoMdTrendingUp} />,
    },
  ];
  const router = useRouter();
  const onChange = (key: string) => {
    if (key === "customization") router.push(`/communities/listing`);
    else router.push(`/communities/listing/${key}`);
  };
  const pathname = usePathname();
  const activeTab = pathname.replace("/communities/listing/", "");
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
