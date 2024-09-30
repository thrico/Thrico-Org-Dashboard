import { useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "../../quries";
import {
  CHANGE_USER_STATUS,
  GET_ALL_USER,
  GET_USER_DETIALS,
} from "../../quries/user";

export const getUser = () => useQuery(GET_ALL_USER);

export const getAllUser = (options: any) => useQuery(GET_ALL_USER, options);

export const getUserDetailsById = (options: any) =>
  useQuery(GET_USER_DETIALS, options);

export const changeUserStatus = (options: any) =>
  useMutation(CHANGE_USER_STATUS, {
    update(cache, { data: { changeUserStatus } }) {
      try {
        cache.writeQuery({
          query: GET_USER_DETIALS,
          data: {
            getUserDetailsById: options.id,
          },
          variables: {
            input: {
              id: options?.id,
            },
          },
        });

        alert(options.status.toUpperCase());

        const { getAllUser }: any = cache.readQuery({
          query: GET_ALL_USER,
          variables: {
            input: {
              status: options.status.toUpperCase(),
            },
          },
        });

        const newValues = getAllUser?.map((p: any) =>
          p?.user?.id === changeUserStatus?.user?.id ? changeUserStatus : p
        );

        cache.writeQuery({
          query: GET_ALL_USER,
          data: {
            getAllUser: newValues,
          },
          variables: {
            input: {
              status: "all",
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });
