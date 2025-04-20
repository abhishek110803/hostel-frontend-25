import React, { useEffect, useState } from "react";
import ClerkPanel from "./ClerkPanel";
import WardenPanel from "./WardenPanel";
import { useSession } from "../../components/ProtectedPath/SessionContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../../components/Header/Header";
import AdminSidebar from "./AdminSidebar";
import { Sidebar } from "rsuite";

const AdminPanel = () => {
  const [role, setRole] = useState("warden"); // Default role set to "warden"

  const { session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      setRole(session?.role);
    } else {
      toast.error("Please sign in before viewing this page.");
      navigate("/SignIn");
    }
  }, [session, navigate]);

  return (
    <div>
      {role === "warden" && <AdminSidebar />}{" "}
      {/* Render Navbar only if role is "warden" */}
      {/* Comment this div after */}
      <div className="role-switch mb-4">
        <button
          onClick={() => setRole("clerk")}
          className="btn btn-primary m-2"
        >
          Clerk
        </button>
        <button
          onClick={() => setRole("warden")}
          className="btn btn-primary m-2"
        >
          Warden
        </button>
      </div>
      {role === "clerk" && <ClerkPanel />}
      {role === "warden" && <WardenPanel />}
    </div>
  );
};

export default AdminPanel;
