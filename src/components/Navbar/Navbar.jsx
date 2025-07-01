import { useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, OfficeBuildingIcon, XIcon } from "@heroicons/react/solid";
import { Navbar, Container } from "react-bootstrap";
import {
  AcademicCapIcon,
  UserIcon,
  ClipboardListIcon,
  CogIcon,
  KeyIcon,
} from "@heroicons/react/outline"; // Import Heroicons
import { Download } from "@mui/icons-material";
import { useSession } from "../ProtectedPath/SessionContext";

// import schedule from "../Downloads/Hostel_allotment.pdf"
function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const downloadFileAtURL = (url) => {

    const fileName = url.split('/').pop()
    const aTag = document.createElement('a')
    aTag.href = url
    aTag.setAttribute('download', fileName)
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();

  }
  const { session } = useSession();

  // console.log('session a',session)

  const Schedule_url = 'https://drive.google.com/file/d/12XixvATiUnumOCUZWmOI-mZJdRRXcvpA/view';
  const Steps_url = 'https://drive.google.com/file/d/1RgQ0_VkJnNoLC6xXO8AIE-yUc_1BESZF/view';
  const Hostel_Availability_url = 'https://drive.google.com/file/d/12zPFHhPt8EhglLDLQVNKTX-ufiErMBIa/view';


  return (
    <Navbar
      expand="md"
      className="bg-gray-300 sticky top-0 w-full mb-4 shadow-sm z-50"
    >
      <Container fluid className="relative">
        <Navbar.Brand
          as={Link}
          to="/"
          className="text-blue-500 font-bold text-xl"
        >
          Hostel Allotment System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleMenu}>
          {isOpen ? (
            <XIcon className="h-6 w-6 text-blue-600" />
          ) : (
            <MenuIcon className="h-6 w-6 text-blue-600" />
          )}
        </Navbar.Toggle>
        <div className="hidden md:flex ml-auto items-center">
          <Link onClick={() => downloadFileAtURL(Hostel_Availability_url)} className="btn bg-blue-100 btn-outline-primary mx-1">
            <Download className="h-5 w-5 inline-block -mt-1 mr-1" />
            Room Availability
          </Link>

          <Link onClick={() => downloadFileAtURL(Schedule_url)} className="btn bg-blue-100 btn-outline-primary mx-1">
            <Download className="h-5 w-5 inline-block -mt-1 mr-1" />
            Schedule
          </Link>

          <Link
            onClick={() => downloadFileAtURL(Steps_url)} className="btn bg-blue-100 btn-outline-primary mx-1">
            <Download className="h-5 w-5 inline-block -mt-1 mr-1" />
            Steps
          </Link>

          <Link to="/Hostels" className="btn btn-outline-primary mx-1">
            <OfficeBuildingIcon className="h-5 w-5 inline-block -mt-1 mr-1" />
            Hostels
          </Link>
          <Link to="/Otp" className="btn btn-outline-primary mx-1">
            <OfficeBuildingIcon className="h-5 w-5 inline-block -mt-1 mr-1" />
            Otp
          </Link>
          {(!session) && <>
            <Link to="/SignUp" className="btn btn-outline-primary mx-1">
              <UserIcon className="h-5 w-5 inline-block -mt-1 mr-1" />
              Signup
            </Link>
            <Link to="/SignIn" className="btn  bg-blue-700 text-white btn-outline-primary mx-1">
              <ClipboardListIcon className="h-5 w-5 inline-block -mt-1 mr-1" />
              Login
            </Link>
          </>}
          {(session) && <>
            {(session.role === "user") &&
              <>
                <Link to="/RegistrationForm" className="btn  bg-blue-700 text-white btn-outline-primary mx-1">
                  <ClipboardListIcon className="h-5 w-5 inline-block -mt-1 mr-1" />
                  Dashboard
                </Link>
              </>
            }
          </>}

        </div>
        {isOpen && (
          <div className="absolute top-14 right-4 w-32 bg-white shadow-lg z-50 rounded-lg md:hidden">
            <div className="flex flex-col items-center py-2">
              <Link onClick={() => downloadFileAtURL(Hostel_Availability_url)}

                className="text-blue-600 hover:text-blue-700 py-2 w-full text-left ml-3"
              >
                <Download className="h-5 w-5 inline-block -mt-1 mr-1" />
                Room Availability
              </Link>
              <Link onClick={() => downloadFileAtURL(Schedule_url)}

                className="text-blue-600 hover:text-blue-700 py-2 w-full text-left ml-3"
              >
                <Download className="h-5 w-5 inline-block -mt-1 mr-1" />
                Schedule
              </Link>
              <Link onClick={() => downloadFileAtURL(Steps_url)}

                className="text-blue-600 hover:text-blue-700 py-2 w-full text-left ml-3"
              >
                <Download className="h-5 w-5 inline-block -mt-1 mr-1" />
                Steps
              </Link>
              <Link
                to="/Hostels"
                className="text-blue-600 hover:text-blue-700 py-2 w-full text-left ml-3"
              >
                <OfficeBuildingIcon className="h-5 w-5 inline-block -mt-1 mr-1" />
                Hostels
              </Link>
              {(!session) &&
                <>
                  {/* <Link
                    to="/SignUp"
                    className="text-blue-600 hover:text-blue-700 py-2 w-full text-left ml-3"
                  >
                    <UserIcon className="h-5 w-5 inline-block -mt-1 mr-1" />
                    Signup
                  </Link> */}
                  <Link
                    to="/SignIn"
                    className="text-blue-600  hover:text-blue-700 py-2 w-full text-left ml-3"
                  >
                    <ClipboardListIcon className="h-5 w-5 inline-block -mt-1 mr-1" />
                    Login
                  </Link>
                </>}
              {(session) && <>
                {(session.role === "user") &&
                  <Link
                    to='/RegistrationForm'
                    className="text-blue-600  hover:text-blue-700 py-2 w-full text-left ml-3"
                  >
                    <ClipboardListIcon className="h-5 w-5 inline-block -mt-1 mr-1" />
                    Dashboard
                  </Link>
                }
              </>}
              <Link
                to="/HostelSummary"
                className="text-blue-600 hover:text-blue-700 py-2 w-full text-left ml-3"
              >
                <CogIcon className="h-5 w-5 inline-block -mt-1 mr-1" />
                Admin
              </Link>
              <Link
                to="/Allhostels"
                className="text-blue-600 hover:text-blue-700 py-2 w-full text-left ml-3"
              >
                <CogIcon className="h-5 w-5 inline-block -mt-1 mr-1" />
                Temp
              </Link>
              <Link
                to="/AdminSignIn"
                className="text-blue-600 hover:text-blue-700 py-2 w-full text-left ml-3"
              >
                <KeyIcon className="h-5 w-5 inline-block -mt-1 mr-1" />
                Admin login
              </Link>
            </div>
          </div>
        )}
      </Container>
    </Navbar >
  );
}

export default NavBar;
