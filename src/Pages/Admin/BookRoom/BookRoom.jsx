import { useState, useEffect } from "react";
import axiosInstance from "../../../Helper/axiosInstance";
import AdminSidebar from "../AdminSidebar";

export default function BookRoom() {
  const [firstYrRoom, setFirstYrRoom] = useState(false);
  const [rollNumbers, setRollNumbers] = useState(["", ""]);
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  const handleUnblockAndBook = async () => {
    try {
      const res = await axiosInstance.post("/adminside_booking_book.php", {
        type: "unblock",
        hostel: selectedHostel,
        floor: selectedFloor,
        room: selectedRoom,
        firstYr: firstYrRoom,
        rollNumbers: firstYrRoom ? [rollNumbers[0]] : rollNumbers,
      });
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Failed to unblock and book.");
    }
  };

  const handleSimpleBook = async () => {
    try {
      const res = await axiosInstance.post("/adminside_booking_book.php", {
        type: "simple",
        hostel: selectedHostel,
        floor: selectedFloor,
        room: selectedRoom,
        firstYr: firstYrRoom,
        rollNumbers: firstYrRoom ? [rollNumbers[0]] : rollNumbers,
      });
      console.log(res.data);
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Failed to book room.");
    }
  };

  const handleCheckboxChange = (e) => {
    setFirstYrRoom(e.target.checked);
    setRollNumbers(["", ""]);
    setStudents([]);
    setRooms([]);
  };

  const handleInputChange = (idx, value) => {
    const updated = [...rollNumbers];
    updated[idx] = value;
    setRollNumbers(updated);
    setRooms([]);
  };

  const handleRemoveStudent = (idx) => {
    const updatedStudents = [...students];
    const updatedRolls = [...rollNumbers];
    updatedStudents[idx] = null;
    updatedRolls[idx] = "";
    setStudents(updatedStudents);
    setRollNumbers(updatedRolls);
    setRooms([]);
  };

  const handleFindRollNumbers = async () => {
    try {
      const updatedStudents = await Promise.all(
        rollNumbers.map(async (roll, idx) => {
          if (!roll || students[idx]) return students[idx];
          const table = firstYrRoom ? "first_student_form" : "student_form";
          const res = await axiosInstance.get(
            "/adminside_booking_studentdetails.php",
            {
              params: { roll, table },
            }
          );
          return res.data;
        })
      );
      setStudents(updatedStudents);
    } catch (err) {
      console.error(err);
    }
  };

  // Function to check if all required students have valid names
  const areStudentNamesValid = () => {
    const requiredStudents = firstYrRoom ? [0] : [0, 1];
    return requiredStudents.every(idx => {
      const student = students[idx];
      return student && student.name && student.name.trim() !== "";
    });
  };

  // Function to check if all required students are loaded
  const areStudentsLoaded = () => {
    return firstYrRoom ? students[0] : (students[0] && students[1]);
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="relative w-full h-full p-4">
        <label>
          <input
            type="checkbox"
            checked={firstYrRoom}
            onChange={handleCheckboxChange}
          />
          First year room
        </label>

        <div className="mt-4">
          {(firstYrRoom ? [0] : [0, 1]).map((idx) =>
            !students[idx] ? (
              <input
                key={idx}
                type={firstYrRoom ? "text" : "number"}
                placeholder={
                  firstYrRoom
                    ? `Application ID ${idx + 1}`
                    : `Roll Number ${idx + 1}`
                }
                value={rollNumbers[idx]}
                onChange={(e) => handleInputChange(idx, e.target.value)}
                className="block mb-2 p-2 border"
              />
            ) : (
              <div key={idx} className="p-4 border rounded mb-2 relative">
                <button
                  onClick={() => handleRemoveStudent(idx)}
                  className="absolute top-0 right-0 p-1 text-red-600"
                >
                  X
                </button>
                <div>Name: {students[idx]?.name || "Name not found"}</div>
                <div>Roll Number: {students[idx]?.rollNumber}</div>
                <div>Branch: {students[idx]?.branch}</div>
                <div>Course: {students[idx]?.course}</div>
                {/* Show warning if name is empty */}
                {(!students[idx]?.name || students[idx]?.name.trim() === "") && (
                  <div className="text-red-600 font-semibold mt-2">
                    ⚠️ Student name is missing - cannot proceed with booking
                  </div>
                )}
              </div>
            )
          )}
        </div>

        {!areStudentsLoaded() ? (
          <button
            className="mt-4 p-2 bg-blue-500 text-white"
            onClick={handleFindRollNumbers}
          >
            Find Roll Numbers
          </button>
        ) : !areStudentNamesValid() ? (
          <div className="mt-4">
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded mb-2">
              Cannot proceed: One or more students have missing names. Please verify the roll numbers/application IDs.
            </div>
            <button
              className="p-2 bg-blue-500 text-white"
              onClick={handleFindRollNumbers}
            >
              Retry Finding Roll Numbers
            </button>
          </div>
        ) : (
          <button
            className="mt-4 p-2 bg-green-600 text-white"
            onClick={async () => {
              try {
                const table = firstYrRoom
                  ? "first_hostel_rooms"
                  : "hostel_rooms";
                const res = await axiosInstance.get(
                  "/adminside_booking_rooms.php",
                  {
                    params: { table },
                  }
                );
                console.log(res.data);
                setRooms(res.data);
              } catch (err) {
                console.error(err);
              }
            }}
          >
            Find Rooms
          </button>
        )}

        {rooms.length > 0 && areStudentNamesValid() && (
          <div className="mt-6">
            <select
              className="block mb-2 p-2 border"
              value={selectedHostel}
              onChange={(e) => {
                setSelectedHostel(e.target.value);
                setSelectedFloor("");
                setSelectedRoom("");
              }}
            >
              <option value="">Select Hostel</option>
              {[...new Set(rooms.map((room) => room.hostel_name))].map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>

            {selectedHostel && (
              <select
                className="block mb-2 p-2 border"
                value={selectedFloor}
                onChange={(e) => {
                  setSelectedFloor(e.target.value);
                  setSelectedRoom("");
                }}
              >
                <option value="">Select Floor</option>
                {[
                  ...new Set(
                    rooms
                      .filter((r) => r.hostel_name === selectedHostel)
                      .map((r) => r.floor_no)
                  ),
                ].map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            )}

            {selectedFloor && (
              <select
                className="block mb-2 p-2 border"
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
              >
                <option value="">Select Room</option>
                {rooms
                  .filter(
                    (r) =>
                      r.hostel_name === selectedHostel &&
                      r.floor_no == parseInt(selectedFloor)
                  )
                  .map((r) => (
                    <option key={r.room_no} value={r.room_no}>
                      {r.room_no}
                    </option>
                  ))}
              </select>
            )}

            {selectedRoom &&
              (() => {
                const room = rooms.find(
                  (r) =>
                    r.hostel_name === selectedHostel &&
                    r.floor_no == selectedFloor &&
                    r.room_no === selectedRoom
                );
                if (!room) return null;

                if (room.block === "1") {
                  return (
                    <div className="mt-4">
                      <div className="text-red-600 font-semibold">
                        Room is blocked
                      </div>
                      <button
                        className="mt-2 p-2 bg-yellow-500 text-white"
                        onClick={handleUnblockAndBook}
                      >
                        Unblock and Book
                      </button>
                    </div>
                  );
                }

                const requiredSeats = firstYrRoom ? 1 : 2;
                if (parseInt(room.vacant_seats) < requiredSeats) {
                  return (
                    <div className="mt-4 text-red-600 font-semibold">
                      Room already booked
                    </div>
                  );
                }

                return (
                  <button
                    className="mt-4 p-2 bg-purple-600 text-white"
                    onClick={handleSimpleBook}
                  >
                    Book Room
                  </button>
                );
              })()}
          </div>
        )}
      </div>
    </div>
  );
}