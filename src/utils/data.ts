
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
    title: "Аналитика",
    icon: AiOutlineFund,
  },
  {
    id: 2,
    path: "/analytic",
    title: "Заказы",
    icon: BsClipboardData,
  },
  {
    id: 3,
    path: "/sales",
    title: "Продукт",
    icon: BsCart2,
  },
  {
    id: 4,
    path: "/tasks",
    title: "Задача",
    icon: BsClipboard2Check,
  },
  {
    id: 5,
    path: "/info",
    title: "Клиент",
    icon: BsPersonGear,
  },
  {
    id: 6,
    path: "/history",
    title: "Хранилище",
    icon: BsClockHistory,
  },
  {
    id: 7,
    path: "/work",
    title: "Запасной",
    icon: BsPersonWorkspace,
  },
];
