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

  console.log(host, "host");

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

    const uploadLink = createUploadLink({
      uri: host ? host : "https://admin.thrico.app/graphql",
    });
    const link = errorControl.concat(uploadLink);

    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          authorization:
            localStorage.getItem("token") === null
              ? null
              : //@ts-ignore
                JSON.parse(localStorage?.getItem("token")).state.token,
          "Apollo-Require-Preflight": "true",
        },
      });

      return forward(operation);
    });

    return new NextSSRApolloClient({
      link: ApolloLink.from([authMiddleware, link]),
      cache: new NextSSRInMemoryCache(),
    });
  }
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
