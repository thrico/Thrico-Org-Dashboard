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

interface props {
  children?: any;
  host: string;
}
export function ApolloWrapper({ children, host }: props) {
  function makeClient() {
    const errorControl = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message }) => {
          toast.error(message);
        });
      }
      if (networkError) {
        toast.error("There was a network error, please try again later");
      }
    });

    const httpLink = createHttpLink({
      uri: host,
    });

    const link = errorControl.concat(httpLink);

    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          authorization: `Bearer ${localStorage.getItem("key")}`,
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
