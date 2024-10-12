import { NavLink, useNavigate } from "react-router-dom";
import { NavItem } from "..";

interface NavItemsProps {
  items: NavItem[];
  itemClassName?: string;
  itemChildren?: React.ReactNode;
  onClose?: () => void;
}

const NavItems = ({ items, itemClassName, itemChildren, onClose }: NavItemsProps) => {
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
          className={({ isActive }) =>
            `${
              isActive ? "text-gray-900" : "text-caption"
            } hover:text-gray-900 text-base ${itemClassName}`
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
