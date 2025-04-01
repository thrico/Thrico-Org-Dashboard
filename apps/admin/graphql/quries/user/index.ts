import { gql } from "@apollo/client";

export const GET_ALL_USER = gql`
  query GetAllUser($input: allStatusInput) {
    getAllUser(input: $input) {
      isApproved
      isRequested
      status
      user {
        id
        firstName
        lastName
        email
        avatar
        location
        profile {
          country
          language
          phone {
            areaCode
            countryCode
            isoCode
            phoneNumber
          }
          timeZone
          DOB
          gender
          pronouns
          headline
          currentPosition
        }
      }
    }
  }
`;
export const CHANGE_USER_STATUS = gql`
  mutation ChangeUserStatus($input: statusInput) {
    changeUserStatus(input: $input) {
      isApproved
      isRequested
      status
      userKyc {
        referralSource
        comment
        affliction
      }
      user {
        id
        firstName
        lastName
        email
        avatar
        location
        profile {
          country
          language
          phone {
            areaCode
            countryCode
            isoCode
            phoneNumber
          }
          timeZone
          DOB
          gender
          pronouns
          headline
          currentPosition
        }
      }
    }
  }
`;
export const GET_USER_DETIALS = gql`
  query GetUserDetailsById($input: inputId) {
    getUserDetailsById(input: $input) {
      isApproved
      isRequested
      status
      userKyc {
        referralSource
        comment
        affliction
      }
      user {
        id
        firstName
        lastName
        email
        avatar
        location
        profile {
          country
          language
          phone {
            areaCode
            countryCode
            isoCode
            phoneNumber
          }
          timeZone
          DOB
          gender
          pronouns
          headline
          currentPosition
        }
      }
    }
  }
`;
