import React from "react";

import Logo from "../common/Logo";
import NavActions from "./NavActions";

const Navbar = () => {
  return (
    <nav className="w-full border-b-[0.5px] flex items-center justify-between py-5">
      <Logo />
      <NavActions />
    </nav>
  );
};

export default Navbar;
