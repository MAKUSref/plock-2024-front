import { useGetSelfInfoQuery } from "@/redux/api/authApi";
import { clearAuthToken } from "@/redux/slice/auth";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Space } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

interface ProfileDropdownProps {
  navbarVisible?: boolean;
}

const ProfileDropdown = ({ navbarVisible }: ProfileDropdownProps) => {
  const { data: selfInfo } = useGetSelfInfoQuery();
  // const role = useUserRole();
  const dispatch = useDispatch();

  const items: MenuProps["items"] = [
    {
      label: (
        <Link className="text-base" to="/profile">
          Profil
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link className="text-base" to="/profile">
          Prelegenci
        </Link>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: <span className="text-red-500 text-base">Wyloguj się</span>,
      onClick: () => dispatch(clearAuthToken()),
      key: "3",
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space
          className={`${
            navbarVisible ? "text-black" : "text-white"
          } cursor-pointer`}
        >
          <UserOutlined />
          <span className="text-sm">
            {selfInfo?.name} {selfInfo?.surname}
          </span>
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default ProfileDropdown;
