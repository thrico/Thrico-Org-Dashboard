import {
  gql,
  useMutation,
  MutationHookOptions,
  MutationTuple,
  QueryHookOptions,
  QueryResult,
  useQuery,
} from "@apollo/client";
import { ADD_JOB, GET_JOBS } from "../../quries/jobs";

// --- GraphQL Mutation Document ---

// --- TypeScript Types ---

export type JobCompany = {
  id: string;
  name: string;
  logo: string;
};

export type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  jobType: string;
  salary: string;
  experienceLevel: string;
  workplaceType: string;
  applicationDeadline: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  skills: string[];
  isFeatured: boolean;
  entity: string;
  postedBy: string;
  company: JobCompany;
  numberOfApplicant: number;
  numberOfViews: number;
  createdAt: string;
  status: string;
};

export type PostJobInput = {
  title: string;
  description: string;
  location: string;
  jobType: string;
  salary: string;
  experienceLevel: string;
  workplaceType: string;
  applicationDeadline: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  skills: string[];
  isFeatured?: boolean;
  entity: string;
};

// --- Apollo Client Hook ---

export function useAddJob(
  options?: MutationHookOptions<{ addJob: Job }, { input: PostJobInput }>
): MutationTuple<{ addJob: Job }, { input: PostJobInput }> {
  return useMutation(ADD_JOB, options);
}

export enum JobStatus {
  ALL = "ALL",
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  DISABLED = "DISABLED",
  PAUSED = "PAUSED",
}

// TypeScript interface for GetJobInput
export interface GetJobInput {
  status?: JobStatus;
}

// --- Apollo Client Hook ---

export function useJobs(
  options?: QueryHookOptions<{ getJob: Job[] }, { input?: GetJobInput }>
): QueryResult<{ getJob: Job[] }, { input?: GetJobInput }> {
  return useQuery(GET_JOBS, options);
}
