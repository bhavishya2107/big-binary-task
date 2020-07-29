import React from "react";
import logo from "../logo/spacex.png";

const Navbar = () => {
  return (
    <nav className="navbar bg-color">
      <h4>
        {" "}
        <img src={logo} height="50px" width="225px" />
      </h4>
    </nav>
  );
};

export default Navbar;
