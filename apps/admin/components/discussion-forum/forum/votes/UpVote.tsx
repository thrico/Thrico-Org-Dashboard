import { Button } from "antd";
import React from "react";
import { TiArrowUpOutline, TiArrowUpThick } from "react-icons/ti";
import { upVoteDiscussionForum } from "../../../../graphql/actions/discussion-form";
import { PostEngagement, voteType } from "../../ts-types";
import { useApolloClient } from "@apollo/client";
import { GET_BY_ID_DISCUSSION_FORUM } from "../../../../graphql/quries/discussion-form";

const UpVote = ({ id, voteType }: { id: string; voteType: voteType }) => {
  const client = useApolloClient();
  const [upvote] = upVoteDiscussionForum({});

  const upVoteUpdate = async (upVote: boolean) => {
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

    if (upVote) {
      if (updatedVoteType === "UPVOTE") {
        // Already upvoted, do nothing
        return;
      } else if (updatedVoteType === "DOWNVOTE") {
        // Change vote to UPVOTE
        updatedUpVotes += 1;
        updatedDownVotes = updatedDownVotes > 0 ? updatedDownVotes - 1 : 0;
        updatedVoteType = "UPVOTE";
      } else {
        // New upvote
        updatedUpVotes += 1;
        updatedVoteType = "UPVOTE";
      }
    } else {
      // Remove upvote
      if (updatedVoteType === "UPVOTE") {
        updatedUpVotes = updatedUpVotes > 0 ? updatedUpVotes - 1 : 0;
        updatedVoteType = null;
      } else {
        // No upvote to remove
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
    await upvote({
      variables: {
        input: {
          discussionForumId: id,
          upVote: voteType !== "UPVOTE" ? true : false,
        },
      },
    });

    // client.writeQuery({
    //   query: GET_BY_ID_DISCUSSION_FORUM,
    //   variables: {
    //     input: {
    //       discussionForumId: id,
    //     },
    //   },
    //   data: {
    //     getAllFeed: newFeedData,
    //   },
    // });
  };
  return (
    <>
      <Button
        type="text"
        icon={
          voteType === "UPVOTE" ? (
            <TiArrowUpThick size={22} />
          ) : (
            <TiArrowUpOutline size={22} />
          )
        }
        onClick={async () => {
          upVoteUpdate(voteType !== "UPVOTE" ? true : false);
        }}
      />
    </>
  );
};

export default UpVote;
