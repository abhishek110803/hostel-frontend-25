import React, { useState } from "react";
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";

const Hostel = ({ hostelName }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const Navigate=useNavigate();

  return (
    <>
    <div className=" mx-auto mt-6 p-6 bg-white border-1 border-blue-400 rounded-lg shadow-md flex flex-col ">
     
        <>
       
          {/* <div className="flex items-center mb-4">
            <button
              onClick={toggleDetails}
              className="text-blue-500 hover:text-blue-600 focus:outline-none"
            >
              <ArrowNarrowLeftIcon className="h-6 w-6 mr-1" />
              Back
            </button>
          </div> */}
          <div className="text-lg font-semibold mb-2 text-center">
               {hostelName}
          </div>
          <hr className="my-2 border-1 border-blue-900" />
          <div className="bg-gray-100 p-4 rounded-md shadow-md">
            <p>Hostel Name: {hostelName}</p>
            <p>Clerk Name: John Doe</p>
            <p>Warden Name: Jane Smith</p>
            <p>Rooms Available: 20</p>
            <p>Rooms Full: 10</p>
          </div>
          <button className="mt-4 mb-4 m w-auto h-auto bg-blue-500 p-3 text-white rounded-xl hover:bg-blue-600 " onClick={()=>{Navigate("/Allhostels")}}>More Details</button>
        </>
      

    </div></>
  );
};

export default Hostel;
