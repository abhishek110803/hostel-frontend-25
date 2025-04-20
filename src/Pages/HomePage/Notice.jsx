import React from "react";

export default function Notice() {
  return (
    <div
      className="aboutSection mx-4 sm:mx-8 md:mx-14 my-10 md:my-14 bg-blue-50 border border-blue-600 rounded-lg shadow-lg sm:p-6 md:p-10 p-3 py-3"
      id="AboutUs"
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 text-center mb-4 sm:mb-6">
        <strong>Notice</strong>
      </h1>
      <div className="text-base sm:text-lg text-gray-800 text-justify mb-4 p-2 sm:p-6 md:p-10">
        {/* <h1 className="text-red-600 font-bold text-center text-2xl">
          We regret to inform you that the entire process of room allotment has been halted. A revised schedule will be shared with you soon. We apologize for any inconvenience this may cause.
        </h1> */}
        <p className="mt-4">
          The accommodation is available on a shared basis (double sharing). No requests for single accommodation will be entertained. The status of booking of rooms will appear as:
        </p>
        <ul className="mt-2 ml-6 list-disc">
          <li >Green color for vacant/partially booked rooms.</li>
          <li >Red color for fully booked rooms.</li>
          <li >Dark Brown for rooms not available for PG-2024.</li>
        </ul>
      </div>
    </div>
  );
}
