import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import Buyurtmalar from "../pages/Buyurtmalar";
import Mahsulotlar from "../pages/Mahsulotlar";
import Kategariyalar from "../pages/Kategariyalar";
import Mijozlar from "../pages/Mijozlar";
import Bannerlar from "../pages/Bannerlar";

function Main() {
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buyurtmalar" element={<Buyurtmalar />} />
        <Route path="/mahsulotlar" element={<Mahsulotlar />} />
        <Route path="/kategoriyalar" element={<Kategariyalar />} />
        <Route path="/mijozlar" element={<Mijozlar />} />
        <Route path="/bannerlar" element={<Bannerlar />} />
      </Routes>
    </div>
  );
}

export default Main;
