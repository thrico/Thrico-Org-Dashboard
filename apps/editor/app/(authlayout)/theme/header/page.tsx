"use client";

import React from "react";
import Header from "../../../../components/theme/header/Header";
import { getHeaderLinks } from "../../../../graphql/actions";

const page = () => {
  const { data, loading } = getHeaderLinks();
  return (
    <>
      {!loading && (
        <Header
          data={data?.getHeaderLinks.map((set) => ({
            key: set.id,
            name: set.name,
            link: set.link,
          }))}
          loading={loading}
        />
      )}
    </>
  );
};

export default page;
