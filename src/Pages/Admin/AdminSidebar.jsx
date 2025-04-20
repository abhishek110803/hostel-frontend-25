import React from "react";

import { useSession } from "../../components/ProtectedPath/SessionContext";
import {
  DocumentTextIcon,
  PencilIcon,
  CheckCircleIcon,
  SearchIcon,
  LogoutIcon,
} from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { Edit } from "@mui/icons-material";

function AdminSidebar() {
   

  const { setSession, updateSession, logout } = useSession();

  const handleLogout = async () => {

    logout();


  }



  return (
    <div className="bg-gray-100 shadow-md w-[15%] sticky top-0 h-[1300px]">
      <div className="p-4">
        <nav className="flex flex-col">
          <Link
            to="/HostelSummary"
            className="custom-nav-link py-2 px-4 flex items-center hover:bg-gray-200"
          >
            <DocumentTextIcon className="h-5 w-5 mr-2" /> HostelSummary
          </Link>

          <Link
            to="/Allhostels"
            className="custom-nav-link py-2 px-4 flex items-center hover:bg-gray-200"
          >
            <PencilIcon className="h-5 w-5 mr-2" /> RoomEdits
          </Link>

          <Link
            to="/DocumentVerification"
            className="custom-nav-link py-2 px-4 flex items-center hover:bg-gray-200"
          >
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            Document Verification
          </Link>

          <Link
            to="/Search"
            className="custom-nav-link py-2 px-4 flex items-center hover:bg-gray-200"
          >
            <SearchIcon className="h-5 w-5 mr-2" />
            Search Student
          </Link>

          {/* <Link to="/Changepassword" className="btn btn-outline-white mt-5 bg-yellow-700  hover:bg-yellow-500 text-lg font-bold  btn-outline-white text-white mx-1">
            <Edit className="h-5 w-5 inline-block -mt-1 mr-1" />
            Change Password
          </Link> */}
          <Link  onClick={handleLogout}
          className="btn bg-red-700 mt-3 text-lg font-bold  btn-outline-white hover:bg-red-500 text-white mx-1">
            <LogoutIcon className="h-5 w-5 inline-block -mt-1 mr-1" />
            Logout
          </Link>

        </nav>
      </div>
    </div>
  );
}

export default AdminSidebar;
