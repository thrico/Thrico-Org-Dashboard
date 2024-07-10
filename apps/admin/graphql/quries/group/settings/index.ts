import { gql } from "@apollo/client";

export const GROUP_SETTINGS = gql`
  query GetGroupSettings {
    getGroupSettings {
      autoApprove
      views
      discussion
      user
    }
  }
`;

export const UPDATE_SETTINGS = gql`
  mutation UpdateGroupSettings($input: updateSettings) {
    updateGroupSettings(input: $input) {
      autoApprove
      views
      discussion
      user
    }
  }
`;
