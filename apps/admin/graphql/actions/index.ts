import { useMutation, useQuery } from "@apollo/client";
import {
  CHANGE_THEME_COLOR,
  CHECK_DOMAIN,
  ENTITY_KYC,
  GET_ORGANIZATION,
  GET_USER,
  REGISTER_ORGANIZATION,
} from "../quries";
import { CHECK_PAYMENTS } from "../../../payments/graphql/quries";

export const getGetUser = () => useQuery(GET_USER);

export const getEntity = () => useQuery(GET_ORGANIZATION);

export const checkDomain = (options: any) => useQuery(CHECK_DOMAIN, options);

export const registerOrganization = (onCompleted: any) =>
  useMutation(REGISTER_ORGANIZATION, onCompleted);

export const changeThemeColor = (onCompleted: any) =>
  useMutation(CHANGE_THEME_COLOR, onCompleted);

export const checkPaymentKyc = () => useQuery(CHECK_PAYMENTS);


export const entityKYC = () => useQuery(ENTITY_KYC);
