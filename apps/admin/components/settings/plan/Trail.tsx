"use client";

import type React from "react";

import MyPlan from "./MyPlan";

import BuyPlan from "./buy-plan/BuyPlan";
import PlanOverview from "./PlanOverview";

const Trail = () => {
  const headerStyle: React.CSSProperties = {
    textAlign: "center",
    marginTop: 10,
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <div style={headerStyle}>
        <MyPlan />
      </div>
      <PlanOverview />

      <BuyPlan />
    </div>
  );
};

export default Trail;
