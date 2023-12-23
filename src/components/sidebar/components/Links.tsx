/* eslint-disable */
import React from "react";
import { usePathname } from "next/navigation";
import DashIcon from "@app/components/icons/DashIcon";
import Link from "next/link";
// chakra imports

export const SidebarLinks = (props: { routes: RoutesType[] }): JSX.Element => {
  // Chakra color mode
  let pathname = usePathname();
  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName: string) => {
    return pathname.includes(routeName);
  };

  const createLinks = (routes: RoutesType[]) => {
    return routes.map((route, index) =>  <Link key={index} href={route.path}>
    <div className="relative mb-3 flex hover:cursor-pointer">
      <li
        className="my-[3px] flex cursor-pointer items-center px-8"
        key={index}
      >
        <span
          className={`${
            activeRoute(route.path) === true
              ? "font-bold text-brand-500 dark:text-white"
              : "font-medium text-gray-600"
          }`}
        >
          {route.icon ? route.icon : <DashIcon />}{" "}
        </span>
        <p
          className={`leading-1 ml-4 flex ${
            activeRoute(route.path) === true
              ? "font-bold text-navy-700 dark:text-white"
              : "font-medium text-gray-600"
          }`}
        >
          {route.name}
        </p>
      </li>
      {activeRoute(route.path) ? (
        <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
      ) : null}
    </div>
  </Link>);
  };
  // BRAND
  return <>{createLinks(routes)}</>;
};

export default SidebarLinks;
