import { Flex, Typography } from "antd";
import React from "react";
import UpVote from "./UpVote";
import { getDiscussionForumDetailsByID } from "../../../../graphql/actions/discussion-form";
import DownVote from "./DownVote";
import { useApolloClient } from "@apollo/client";
import { GET_BY_ID_DISCUSSION_FORUM } from "../../../../graphql/quries/discussion-form";

const Vote = ({ id }: { id: string }) => {
  const { data: details } = getDiscussionForumDetailsByID({
    variables: {
      input: {
        discussionForumId: id,
      },
    },
  });
  const { Text } = Typography;

  return (
    <>
      {details?.getDiscussionForumDetailsByID && (
        <Flex vertical align="center">
          <UpVote
            voteType={details?.getDiscussionForumDetailsByID.voteType}
            id={id}
          />

          <Text strong>
            {details?.getDiscussionForumDetailsByID.upVotes -
              details?.getDiscussionForumDetailsByID.downVotes}
          </Text>
          <DownVote
            voteType={details?.getDiscussionForumDetailsByID.voteType}
            id={id}
          />
        </Flex>
      )}
    </>
  );
};

export default Vote;
