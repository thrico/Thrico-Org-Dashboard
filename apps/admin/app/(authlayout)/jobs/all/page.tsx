"use client";
import React from "react";
import { useListings } from "../../../../graphql/actions/listing";
import TableLoading from "../../../../components/skeleton/TableLoading";
import Listing from "../../../../components/listing/Listing";

import Jobs from "../../../../components/jobs/Jobs";
import { JobStatus, useJobs } from "../../../../graphql/actions/jobs";

const page = () => {
  const { data, error, loading } = useJobs({
    variables: {
      input: {
        status: JobStatus.ALL,
      },
    },
  });
  return (
    <>
      {loading && <TableLoading />}
      <Jobs data={data?.getJob} />
    </>
  );
};

export default page;
