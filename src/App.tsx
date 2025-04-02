import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import UseMyStore from "./store/my-store";
import Login from "./components/Login";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const login = UseMyStore((state) => state.user);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      {login ? (
        <div>
          <Navbar toggleCollapsed={toggleCollapsed} collapsed={collapsed} />
          <div className="flex gap-2">
            <Sidebar collapsed={collapsed} />
            <Main />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
