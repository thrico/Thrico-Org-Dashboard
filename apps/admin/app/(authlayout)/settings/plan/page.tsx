"use client";

import React from "react";

import { checkEntitySubscription } from "../../../../graphql/actions";
import Trail from "../../../../components/settings/plan/Trail";
import SubscriptionPan from "../../../../components/settings/plan/ActivePlan";
import PaidPlan from "../../../../components/settings/plan/PaidPlan";

const page = () => {
  const { data, loading } = checkEntitySubscription();

  const subscription = data?.checkEntitySubscription;
  console.log("Subscription Data:", subscription);

  return (
    <>
      {subscription?.subscriptionType === "trial" && <Trail />}
      {subscription?.subscriptionType === "paid" && <PaidPlan />}
    </>
  );
};

export default page;
