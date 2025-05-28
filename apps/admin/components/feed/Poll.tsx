import React from "react";

import PollVote from "../polls/PollVote";
import { getPollByIdForUser } from "../../graphql/actions/polls";

const Poll = ({ id }: { id: String }) => {
  const { data, loading } = getPollByIdForUser({
    variables: {
      input: {
        pollId: id,
      },
    },
  });

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or skeleton
  }
  if (data) {
    return <PollVote data={data?.getPollByIdForUser} />;
  }
};

export default Poll;
