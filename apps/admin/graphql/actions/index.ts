import { useMutation, useQuery } from "@apollo/client";
import {
  CHANGE_THEME_COLOR,
  CHECK_DOMAIN,
  ENTITY_KYC,
  GET_ENTITY_SETTINGS,
  GET_ORGANIZATION,
  GET_USER,
  REGISTER_ORGANIZATION,
  UPDATE_ENTITY_SETTINGS,
} from "../quries";
import { GET_MEMBERS_TERMS_AND_CONDITIONS } from "../quries/user";

// import { CHECK_PAYMENTS } from "../../../payments/graphql/quries";

export const getGetUser = () => useQuery(GET_USER);

export const getEntity = () => useQuery(GET_ORGANIZATION);

export const checkDomain = (options: any) => useQuery(CHECK_DOMAIN, options);

export const registerOrganization = (onCompleted: any) =>
  useMutation(REGISTER_ORGANIZATION, onCompleted);

export const changeThemeColor = (onCompleted: any) =>
  useMutation(CHANGE_THEME_COLOR, onCompleted);

// export const checkPaymentKyc = () => useQuery(CHECK_PAYMENTS);

export const entityKYC = () => useQuery(ENTITY_KYC);

export const entitySettings = () => useQuery(GET_ENTITY_SETTINGS);

export const updateEntitySettings = (options: any) =>
  useMutation(UPDATE_ENTITY_SETTINGS, {
    ...options,
    refetchQueries: [
      {
        query: GET_ENTITY_SETTINGS,
      },
    ],
    awaitRefetchQueries: true, // ensures mutation waits until refetch is complete
  });

export const getMembersTermsAndConditions = () =>
  useQuery(GET_MEMBERS_TERMS_AND_CONDITIONS);

// export const getDiscussionForumTermsAndConditions = () =>
//   useQuery(GET_DISCUSSION_FORUM_TERMS_AND_CONDITIONS);
