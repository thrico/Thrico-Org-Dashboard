import { gql } from "@apollo/client";

export const ALL_GROUP = gql`
  query GetAllGroupStatus($input: allStatusInput) {
    getAllGroupStatus(input: $input) {
      id
      slug
      title
      creator
      entity
      cover
      status
      about
      createdAt
      updatedAt
      setting {
        groupType
        joiningCondition
        privacy
      }
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
    }
  }
`;
