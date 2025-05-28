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
export const items: MenuProps["items"] = [
  {
    key: "General",

    label: (
      <Link href={"/"}>
        <Typography>Dashboard</Typography>
      </Link>
    ),
    icon: <MdDashboardCustomize />,
  },
  {
    key: "members",

    label: (
      <Link href={"/members"}>
        <Typography>Manage Members</Typography>
      </Link>
    ),
    children: [
      {
        key: "/members",
        type: "group",
        label: (
          <Link href={"/members/all"}>
            <Typography>Manage Approval</Typography>
          </Link>
        ),
      },
      {
        key: "/members",
        type: "group",
        label: (
          <Link href={"/members/settings"}>
            <Typography>Settings</Typography>
          </Link>
        ),
      },
    ],
    icon: <UserOutlined />,
  },
  {
    key: "feed",

    label: (
      <Link href={"/feed"}>
        <Typography>Feed</Typography>
      </Link>
    ),
    children: [
      {
        key: "/feed",

        label: (
          <Link href={"/feed/"}>
            <Typography>Feed</Typography>
          </Link>
        ),
      },

      {
        key: "/feed",

        label: (
          <Link href={"/feed/settings"}>
            <Typography>Settings</Typography>
          </Link>
        ),
      },
    ],
    icon: <MdOutlineFeed size={18} />,
  },

  {
    key: "discussionForum",

    label: (
      <Link href={"/discussion-forum"}>
        <Typography>Discussion Forum</Typography>
      </Link>
    ),
    children: [
      {
        key: "/discussion-forum",

        label: (
          <Link href={"/discussion-forum"}>
            <Typography>Discussion Forum</Typography>
          </Link>
        ),
      },

      {
        key: "/discussion-forum",

        label: (
          <Link href={"/discussion-forum/settings"}>
            <Typography>Settings</Typography>
          </Link>
        ),
      },
    ],
    icon: <LuMessagesSquare size={18} />,
  },

  {
    key: "feedback",

    label: (
      <Link href={"Feedback & Surveys"}>
        <Typography>Feedback & Surveys</Typography>
      </Link>
    ),
    children: [
      {
        key: "/forms/feedback",

        label: (
          <Link href={"/forms/feedback"}>
            <Typography>Feedback</Typography>
          </Link>
        ),
      },

      {
        key: "/forms/polls",

        label: (
          <Link href={"/forms/polls"}>
            <Typography>Polls</Typography>
          </Link>
        ),
      },

      {
        key: "/settings",

        label: (
          <Link href={"/feedback/settings"}>
            <Typography>Settings</Typography>
          </Link>
        ),
      },
    ],
    icon: <LiaPollSolid size={18} />,
  },
  {
    key: "communities",
    label: (
      <Link href={"/communities"}>
        <Typography>Communities</Typography>
      </Link>
    ),
    children: [
      {
        key: "/communities/approval",
        type: "group",
        label: (
          <Link href={"/communities/approval"}>
            <Typography>Manage Approvals</Typography>
          </Link>
        ),
      },
      {
        key: "/communities/customization",
        type: "group",
        label: (
          <Link href={"/communities/customization"}>
            <Typography>Customization</Typography>
          </Link>
        ),
      },
      {
        key: "/communities/settings",
        type: "group",
        label: (
          <Link href={"/communities/settings"}>
            <Typography>Setting</Typography>
          </Link>
        ),
      },
    ],
    icon: <MdGroup />,
  },

  {
    key: "mentorship",
    label: (
      <Link href={"/mentorship"}>
        <Typography>Mentorship</Typography>
      </Link>
    ),
    children: [
      {
        key: "/mentorship",
        type: "group",
        label: (
          <Link href={"/mentorship/"}>
            <Typography>Manage Approvals</Typography>
          </Link>
        ),
      },
      {
        key: "/mentorship/customization",
        type: "group",
        label: (
          <Link href={"/mentorship/customization"}>
            <Typography>Customization</Typography>
          </Link>
        ),
      },
      {
        key: "/mentorship/settings",
        type: "group",
        label: (
          <Link href={"/mentorship/settings"}>
            <Typography>Setting</Typography>
          </Link>
        ),
      },
    ],
    icon: <SiCodementor />,
  },
  {
    key: "Events",
    label: (
      <Link href={"/mentorship"}>
        <Typography>Events</Typography>
      </Link>
    ),

    icon: <CalendarOutlined />,
  },

  {
    key: "Listing",
    label: (
      <Link href={"/listing"}>
        <Typography>Listing</Typography>
      </Link>
    ),
    children: [
      {
        key: "/listing",
        type: "group",
        label: (
          <Link href={"/listing/"}>
            <Typography>Manage Approvals</Typography>
          </Link>
        ),
      },
      {
        key: "/listing/customization",
        type: "group",
        label: (
          <Link href={"/listing/customization"}>
            <Typography>Customization</Typography>
          </Link>
        ),
      },
      {
        key: "/listing/settings",
        type: "group",
        label: (
          <Link href={"/listing/settings"}>
            <Typography>Setting</Typography>
          </Link>
        ),
      },
    ],
    icon: <HiOutlineShoppingBag />,
  },

  {
    key: "Job",
    label: (
      <Link href={"/job"}>
        <Typography>Job</Typography>
      </Link>
    ),
    children: [
      {
        key: "/job",
        type: "group",
        label: (
          <Link href={"/job/"}>
            <Typography>Manage Approvals</Typography>
          </Link>
        ),
      },
      {
        key: "/job/customization",
        type: "group",
        label: (
          <Link href={"/job/customization"}>
            <Typography>Customization</Typography>
          </Link>
        ),
      },
      {
        key: "/job/settings",
        type: "group",
        label: (
          <Link href={"/job/settings"}>
            <Typography>Setting</Typography>
          </Link>
        ),
      },
    ],
    icon: <GrUserWorker />,
  },

  {
    key: "offers",
    label: (
      <Link href={"/offers"}>
        <Typography>Offers</Typography>
      </Link>
    ),
    children: [
      {
        key: "/job",
        type: "group",
        label: (
          <Link href={"/job/"}>
            <Typography>View Offers</Typography>
          </Link>
        ),
      },
      {
        key: "/offers/customization",
        type: "group",
        label: (
          <Link href={"/job/customization"}>
            <Typography>Customization</Typography>
          </Link>
        ),
      },
      {
        key: "/offers/settings",
        type: "group",
        label: (
          <Link href={"/job/settings"}>
            <Typography>Setting</Typography>
          </Link>
        ),
      },
    ],
    icon: <MdLocalOffer />,
  },

  {
    key: "career-centre",
    label: (
      <Link href={"/career-centre"}>
        <Typography>Career Centre</Typography>
      </Link>
    ),
    children: [
      {
        key: "/career-centre",
        type: "group",
        label: (
          <Link href={"/job/"}>
            <Typography>View Career Centre</Typography>
          </Link>
        ),
      },
      {
        key: "/career-centre/customization",
        type: "group",
        label: (
          <Link href={"/job/customization"}>
            <Typography>Customization</Typography>
          </Link>
        ),
      },
      {
        key: "/career-centre/settings",
        type: "group",
        label: (
          <Link href={"/job/settings"}>
            <Typography>Setting</Typography>
          </Link>
        ),
      },
    ],
    icon: <BsPersonWorkspace />,
  },
  {
    key: "announcements",
    label: (
      <Link href={"/announcements"}>
        <Typography>Announcements & Highlights</Typography>
      </Link>
    ),

    icon: <CalendarOutlined />,
  },

  {
    key: "/settings",
    label: (
      <Link href={"/settings"}>
        <Typography>Settings</Typography>
      </Link>
    ),

    children: [
      {
        key: "/settings/appearance",
        type: "group",
        label: (
          <Link href={"/settings/appearance"}>
            <Typography>Appearance</Typography>
          </Link>
        ),
      },
    ],
    icon: <SettingOutlined />,
  },

  {
    key: "cms",

    label: (
      <Link href={"/website"}>
        <Typography>Manage Website</Typography>
      </Link>
    ),

    icon: <UnorderedListOutlined />,
  },

  {
    key: "Logout",
    label: <Typography>Logout</Typography>,
    icon: <LogoutOutlined />,
  },
];
