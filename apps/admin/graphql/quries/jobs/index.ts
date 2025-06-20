import { gql } from "@apollo/client";

export const ADD_JOB = gql`
  mutation AddJob($input: PostJobInput!) {
    addJob(input: $input) {
      id
      title
      description
      location
      jobType
      salary
      experienceLevel
      workplaceType
      applicationDeadline
      requirements
      responsibilities
      benefits
      skills
      isFeatured
      entity
      status

      company {
        id
        name
        logo
      }
      numberOfApplicant
      numberOfViews
      createdAt
    }
  }
`;

export const GET_JOBS = gql`
  query GetJob($input: GetJobInput) {
    getJob(input: $input) {
      id
      title
      description
      location
      jobType
      salary
      experienceLevel
      workplaceType
      applicationDeadline
      requirements
      responsibilities
      benefits
      skills
      isFeatured
      entity
      company {
        id
        name
        logo
      }
      status
      numberOfApplicant
      numberOfViews
      createdAt
    }
  }
`;

export const GET_JOB_STATS = gql`
  query GetJobStats {
    getJobStats {
      totalJobs
      activeJobs
      totalApplications
      totalViews
      avgApplications
      applicationsThisWeek
      applicationsLastWeek
      applicationsWeeklyChange
      viewsThisWeek
      viewsLastWeek
      viewsWeeklyChange
    }
  }
`;
