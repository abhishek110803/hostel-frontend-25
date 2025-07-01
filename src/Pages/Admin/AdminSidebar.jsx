import React, { useEffect, useState } from "react";
import { useSession } from "../../components/ProtectedPath/SessionContext";
import {
  DocumentTextIcon,
  PencilIcon,
  CheckCircleIcon,
  SearchIcon,
  LogoutIcon,
} from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { Done, Person } from "@mui/icons-material";
import { Database, Verified } from "lucide-react";

function AdminSidebar() {
  const { logout, session } = useSession();
  const [sidebarLinks, setSidebarLinks] = useState([]);

  const handleLogout = async () => {
    logout();
  };

  // Define all sidebar links
  const allSidebarLinks = [
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
  ];

  // Define clerk-only links
  const clerkSidebarLinks = [
    {
      to: "/DocumentVerification",
      label: "Document Verification",
      icon: CheckCircleIcon,
    },
  ];

  // Set sidebar links based on role
  useEffect(() => {
    if (session?.role === "admin") {
      setSidebarLinks(allSidebarLinks);
    } else if (session?.role === "clerk") {
      setSidebarLinks(clerkSidebarLinks);
    } else {
      setSidebarLinks([]);
    }
  }, [session?.role]);

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