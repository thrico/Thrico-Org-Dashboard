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
  query getEntity {
    getEntity {
      id
      firstName
      lastName
      email
      entity {
        id
        name
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

export const GET_HOME_PAGE_CAROUSEL = gql`
  query GetHomePageCarousel {
    getHomePageCarousel {
      id
      url
      image
    }
  }
`;

export const UPDATE_HOMEPAGE_CAROUSEL = gql`
  mutation UpdateHomePageCarousel($input: [UploadImageGallery]) {
    updateHomePageCarousel(input: $input) {
      id
      image
      url
    }
  }
`;
export const GET_SOCIAL_MEDIA = gql`
  query GetSocialMedia {
    getSocialMedia {
      twitter
      linkedin
      instagram
      youtube
    }
  }
`;
export const UPDATE_SOCIAL_MEDIA = gql`
  mutation UpdateSocialMedia($input: inputSocialMedia) {
    updateSocialMedia(input: $input) {
      twitter
      linkedin
      instagram
      youtube
    }
  }
`;

export const UPDATE_HEADER_LINKS = gql`
  mutation UpdateHeaderLinks($input: [inputHeaderLinks]) {
    updateHeaderLinks(input: $input) {
      id
      link
      name
    }
  }
`;
export const GET_HEADER_LINKS = gql`
  query GetHeaderLinks {
    getHeaderLinks {
      id
      link
      name
      subMenu {
        id
        link
        name
      }
    }
  }
`;

export const GET_CUSTOM_PAGES = gql`
  query GetCustomPages {
    getCustomPages {
      title
      id
      slug
      organization
      metaDescription
      metaTitle
    }
  }
`;
export const ADD_CUSTOM_PAGES = gql`
  mutation AddCustomPages($input: inputCustomPages) {
    addCustomPages(input: $input) {
      id
      title
      slug
      organization
      metaDescription
      metaTitle
    }
  }
`;

export const GET_CUSTOM_DOMAIN = gql`
  query GetCustomDomain {
    getCustomDomain {
      domain
    dnsConfig
    ssl
    status
    entity
   
    }
  }
`;
export const UPDATE_DOMAIN = gql`
  mutation UpdateDomain($input: inputDomain) {
    updateDomain(input: $input) {
      domain
      dnsConfig
      ssl
      status
   
    }
  }
`;

export const CHECK_DOMAIN_IS_VERIFIED = gql`
  query CheckDomainIsVerified {
    checkDomainIsVerified {
      domain
      dnsConfig
      ssl
      status
    
    }
  }
`;
export const DELETE_DOMAIN = gql`
  mutation DeleteDomain {
    deleteDomain {
      domain
      dnsConfig
      ssl
      status
   
    }
  }
`;
