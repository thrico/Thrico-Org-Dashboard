"use client";

import { Button, Card, Tabs, TabsProps } from "antd";
import { usePathname, useRouter } from "next/navigation";

import { MdDashboard, MdGroup } from "react-icons/md";

import { FaRegCheckCircle } from "react-icons/fa";
import IconView from "../../../../screen/comman/IconView";
import PostModal from "../../../../components/feed/add/AddFeed";
import { numberOfFeeds } from "../../../../graphql/actions/feed";
import { RiAdminLine } from "react-icons/ri";
import { CalendarOutlined } from "@ant-design/icons";
import { GrUserWorker } from "react-icons/gr";
import { HiOutlineShoppingBag } from "react-icons/hi";

function RootLayout({ children }: { children: React.ReactNode }) {
  const { data: feed } = numberOfFeeds();
  const items: TabsProps["items"] = [
    {
      key: "all",
      label: `All(${feed?.numberOfFeeds})`,
      icon: <IconView icon={RiAdminLine} />,
    },
    {
      key: "admin",
      label: "By Admin",
      icon: <IconView icon={RiAdminLine} />,
    },
    {
      key: "communities",
      label: "Communities",
      icon: <IconView icon={MdGroup} />,
    },
    {
      key: "events",
      label: "Events",
      icon: <IconView icon={CalendarOutlined} />,
    },
    {
      key: "jobs",
      label: "Jobs",
      icon: <IconView icon={GrUserWorker} />,
    },

    {
      key: "marketplace",
      label: "Marketplace",
      icon: <IconView icon={HiOutlineShoppingBag} />,
    },
  ];
  const router = useRouter();
  const onChange = (key: string) => {
    router.push(`/feed/${key}`);
  };
  const pathname = usePathname();
  const activeTab = pathname.replace("/feed/all", "");
  type PositionType = "left" | "right";

  return (
    <>
      <Card>
        <Tabs
          tabBarExtraContent={<PostModal />}
          defaultActiveKey={activeTab}
          items={items}
          onChange={onChange}
        />
        {children}
      </Card>
    </>
  );
}

export default RootLayout;
