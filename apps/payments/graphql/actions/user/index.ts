import { useQuery } from "@apollo/client";
import { GET_ORG_CURRENCY, GET_USER } from "../../quries";
import { GET_ALL_USER } from "../../quries/user";

export const getAllUser = () => useQuery(GET_ALL_USER);

export const getOrganizationCurrency = () => useQuery(GET_ORG_CURRENCY);
