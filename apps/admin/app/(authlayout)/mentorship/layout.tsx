"use client";

import { Breadcrumb, Card, Tabs, TabsProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import MainBreadcrumb from "../../../screen/comman/BreadCrumb";

function RootLayout({ children }: { children: React.ReactNode }) {
  const items: TabsProps["items"] = [
    { key: "mentors", label: "Mentors" },
    { key: "mentees", label: "Mentees" },

    { key: "category", label: "Category" },
    { key: "skills", label: "Skills" },
    { key: "mentoring_guides", label: "Mentoring Guides" },
    { key: "settings", label: "Settings" },
    { key: "activity-log", label: "Activity Log" },
    { key: "feedback", label: "Feedback" },
    { key: "complaint", label: "Complaint" },
  ];
  const router = useRouter();
  const onChange = (key: string) => {
    if (key === "all") router.push(`/mentorship`);
    else router.push(`/mentorship/${key}`);
  };
  const pathname = usePathname();
  const activeTab = pathname.replace("/mentorship/", "");
  return (
    <>
      <MainBreadcrumb />
      <Card extra="">
        <Tabs defaultActiveKey={activeTab} items={items} onChange={onChange} />
        {children}
      </Card>
    </>
  );
}

export default RootLayout;
