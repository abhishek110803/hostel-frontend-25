import React from "react";

const RequestSend = ({ verifiedStudents, handleRevokeStudent }) => {
  return (
    <div className="overflow-x-auto mb-4 border border-gray-300 rounded-lg shadow-lg sm:mx-2 md:mx-0 bg-white">
      <h2 className="text-xl font-bold mb-2 p-2 sm:p-4 bg-gray-100 border-b">
        Verify RoomMates
      </h2>
      <div className="max-w-full max-h-[320px] overflow-y-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-2 sm:px-4 border-b text-left">Sr No.</th>
              <th className="py-2 px-2 sm:px-4 border-b text-left">Roll No.</th>
              <th className="py-2 px-2 sm:px-4 border-b text-left">Status</th>
              <th className="py-2 px-2 sm:px-4 border-b text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {verifiedStudents.map((student, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50">
                <td className="py-2 px-2 sm:px-4 border-b text-left">
                  {index + 1}
                </td>
                <td className="py-2 px-2 sm:px-4 border-b text-left">
                  {student.rollNo}
                </td>
                <td
                  className={`py-2 px-2 sm:px-4 border-b text-left ${student.colorClass}`}
                >
                  {student.status}
                </td>
                <td className="py-2 px-2 sm:px-4 border-b text-center">
                  <button
                    onClick={() => handleRevokeStudent(index)}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600 shadow-md"
                  >
                    Revoke
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestSend;
