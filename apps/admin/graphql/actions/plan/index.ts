import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_CUSTOM_REQUEST,
  GET_COUNTRY_PACKAGES,
  GET_PLAN_OVERVIEW,
  GET_UPGRADE_PLAN_SUMMARY,
  UPDATE_TO_YEARLY,
  UPDATE_TRAIL_TO_PACKAGE,
  UPGRADE_PLAN,
  VERIFY_RAZORPAY_PAYMENT,
} from "../../quries/plan";
import { CountryPackage } from "../../../components/settings/plan/ts-types";

export const getCountryPackage = () => useQuery(GET_COUNTRY_PACKAGES);

export const updateTrialToPackage = (options: any) =>
  useMutation(UPDATE_TRAIL_TO_PACKAGE, options);

export const updateToYearly = (options: any) =>
  useMutation(UPDATE_TO_YEARLY, options);

export const verifyRazorpayPayment = (options: any) =>
  useMutation(VERIFY_RAZORPAY_PAYMENT, {
    ...options,
    update(cache, { data: { verifyRazorpayPayment } }) {
      window.location.reload();
      //     cache.writeQuery({
      //       query: GET_PLAN_OVERVIEW,
      //       data: { getPlanOverview: verifyRazorpayPayment },
      //     });
      //   } catch (error) {
      //     console.error(
      //       "Error updating cache after payment verification:",
      //       error
      //     );
      //   }
    },
  });
export interface LimitUsage {
  used: number;
  limit: number;
  percent: number;
}

export interface checkPlanOverview {
  planName: string;
  status:
    | "active"
    | "scheduled_downgrade"
    | "scheduled_upgrade"
    | "cancelled"
    | "suspended";
  billingCycle: "monthly" | "yearly";
  nextPaymentDate: string;
  price: number;
  adminUsers: LimitUsage;
  modulesUsed: LimitUsage;
  userUsage: LimitUsage;
  subscriptionType: "trail" | "paid";
  package: CountryPackage;
}

export interface GetPlanOverviewQuery {
  getPlanOverview: checkPlanOverview | null;
}

export const getPlanOverview = () =>
  useQuery<GetPlanOverviewQuery>(GET_PLAN_OVERVIEW, {});

export const createCustomRequest = (options: any) =>
  useMutation(CREATE_CUSTOM_REQUEST, options);

export const getUpgradePlanSummary = (options: any) =>
  useMutation(GET_UPGRADE_PLAN_SUMMARY, options);

export const upgradePlan = (options: any) => useMutation(UPGRADE_PLAN, options);
