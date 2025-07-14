


import React from "react";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header
      className="bg-gradient-to-r from-blue-900 to-blue-600 text-white py-3 lg:py-4 top-0 z-50 cursor-pointer"
      onClick={() => navigate("/")}
    >
      <div className="w-full h-20 md:h-32 relative">
        {/* <div className="absolute left-1/5 flex items-center h-full"> */}
        <div className="absolute left-[10%] flex items-center h-full">

          <img
            src={logo}
            alt="Logo"
            className="h-16 md:h-24 w-auto"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

