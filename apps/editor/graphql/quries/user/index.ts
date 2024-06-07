import { gql } from "@apollo/client";

export const GET_ALL_USER = gql`
  query GetAllUser {
    getAllUser {
      alumniKyc {
        referralSource
        comment
      }
      aboutAlumni {
        currentPosition
        linkedin
        instagram
        portfolio
      }
      alumni {
        email
        firstName
        lastName
      }
      alumniOrganizationProfile {
        isApproved
        isRequested
      }
      alumniProfile {
        country
        phone {
          areaCode
          countryCode
          isoCode
          phoneNumber
        }

        DOB
        language
        experience {
          id
          companyName
          duration
          employmentType
          location
          locationType
          title
        }
        education {
          id
          school
          degree
          grade
          activities
          description
          duration
        }
      }
    }
  }
`;
