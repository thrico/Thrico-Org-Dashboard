"use client";

import { Card, List, Tabs, TabsProps } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TermAndCondition from "../../../../screen/mentorship/settings/TermAndConditionMentor";
import { useCallback } from "react";
import TermAndConditionMentor from "../../../../screen/mentorship/settings/TermAndConditionMentor";
import TermAndConditionMentee from "../../../../screen/mentorship/settings/TermAndConditionMentee";

function RootLayout() {
  const items: TabsProps["items"] = [
    {
      key: "terms_and_conditions_mentor",
      label: "Term and Conditions Mentor",
      children: <TermAndConditionMentor />,
    },
    {
      key: "terms_and_conditions_mentee",
      label: "Term and Conditions Mentee",
      children: <TermAndConditionMentee />,
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
