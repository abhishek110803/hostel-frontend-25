import React, { useState } from "react";

const RequestSendForm = ({
  newStudent,
  handleInputChange,
  handleAddStudent,
}) => {
  const [error, setError] = useState("");

  const handleAddClick = () => {
    if (!newStudent.rollNo) {
      setError("Roll number is required.");
      return;
    } else if (!/^\d{8}$/.test(newStudent.rollNo)) {
      setError("Roll number must be exactly 8 digits.");
      return;
    }

    setError("");

    handleAddStudent();
  };

  const handleInputBlur = () => {
    if (error && newStudent.rollNo && /^\d{8}$/.test(newStudent.rollNo)) {
      setError("");
    }
  };

  return (
    <div className="mb-4 text-center">
      <div className="p-4 border-1 border-gray-300 rounded-md shadow-lg max-w-md mx-auto bg-white">
        <h2 className="text-xl font-bold mb-4">Add Student</h2>
        <div className="grid grid-cols-1 gap-2 sm:gap-4">
          <input
            type="number"
            name="rollNo"
            value={newStudent.rollNo}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder="Enter Roll No."
            className="p-3 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500 text-sm sm:text-base"
          />
          {error && (
            <p className="text-red-500 text-xs sm:text-sm italic">{error}</p>
          )}
          <button
            onClick={handleAddClick}
            type="submit"
            className="p-3 bg-blue-500 text-white rounded w-full hover:bg-blue-600 focus:outline-none shadow-md"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestSendForm;
