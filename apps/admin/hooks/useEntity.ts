// src/hooks/useEntity.ts
import { useQuery } from "@apollo/client";
import { getEntity } from "../graphql/actions";

export const useEntity = () => {
  const { data, loading, error } = getEntity();

  return {
    entityName: data?.getEntity?.name,
    entityLogo: data?.getEntity?.logo,
  };
};
