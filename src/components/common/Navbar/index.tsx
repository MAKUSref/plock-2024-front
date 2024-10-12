import PATHS from "@/router/paths";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import NavItems from "./NavItems";
import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import HumburgerMenu from "./HumburgerMenu";

export interface NavItem {
  title: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    title: "Strona Główna",
    path: PATHS.HOME,
  },
  {
    title: "Baza Szkoleń",
    path: PATHS.COURSES,
  },
  {
    title: "O nas",
    path: PATHS.ABOUT,
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed w-full bg-white">
        <div className="container flex justify-between items-center py-8">
          <div className="">
            <Link to={PATHS.HOME}>
              <img src="/img/logo-main.svg" alt="..." />
            </Link>
          </div>
          <div className="hidden md:flex gap-8">
            <NavItems items={NAV_ITEMS} onClose={() => setIsOpen(false)} />
            <NavLink to={PATHS.LOGIN} className="text-primary">
              Zaloguj się
            </NavLink>
          </div>
          <div className="block md:hidden">
            <button className="p-2" onClick={() => setIsOpen(true)}>
              <MenuOutlined />
            </button>
          </div>
        </div>
      </nav>
      <HumburgerMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navItems={NAV_ITEMS}
      />
    </>
  );
};

export default Navbar;
