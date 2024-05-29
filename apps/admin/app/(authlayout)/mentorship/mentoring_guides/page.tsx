"use client";

import { Card, List, Tabs, TabsProps } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TermAndCondition from "../../../../screen/mentorship/settings/TermAndConditionMentor";
import { useCallback } from "react";
import {
  AlertOutlined,
  BookOutlined,
  CarOutlined,
  EditOutlined,
  GoldOutlined,
  MessageOutlined,
  StarOutlined,
  StepBackwardOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

function RootLayout() {
  const items: TabsProps["items"] = [
    {
      key: "your-first-steps",
      label: "Your first steps as a mentor",
      children: <TermAndCondition />,
      icon: <StepBackwardOutlined />,
    },
    {
      key: "responsibilities-of-a-mentor",
      label: "Responsibilities of a mentor",
      children: <TermAndCondition />,
      icon: <CarOutlined />,
    },
    {
      key: "getting-your-first-mentees",
      label: "Getting your first mentees",
      children: <TermAndCondition />,
      icon: <StarOutlined />,
    },

    {
      key: "evaluating-mentee-requests",
      label: "Getting to know potential mentees",
      children: <TermAndCondition />,
      icon: <MessageOutlined />,
    },
    {
      key: "navigating-the-trial",
      label: "Making the most of the trial",
      children: <TermAndCondition />,
      icon: <TrophyOutlined />,
    },
    {
      key: "running-productive-mentorship",
      label: "Running productive mentorship",
      children: <TermAndCondition />,
      icon: <GoldOutlined />,
    },
    {
      key: "troubleshooting-mentorship",
      label: "Troubleshooting mentorship",
      children: <TermAndCondition />,
      icon: <AlertOutlined />,
    },
    {
      key: "Improve Guidess",
      label: "Improve Guides",
      children: <TermAndCondition />,
      icon: <EditOutlined />,
    },

    {
      key: "resources,",
      label: "Resources",
      children: <TermAndCondition />,
      icon: <BookOutlined />,
    },
  ];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const onChange = (key: string) => {
    router.push(pathname + "?" + createQueryString("tab", key));
  };
  const activeTab = searchParams.get("tab");
  return (
    <Card extra="">
      <Tabs
        defaultActiveKey={activeTab}
        onChange={onChange}
        tabPosition="left"
        items={items}
      />
    </Card>
  );
}

export default RootLayout;
