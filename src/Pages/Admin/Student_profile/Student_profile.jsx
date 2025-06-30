import React, { useState } from "react";
import AdminSidebar from "../AdminSidebar";
import axiosInstance from "../../../Helper/axiosInstance";

const StudentProfile = () => {
  const [rollno, setRollno] = useState("");
  const [student, setStudent] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axiosInstance.get("/student_profile.php", {
        params: { rollno: rollno },
      });
      const data = res.data;
      if (data.error) {
        setMessage(data.error);
        setStudent(null);
      } else {
        setStudent(data);
      }
    } catch (err) {
      setMessage("Error fetching data.");
    }
    setLoading(false);
  };

  const updateProfile = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axiosInstance.post("/student_profile.php", student);
      const data = res.data;
      if (data.error) {
        setMessage(data.error);
      } else {
        setMessage(data.message || "Update successful!");
      }
    } catch (err) {
      setMessage("Update failed.");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex">
      <AdminSidebar />
      {/* Add your JSX to display student info, form fields, loading/message display */}
    </div>
  );
};

export default StudentProfile;

  return (
    <>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
          <h2 className="text-2xl font-bold mb-4">Student Profile</h2>

          <div className="mb-4">
            <label className="block text-gray-700">Roll Number:</label>
            <input
              type="text"
              value={rollno}
              onChange={(e) => setRollno(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            />
            <button
              onClick={fetchProfile}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Fetch Profile
            </button>
          </div>

          {loading && <p className="text-gray-500">Loading...</p>}

          {message && <p className="text-red-600">{message}</p>}

          {student && (
            <div className="grid grid-cols-2 gap-4 mt-6">
              {Object.entries(student).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-gray-700 capitalize">
                    {key.replace(/_/g, " ")}:
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2"
                    disabled={key === "rollno"}
                  />
                </div>
              ))}

              <div className="col-span-2 mt-4">
                <button
                  onClick={updateProfile}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Update Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentProfile;
