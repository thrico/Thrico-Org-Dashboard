import { Button } from "antd";
import React from "react";
import {
  TiArrowDownOutline,
  TiArrowDownThick,
  TiArrowUpOutline,
} from "react-icons/ti";
import {
  downVoteDiscussionForum,
  upVoteDiscussionForum,
} from "../../../../graphql/actions/discussion-form";
import { voteType } from "../../ts-types";
import { useApolloClient } from "@apollo/client";
import { GET_BY_ID_DISCUSSION_FORUM } from "../../../../graphql/quries/discussion-form";
import { PostEngagement } from "../../ts-types";

const DownVote = ({ id, voteType }: { id: string; voteType: voteType }) => {
  const client = useApolloClient();
  const [downVote] = downVoteDiscussionForum({});

  const downVoteUpdate = async (downVoteFlag: boolean) => {
    const data = client.readQuery<{
      getDiscussionForumDetailsByID: PostEngagement;
    }>({
      query: GET_BY_ID_DISCUSSION_FORUM,
      variables: {
        input: {
          discussionForumId: id,
        },
      },
    });

    let newValue = data?.getDiscussionForumDetailsByID;
    if (!newValue) return;

    let updatedUpVotes = newValue.upVotes || 0;
    let updatedDownVotes = newValue.downVotes || 0;
    let updatedVoteType = newValue.voteType;

    if (downVoteFlag) {
      if (updatedVoteType === "DOWNVOTE") {
        // Already downvoted, do nothing
        return;
      } else if (updatedVoteType === "UPVOTE") {
        // Change vote to DOWNVOTE
        updatedDownVotes += 1;
        updatedUpVotes = updatedUpVotes > 0 ? updatedUpVotes - 1 : 0;
        updatedVoteType = "DOWNVOTE";
      } else {
        // New downvote
        updatedDownVotes += 1;
        updatedVoteType = "DOWNVOTE";
      }
    } else {
      // Remove downvote
      if (updatedVoteType === "DOWNVOTE") {
        updatedDownVotes = updatedDownVotes > 0 ? updatedDownVotes - 1 : 0;
        updatedVoteType = null;
      } else {
        // No downvote to remove
        return;
      }
    }

    await client.writeQuery({
      query: GET_BY_ID_DISCUSSION_FORUM,
      variables: {
        input: {
          discussionForumId: id,
        },
      },
      data: {
        getDiscussionForumDetailsByID: {
          ...newValue,
          upVotes: updatedUpVotes,
          downVotes: updatedDownVotes,
          voteType: updatedVoteType,
        },
      },
    });

    await downVote({
      variables: {
        input: {
          discussionForumId: id,
          downVote: voteType !== "DOWNVOTE" ? true : false,
        },
      },
    });
  };

  return (
    <>
      <Button
        type="text"
        icon={
          voteType === "DOWNVOTE" ? (
            <TiArrowDownThick size={22} />
          ) : (
            <TiArrowDownOutline size={22} />
          )
        }
        onClick={async () => {
          downVoteUpdate(voteType !== "DOWNVOTE" ? true : false);
        }}
      />
    </>
  );
};

export default DownVote;
