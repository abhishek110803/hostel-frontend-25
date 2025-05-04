import React from "react";
import HostelSummary from "./HostelSummary";
import AdminSidebar from "./AdminSidebar";

const Hostel = () => {
  // Array of hostel names
  const hostels = [
    "MBHA",
    "MBHB",
    "MBHF",
    "BH3",
    "BH4",
    "BH6",
    "BH7",
    "BH7E",
    "GH1",
    "GH2",
    "MGHA",
    "MGHB",
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      <div className=" bg-white flex-1 items-center justify-center mb-10">
        <div className="container mx-auto p-2">
          <div className="text-2xl font-bold text-blue-500 mb-4 mt-4 bg-white p-7 z-2 sticky top-0 text-center">
            Hostel Summary
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {hostels.map((hostel, index) => (
              <HostelSummary key={index} hostelName={hostel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hostel;
