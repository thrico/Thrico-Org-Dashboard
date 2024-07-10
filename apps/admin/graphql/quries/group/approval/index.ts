import { gql } from "@apollo/client";

export const ALL_GROUP = gql`
  query GetAllGroupStatus($input: groupStatus!) {
    getAllGroupStatus(input: $input) {
      id
      about
      cover
      createdAt
      creator
      interest {
        title
      }
      isActive
      isApproved
      isBlocked
      isPaused
      organization
      setting {
        groupType
        joiningCondition
        privacy
      }
      slug
      theme {
        title
      }
      title
      updatedAt
    }
  }
`;

export const ADD_FEATURED_GROUP = gql`
  mutation AddFeaturedGroup($input: [String]) {
    addFeaturedGroup(input: $input) {
      id
      slug
      title
      creator
      organization
      cover
      isApproved
      isBlocked
      isPaused
      isActive
      about
      createdAt
      updatedAt
    }
  }
`;
