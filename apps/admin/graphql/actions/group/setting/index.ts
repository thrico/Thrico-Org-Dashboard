import { useMutation, useQuery } from "@apollo/client";
import {
  GROUP_SETTINGS,
  UPDATE_SETTINGS,
} from "../../../quries/group/settings";

export const getGroupSettings = (options: any) =>
  useQuery(GROUP_SETTINGS, options);

export const updateGroupSettings = (options: any) =>
  useMutation(UPDATE_SETTINGS, {
    onCompleted: options.onCompleted,
    update(cache, { data: { updateGroupSettings } }) {
      try {
        cache.writeQuery({
          query: GROUP_SETTINGS,

          data: {
            getGroupSettings: updateGroupSettings,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });
