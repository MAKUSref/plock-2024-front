import { RightOutlined } from "@ant-design/icons";
import { NavItem } from "..";
import NavItems from "../NavItems";
import LoginBtn from "../LoginBtn";
import { useAuth } from "@/redux/selectors";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

const HamburgerMenu = ({ isOpen, onClose, navItems }: HamburgerMenuProps) => {
  const isAuth = useAuth();
  return (
    <>
      <div
        className={`fixed md:hidden top-0 bottom-0 left-0 right-0 z-20 bg-black bg-opacity-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={onClose}
      ></div>

      <div
        className={`fixed top-0 bottom-0 left-0 w-5/6 bg-white p-8 z-30 duration-300 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pb-8">
          <div className="max-w-[200px] w-[200px]">
            <img className="w-full" src="/img/logo-main.svg" alt="..." />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <NavItems
            items={navItems}
            itemClassName="py-3 flex items-center"
            itemChildren={
              <button className="ml-auto">
                <RightOutlined />
              </button>
            }
          />
          {isAuth ? (
            // <ProfileDropdown navbarVisible={navbarVisible} />
            <></>
          ) : (
            <LoginBtn />
          )}
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
