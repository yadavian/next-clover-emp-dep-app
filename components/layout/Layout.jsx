import React from "react";
import { useSelector } from "react-redux";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Sidenav from "./components/sidenav/Sidenav";

const Layout = ({ children }) => {
  const login = useSelector((state) => state.login);
  const { data, userType } = login;
  return (
    <>
      <div className="layout-page">
        {userType != "employee" && <Sidenav />}
        <div className="layout-right-section">
          <Header />
          <div className="layout-middle-section">{children}</div>
          <Footer />

        </div>
      </div>
    </>
  );
};

export default Layout;
