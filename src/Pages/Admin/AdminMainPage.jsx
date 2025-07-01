import { useState } from "react";
// import { useSession } from "../../path/to/your/SessionProvider"; 
import { useSession } from "../../components/ProtectedPath/SessionContext";
import Search1 from "./SearchRoll/Search1";
import DocumentVerification from "./DocumentVerification";
import Rmedt from "./Rmedt/Rmedt";
import StudentProfile from "./Student_profile/Student_profile";
import Skip_Clerk from "./Skip_clerk/Skip_clerk";
import EditDatabase from "./EditDB/EditDatabase";
import BookRoom from "./BookRoom/BookRoom";

export default function AdminMainPage() {
  const [popup, setPopup] = useState("none");
  const { session } = useSession();

  // Define all features
  const allFeatures = [
    "Allow Disallow Students",
    "Verify Student Docs",
    "Edit Rooms",
    "Edit Database",
    "StudentProfile",
    "Skip Clerk",
    "Book Room",
  ];

  // Define features based on role
  const getAvailableFeatures = () => {
    if (session?.role === "admin") {
      return allFeatures;
    } else if (session?.role === "clerk") {
      return ["Verify Student Docs"];
    }
    return [];
  };

  const availableFeatures = getAvailableFeatures();

  const renderPopupContent = (feature) => {
    switch (feature) {
      case "Allow Disallow Students":
        return <Search1 />;
      case "Verify Student Docs":
        return <DocumentVerification />;
      case "Edit Rooms":
        return <Rmedt />;
      case "Edit Database":
        return <EditDatabase />;
      case "StudentProfile":
        return <StudentProfile />;
      case "Skip Clerk":
        return <Skip_Clerk />;
      case "Book Room":
        return <BookRoom />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">Select what to use</h1>
        
        <div className="grid grid-cols-2 gap-4 max-w-4xl">
          {availableFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-blue-500 text-white p-6 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors duration-200 text-center"
              onClick={() => setPopup(feature)}
            >
              <div className="text-lg font-semibold">
                {feature}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup */}
      {popup !== "none" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-auto relative">
            {renderPopupContent(popup)}
            
            <button
              onClick={() => setPopup("none")}
              className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}