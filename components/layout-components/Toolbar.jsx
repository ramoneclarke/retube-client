import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import ColorModeButton from "./ColorModeButton";
import Logo from "./Logo";
import UserAccountButton from "./UserAccountButton";
import { useColorMode } from "@/context/ColorModeContext";

const Toolbar = ({ setOpen, menuClicked, setMenuClicked }) => {
  const { darkMode, toggleDarkMode } = useColorMode();
  const handleClick = () => {
    if (!menuClicked) {
      setOpen(true);
      setMenuClicked(true);
    }
  };
  return (
    <nav className="flex h-20 flex-row items-center justify-between bg-lightest shadow-2xl dark:bg-darkest lg:bg-lighter">
      <Logo />
      <div className="flex gap-6 pr-4">
        <ColorModeButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        {/* <Link href="/account">
          <FaUserCircle className="cursor-pointer text-[1.8rem] text-brand lg:text-[2rem]" />
        </Link> */}
        <UserAccountButton />
        <AiOutlineMenu
          className="block cursor-pointer text-[1.8rem] text-brand lg:hidden lg:text-[2rem]"
          onClick={handleClick}
        />
      </div>
    </nav>
  );
};

export default Toolbar;