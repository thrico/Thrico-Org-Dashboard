"use client";
import React from "react";
import { useListings } from "../../../../graphql/actions/listing";
import TableLoading from "../../../../components/skeleton/TableLoading";
import Listing from "../../../../components/listing/Listing";

const page = () => {
  const { data, error, loading } = useListings({
    variables: {
      input: {
        status: "ALL",
      },
    },
  });
  return (
    <>
      {loading && <TableLoading />}
      <Listing data={data?.getListing} />
    </>
  );
};

export default page;
