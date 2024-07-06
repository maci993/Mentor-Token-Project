import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import { useUser } from "./context/UserContext";

function App() {
  const { userRole } = useUser();

  return (
    <div style={{ display: "flex" }}>
      <SideBar role={userRole} />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
