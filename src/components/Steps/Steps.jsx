import { useState } from "react";
import { Link } from "react-router-dom";
import { HomeIcon, LogoutIcon, MenuIcon, XIcon } from "@heroicons/react/solid";
import { Navbar, Container } from "react-bootstrap";
import {
  AcademicCapIcon,
  UserIcon,
  ClipboardListIcon,
  CogIcon,
  KeyIcon,
} from "@heroicons/react/outline"; // Import Heroicons
import React from "react";
// import { Navbar,  Nav, Dropdown } from "react-bootstrap";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import StepProcessBar from "../StepProcessBar/StepProcessBar";
import { useSession } from "../ProtectedPath/SessionContext";
import axiosInstance from "../../Helper/axiosInstance";
import toast from "react-hot-toast";
import { Edit } from "@mui/icons-material";
import ProcessBar from "../StepProcessBar/ProcessBar";

function NavBar1() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  const { setSession, updateSession, logout } = useSession();

  const handleLogout = async () => {
    logout();
  };

  const { session } = useSession();
  console.log("#$# ---- File B -- ", session);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar
      expand="md"
      className="bg-blue-500 sticky top-0 w-full mb-4  shadow-sm z-50"
    >
      <Container fluid className="relative">
        <div className="flex items-center mx-3">
          <button
            onClick={handleBack}
            className="text-black hover:text-white focus:outline-none"
          >
            <HomeIcon className="h-6 text-white w-6" />
          </button>
          <Navbar.Brand
            onClick={() => navigate("/")}
            className="text-lg font-bold mx-3 cursor-pointer"
          >
            <span className="text-white">Home</span>
          </Navbar.Brand>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleMenu}>
          {isOpen ? (
            <XIcon className="h-6 w-6  text-white" />
          ) : (
            <MenuIcon className="h-6 w-6  text-white" />
          )}
        </Navbar.Toggle>
        <div className="hidden md:flex ml-auto items-center">
          <Link to="/" className="btn btn-outline-primary bg-white mx-1">
            <AcademicCapIcon className="h-5 w-5 inline-block -mt-1 mr-1" />
            Home
          </Link>
          <UserIcon className="h-5 w-5 inline-block -mt-1 mr-1 text-white" />
          <span className="mr-3 text-lg font-bold text-white">
            {" "}
            {session?.application_id} {session?.roll}{" "}
          </span>
          <Link
            to="/Changepassword"
            className="btn btn-outline-white bg-yellow-700  hover:bg-yellow-500 text-lg font-bold  btn-outline-white text-white mx-1"
          >
            <Edit className="h-5 w-5 inline-block -mt-1 mr-1" />
            Change Password
          </Link>
          <Link
            onClick={handleLogout}
            className="btn bg-red-700 text-lg font-bold  btn-outline-white hover:bg-red-500 text-white mx-1"
          >
            <LogoutIcon className="h-5 w-5 inline-block -mt-1 mr-1" />
            Logout
          </Link>
        </div>
        {isOpen && (
          <div className="absolute top-14 right-4 w-52 bg-white shadow-lg z-50 rounded-lg md:hidden">
            <div className="flex flex-col items-center">
              <Link
                to="/"
                className="text-blue-600 hover:text-blue-700 py-2 w-full text-left ml-3"
              >
                <AcademicCapIcon className="h-5 w-5 inline-block -mt-1 mr-1" />
                Home
              </Link>
              <div className="d-md-none px-10">
                {session.isSingle === true ? (
                  <ProcessBar />
                ) : (
                  <StepProcessBar />
                )}
              </div>
              <span className="text-lg font-bold text-white py-2 w-full text-left ml-3">
                {" "}
                <UserIcon className="h-5 w-5 inline-block -mt-1 mr-1" />
                <div>
                  {session?.application_id} {session?.roll}
                </div>
              </span>
              <Link
                to="/Changepassword"
                className="text-blue-600 hover:text-blue-700 py-2 text-lg font-bold w-full text-left ml-3"
              >
                <Edit className="h-5 w-5 inline-block -mt-1 mr-1" />
                Change Password
              </Link>
              <Link
                onClick={handleLogout}
                className="text-blue-600 hover:text-blue-700 text-lg font-bold  py-2 w-full text-left ml-3"
              >
                <LogoutIcon className="h-5 w-5 inline-block -mt-1 mr-1" />
                Logout
              </Link>
            </div>
          </div>
        )}
      </Container>
    </Navbar>
  );
}

export default NavBar1;
