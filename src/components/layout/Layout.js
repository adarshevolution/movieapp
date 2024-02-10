import React from "react";
import Fullwave from "../waves/FullWave";
import MobileWave from "../waves/MobileWave";

const Layout = ({ children }) => {
  return (
    <>
      {children}
      <Fullwave />
      <MobileWave />
    </>
  );
};

export default Layout;
