import React from "react";
import {
  FaCog,
  FaHome,
  FaListAlt,
  FaRegHandScissors,
  FaSearchengin,
} from "react-icons/fa";
import SidebarButton from "./SidebarButton";

const Sidebar = () => {
  return (
    <div className="fixed hidden h-[calc(100vh-4rem)] w-1/5 min-w-[16rem] flex-col items-center justify-between bg-lightest pt-16 dark:bg-darkest lg:flex">
      <div className="flex w-full flex-col items-center gap-y-4">
        {navLinks.map((link) => (
          <SidebarButton link={link} key={link.text} />
        ))}
      </div>
      <div className="justify-left mb-4 flex h-11 w-5/6 cursor-pointer flex-row items-center gap-x-3 rounded-lg pl-3  hover:bg-lighter dark:hover:bg-dark">
        <SidebarButton
          link={{
            text: "Settings",
            icon: <FaCog size="1.3rem" className="text-brand" />,
            path: "/settings",
          }}
        />
      </div>
    </div>
  );
};

const navLinks = [
  {
    text: "Home",
    icon: <FaHome size="1.3rem" className="text-brand" />,
    path: "/",
  },
  {
    text: "Snippets",
    icon: <FaRegHandScissors size="1.3rem" className="text-brand" />,
    path: "/snippets",
  },
  {
    text: "Summaries",
    icon: <FaListAlt size="1.3rem" className="text-brand" />,
    path: "/summaries",
  },
  {
    text: "Search",
    icon: <FaSearchengin size="1.3rem" className="text-brand" />,
    path: "/search",
  },
];

export default Sidebar;