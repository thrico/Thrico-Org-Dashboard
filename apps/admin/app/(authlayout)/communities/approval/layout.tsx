"use client";

import { Card, Tabs, TabsProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { FaRegCheckCircle, FaRegClock } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import IconView from "../../../../screen/comman/IconView";
import { MdBlockFlipped } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaRegCircleStop } from "react-icons/fa6";

function RootLayout({ children }: { children: React.ReactNode }) {
  const items: TabsProps["items"] = [
    {
      key: "all",
      label: "All",
      icon: <IconView icon={FaList} />,
    },
    {
      key: "approved",
      label: "Approved",
      icon: <IconView icon={FaRegCheckCircle} />,
    },
    {
      key: "pending",
      label: "Pending",
      icon: <IconView icon={FaRegClock} />,
    },
    {
      key: "rejected",
      label: "Rejected",
      icon: <IconView icon={IoMdCloseCircleOutline} />,
    },
    {
      key: "paused",
      label: "Paused",
      icon: <IconView icon={FaRegCircleStop} />,
    },

    {
      key: "blocked",
      label: "Blocked",
      icon: <IconView icon={MdBlockFlipped} />,
    },
  ];
  const router = useRouter();
  const onChange = (key: string) => {
    if (key === "all") router.push(`/communities/approval`);
    else router.push(`/communities/approval/${key}`);
  };
  const pathname = usePathname();
  const activeTab = pathname.replace("/communities/approval", "");
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
