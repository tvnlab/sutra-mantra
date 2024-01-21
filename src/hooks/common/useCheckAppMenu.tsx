import useAuthStore from "@app/hooks/stores/useAuthStore";
import { Routes } from "@app/utils/routes";
import { UserRole } from "@library/api/utils/constants";
import { useMemo } from "react";

import { MdBarChart, MdPerson, MdLock } from "react-icons/md";
import { FaBookOpen, FaPenAlt } from "react-icons/fa";
import { GiStairsGoal } from "react-icons/gi";
import { usePathname } from "next/navigation";

export const getAppMenus = (validViewPaths: Array<Routes>) => [
  {
    name: "My Homes",
    path: Routes.INDEX,
    icon: <GiStairsGoal className="h-6 w-6" />,
    showOnMenu: validViewPaths.some((v) => v === Routes.INDEX),
  },
  {
    name: "Transcribing",
    path: Routes.TRANSCRIBING,
    icon: <FaPenAlt className="h-6 w-6" />,
    showOnMenu: validViewPaths.some((v) => v === Routes.TRANSCRIBING),
  },
  {
    name: "Buddhist Resources",
    path: Routes.RESOURCES,
    icon: <FaBookOpen className="h-6 w-6" />,
    secondary: true,
    showOnMenu: validViewPaths.some((v) => v === Routes.RESOURCES),
  },
  {
    name: "Fellow Communities",
    path: Routes.COMMUNITIES,
    icon: <MdBarChart className="h-6 w-6" />,
    showOnMenu: validViewPaths.some((v) => v === Routes.COMMUNITIES),
  },
  {
    name: "Personal Settings",
    path: Routes.SETTINGS,
    icon: <MdPerson className="h-6 w-6" />,
    showOnMenu: validViewPaths.some((v) => v === Routes.SETTINGS),
  },
  {
    name: "Topics",
    path: Routes.TOPIC,
    icon: <MdLock className="h-6 w-6" />,
    showOnMenu: validViewPaths.some((v) => v === Routes.TOPIC),
  },
  {
    name: "Sign In",
    path: Routes.LOGIN,
    icon: <MdLock className="h-6 w-6" />,
    showOnMenu: false,
  },
  {
    name: "Sign Up",
    path: Routes.REGISTER,
    icon: <MdLock className="h-6 w-6" />,
    showOnMenu: false,
  },
];

const useCheckAppMenu = () => {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const appMenus = useMemo(() => {
    if (!user) return [];
    if (user.role === UserRole.ADMIN) {
      return getAppMenus(Object.values(Routes));
    }
    return getAppMenus(Object.values(Routes).filter((v) => v !== Routes.TOPIC));
  }, [user]);

  const isValidAccess = useMemo(() => {
    const index = appMenus.findIndex(
      (v) => v.path === pathname && Boolean(v.showOnMenu)
    );
    return index >= 0;
  }, [pathname, appMenus]);

  return {
    appMenus,
    isValidAccess,
  };
};

export default useCheckAppMenu;
