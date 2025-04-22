"use client";

import React, { useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import { Divider, Layout, List, Skeleton } from "antd";
import { Content } from "antd/es/layout/layout";
import { getAllFeed, numberOfFeeds } from "../../graphql/actions/feed";
import Feed from "./Feed";
export default function AdminFeed() {
  const [hasMore, setHasMore] = useState(true);

  const { data, loading, fetchMore } = getAllFeed({
    variables: {
      input: {
        offset: 0,
        limit: 10,
      },
    },
  });
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const loadMoreData = async () => {
    if (isFetchingMore || loading) return;
    setIsFetchingMore(true);
    try {
      const { data: fetchMoreResult } = await fetchMore({
        variables: {
          input: {
            offset: data?.getAllFeed?.length,
            limit: 10,
          },
        },
        updateQuery(prev, { fetchMoreResult, variables }) {
          if (!fetchMoreResult || fetchMoreResult?.getAllFeed?.length === 0) {
            setHasMore(false);
            return prev;
          } else {
            return Object.assign({}, prev, {
              getAllFeed: [...prev.getAllFeed, ...fetchMoreResult.getAllFeed],
            });
          }
        },
      });
    } finally {
      setIsFetchingMore(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <div
        id="scrollableDiv"
        style={{
          height: 800,
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <InfiniteScroll
          dataLength={data?.getAllFeed?.length || 0}
          next={loadMoreData}
          hasMore={hasMore}
          loader={
            isFetchingMore ? (
              <Skeleton avatar paragraph={{ rows: 1 }} active />
            ) : null
          }
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data?.getAllFeed}
            renderItem={(item) => <Feed feed={item} />}
          />
        </InfiniteScroll>
      </div>
    </Layout>
  );
}
