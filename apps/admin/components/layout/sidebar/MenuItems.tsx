import { MenuProps, Typography } from "antd";
import {
  CalendarOutlined,
  LogoutOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  MdDashboardCustomize,
  MdGroup,
  MdLocalOffer,
  MdOutlineFeed,
} from "react-icons/md";
import { SiCodementor } from "react-icons/si";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { GrUserWorker } from "react-icons/gr";
import { BsPersonWorkspace } from "react-icons/bs";
import Link from "next/link";
import { LuMessagesSquare } from "react-icons/lu";
import { LiaPollSolid } from "react-icons/lia";
import { Gamepad2, Wallpaper } from "lucide-react";

type MenuItem = Required<MenuProps>["items"][number];

const menuLink = (href: string, text: string) => (
  <Link href={href}>
    <Typography.Text>{text}</Typography.Text>
  </Link>
);

export const items: MenuItem[] = [
  {
    key: "dashboard",
    label: menuLink("/", "Dashboard"),
    icon: <MdDashboardCustomize />,
  },
  {
    key: "members",
    label: menuLink("/members", "Memberships"),
    icon: <UserOutlined />,
    children: [
      {
        key: "members-approval",
        type: "group",
        label: menuLink("/members/all", "Manage Approval"),
      },
      {
        key: "members-settings",
        type: "group",
        label: menuLink("/members/settings", "Settings"),
      },
    ],
  },
  {
    key: "feed",
    label: menuLink("/feed", "Feed"),
    icon: <MdOutlineFeed size={18} />,
    children: [
      {
        key: "feed-all",
        label: menuLink("/feed/all", "Feed"),
      },
      {
        key: "feed-settings",
        label: menuLink("/feed/settings", "Settings"),
      },
    ],
  },
  {
    key: "discussion-forum",
    label: menuLink("/discussion-forum", "Forum"),
    icon: <LuMessagesSquare size={18} />,
    children: [
      {
        key: "discussion-forum-all",
        label: menuLink("/discussion-forum/all", "Discussion Forum"),
      },
      {
        key: "discussion-forum-settings",
        label: menuLink("/discussion-forum/settings", "Settings"),
      },
    ],
  },
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
    key: "job",
    label: menuLink("/job", "Job"),
    icon: <GrUserWorker />,
    children: [
      {
        key: "job-approval",
        type: "group",
        label: menuLink("/job/", "Manage Approvals"),
      },
      {
        key: "job-customization",
        type: "group",
        label: menuLink("/job/customization", "Customization"),
      },
      {
        key: "job-settings",
        type: "group",
        label: menuLink("/job/settings", "Setting"),
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
  {
    key: "settings",
    label: menuLink("/settings", "Settings"),
    icon: <SettingOutlined />,
    children: [
      {
        key: "settings-appearance",
        type: "group",
        label: menuLink("/settings/appearance", "Appearance"),
      },
    ],
  },
  {
    key: "cms",
    label: menuLink("/website", "Manage Website"),
    icon: <UnorderedListOutlined />,
  },
  {
    key: "logout",
    label: <Typography.Text>Logout</Typography.Text>,
    icon: <LogoutOutlined />,
  },
];
