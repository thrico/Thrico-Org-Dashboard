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
  query GetOrganization {
    getOrganization {
      id
      firstName
      lastName
      email
      organization {
        id
        organizationName
        timeZone
        website
        logo
        category
        address
      domain  {
          domain 
        }
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
  mutation Mutation($input: registerOrganizationInput) {
    registerOrganization(input: $input) {
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
