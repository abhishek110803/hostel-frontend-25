import React from "react";
import { useSession } from "../../components/ProtectedPath/SessionContext";
import {
  DocumentTextIcon,
  PencilIcon,
  CheckCircleIcon,
  SearchIcon,
  LogoutIcon,
  DocumentAddIcon,
} from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { Done, Person } from "@mui/icons-material";
import { Database, Edit, Verified } from "lucide-react";

function AdminSidebar() {
  const { logout } = useSession();

  const handleLogout = async () => {
    logout();
  };

  // Sidebar links array
  const sidebarLinks = [
    {
      to: "/HostelSummary",
      label: "HostelSummary",
      icon: DocumentTextIcon,
    },
    {
      to: "/Allhostels",
      label: "RoomEdits",
      icon: PencilIcon,
    },
    {
      to: "/DocumentVerification",
      label: "Document Verification",
      icon: CheckCircleIcon,
    },
    {
      to: "/Search",
      label: "Search Student",
      icon: SearchIcon,
    },
    {
      to: "/Student_profile",
      label: "Update Student Profile",
      icon: Person,
    },
    {
      to: "/skip_clerk",
      label: "Skip clerk Verification",
      icon: Verified,
    },
    {
      to: "/EditDB",
      label: "Edit Database",
      icon: Database,
    },
    {
      to: "/BookRoomByAdmin",
      label: "Book Room",
      icon: Done,
    },
    {
      to: "/AdminMandatoryDocs",
      label: "Admin Mandatory Docs",
      icon: DocumentAddIcon,
    },
  ];

  return (
    <div className="bg-gray-100 shadow-md w-[20%] sticky top-0 h-[1300px]">
      <div className="p-4">
        <nav className="flex flex-col">
          {sidebarLinks.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="custom-nav-link py-2 px-4 flex items-center hover:bg-gray-200"
            >
              <item.icon className="h-5 w-5 mr-2" />
              {item.label}
            </Link>
          ))}

          {/* Logout button (not a Link) */}
          <button
            onClick={handleLogout}
            className="btn bg-red-700 mt-3 text-lg font-bold hover:bg-red-500 text-white mx-1 flex items-center px-4 py-2"
          >
            <LogoutIcon className="h-5 w-5 mr-2" />
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
}

export default AdminSidebar;
