export interface DataType {
  slug: String;
  title: String;
  creator: String;
  organization: String;
  cover: String;
  isApproved: Boolean;
  isBlocked: Boolean;
  isPaused: Boolean;
  isActive: Boolean;
  about: String;
  createdAt: Date;
  updatedAt: Date;
  setting: setting;
  theme: theme;
  interest: interest;
}
export interface theme {
  title: String;
}

export interface interest {
  title: String;
}
export interface setting {
  groupType: String;
  joiningCondition: String;
  privacy: String;
}
