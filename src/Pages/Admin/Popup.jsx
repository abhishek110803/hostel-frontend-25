import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helper/axiosInstance";

const Popup = ({ setPopup, rollno }) => {
  const [userInput, setUserInput] = useState({
    subject: "-",
    message: "-",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!userInput.subject || !userInput.message) {
      toast.error("All fields are mandatory");
      return;
    }

    try {
      const data = {
        rollno,
        subject: userInput.subject,
        message: userInput.message,
      };
      let res = axiosInstance.post(`/raise_issue_on_student_details.php`, data);
      await toast.promise(res, {
        loading: "Done.",
        success: (data) => {
          console.log(data?.data);
          return data?.data?.message;
        },
        error: (data) => {
          console.log(data);
          return data?.response?.data.message;
        },
      });
      res = await res;
      if (res?.data?.status === "success") {
        setUserInput({
          subject: "",
          message: "",
        });

        setPopup(false);
      }      
    } catch (error) {
      console.log('eero', error);
      toast.error("Operation failed...",error);
    }
  };

  const handleCancelClick = () => {
    setPopup(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-4">
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Raise an Issue
          </h3>
          <span style={{fontSize:'13.5px',color:'red'}}>E-mail will not be sent, this is just for add remark.</span>
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Subject
            </label>
            <span style={{ fontSize: '12px', color: 'brown' }}>Type of Issue (Personal details/Documents)</span>

            <input
              type="text"
              name="subject"
              id="subject"
              value={userInput.subject}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your subject"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              value={userInput.message}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your message"
              rows="4"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
