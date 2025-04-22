import { gql } from "@apollo/client";
export const FEED = `
   
     
`;

export const NUMBER_OF_FEED = gql`
  query Query {
    numberOfFeeds
  }
`;
export const GET_ALL_FEED = gql`
  query GetAllFeed($input: pagination) {
    getAllFeed(input: $input) {
      id
      source
      privacy
      isLiked
      isWishList
      isOwner
      media
      totalComment
      totalReactions
      totalReShare
      addedBy
      description
      createdAt
      user {
        id
        firstName
        avatar
        lastName
        about {
          currentPosition
        }
        isOnline
        cover
      }
    }
  }
`;

export const ADD_FEED = gql`
  mutation AddFeed($input: inputAddFeed) {
    addFeed(input: $input) {
      id
      source
      addedBy
      privacy
      isLiked
      isWishList
      isOwner
      media
      totalComment
      totalReactions
      totalReShare
      description
      createdAt
      user {
        id
        firstName
        avatar
        lastName
        about {
          currentPosition
        }
        isOnline
        cover
      }
    }
  }
`;

export const LIKE_FEED = gql`
  mutation likeFeed($input: inputId) {
    likeFeed(input: $input) {
      status
    }
  }
`;
