import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_FEED,
  GET_ALL_FEED,
  LIKE_FEED,
  NUMBER_OF_FEED,
} from "../../quries/feed";

export const getAllFeed = (options: any) => useQuery(GET_ALL_FEED, options);

export const numberOfFeeds = () => useQuery(NUMBER_OF_FEED);

export const addFeed = (options: any) =>
  useMutation(ADD_FEED, {
    onCompleted(data) {
      options.onCompleted();
    },
    update(cache, { data: { addFeed } }) {
      try {
        const { getAllFeed }: any = cache.readQuery({
          query: GET_ALL_FEED,
          variables: {
            input: {
              offset: 0,
              limit: 10, // Match the limit in your Following screen
            },
          },
        });

        cache.writeQuery({
          query: GET_ALL_FEED,
          data: { getAllFeed: [addFeed, ...getAllFeed] },
          variables: {
            input: {
              offset: 0,
              limit: 10, // Match the limit in your Following screen
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

export const likeFeed = (options: any) => useMutation(LIKE_FEED, {});
