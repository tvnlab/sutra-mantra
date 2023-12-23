// Chakra Imports
// Custom Icons
import React from "react";

import { RiMoonFill, RiSunFill } from "react-icons/ri";
export default function FixedPlugin(props: { [s: string]: any }) {
  const { ...rest } = props;
  const [darkMode, setDarkMode] = React.useState(
    document.body.classList.contains("dark")
  );

  return (
    <button
      className="border-px fixed bottom-[30px] right-[35px] !z-[99] flex h-[60px] w-[60px] items-center justify-center rounded-full border-[#6a53ff] bg-gradient-to-br from-brandLinear to-blueSecondary p-0"
      onClick={() => {
        if (darkMode) {
          document.body.classList.remove("dark");
          setDarkMode(false);
        } else {
          document.body.classList.add("dark");
          setDarkMode(true);
        }
      }}
      {...rest}
    >
      <div className="cursor-pointer text-gray-600">
        {darkMode ? (
          <RiSunFill className="h-4 w-4 text-white" />
        ) : (
          <RiMoonFill className="h-4 w-4 text-white" />
        )}
      </div>
    </button>
  );
}
