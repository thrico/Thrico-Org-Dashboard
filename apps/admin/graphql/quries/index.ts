import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser {
    getUser {
      id
      status
      email
      firstName
      lastName
    }
  }
`;

export const GET_ORGANIZATION = gql`
  query GetEntity {
    getEntity {
      id
      name
      isTrialActive
      isPaid
      trailEndDate
      trailStartDate
      trailsDays
      logo
    }
  }
`;

export const CHECK_DOMAIN = gql`
  query CheckDomain($input: domainQuery) {
    checkDomain(input: $input) {
      success
    }
  }
`;

export const REGISTER_ORGANIZATION = gql`
  mutation Mutation($input: registerEntityInput) {
    registerEntity(input: $input) {
      success
    }
  }
`;
export const CHANGE_THEME_COLOR = gql`
  mutation ChangeThemeColor($input: InputTheme) {
    changeThemeColor(input: $input) {
      borderRadius
      colorBgContainer
      colorPrimary
    }
  }
`;

export const ENTITY_TYPE = gql`
  query GetEntityType {
    getEntityType {
      title
      id
    }
  }
`;
export const INDUSTRY_TYPE = gql`
  query GetIndustryType {
    getIndustryType {
      title
      id
    }
  }
`;

export const ENTITY_KYC = gql`
  query entityKYC {
    getIndustryType {
      id
      title
    }
    getEntityType {
      title
      id
    }
  }
`;
