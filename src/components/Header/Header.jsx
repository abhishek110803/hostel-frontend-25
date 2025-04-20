import React from "react";
import logo from "../../assets/images/logo.png"; // Ensure the path is correct
import { Navigate, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-600 text-white py-3 lg:py-4 top-0 z-50" onClick={()=>navigate('/')}>
      <div className="flex justify-center items-center w-full h-20 md:h-32">
        <img
          src={logo}
          alt="Logo"
          className="h-16 sm:h-16 md:h-24 w-auto lg:mr-[800px]"
        />
      </div>
    </header>
  );
};

export default Header;
