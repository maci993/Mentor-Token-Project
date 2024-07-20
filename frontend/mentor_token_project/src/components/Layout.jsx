import React from "react";
import Header from "./Header";
import Footer from "./FooterSection";


const Layout = ({ nav = false, footer = false, children }) => {
    
  return (
    <>
      {nav && <Header />}
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>{children}</div>
      </div>
      {footer && <Footer />}
    </>
  );
};
//sidebar-ot da se dodade

export default Layout;
