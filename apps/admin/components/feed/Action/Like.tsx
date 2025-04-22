import { useApolloClient } from "@apollo/client";
import { Button } from "antd";
import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { GET_ALL_FEED } from "../../../graphql/quries/feed";
import { likeFeed } from "../../../graphql/actions/feed";
import { FeedProps } from "../types";

const Like = ({ item }: FeedProps) => {
    const [disabled, setDisabled] = useState(false);
    const client = useApolloClient();
    const [like] = likeFeed({})
    const checkValueLikes = async (
        feed: { id: string; totalReactions: number; isLiked: boolean }[],
        item: { id: string; totalReactions: number; isLiked: boolean }
    ) => {

        const newData = await feed.map((set: any) =>
            set.id === item.id
                ? {
                    ...set,
                    totalReactions: item?.isLiked
                        ? item?.totalReactions - 1
                        : item?.totalReactions + 1,
                    isLiked: !item?.isLiked,
                }
                : set
        );

        console.log(newData);
        return newData;
    };
    const likeUpdate = async () => {
        const { getAllFeed } = client.readQuery({
            query: GET_ALL_FEED,
            variables: {
                input: {
                    offset: 0,
                    limit: 10, // Match the limit in your Following screen
                },
            },
        });
        const newFeedData = await checkValueLikes(getAllFeed, item);
        client.writeQuery({
            query: GET_ALL_FEED,
            data: {
                getAllFeed: newFeedData,
            },
            variables: {
                input: {
                    offset: 0,
                    limit: 4, // Match the limit in your Following screen
                },
            },
        });
    };

    return (
        <Button
            type="text"
            disabled={disabled}
            onClick={async () => {
                like({
                    variables: {
                        input: {
                            id: item.id
                        }
                    }
                })
                likeUpdate()
            }}
            icon={item?.isLiked ? <FaHeart /> : <FaRegHeart size={17} />}
        // onClick={() => toggleLike(feed.id)}
        >
            Like
        </Button>
    );
};

export default Like;
