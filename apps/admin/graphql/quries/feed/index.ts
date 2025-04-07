import { gql } from "@apollo/client";
export const FEED = `
   
     
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
