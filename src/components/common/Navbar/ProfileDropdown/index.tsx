import { clearAuthToken } from "@/redux/slice/auth";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Space } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

interface ProfileDropdownProps {
  navbarVisible?: boolean;
}

const ProfileDropdown = ({ navbarVisible }: ProfileDropdownProps) => {
  const dispatch = useDispatch();

  const items: MenuProps['items'] = [
    {
      label: <Link className="text-base" to="/profile">Profil</Link>,
      key: '0',
    },
    {
      label: <Link className="text-base" to="/profile">Twoje kursy</Link>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: 'Wyloguj się',
      onClick: () => dispatch(clearAuthToken()),
      key: '3',
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <a onClick={(e) => e.preventDefault()}>
        <Space className={`${navbarVisible ? "text-black" : "text-white"} cursor-pointer`}>
          <UserOutlined />
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
}

export default ProfileDropdown;
