// import home from "../assets/home.svg";

// react-icons:
import { AiOutlineFund } from "react-icons/ai";
import { BsClipboard2Check } from "react-icons/bs";
import { BsCart2 } from "react-icons/bs";
import { BsClipboardData } from "react-icons/bs";
import { BsClockHistory } from "react-icons/bs";
import { BsPersonWorkspace } from "react-icons/bs";
import { BsPersonGear } from "react-icons/bs";

export const menu = [
  {
    id: 1,
    path: "/",
    title: "Storage",
    icon: BsClipboardData,
  },
  {
    id: 2,
    path: "/analytic",
    title: "analytic",
    icon: AiOutlineFund,
  },
  {
    id: 3,
    path: "/sales",
    title: "Sales",
    icon: BsCart2,
  },
  {
    id: 4,
    path: "/deadline",
    title: "Task",
    icon: BsClipboard2Check,
  },
  {
    id: 5,
    path: "/info",
    title: "Client Info",
    icon: BsPersonGear,
  },
  {
    id: 6,
    path: "/history",
    title: "History",
    icon: BsClockHistory,
  },
  {
    id: 7,
    path: "/work",
    title: "Work",
    icon: BsPersonWorkspace,
  },
];
