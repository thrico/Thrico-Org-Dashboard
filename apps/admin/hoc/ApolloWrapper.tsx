"use client";

import * as React from "react";
import { ApolloLink, HttpLink, createHttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
  ApolloNextAppProvider,
} from "@apollo/client-integration-nextjs";
import { onError } from "@apollo/client/link/error";
import toast from "react-hot-toast";
import { useTokenStore } from "@thrico/ui/store";
//@ts-ignore
import { createUploadLink } from "apollo-upload-client";

interface props {
  children?: any;
  host: string | undefined;
}

export function ApolloWrapper({ children, host }: props) {
  const { token } = useTokenStore((state) => ({
    token: state.token,
  }));

  function makeClient() {
    const errorControl = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, extensions }) => {
          if (extensions?.code === "INTERNAL_SERVER_ERROR") {
            // toast.error("Something went wrong", {
            //   id: "12",
            // });
          } else {
            toast.error(message, {
              id: "12",
            });
          }
        });
      }
    });

    const uploadLink = createUploadLink({
      uri: host ? host : "https://admin.thrico.app/graphql",
    });

    const link = errorControl.concat(uploadLink);

    const authMiddleware = new ApolloLink(
      (operation: import("@apollo/client").Operation, forward) => {
        operation.setContext({
          headers: {
            authorization:
              typeof window !== "undefined" &&
              localStorage.getItem("token") === null
                ? null
                : typeof window !== "undefined" &&
                  JSON.parse(localStorage?.getItem("token") || "{}").state
                    ?.token,
            "Apollo-Require-Preflight": "true",
            // Add the IP to headers
          },
        });

        return forward(operation);
      }
    );

    return new ApolloClient({
      link: ApolloLink.from([authMiddleware, link]),
      cache: new InMemoryCache({
        // typePolicies: {
        //   Query: {
        //     fields: {
        //       getAllFeed: {
        //         // Don't cache separate results based on
        //         // any of this field's arguments.
        //         keyArgs: false,
        //         // Concatenate the incoming list items with
        //         // the existing list items.
        //         merge(existing: any[] = [], incoming: any[]) {
        //           return [...existing, ...incoming];
        //         },
        //       }
        //     }
        //   }
        // }
      }),
    });
  }

  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
