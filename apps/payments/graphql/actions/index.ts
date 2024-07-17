import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_PAYMENT_DETAILS,
  CHANGE_THEME_COLOR,
  CHECK_DOMAIN,
  CHECK_PAYMENTS,
  GET_CURRENCY,
  GET_ORGANIZATION,
  GET_USER,
  REGISTER_ORGANIZATION,
  UPDATE_CURRENCY,
} from "../quries";

export const getGetUser = () => useQuery(GET_USER);

export const getOrganization = () => useQuery(GET_ORGANIZATION);

export const checkDomain = (options: any) => useQuery(CHECK_DOMAIN, options);

export const registerOrganization = (onCompleted: any) =>
  useMutation(REGISTER_ORGANIZATION, onCompleted);

export const changeThemeColor = (onCompleted: any) =>
  useMutation(CHANGE_THEME_COLOR, onCompleted);

export const checkPaymentDetails = () => useQuery(CHECK_PAYMENTS);

export const addPaymentDetails = (onCompleted: any) =>
  useMutation(ADD_PAYMENT_DETAILS, onCompleted);

export const getCurrency = () => useQuery(GET_CURRENCY);

export const updateCurrency = (onCompleted: any) =>
  useMutation(UPDATE_CURRENCY, onCompleted);
