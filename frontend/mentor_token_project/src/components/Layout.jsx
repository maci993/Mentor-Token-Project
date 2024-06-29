import React from "react";
import Header from "./Header";
import Footer from "./FooterSection"

const Layout = ({nav=false,footer=false,children}) => {
    return (
        <>
        {nav&& <Header/>}
        {children}
        {footer && <Footer/>}
        </>
    )
}

export default Layout;