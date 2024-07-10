"use client";

import { Breadcrumb, Card, Tabs, TabsProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import IconView from "../../../../screen/comman/IconView";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FaSortAlphaDownAlt } from "react-icons/fa";

function RootLayout({ children }: { children: React.ReactNode }) {
  const items: TabsProps["items"] = [
    {
      key: "dropdown",
      label: "Dropdown",
      icon: <IconView icon={IoIosArrowDropdownCircle} />,
    },
    {
      key: "sort",
      label: "Sort",
      icon: <IconView icon={FaSortAlphaDownAlt} />,
    },
  ];
  const router = useRouter();
  const onChange = (key: string) => {
    if (key === "customization") router.push(`/communities/customization`);
    else router.push(`/communities/customization/${key}`);
  };
  const pathname = usePathname();
  const activeTab = pathname.replace("/communities/customization/", "");
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
