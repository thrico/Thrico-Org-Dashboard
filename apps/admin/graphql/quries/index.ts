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
      logo
      subscription {
        subscriptionId
        packageId
        planName
        planType
        billingCycle
        startDate
        endDate
        status
        subscriptionType
        graceUntil
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

export const GET_ENTITY_SETTINGS = gql`
  query GetEntitySettings {
    getEntitySettings {
      id
      autoApproveUser
      autoApproveGroup
      autoApproveEvents
      autoApproveJobs
      autoApproveMarketPlace
      allowNewUser
      autoApproveDiscussionForum
      allowDiscussionForum
    }
  }
`;
export const UPDATE_ENTITY_SETTINGS = gql`
  mutation UpdateEntitySettings($input: EntityAutoApprovalSettingsInput) {
    updateEntitySettings(input: $input) {
      id
      autoApproveUser
      autoApproveGroup
      autoApproveEvents
      autoApproveJobs
      autoApproveMarketPlace
      entity
      allowNewUser
      autoApproveDiscussionForum
      allowDiscussionForum
    }
  }
`;

export const GET_KYC_COUNTRIES = gql`
  query GetKycCountries {
    getKycCountries {
      code
      name
    }
  }
`;

export const CHECK_ENTITY_SUBSCRIPTIONS = gql`
  query CheckEntitySubscription {
    checkEntitySubscription {
      subscriptionId
      packageId
      planName
      planType
      billingCycle
      startDate
      endDate
      status
      subscriptionType
      graceUntil
      modules {
        id
        name
        icon
      }
    }
  }
`;

export const GET_CURRENCY = gql`
  query GetEntityCurrency {
    getEntityCurrency
  }
`;
