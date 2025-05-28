import { RxTextAlignLeft } from "react-icons/rx";
import { RxTextAlignJustify } from "react-icons/rx";
import { MdAlternateEmail, MdOutlineDateRange } from "react-icons/md";
import {
  FaBalanceScale,
  FaCheckCircle,
  FaListOl,
  FaPhone,
  FaRegStar,
} from "react-icons/fa";
import { IoIosArrowDropdown, IoIosLink, IoIosTimer } from "react-icons/io";
import { TbCircleDashedNumber1 } from "react-icons/tb";
import { CgPoll } from "react-icons/cg";

export const options = [
  {
    key: "SHORT_TEXT",
    label: "Short Text",
    icon: <RxTextAlignLeft size={18} />,
  },
  {
    key: "LONG_TEXT",
    label: "Long Text",
    icon: <RxTextAlignJustify size={18} />,
  },
  { key: "EMAIL", label: "Email", icon: <MdAlternateEmail size={18} /> },
  { key: "PHONE", label: "Phone Number", icon: <FaPhone size={18} /> },
  { key: "WEBSITE", label: "Website", icon: <IoIosLink size={18} /> },
  { key: "NUMBER", label: "Number", icon: <TbCircleDashedNumber1 size={18} /> },
  {
    key: "OPINION_SCALE",
    label: "Opinion Scale",
    icon: <CgPoll size={18} />,
  },
  { key: "RATING", label: "Rating", icon: <FaRegStar size={18} /> },
  {
    key: "MULTIPLE_CHOICE",
    label: "Multiple Choice",
    icon: <FaListOl size={18} />,
  },

  {
    key: "DROPDOWN",
    label: "Dropdown",
    icon: <IoIosArrowDropdown size={18} />,
  },
  { key: "DATE", label: "Date", icon: <MdOutlineDateRange size={18} /> },
  { key: "TIME", label: "Time", icon: <IoIosTimer size={18} /> },

  { key: "YES-NO", label: "Yes/No", icon: <FaCheckCircle size={18} /> },
];
