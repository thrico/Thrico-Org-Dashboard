"use client";

import { Spin } from "antd";
import {
  entitySettings,
  updateEntitySettings,
} from "../../../../graphql/actions";
import Settings from "../../../../components/discussion-forum/Settings";

const page = () => {
  const { data, loading } = entitySettings();
  const [update, { loading: loadingBtn }] = updateEntitySettings({});

  return (
    <>
      {!loading && (
        <Settings
          update={update}
          loading={loadingBtn}
          data={{
            allowDiscussionForum: data?.getEntitySettings?.allowDiscussionForum,
            autoApproveDiscussionForum:
              data?.getEntitySettings?.autoApproveDiscussionForum,
          }}
        />
      )}
      {loading && <Spin />}
    </>
  );
};

export default page;
