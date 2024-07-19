import { useMutation, useQuery } from "@apollo/client";
import {

  GET_PROFILE,
  GET_USER,
  LOGIN,
  LOGOUT,
  REGISTER,
  VERIFY_OTP,
} from "../quries";

export const registerAsAdmin = (onCompleted: any) =>
  useMutation(REGISTER, onCompleted);

export const loginAsAdmin = (onCompleted: any) =>
  useMutation(LOGIN, onCompleted);

export const otpLogin = (onCompleted: any) =>
  useMutation(VERIFY_OTP, onCompleted);

export const getUser = () => useQuery(GET_USER);

export const userProfile = () => useQuery(GET_PROFILE);

export const logoutUser = (onCompleted: any) =>
  useMutation(LOGOUT, onCompleted);


