import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <div className="flex justify-between items-center text-xl py-5 px-24 border-b-2">
      <Link to="/">
        <div className="flex items-center gap-2 ">
          <img src={Logo} alt="" /> <p className="font-semibold"> SIMS PPOB</p>
        </div>
      </Link>
      <div className="flex gap-4">
        <Link
          to="/top-up"
          className={`${
            location.pathname === "/top-up" ? "text-red-600" : ""
          } capitalize text-xl font-semibold`}
        >
          Top Up
        </Link>
        <Link
          to="/Transaction"
          className={`${
            location.pathname === "/Transaction" ? "text-red-600" : ""
          } capitalize text-xl font-semibold`}
        >
          Transaction
        </Link>
        <Link
          to="/Account"
          className={`${
            location.pathname === "/Account" ? "text-red-600" : ""
          } capitalize text-xl font-semibold`}
        >
          Akun
        </Link>
      </div>
    </div>
  );
};

export default Header;
