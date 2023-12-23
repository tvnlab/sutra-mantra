/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import logo from "@app/assets/img/layout/logoNonText.png";
import { appMenus } from "@app/utils/routes";
import Image from "next/image";

const Sidebar = (props: {
  open: boolean;
  onClose: React.MouseEventHandler<HTMLSpanElement>;
}) => {
  const { open, onClose } = props;
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all md:!z-50 lg:!z-50 xl:!z-0 dark:!bg-navy-800 dark:text-white ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute right-4 top-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[40px] mt-[50px] flex flex-col items-center`}>
        <Image className="h-[83px] w-[83px] rounded-lg" src={logo} alt="" />
        <div className="ml-1 font-alkatra text-[26px] font-medium text-orange-600">
          Sutra Mantra
        </div>
        <p className="text-yellow-600">Learn anytime, Practice anywhere</p>
      </div>
      <div className="mb-7 mt-[58px] h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={appMenus.filter((v) => v.showOnMenu)} />
      </ul>

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
