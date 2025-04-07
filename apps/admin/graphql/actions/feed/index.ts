import { useQuery } from "@apollo/client";
import { GET_ALL_FEED } from "../../quries/feed";

export const getAllFeed = (options: any) => useQuery(GET_ALL_FEED, options);
