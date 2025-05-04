import React, { useState } from "react";
import AdminSidebar from "../AdminSidebar";

const Rmedt = () => {
  const [selectedHostel, setSelectedHostel] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");

  const handleHostelChange = (e) => {
    setSelectedHostel(e.target.value);
  };

  const handleRoomNumberChange = (e) => {
    setRoomNumber(e.target.value);
  };

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCourses((prevCourses) =>
      checked
        ? [...prevCourses, value]
        : prevCourses.filter((course) => course !== value)
    );
  };

  const handleYearChange = (e) => {
    const { value, checked } = e.target;
    setSelectedYears((prevYears) =>
      checked
        ? [...prevYears, value]
        : prevYears.filter((year) => year !== value)
    );
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleBlockRoom = () => {
    setCurrentStatus("Blocked");
    setStatus("Blocked");
  };

  const handleUnblockRoom = () => {
    setCurrentStatus("Unblocked");
    setStatus("Unblocked");
  };

  const handleSearchRoom = () => {
    // Simulating a search function. In a real application, you'd fetch this from a server.
    const roomStatus = "Unblocked"; // Example: Fetch room status based on hostel and room number
    const fetchedSeatingCapacity = "4"; // Example: Fetch seating capacity based on hostel and room number
    const fetchedReason = ""; // Example: Fetch reason based on hostel and room number

    setCurrentStatus(roomStatus);
    setSeatingCapacity(fetchedSeatingCapacity);
    setReason(fetchedReason);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
   //console.log({
    //   selectedHostel,
    //   roomNumber,
    //   selectedCourses,
    //   selectedYears,
    //   seatingCapacity,
    //   reason,
    //   status,
    // });
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center p-10 rounded-lg shadow-md bg-white">
          <div className="w-full max-w-xs">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="hostel"
            >
              Select Hostel
            </label>
            <select
              id="hostel"
              value={selectedHostel}
              onChange={handleHostelChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">SELECT</option>
              <option value="bh-1">BH-1</option>
              <option value="bh-2">BH-2</option>
              <option value="bh-3">BH-3</option>
              <option value="bh-4">BH-4</option>
              <option value="bh-5">BH-5</option>
              <option value="bh-6">BH-6</option>
              <option value="bh-7">BH-7</option>
              <option value="mbh-a">MBH-A</option>
              <option value="mbh-b">MBH-B</option>
              <option value="mbh-f">MBH-F</option>
              <option value="gh-1">GH-1</option>
              <option value="gh-2">GH-2</option>
              <option value="mgh-2a">MGH-2A</option>
              <option value="mgh-2b">MGH-2B</option>
              <option value="mgh">MGH</option>
            </select>
          </div>

          <div className="w-full max-w-xs mt-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="roomNumber"
            >
              Room Number
            </label>
            <input
              id="roomNumber"
              type="text"
              value={roomNumber}
              onChange={handleRoomNumberChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Room Number"
            />
          </div>

          <div className="w-full max-w-xs mt-4 justify-center">
            <button
              onClick={handleSearchRoom}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Search Room
            </button>
          </div>

          {currentStatus && (
            <div
              className={`w-full max-w-xs mt-4 p-2 rounded ${
                currentStatus === "Blocked" ? "bg-red-200" : "bg-green-200"
              }`}
            >
              <p className="text-center text-gray-700 font-bold">
                Room {roomNumber} in {selectedHostel} is currently{" "}
                {currentStatus}
              </p>

              {/* Conditionally render Block and Unblock buttons */}
              <div className="justify-center flex mt-4">
                {currentStatus === "Unblocked" && (
                  <button
                    onClick={handleBlockRoom}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  >
                    Block
                  </button>
                )}
                {currentStatus === "Blocked" && (
                  <button
                    onClick={handleUnblockRoom}
                    className="bg-green-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Unblock
                  </button>
                )}
              </div>
            </div>
          )}

          {status && (
            <div
              className={`w-full max-w-xs mt-4 p-2 rounded ${
                status === "Blocked" ? "bg-red-200" : "bg-green-200"
              }`}
            >
              <p className="text-center text-gray-700 font-bold">
                Room {roomNumber} in {selectedHostel} is now {status}
              </p>
            </div>
          )}

          {currentStatus && (
            <>
              <div className="w-full max-w-xs mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Course
                </label>
                <div className="flex flex-row">
                  <label>
                    <input
                      type="checkbox"
                      value="Btech"
                      checked={selectedCourses.includes("Btech")}
                      onChange={handleCourseChange}
                      className="mr-1"
                    />
                    Btech
                  </label>
                  <label className="ml-4">
                    <input
                      type="checkbox"
                      value="Mtech"
                      checked={selectedCourses.includes("Mtech")}
                      onChange={handleCourseChange}
                      className="mr-1"
                    />
                    Mtech
                  </label>
                  <label className="ml-4">
                    <input
                      type="checkbox"
                      value="MBA"
                      checked={selectedCourses.includes("MBA")}
                      onChange={handleCourseChange}
                      className="mr-1"
                    />
                    MBA
                  </label>
                </div>
              </div>

              <div className="w-full max-w-xs mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Year
                </label>
                <div className="flex flex-row">
                  <label>
                    <input
                      type="checkbox"
                      value="1"
                      checked={selectedYears.includes("1")}
                      onChange={handleYearChange}
                      className="mr-1"
                    />
                    1
                  </label>
                  <label className="ml-4">
                    <input
                      type="checkbox"
                      value="2"
                      checked={selectedYears.includes("2")}
                      onChange={handleYearChange}
                      className="mr-1"
                    />
                    2
                  </label>
                  <label className="ml-4">
                    <input
                      type="checkbox"
                      value="3"
                      checked={selectedYears.includes("3")}
                      onChange={handleYearChange}
                      className="mr-1"
                    />
                    3
                  </label>
                  <label className="ml-4">
                    <input
                      type="checkbox"
                      value="4"
                      checked={selectedYears.includes("4")}
                      onChange={handleYearChange}
                      className="mr-1"
                    />
                    4
                  </label>
                </div>
              </div>

              <div className="w-full max-w-xs mt-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="seatingCapacity"
                >
                  Seating Capacity
                </label>
                <input
                  id="seatingCapacity"
                  type="text"
                  value={seatingCapacity}
                  onChange={(e) => setSeatingCapacity(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter Seating Capacity"
                />
              </div>

              <div className="w-full max-w-xs mt-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="reason"
                >
                  Reason
                </label>
                <textarea
                  id="reason"
                  value={reason}
                  onChange={handleReasonChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter Reason"
                />
              </div>

              <div className="w-full max-w-xs mt-4 justify-center">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rmedt;
