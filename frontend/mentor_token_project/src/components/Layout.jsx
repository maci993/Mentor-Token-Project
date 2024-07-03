import React from "react";
import Header from "./Header";
import Footer from "./FooterSection";
import SideBar from "./SideBar";

const Layout = ({ nav = false, footer = false, sidebar = false, children }) => {
    
  return (
    <>
      {nav && <Header />}
      <div style={{ display: "flex" }}>
        {sidebar && <SideBar />}
        <div style={{ flex: 1 }}>{children}</div>
      </div>
      {footer && <Footer />}
    </>
  );
};
//sidebar-ot da se dodade

export default Layout;
