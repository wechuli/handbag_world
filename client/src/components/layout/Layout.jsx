import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const Layout = props => {
  return (
    <>
      <Header />
      <div className="page_container">{props.children}</div>
      <Footer />
    </>
  );
};

export default Layout;
