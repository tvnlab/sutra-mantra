// Admin Imports
import MyHomes from "@app/views/admin/my-home";
import NFTMarketplace from "@app/views/admin/marketplace";
import Profile from "@app/views/admin/profile";
import DataTables from "@app/views/admin/tables";
import Transcribing from "@app/views/admin/transcribing";

// Auth Imports
import SignIn from "@app/views/auth/SignIn";
import SignUp from "@app/views/auth/SignUp";

// Icon Imports
import {
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";
import { FaBookOpen, FaPenAlt } from "react-icons/fa";
import { GiStairsGoal } from "react-icons/gi";



export enum Routes {
  INDEX = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  TRANSCRIBING = '/transcribing',
  RESOURCES = '/resources',
  COMMUNITIES = '/communities',
  SETTINGS = '/settings'
}

export const appMenus = [
  {
    name: "My Homes",
    path: Routes.INDEX,
    icon: <GiStairsGoal className="h-6 w-6" />,
    component: <MyHomes />,
    showOnMenu: true,
  },
  {
    name: "Transcribing",
    path: Routes.TRANSCRIBING,
    icon: <FaPenAlt className="h-6 w-6" />,
    component: <Transcribing />,
    showOnMenu: true,
  },
  {
    name: "Buddhist Resources",
    path: Routes.RESOURCES,
    icon: <FaBookOpen className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
    showOnMenu: true,
  },
  {
    name: "Fellow Communities",
    path: Routes.COMMUNITIES,
    icon: <MdBarChart className="h-6 w-6" />,
    component: <DataTables />,
    showOnMenu: true,
  },
  {
    name: "Personal Settings",
    path: Routes.SETTINGS,
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
    showOnMenu: true,
  },
  {
    name: "Sign In",
    path: Routes.LOGIN,
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
    showOnMenu: false,
  },
  {
    name: "Sign Up",
    path: Routes.REGISTER,
    icon: <MdLock className="h-6 w-6" />,
    component: <SignUp />,
    showOnMenu: false,
  },
];

