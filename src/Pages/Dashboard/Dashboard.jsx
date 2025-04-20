import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, BadgeCheckIcon } from "@heroicons/react/solid";
import {
  CheckIcon,
  UsersIcon,
  DocumentTextIcon,
  ClipboardCheckIcon,
  CalendarIcon,
} from "@heroicons/react/outline";
import Steps from "../../components/Navbar/Steps";
import { useSession } from "../../components/ProtectedPath/SessionContext";
import toast from "react-hot-toast";

function Dashboard() {
  const [steps, setSteps] = useState([]);

  const { session } = useSession();

  const [currentStepIndex, setCurrentStepIndex] = useState(session?.stepIndex || -1);
  const navigate = useNavigate();

  const handleStepClick = (index) => {
    if (session.stepIndex !== 5 && session.roommate_select === 1 && (index === 3 || index === 4)) {
      navigate(steps[index].href);
    } else if (index < currentStepIndex) {
      toast.error('You are not allowed to move back.');
    }
    else if (index === currentStepIndex) {
      navigate(steps[index].href);
    } else {
      toast.error('Please complete previous steps');
    }
  };

  useEffect(() => {
    setCurrentStepIndex(session.stepIndex)
    if (session.isSingle) {
      setSteps([
        // {
        //   name: "Sign Up",
        //   href: "/SignUp",
        //   icon: <UserIcon className="h-8 w-8 transition-transform transform-gpu" />,
        // },
        {
          name: "Application Form",
          href: "/RegistrationForm",
          icon: (
            <DocumentTextIcon className="h-8 w-8 transition-transform transform-gpu" />
          ),
        },
        {
          name: "Upload Documents",
          href: "/DocumentUpload",
          icon: (
            <ClipboardCheckIcon className="h-8 w-8 transition-transform transform-gpu" />
          ),
        },
        // {
        //   name: "Room-mate Selection",
        //   href: "/RoomMate",
        //   icon: (
        //     <UsersIcon className="h-8 w-8 transition-transform transform-gpu" />
        //   ),
        // },
        {
          name: "Verify Details",
          href: "/SelfVerification",
          icon: (
            <BadgeCheckIcon className="h-8 w-8 transition-transform transform-gpu" />
          ),
        },
        {
          name: "Room Booking",
          href: "/Allotment",
          icon: (
            <CalendarIcon className="h-8 w-8 transition-transform transform-gpu" />
          ),
        },
        {
          name: "Confirmation Page",
          href: "/confirmationPage",
          icon: (
            <CheckIcon className="h-8 w-8 transition-transform transform-gpu" />
          ),
        },
      ])
    } else {
      setSteps([
        // {
        //   name: "Sign Up",
        //   href: "/SignUp",
        //   icon: <UserIcon className="h-8 w-8 transition-transform transform-gpu" />,
        // },
        {
          name: "Application Form",
          href: "/RegistrationForm",
          icon: (
            <DocumentTextIcon className="h-8 w-8 transition-transform transform-gpu" />
          ),
        },
        {
          name: "Upload Documents",
          href: "/DocumentUpload",
          icon: (
            <ClipboardCheckIcon className="h-8 w-8 transition-transform transform-gpu" />
          ),
        },
        {
          name: "Verify Details",
          href: "/SelfVerification",
          icon: (
            <BadgeCheckIcon className="h-8 w-8 transition-transform transform-gpu" />
          ),
        },
        {
          name: "Room-mate Selection",
          href: "/RoomMate",
          icon: (
            <UsersIcon className="h-8 w-8 transition-transform transform-gpu" />
          ),
        },
        {
          name: "Room Booking",
          href: "/Allotment",
          icon: (
            <CalendarIcon className="h-8 w-8 transition-transform transform-gpu" />
          ),
        },
        {
          name: "Confirmation Page",
          href: "/confirmationPage",
          icon: (
            <CheckIcon className="h-8 w-8 transition-transform transform-gpu" />
          ),
        },
      ])
    }
  }, [session.stepIndex, session.isSingle])

  return (
    <>
      <Steps />
      <div className=" bg-white flex items-center justify-center">
        <div className="container mx-auto p-10">
          {/* <button
            onClick={() => navigate(-1)}
            className="absolute top-14 lg:top-32 lg:left-8 left-4 text-blue-600 hover:text-blue-800 focus:outline-none mt-10"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button> */}
          <div className="text-2xl font-bold text-blue-500 mb-4 text-center">
            Dashboard
          </div>
          <div className="flex flex-wrap justify-center gap-12 p-8 border-2 border-blue-600 rounded-3xl shadow-2xl bg-gray-100">
            {steps.map((step, index) => (
              <div
                key={index}
                // to={step.href}
                onClick={() => handleStepClick(index)}
                className={`flex flex-col items-center justify-center w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 p-4 bg-gray-200 rounded-full shadow-lg hover:shadow-2xl transition-all ${(index < currentStepIndex)
                  ? "border-4 border-green-500"
                  : (index === currentStepIndex ? "border-4 border-yellow-500" : "border-2 border-blue-500")
                  } hover:bg-blue-300 hover:text-white hover:scale-110`}
                style={{ textDecoration: "none" }} // Inline style to remove underline
              >
                <div
                  className={`w-24 h-24 flex items-center justify-center rounded-full ${index < currentStepIndex
                    ? "bg-green-500 text-white"
                    : (index === currentStepIndex ? "bg-yellow-500 text-white" : "bg-blue-500 text-white")

                    }`}
                >
                  {step.icon}
                </div>
                <div className="text-center mt-2 text-sm font-medium text-gray-900">
                  {step.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
