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

export const CHECK_PAYMENTS = gql`
  query CheckPaymentDetails {
    checkPaymentDetails {
      enabledRazorpay
      enabledStripe
      razorpayKeyId
      razorpayKeySecret
      stripeKeyId
      stripeKeySecret
    }
  }
`;
export const ADD_PAYMENT_DETAILS = gql`
  mutation AddPaymentDetails($input: paymentDetails) {
    addPaymentDetails(input: $input) {
      success
    }
  }
`;

export const GET_CURRENCY = gql`
  query GetCurrency {
    getCurrency {
      id
      name
      symbol
      cc
    }
  }
`;

export const GET_ORG_CURRENCY = gql`
  query GetOrganizationCurrency {
    getOrganizationCurrency {
      id
      name
      symbol
      cc
    }
  }
`;

export const UPDATE_CURRENCY = gql`
  mutation UpdateCurrency($input: inputCurrency) {
    updateCurrency(input: $input) {
      id
      name
      symbol
      cc
    }
  }
`;
