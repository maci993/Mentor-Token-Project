import React from "react";
import Header from "./Header";
import Footer from "./FooterSection";

const Layout = ({ nav = false, footer = false, children }) => {
  return (
    <>
      {nav && <Header />}
      <div style={{ display: "flex", maxWidth: "1440px" }}>
        <div style={{ flex: 1 }}>{children}</div>
      </div>
      {footer && <Footer />}
    </>
  );
};

export default Layout;
