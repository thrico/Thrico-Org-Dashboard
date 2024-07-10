"use client";

import { Breadcrumb, Card, Flex, Space, Tabs, TabsProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import IconView from "../../../../../screen/comman/IconView";
import { LuPaintbrush2 } from "react-icons/lu";
import { MdOutlineInterests } from "react-icons/md";

function RootLayout({ children }: { children: React.ReactNode }) {
  const items: TabsProps["items"] = [
    { key: "theme", label: "Theme", icon: <IconView icon={LuPaintbrush2} /> },
    {
      key: "interest",
      label: "Interests",
      icon: <IconView icon={MdOutlineInterests} />,
    },
  ];
  const router = useRouter();
  const onChange = (key: string) => {
    if (key === "customization")
      router.push(`/communities/customization/dropdown`);
    else router.push(`/communities/customization/dropdown/${key}`);
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
