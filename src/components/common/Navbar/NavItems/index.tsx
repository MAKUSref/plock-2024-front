import { NavLink, useNavigate } from "react-router-dom";
import { NavItem } from "..";

interface NavItemsProps {
  items: NavItem[];
  itemClassName?: string;
  itemChildren?: React.ReactNode;
  navbarVisible?: boolean;
  onClose?: () => void;
}

const NavItems = ({ items, itemClassName, itemChildren, navbarVisible = true, onClose }: NavItemsProps) => {
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
    onClose?.();
  }

  return (
    <>
      {items.map(({ path, title }, i) => (
        <NavLink
          key={i}
          to={path}
          className={() =>
            `${
              navbarVisible ? "text-caption" : "text-gray-200 hover:text-white"
            } font-medium text-base ${itemClassName}`
          }
          onClick={() => navigateTo(path)}
        >
          {title}
          {itemChildren}
        </NavLink>
      ))}
    </>
  );
};

export default NavItems;
