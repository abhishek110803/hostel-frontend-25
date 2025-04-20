import React from "react";
import { Nav, Dropdown } from "react-bootstrap";
import {
  HomeIcon,
  KeyIcon,
  LogoutIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";

const Sidebar = ({ isOpen, onClose, handleLogout }) => {
  return (
    <div
      className={`bg-white p-4 ${
        isOpen ? "sidebar-open" : "sidebar-closed"
      } fixed top-0 left-0 h-full overflow-y-auto z-50 shadow-md`}
      style={{
        width: "250px",
        maxWidth: "80%",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <Nav className="flex flex-column">
        <Dropdown className="mb-3">
          <Dropdown.Toggle
            variant="link"
            id="dropdown-basic"
            className="custom-nav-link py-2 px-4 d-flex align-items-center"
          >
            <HomeIcon className="h-5 w-5 mr-2 inline-block" /> Home
            <ChevronDownIcon className="ml-auto h-5 w-5" />
          </Dropdown.Toggle>

          <Dropdown.Menu className="custom-dropdown-menu">
            <Dropdown.Item href="/Dashboard">Dashboard</Dropdown.Item>
            <Dropdown.Item href="/Profile">Profile</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className="mb-3">
          <Dropdown.Toggle
            variant="link"
            id="dropdown-basic"
            className="custom-nav-link py-2 px-4 d-flex align-items-center"
          >
            <KeyIcon className="h-5 w-5 mr-2 inline-block" /> Change Password
            <ChevronDownIcon className="ml-auto h-5 w-5" />
          </Dropdown.Toggle>

          <Dropdown.Menu className="custom-dropdown-menu">
            <Dropdown.Item href="/ChangePassword">
              Change Password
            </Dropdown.Item>
            <Dropdown.Item href="/Security">Security Settings</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Nav.Link onClick={handleLogout} className="custom-nav-link py-2 px-4">
          <LogoutIcon className="h-5 w-5 mr-2 inline-block" /> Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
