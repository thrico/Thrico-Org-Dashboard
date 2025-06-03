"use client";

import React from "react";
import Manage from "../../../../../components/communities/settings/Manage";
import { Drawer } from "antd";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { getCommunityById } from "../../../../../graphql/actions/group";
import { ManageCommunityPageSkeleton } from "../../../../../screen/comman/loading/page-skeletons";

const manage = () => {
  const router = useRouter();
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
      {loading && <ManageCommunityPageSkeleton />}
      {!loading && (
        <Drawer
          title="Community Management"
          width={"100%"}
          onClose={() => router.back()}
          open={true}
        >
          <Manage data={data?.getCommunityById} />
        </Drawer>
      )}
    </>
  );
};

export default manage;
