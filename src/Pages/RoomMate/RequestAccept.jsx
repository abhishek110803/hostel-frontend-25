import React from "react";

const RequestAccept = ({
  requests,
  handleAcceptRequest,
  handleRejectRequest,
}) => {
  return (
    <div className="overflow-x-auto mb-4 border border-gray-300 rounded-lg shadow-lg sm:mx-2 md:mx-0 bg-white">
      <h2 className="text-xl font-bold mb-2 p-2 sm:p-4 bg-gray-100 border-b">
        Incoming Requests
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
            {requests.map((request, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50">
                <td className="py-2 px-2 sm:px-4 border-b text-left">
                  {index + 1}
                </td>
                <td className="py-2 px-2 sm:px-4 border-b text-left">
                  {request.rollNo}
                </td>
                <td
                  className={`py-2 px-2 sm:px-4 border-b text-left ${request.colorClass}`}
                >
                  {request.status}
                </td>
                <td className="py-2 px-2 sm:px-4 border-b text-center">
                  <div className="flex justify-center">
                    {request.status === "Pending" && (
                      <button
                        onClick={() => handleAcceptRequest(index)}
                        className="p-2 bg-green-500 text-white rounded mr-2 hover:bg-green-600 shadow-md"
                      >
                        Accept
                      </button>
                    )}
                    <button
                      onClick={() => handleRejectRequest(index)}
                      className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 shadow-md"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestAccept;
