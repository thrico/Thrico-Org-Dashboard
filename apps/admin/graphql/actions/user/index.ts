import { useQuery } from "@apollo/client";
import { GET_USER } from "../../quries";
import { GET_ALL_USER } from "../../quries/user";

export const getAllUser = (options: any) => useQuery(GET_ALL_USER, options);
