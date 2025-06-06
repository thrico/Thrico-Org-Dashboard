"use client";

import { Drawer, Tabs, TabsProps } from "antd";
import { useParams, usePathname, useRouter } from "next/navigation";
import { getCommunityById } from "../../../../../graphql/actions/group";
import CommunityDetails from "../../../../../components/communities/details/Details";

function RootLayout({ children }: { children: React.ReactNode }) {
  const items: TabsProps["items"] = [
    {
      key: "discussion",
      label: "Discussion",
      //   icon: <MessageCircleOffIcon />,
    },

    {
      key: "rating",
      label: "Rating",
      //   icon: <StarOutlined />,
    },
    {
      key: "about",
      label: "About",
      //   icon: <CheckCircleOutlined />,
    },
  ];
  const router = useRouter();
  const onChange = (key: string) => {
    router.push(`${key}`);
  };
  const pathname = usePathname();
  const activeTab = pathname.replace("/communities/all", "");

  const params = useParams();
  const id = params?.id;

  // Replace with your actual data fetching logic
  const { data, loading } = getCommunityById({
    variables: {
      input: {
        communityId: id,
      },
    },
  });
  return (
    <>
      <Drawer
        title="Community Management"
        width={"100%"}
        onClose={() => router.back()}
        open={true}
      >
        {!loading && <CommunityDetails data={data?.getCommunityById} />}

        <div style={{ margin: "20px 40px 0 40px" }}>
          <Tabs
            defaultActiveKey={activeTab}
            items={items}
            onChange={onChange}
          />
          {children}
          ddsds
        </div>
      </Drawer>
    </>
  );
}

export default RootLayout;
