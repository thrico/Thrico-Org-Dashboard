import { useQuery } from "@apollo/client";
import { GET_ORG_CURRENCY, GET_USER } from "../../quries";
import { GET_ALL_USER } from "../../quries/user";

export const getAllUser = () => useQuery(GET_ALL_USER);

export const getEntityCurrency = () => useQuery(GET_ORG_CURRENCY);
