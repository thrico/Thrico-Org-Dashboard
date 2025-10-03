import { Avatar, MenuProps, Progress, Typography } from "antd";
import {
  BellOutlined,
  BgColorsOutlined,
  CalendarOutlined,
  HomeOutlined,
  LogoutOutlined,
  MoneyCollectOutlined,
  PullRequestOutlined,
  RocketOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { MdGroup, MdLocalOffer, MdOutlineFeed } from "react-icons/md";
import { SiCodementor } from "react-icons/si";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { GrUserWorker } from "react-icons/gr";
import { BsPersonWorkspace } from "react-icons/bs";
import Link from "next/link";

import { LiaPollSolid } from "react-icons/lia";
import { Gamepad2, User, Wallpaper } from "lucide-react";

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
        icon: <HomeOutlined />,
      },
      {
        key: "feed",
        label: menuLink("/feed", "Feed"),
        icon: <MdOutlineFeed />,
      },
      {
        key: "members",
        label: menuLink("/members", "Memberships"),
        icon: <UserOutlined />,
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
        key: "cms",
        label: menuLink("/website-pages", "Manage Website"),
        icon: <UnorderedListOutlined />,
      },
    ],
  },
];

export const extendedItems = [
  {
    key: "feedback",
    label: menuLink("#", "Polls & Surveys"),
    icon: <LiaPollSolid size={18} />,
    children: [
      {
        key: "feedback-surveys",
        label: menuLink("/forms/feedback", "Surveys"),
      },
      {
        key: "feedback-polls",
        label: menuLink("/forms/polls", "Polls"),
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
    icon: <MdGroup />,
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
    icon: <HiOutlineShoppingBag />,
    children: [
      {
        key: "listing-approval",
        type: "group",
        label: menuLink("/listing/", "Manage Approvals"),
      },
      {
        key: "listing-customization",
        type: "group",
        label: menuLink("/listing/customization", "Customization"),
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
    icon: <SiCodementor />,
    children: [
      {
        key: "mentorship-approval",
        type: "group",
        label: menuLink("/mentorship/", "Manage Approvals"),
      },
      {
        key: "mentorship-customization",
        type: "group",
        label: menuLink("/mentorship/customization", "Customization"),
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
    icon: <CalendarOutlined />,
  },
  {
    key: "jobs",
    label: menuLink("/jobs", "Jobs"),
    icon: <GrUserWorker />,
    children: [
      {
        key: "job-approval",
        type: "group",
        label: menuLink("/jobs/", "Manage Approvals"),
      },
      {
        key: "job-customization",
        type: "group",
        label: menuLink("/jobs/customization", "Customization"),
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
    icon: <MdLocalOffer />,
    children: [
      {
        key: "offers-view",
        type: "group",
        label: menuLink("/offers/", "View Offers"),
      },
      {
        key: "offers-customization",
        type: "group",
        label: menuLink("/offers/customization", "Customization"),
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
    icon: <BsPersonWorkspace />,
    children: [
      {
        key: "career-centre-view",
        type: "group",
        label: menuLink("/career-centre/", "View Career Centre"),
      },
      {
        key: "career-centre-customization",
        type: "group",
        label: menuLink("/career-centre/customization", "Customization"),
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
    icon: <CalendarOutlined />,
  },
  {
    key: "wall-of-fame",
    label: menuLink("/wall-of-fame", "Wall of Fame"),
    icon: <Wallpaper />,
  },
  {
    key: "gamification",
    label: menuLink("/gamification", "Gamification"),
    icon: <Gamepad2 size={14} />,
  },
];

import React from "react";
import { getGetUser } from "../../../graphql/actions";

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
    icon: <SettingOutlined />,
    label: "Admin Settings",
    children: [
      {
        key: "system-activity",
        label: "System Activity",
        icon: <PullRequestOutlined />,
      },
      {
        key: "plan",
        label: menuLink("/settings/plan", "Plan Overview"),

        icon: <MoneyCollectOutlined />,
      },
      {
        type: "divider",
      },

      {
        key: "settings",

        label: menuLink("/settings", "All Settings"),
        icon: <SettingOutlined />,
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
        icon: <UserOutlined />,
        label: menuLink("/settings", "Your profile"),
      },
      {
        key: "notifications",
        icon: <BellOutlined />,
        label: "Activity & notifications",
      },
      {
        type: "divider",
      },
      {
        key: "theme",
        icon: <BgColorsOutlined />,

        label: menuLink("/theme", "Theme"),
      },
      {
        type: "divider",
      },

      {
        key: "upgrade",
        icon: <RocketOutlined />,
        label: menuLink("/settings/plan", "Upgrade Plan"),
      },

      {
        type: "divider",
      },
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: menuLink("/logout", "logout"),
      },
    ],
  },
];
