import PATHS from "@/router/paths";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const NAV_ITEMS = [
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
  return (
    <nav className="fixed w-full bg-white">
      <div className="container flex justify-between py-8">
        <div className="">
          <Link to={PATHS.HOME}>
            <img src="/img/logo-main.svg" alt="..." />
          </Link>
        </div>
        <div className="flex gap-8">
          {NAV_ITEMS.map(({ path, title }, i) => (
            <NavLink
              key={i}
              to={path}
              className={({ isActive }) =>
                `${
                  isActive ? "text-gray-900" : "text-gray-500"
                } hover:text-gray-900`
              }
            >
              {title}
            </NavLink>
          ))}
          <NavLink to={PATHS.LOGIN} className="text-primary">Zaloguj się</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
