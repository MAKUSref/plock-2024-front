import PATHS from "@/router/paths";
import { Link, useLocation } from "react-router-dom";
import NavItems from "./NavItems";
import { MenuOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import HamburgerMenu from "./HumburgerMenu";
import LoginBtn from "./LoginBtn";
import { useAuth, useUserRole } from "@/redux/selectors";
import ProfileDropdown from "./ProfileDropdown";
import { getRoleName } from "@/utils/getRoleName";

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
    title: "Oferta",
    path: PATHS.ABOUT,
  },
  {
    title: "O nas",
    path: PATHS.ABOUT,
  },
  {
    title: "Kontakt",
    path: PATHS.ABOUT,
  },
];

const Navbar = () => {
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isAuth = useAuth();
  const location = useLocation();
  const userRole = useUserRole();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setNavbarVisible(true);
      } else {
        setNavbarVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed w-full z-10 transition-colors ${
          navbarVisible
            ? "bg-white shadow-md"
            : location.pathname.includes("courses")
            ? "bg-transparent"
            : "bg-[#3853CF]"
        }`}
      >
        <div className="container flex justify-between items-center py-3">
          <div className="flex items-center gap-6">
            <Link to={PATHS.HOME}>
              {navbarVisible ? (
                <img src="/img/logo-main.svg" alt="..." />
              ) : (
                <img src="/img/logo-main-light.svg" alt="..." className="h-6" />
              )}
            </Link>
            {userRole && (
              <p
                className={`${
                  navbarVisible ? "text-primary" : "text-white"
                }  uppercase tracking-wider font-semibold`}
              >
                {getRoleName(userRole)}
              </p>
            )}
          </div>
          <div className="hidden md:flex items-center gap-8">
            <NavItems
              items={NAV_ITEMS}
              onClose={() => setIsOpen(false)}
              navbarVisible={navbarVisible}
            />
            {isAuth ? (
              <ProfileDropdown navbarVisible={navbarVisible} />
            ) : (
              <LoginBtn />
            )}
          </div>
          <div className="block md:hidden">
            <button className="p-2" onClick={() => setIsOpen(true)}>
              <MenuOutlined />
            </button>
          </div>
        </div>
      </nav>
      <HamburgerMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navItems={NAV_ITEMS}
      />
    </>
  );
};

export default Navbar;
