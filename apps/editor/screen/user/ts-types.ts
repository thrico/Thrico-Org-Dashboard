export interface userData {
  alumni: name;
  alumniOrganizationProfile: alumniOrganizationProfile;
  alumniProfile: profile;
  aboutAlumni: about;
}
export interface name {
  firstName: String;
  lastName: String;
  email: String;
}
export interface alumniOrganizationProfile {
  isApproved: Boolean;
  isRequested: Boolean;
}

export interface profile {
  country: string;
  language: string;
  phone: phone;

  education: [education];
  experience: [experience];

  DOB: string;
}
export interface about {
  currentPosition: string;
  linkedin: string;
  instagram: string;
  portfolio: string;
}
export interface education {
  id: String;
  school: String;
  degree: String;
  grade: String;
  activities: String;
  description: String;
  duration: [String];
}

export interface experience {
  id: String;
  companyName: String;
  duration: [String];
  employmentType: String;
  location: String;
  locationType: String;
  title: String;
}
export interface phone {
  areaCode: String;
  countryCode: Number;
  isoCode: String;
  phoneNumber: String;
}

export interface userProps {
  data: [userData];
  loading: boolean;
}

export interface list {
  dataSource: userData[];
  setDataSource: (about: userData[]) => void;
  loading: boolean;
}
