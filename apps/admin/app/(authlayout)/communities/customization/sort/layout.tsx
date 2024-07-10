"use client";

import { Breadcrumb, Card, Flex, Space, Tabs, TabsProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import IconView from "../../../../../screen/comman/IconView";
import { PiListStarBold } from "react-icons/pi";
import { IoMdTrendingUp } from "react-icons/io";
function RootLayout({ children }: { children: React.ReactNode }) {
  const items: TabsProps["items"] = [
    {
      key: "featured",
      label: "Featured",
      icon: <IconView icon={PiListStarBold} />,
    },
    {
      key: "trending",
      label: "Trending",
      icon: <IconView icon={IoMdTrendingUp} />,
    },
  ];
  const router = useRouter();
  const onChange = (key: string) => {
    if (key === "customization") router.push(`/communities/customization/sort`);
    else router.push(`/communities/customization/sort/${key}`);
  };
  const pathname = usePathname();
  const activeTab = pathname.replace(
    "/communities/customization/dropdown/",
    ""
  );
  return (
    <>
      <Card extra="">
        <Flex>
          <Tabs
            tabPosition="right"
            defaultActiveKey={activeTab}
            items={items}
            onChange={onChange}
          />
          <Flex style={{ width: "80%" }}>{children}</Flex>
        </Flex>
      </Card>
    </>
  );
}

export default RootLayout;
