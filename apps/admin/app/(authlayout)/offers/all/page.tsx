"use client";
import React from "react";

import TableLoading from "../../../../components/skeleton/TableLoading";

import {
  OfferStatus,
  useGetAllOffer,
} from "../../../../graphql/actions/offers";
import Offer from "../../../../components/offers/Offer";

const page = () => {
  const { data, error, loading } = useGetAllOffer({
    variables: {
      input: {
        status: OfferStatus.ALL,
      },
    },
  });
  return (
    <>
      {loading && <TableLoading />}
      <Offer data={data?.getAllOffer} />
    </>
  );
};

export default page;
