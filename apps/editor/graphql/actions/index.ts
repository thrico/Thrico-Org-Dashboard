import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_CUSTOM_PAGES,
  CHECK_DOMAIN,
  DELETE_DOMAIN,
  GET_CUSTOM_PAGES,
  GET_HEADER_LINKS,
  GET_HOME_PAGE_CAROUSEL,
  GET_ORGANIZATION,
  GET_USER,
  UPDATE_HOMEPAGE_CAROUSEL,
} from "../quries";

export const getGetUser = () => useQuery(GET_USER);

export const getEntity = () => useQuery(GET_ORGANIZATION);

export const checkDomain = (options: any) => useQuery(CHECK_DOMAIN, options);

export const getHomePageCarousel = () => useQuery(GET_HOME_PAGE_CAROUSEL);

export const updateHomePageCarousel = (options: any) =>
  useMutation(UPDATE_HOMEPAGE_CAROUSEL, options);

export const getHeaderLinks = () => useQuery(GET_HEADER_LINKS);

export const getCustomPages = () => useQuery(GET_CUSTOM_PAGES);

export const addCustomPages = (options: any) =>
  useMutation(ADD_CUSTOM_PAGES, options);

export const deleteDomain = () => useMutation(DELETE_DOMAIN);
