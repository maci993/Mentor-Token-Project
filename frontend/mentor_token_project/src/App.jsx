import React from "react";
import { Outlet } from "react-router-dom";
// import SideBar from "./components/SideBar";
// import { useUser } from "./context/UserContext";
import "./App.css";

function App() {
  // const { userRole } = useUser();

  return (
    <div style={{ display: "flex" }}>
      {/* <SideBar /> */}
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
