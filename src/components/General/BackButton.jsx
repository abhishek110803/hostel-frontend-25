import { ArrowLeftIcon } from "@heroicons/react/solid";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    if (location.state && location.state.currentPage !== undefined) {
      navigate(-1, {
        state: { currentPage: location.state.currentPage },
      });
    } else {
      navigate(-1); // Fallback to default behavior if currentPage is not defined
    }
  };

  return (
    <div className="absolute left-12">
      <button
        onClick={goBack}
        className="ml-4 mt-4 flex items-center space-x-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        <ArrowLeftIcon className="h-10 w-10" />
      </button>
    </div>
  );
}
