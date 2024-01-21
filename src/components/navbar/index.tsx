import { Routes } from "@app/utils/routes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FiAlignJustify } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { RiMoonFill, RiSunFill, RiUser3Fill } from "react-icons/ri";

const Navbar = (props: {
  onOpenSideNav: () => void;
  brandText: string;
  secondary?: boolean | string;
}) => {
  const { onOpenSideNav, brandText } = props;

  const router = useRouter();

  const [darkMode, setDarkMode] = React.useState(true);
  const [isLoggedIn] = React.useState(false);

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <a
            className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href=" "
          >
            Home
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
              {" "}
              /{" "}
            </span>
          </a>
          <Link
            className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href="#"
          >
            {brandText}
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <Link
            href="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {brandText}
          </Link>
        </p>
      </div>

      <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2 dark:!bg-navy-800 dark:shadow-none">
        <div className="bg-lightPrimary flex h-full items-center rounded-full text-navy-700 xl:w-[365px] dark:bg-navy-900 dark:text-white">
          <p className="pl-3 pr-2 text-xl">
            <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
          </p>
          <input
            type="text"
            placeholder="Find everything..."
            className="bg-lightPrimary block h-full !w-full rounded-full text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 sm:w-fit dark:bg-navy-900 dark:text-white dark:placeholder:!text-white"
          />
        </div>
        <span
          className="flex cursor-pointer text-xl text-gray-600 xl:hidden dark:text-white"
          onClick={onOpenSideNav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>
        <div
          className="cursor-pointer text-gray-600"
          onClick={() => {
            if (darkMode) {
              document.body.classList.remove("dark");
              setDarkMode(false);
            } else {
              document.body.classList.add("dark");
              setDarkMode(true);
            }
          }}
        >
          {darkMode ? (
            <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
          )}
        </div>
        <div
          className="cursor-pointer text-gray-600"
          onClick={() => {
            if (isLoggedIn) {
              router.push(Routes.SETTINGS);
            } else {
              router.push(Routes.LOGIN);
            }
          }}
        >
          <RiUser3Fill className="h-4 w-4 text-gray-600 dark:text-white" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
