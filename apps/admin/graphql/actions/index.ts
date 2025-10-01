import { useMutation, useQuery } from "@apollo/client";
import {
  CHANGE_THEME_COLOR,
  CHECK_DOMAIN,
  CHECK_ENTITY_SUBSCRIPTIONS,
  ENTITY_KYC,
  GET_CURRENCY,
  GET_ENTITY_SETTINGS,
  GET_KYC_COUNTRIES,
  GET_ORGANIZATION,
  GET_USER,
  REGISTER_ORGANIZATION,
  UPDATE_ENTITY_SETTINGS,
} from "../quries";
import { GET_MEMBERS_TERMS_AND_CONDITIONS } from "../quries/user";

// import { CHECK_PAYMENTS } from "../../../payments/graphql/quries";

export const getGetUser = () => useQuery(GET_USER);

export type Subscription = {
  subscriptionId: string;
  packageId: string;
  planName: string;
  planType: string;
  billingCycle: string;
  startDate: string;
  endDate: string;
  status:
    | "active"
    | "scheduled_downgrade"
    | "scheduled_upgrade"
    | "cancelled"
    | "suspended";
  subscriptionType: string;
  graceUntil?: string;
  modules?: {
    id: string;
    name: string;
    icon: string;
  }[];
};

export type Entity = {
  id: string;
  name: string;
  logo: string;
  subscription: Subscription;
};

export type GetEntityResponse = {
  getEntity: Entity;
};

export const getEntity = () => useQuery<GetEntityResponse>(GET_ORGANIZATION);

export const checkDomain = (options: any) => useQuery(CHECK_DOMAIN, options);

export const registerOrganization = (onCompleted: any) =>
  useMutation(REGISTER_ORGANIZATION, onCompleted);

export const changeThemeColor = (onCompleted: any) =>
  useMutation(CHANGE_THEME_COLOR, onCompleted);

// export const checkPaymentKyc = () => useQuery(CHECK_PAYMENTS);

export const entityKYC = () => useQuery(ENTITY_KYC);

export const entitySettings = () => useQuery(GET_ENTITY_SETTINGS);

export const updateEntitySettings = (options: any) =>
  useMutation(UPDATE_ENTITY_SETTINGS, {
    ...options,
    refetchQueries: [
      {
        query: GET_ENTITY_SETTINGS,
      },
    ],
    awaitRefetchQueries: true, // ensures mutation waits until refetch is complete
  });

export const getMembersTermsAndConditions = () =>
  useQuery(GET_MEMBERS_TERMS_AND_CONDITIONS);

// export const getDiscussionForumTermsAndConditions = () =>
//   useQuery(GET_DISCUSSION_FORUM_TERMS_AND_CONDITIONS);

export const getKycCountries = () => useQuery(GET_KYC_COUNTRIES);

export const checkEntitySubscription = () =>
  useQuery<CheckEntitySubscriptionQuery>(CHECK_ENTITY_SUBSCRIPTIONS);

export interface SubscriptionDetails {
  subscriptionId: string;
  packageId: string;
  planName: string;
  planType: "Standard" | "Custom";
  billingCycle: "monthly" | "yearly";
  price: number;
  startDate: string | Date;
  endDate: string | Date;
  status:
    | "active"
    | "scheduled_downgrade"
    | "scheduled_upgrade"
    | "cancelled"
    | "suspended";
  subscriptionType: "trial" | "paid";
  graceUntil: string | null;
  modules?: {
    id: string;
    name: string;
    icon: string;
  }[];
}
export interface CheckEntitySubscriptionQuery {
  checkEntitySubscription: SubscriptionDetails | null;
}

export const getEntityCurrency = () => useQuery(GET_CURRENCY);
