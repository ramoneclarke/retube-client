import React from "react";
import { FaRegMoon, FaRegSun } from "react-icons/fa";

const ColorModeButton = ({ darkMode, toggleDarkMode }) => {
  return darkMode ? (
    <FaRegMoon
      className="no-tap-highlight cursor-pointer text-[1.8rem] text-brand lg:text-[2rem]"
      onClick={toggleDarkMode}
    />
  ) : (
    <FaRegSun
      className="no-tap-highlight cursor-pointer text-[1.8rem] text-brand lg:text-[2rem]"
      onClick={toggleDarkMode}
    />
  );
};

export default ColorModeButton;
