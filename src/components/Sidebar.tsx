import {
  HomeOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  TagsOutlined,
  UserOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router";

function Sidebar({ collapsed }: { collapsed: boolean }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div
      className="h-screen bg-gray-900 text-white shadow-lg transition-all duration-300 select-none overflow-y-auto"
      style={{ width: collapsed ? 80 : 250 }}
    >
      <Menu
        className="px-4 py-6"
        selectedKeys={[location.pathname]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={[
          {
            key: "/",
            label: "Home",
            icon: <HomeOutlined />,
            onClick: () => navigate("/"),
          },
          {
            key: "/buyurtmalar",
            label: "Buyurtmalar",
            icon: <ShoppingCartOutlined />,
            onClick: () => navigate("/buyurtmalar"),
          },
          {
            key: "/mahsulotlar",
            label: "Mahsulotlar",
            icon: <AppstoreOutlined />,
            onClick: () => navigate("/mahsulotlar"),
          },
          {
            key: "/kategoriyalar",
            label: "Kategoriyalar",
            icon: <TagsOutlined />,
            onClick: () => navigate("/kategoriyalar"),
          },
          {
            key: "/mijozlar",
            label: "Mijozlar",
            icon: <UserOutlined />,
            onClick: () => navigate("/mijozlar"),
          },
          {
            key: "/bannerlar",
            label: "Bannerlar",
            icon: <PictureOutlined />,
            onClick: () => navigate("/bannerlar"),
          },
        ]}
      />
    </div>
  );
}

export default Sidebar;
