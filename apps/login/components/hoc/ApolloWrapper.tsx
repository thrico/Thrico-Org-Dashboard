"use client";
import * as React from "react";
import { ApolloLink, HttpLink, createHttpLink } from "@apollo/client";
import {
  NextSSRApolloClient,
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { onError } from "@apollo/client/link/error";
import toast from "react-hot-toast";

import { useTokenStore } from "../store/store";

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
        graphQLErrors.map(({ message }) => {
          toast.error(message, {
            id: "12",
          });
        });
      }
    });

    const httpLink = createHttpLink({
      uri: host,
    });

    const link = errorControl.concat(httpLink);

    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          authorization:
            localStorage.getItem("token") === null
              ? null
              : JSON.parse(localStorage?.getItem("token")).state.token,
        },
      });

      return forward(operation);
    });

    return new NextSSRApolloClient({
      cache: new NextSSRInMemoryCache(),
      link:
        typeof window === "undefined"
          ? ApolloLink.from([
              new SSRMultipartLink({
                stripDefer: true,
              }),
              authMiddleware,
              httpLink,
            ])
          : ApolloLink.from([authMiddleware, link]),
    });
  }
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
