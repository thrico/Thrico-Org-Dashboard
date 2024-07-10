import { useMutation, useQuery } from "@apollo/client";
import {
  CHECK_DOMAIN_IS_VERIFIED,
  GET_CUSTOM_DOMAIN,
  GET_SOCIAL_MEDIA,
  UPDATE_DOMAIN,
  UPDATE_HEADER_LINKS,
  UPDATE_SOCIAL_MEDIA,
} from "../../quries";
import { GET_ALL_USER } from "../../quries/user";

export const getAllUser = () => useQuery(GET_ALL_USER);

export const getSocialMedia = () => useQuery(GET_SOCIAL_MEDIA);

export const updateSocialMedia = () => useMutation(UPDATE_SOCIAL_MEDIA);

export const updateHeaderLinks = () => useMutation(UPDATE_HEADER_LINKS);

export const getCustomDomain = () => useQuery(GET_CUSTOM_DOMAIN);

export const updateDomain = () => useMutation(UPDATE_DOMAIN);

export const checkDomainIsVerified = (options: any) =>
  useQuery(CHECK_DOMAIN_IS_VERIFIED, options);
