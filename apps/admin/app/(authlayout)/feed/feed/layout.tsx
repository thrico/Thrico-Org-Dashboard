"use client";

import { Breadcrumb, Button, Card, Tabs, TabsProps } from "antd";
import { usePathname, useRouter } from "next/navigation";

import { MdDashboard } from "react-icons/md";
import { CiSquareCheck } from "react-icons/ci";
import { RiEditCircleFill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";

import { FcFeedback } from "react-icons/fc";
import { FaListOl, FaRegCheckCircle } from "react-icons/fa";
import IconView from "../../../../screen/comman/IconView";
import MainBreadcrumb from "../../../../screen/comman/BreadCrumb";
import { PositionType } from "antd/es/image/style";
import { useMemo } from "react";

function RootLayout({ children }: { children: React.ReactNode }) {
    const items: TabsProps["items"] = [
        {
            key: "all",
            label: "All",
            icon: <IconView icon={MdDashboard} />,
        },
        {
            key: "admin",
            label: "Admin",
            icon: <IconView icon={FaRegCheckCircle} />,
        },
        {
            key: "communities",
            label: "Communities",
            icon: <IconView icon={FaRegCheckCircle} />,
        },
        {
            key: "events",
            label: "Events",
            icon: <IconView icon={FaRegCheckCircle} />,
        },
        {
            key: "jobs",
            label: "Jobs",
            icon: <IconView icon={FaRegCheckCircle} />,
        },

        {
            key: "marketplace",
            label: "marketplace",
            icon: <IconView icon={FaRegCheckCircle} />,
        },
    ];
    const router = useRouter();
    const onChange = (key: string) => {
        if (key === "dashboard") router.push(`/communities`);
        else router.push(`/feed/feed/${key}`);
    };
    const pathname = usePathname();
    const activeTab = pathname.replace("/feed/feed/", "");
    type PositionType = 'left' | 'right';

    return (
        <>
            <Card extra="">
                <Tabs tabBarExtraContent={
                    <Button>Add Feed</Button>
                } defaultActiveKey={activeTab} items={items} onChange={onChange} />
                {children}
            </Card>
        </>
    );
}

export default RootLayout;
