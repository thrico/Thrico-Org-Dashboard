"use client";
import React, { useEffect, useState } from "react";

import { Button, Card } from "antd";
import {
  getCommunityTermAndConditions,
  updateCommunityTermAndConditions,
} from "../../../../../graphql/actions/group/setting";
import { PopupEditor } from "../../../../../screen/comman/editor/Editor";

const page = () => {
  const [update, { loading }] = updateCommunityTermAndConditions();
  const { data, loading: loadContent } = getCommunityTermAndConditions();
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(data?.getCommunityTermAndConditions);
  }, [data]);

  return (
    <Card
      extra={
        <Button type="primary" loading={loading}>
          Save
        </Button>
      }
    >
      {!loadContent && (
        <PopupEditor
          update={update}
          content={data?.getCommunityTermAndConditions}
        />
      )}
    </Card>
  );
};

export default page;
