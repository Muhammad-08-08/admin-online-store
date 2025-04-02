import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProfileOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import useMyStore from "../store/my-store";

const items = [
  {
    key: "1",
    label: "Profile",
    icon: <ProfileOutlined />,
  },
  {
    key: "2",
    label: "Settings",
    icon: <SettingOutlined />,
  },
  {
    key: "3",
    label: "Logout",
    icon: <LogoutOutlined />,
    danger: true,
    onClick: () => {
      useMyStore.getState().logout();
    },
  },
];

function Navbar({ collapsed, toggleCollapsed }: any) {
  return (
    <div className="py-6 px-7 bg-gray-900 flex justify-between">
      <div className="flex gap-4 items-center">
        <h2 className="text-2xl text-white">Logo</h2>
        <Button type="primary" onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <div>
        <Dropdown menu={{ items }}>
          <Space>
            <h2 className="text-2xl text-white">Admin</h2>
          </Space>
        </Dropdown>
      </div>
    </div>
  );
}

export default Navbar;
