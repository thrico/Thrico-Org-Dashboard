import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser {
    getUser {
      id
      status
    }
  }
`;

export const GET_ORGANIZATION = gql`
  query GetEntity {
    getEntity {
      email
      firstName
      lastName
      entity {
        address
        domain {
          domain
        }
        logo
        name
        timeZone
        website
        id
      }
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
