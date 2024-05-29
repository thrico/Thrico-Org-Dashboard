export interface stepProps {
  title: string;
  company: string | null;
  visibility: string;
  website: string | null;
  challengeMode: string;
  location: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
}

export interface step2Props {
  contactPersonFullName: string | null;
  contactPersonEmail: string | null;
  contactPersonPhone: string | null;
}

export interface step3Props {
  participationType: string | null;
  minMember: number | null;
  maxMember: number | null;
  time: any;
  noOfRegistration: number | null;
}
