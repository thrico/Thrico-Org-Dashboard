"use client";

import { Next13ProgressBar } from "next13-progressbar";
import { Suspense } from "react";

const ProgressBar = () => {
  return (
    <Suspense fallback={null}>
      <Next13ProgressBar
        height="2px"
        color="#013DC4"
        options={{ showSpinner: true }}
        showOnShallow
      />
    </Suspense>
  );
};

export default ProgressBar;
