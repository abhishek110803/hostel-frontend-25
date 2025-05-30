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

  const sidebarLinks = [
    {
      to: "/HostelSummary",
      label: "Hostel Summary",
      icon: DocumentTextIcon,
    },
    {
      to: "/Allhostels",
      label: "Room Edits",
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
    <div className="bg-gray-100 shadow-md w-64 min-w-[250px] sticky top-0 h-screen overflow-y-auto md:block hidden">
      <div className="p-4">
        <nav className="flex flex-col gap-1">
          {sidebarLinks.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="py-2 px-4 flex items-center hover:bg-gray-200 rounded-md text-gray-700"
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="mt-4 bg-red-600 hover:bg-red-500 text-white font-semibold flex items-center px-4 py-2 rounded-md"
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
