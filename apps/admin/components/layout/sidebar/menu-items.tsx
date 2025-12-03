import { Avatar, MenuProps, Progress, Typography } from "antd";

import Link from "next/link";

import {
  BellDotIcon,
  ChartBarIcon,
  CreditCard,
  FormInput,
  Gamepad2,
  GitPullRequest,
  Home,
  LogOutIcon,
  PaintbrushVerticalIcon,
  PaintBucketIcon,
  Rocket,
  Settings,
  User,
  User2,
  Users,
  Wallpaper,
} from "lucide-react";

const menuLink = (href: string, text: string) => (
  <Link href={href}>
    <Typography.Text>{text}</Typography.Text>
  </Link>
);

export const main = [
  {
    key: "g1",
    label: "Main",
    type: "group",
    children: [
      {
        key: "Home",
        label: menuLink("/", "Home"),
        icon: <Home size={18} />,
      },
      {
        key: "feed",
        label: menuLink("/feed", "Feed"),
        icon: <ChartBarIcon size={18} />,
      },
      {
        key: "members",
        label: menuLink("/members", "Memberships"),
        icon: <Users size={18} />,
      },
    ],
  },
];
export const settings = [
  {
    key: "g2",
    label: "Management",
    type: "group",
    children: [
      {
        icon: <PaintbrushVerticalIcon />,
        key: "cms",
        label: menuLink("/website-pages", "Manage Website"),
      },
    ],
  },
];

export const extendedItems = [
  {
    key: "polls",
    label: menuLink("/forms/polls", "Polls"),

    children: [
      {
        key: "polls-settings",
        label: menuLink("/polls/settings", "Settings"),
      },
    ],
  },
  {
    key: "surveys",
    label: menuLink("/forms/feedback", "Surveys"),

    children: [
      {
        key: "surveys-settings",
        label: menuLink("/surveys/settings", "Settings"),
      },
    ],
  },
  {
    key: "feedback",
    label: menuLink("/feedback", "Feedback"),

    children: [
      {
        key: "feedback-list",
        label: menuLink("/feedback/list", "All Feedback"),
      },
      {
        key: "feedback-settings",
        label: menuLink("/feedback/settings", "Settings"),
      },
    ],
  },
  {
    key: "communities",
    label: menuLink("/communities", "Communities"),

    children: [
      {
        key: "communities-approval",
        type: "group",
        label: menuLink("/communities/all", "Manage Approvals"),
      },
      {
        key: "communities-settings",
        type: "group",
        label: menuLink("/communities/settings", "Setting"),
      },
    ],
  },
  {
    key: "listing",
    label: menuLink("/listing", "Listing"),

    children: [
      {
        key: "listing-approval",
        type: "group",
        label: menuLink("/listing/", "Manage Approvals"),
      },

      {
        key: "listing-settings",
        type: "group",
        label: menuLink("/listing/settings", "Setting"),
      },
    ],
  },
  {
    key: "mentorship",
    label: menuLink("/mentorship", "Mentorship"),

    children: [
      {
        key: "mentorship-approval",
        type: "group",
        label: menuLink("/mentorship/", "Manage Approvals"),
      },

      {
        key: "mentorship-settings",
        type: "group",
        label: menuLink("/mentorship/settings", "Setting"),
      },
    ],
  },
  {
    key: "events",
    label: menuLink("/events", "Events"),
  },
  {
    key: "jobs",
    label: menuLink("/jobs", "Jobs"),

    children: [
      {
        key: "job-approval",
        type: "group",
        label: menuLink("/jobs/", "Manage Approvals"),
      },

      {
        key: "job-settings",
        type: "group",
        label: menuLink("/jobs/settings", "Setting"),
      },
    ],
  },
  {
    key: "offers",
    label: menuLink("/offers", "Offers"),

    children: [
      {
        key: "offers-view",
        type: "group",
        label: menuLink("/offers/", "View Offers"),
      },

      {
        key: "offers-settings",
        type: "group",
        label: menuLink("/offers/settings", "Setting"),
      },
    ],
  },

  {
    key: "career-centre",
    label: menuLink("/career-centre", "Career Centre"),

    children: [
      {
        key: "career-centre-view",
        type: "group",
        label: menuLink("/career-centre/", "View Career Centre"),
      },

      {
        key: "career-centre-settings",
        type: "group",
        label: menuLink("/career-centre/settings", "Setting"),
      },
    ],
  },
  {
    key: "announcements",
    label: menuLink("/announcements", "Announcements & Highlights"),
  },
  {
    key: "wall-of-fame",
    label: menuLink("/wall-of-fame", "Wall of Fame"),
  },
  {
    key: "gamification",
    label: menuLink("/gamification", "Gamification"),
  },
];

import React from "react";
import { getGetUser } from "../../../graphql/actions";
import { CgGitCommit } from "react-icons/cg";

export const UserDetails = () => {
  const { data: { getUser } = {}, error } = getGetUser();

  return getUser.firstName + " " + getUser.lastName;
};

const UserAvatar = () => {
  const { data: { getUser } = {}, error } = getGetUser();

  return (
    <Avatar
      size={15}
      shape="square"
      style={{ backgroundColor: "#87d068", marginRight: 10 }}
    >
      {getUser.firstName}
    </Avatar>
  );
};

export const profile = [
  {
    key: "sub1",
    icon: <Settings size={18} />,
    label: "Admin Settings",
    children: [
      {
        key: "system-activity",
        label: "System Activity",
        icon: <GitPullRequest size={18} />,
      },
      {
        key: "plan",
        label: menuLink("/settings/plan", "Plan Overview"),

        icon: <CreditCard size={18} />,
      },
      {
        type: "divider",
      },

      {
        key: "settings",

        label: menuLink("/settings", "All Settings"),
        icon: <Settings size={18} />,
      },
    ],
  },
  {
    key: "Pankaj Verma",
    icon: <UserAvatar />,
    label: <UserDetails />,
    children: [
      {
        key: "profile",
        icon: <User2 size={18} />,
        label: menuLink("/settings", "Your profile"),
      },
      {
        key: "notifications",
        icon: <BellDotIcon size={18} />,
        label: "Activity & notifications",
      },
      {
        type: "divider",
      },
      {
        key: "theme",
        icon: <PaintBucketIcon size={18} />,

        label: menuLink("/theme", "Theme"),
      },
      {
        type: "divider",
      },

      {
        key: "upgrade",
        icon: <Rocket size={18} />,
        label: menuLink("/settings/plan", "Upgrade Plan"),
      },

      {
        type: "divider",
      },
      {
        key: "logout",
        icon: <LogOutIcon size={18} />,
        label: menuLink("/logout", "logout"),
      },
    ],
  },
];
