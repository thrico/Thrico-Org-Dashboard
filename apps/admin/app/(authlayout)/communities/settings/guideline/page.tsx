"use client";
import React, { useEffect, useState } from "react";
import { PopupEditor } from "../../../../../screen/comman/Editor";
import { Button, Card } from "antd";
import {
  getCommunityGuidelines,
  updateCommunityGuidelines,
} from "../../../../../graphql/actions/group/setting";

const page = () => {
  const [update, { loading }] = updateCommunityGuidelines();
  const { data, loading: loadContent } = getCommunityGuidelines();
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(data?.getCommunityGuidelines);
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
        <PopupEditor update={update} content={data?.getCommunityGuidelines} />
      )}
    </Card>
  );
};

export default page;
