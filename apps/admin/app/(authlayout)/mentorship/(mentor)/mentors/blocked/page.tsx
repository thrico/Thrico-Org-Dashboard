"use client";

import React from "react";
import AllMentor from "../../../../../../screen/mentorship/mentors/AllMentors";
import { MentorStatus } from "../../../../../../components/layout/constants/ts-types";

// Adjust the import path as necessary

const page = () => {
  return <AllMentor status={MentorStatus.BLOCKED} />;
};

export default page;
