import { gql } from "@apollo/client";

export const GET_ALL_USER = gql`
  query GetAllUser($input: allStatusInput) {
    getAllUser(input: $input) {
      status
      user {
        id
        firstName
        lastName
        email
        avatar
      }
    }
  }
`;
export const CHANGE_USER_STATUS = gql`
  mutation ChangeUserStatus($input: statusInput) {
    changeUserStatus(input: $input) {
      isApproved
      status
      isRequested
      user {
        id
        firstName
        lastName
        avatar
        email
        profile {
          country
          language
          education {
            id
            school
            degree
            grade
            activities
            description
            duration
          }
          experience {
            id
            companyName
            duration
            employmentType
            location
            locationType
            title
          }
          DOB
          phone {
            areaCode
            countryCode
            isoCode
            phoneNumber
          }
        }
      }
      userKyc {
        referralSource
        comment
        affliction
      }
    }
  }
`;
export const GET_USER_DETIALS = gql`
  query GetUserDetailsById($input: inputId) {
    getUserDetailsById(input: $input) {
      isApproved
      status
      isRequested
      user {
        id
        firstName
        lastName
        avatar
        email
        profile {
          country
          language
          education {
            id
            school
            degree
            grade
            activities
            description
            duration
          }
          experience {
            id
            companyName
            duration
            employmentType
            location
            locationType
            title
          }
          DOB
          phone {
            areaCode
            countryCode
            isoCode
            phoneNumber
          }
        }
      }
      userKyc {
        referralSource
        comment
        affliction
      }
    }
  }
`;
