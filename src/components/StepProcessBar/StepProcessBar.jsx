import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Steps } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { useSession } from "../ProtectedPath/SessionContext";
import toast from "react-hot-toast";

const StepProcessBar = () => {
  const navigate = useNavigate();
  const { session } = useSession();

  const steps = [
    { name: "Application Form", href: "/RegistrationForm" },
    { name: "Upload Documents", href: "/DocumentUpload" },
    { name: "Self Verification", href: "/SelfVerification" },
    { name: "Room-mate Selection", href: "/RoomMate" },
    { name: "Room Booking", href: "/Allotment" },
    { name: "Confirmation Page", href: "/confirmationPage" },
  ]

  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(steps.findIndex(step => step?.href === location.pathname));



  const handleStepClick = (index, href) => {
    // return toast.error("Complete all the steps in a single flow.");
    if (session?.stepIndex >= 5) {
      return;
    }
    if (index > session.stepIndex && (index !== '4' || index !== '3')) {
      // console.log(first)
      return toast.error('Please complete all previous steps to move forward.')
    };
    if (index <= 2) {
      return toast.error(`You can't go back now.`)
    }
    setCurrentStep(index);
    navigate(href);
  };


  // useEffect(() => {
  //   if (session.isSingle !== true) {
  //     setSteps([
  //       { name: "Application Form", href: "/RegistrationForm" },
  //       { name: "Upload Documents", href: "/DocumentUpload" },
  //       { name: "Self Verification", href: "/SelfVerification" },
  //       { name: "Room-mate Selection", href: "/RoomMate" },
  //       { name: "Room Booking", href: "/Allotment" },
  //       { name: "Confirmation Page", href: "/confirmationPage" },
  //     ])
  //   } else {
  //     setSteps([
  //       { name: "Application Form", href: "/RegistrationForm" },
  //       { name: "Upload Documents", href: "/DocumentUpload" },
  //       { name: "Self Verification", href: "/SelfVerification" },
  //       // { name: "Room-mate Selection", href: "/RoomMate" },
  //       { name: "Room Booking", href: "/Allotment" },
  //       { name: "Confirmation Page", href: "/confirmationPage" },
  //     ])
  //   }

  // }, [session.stepIndex])

  useEffect(() => {
    if (session) {
      if (currentStep > session?.stepIndex || session?.stepIndex === 5) {
        navigate(steps[session?.stepIndex]?.href)
      }
    };
  }, [session?.stepIndex, currentStep]);

  useEffect(() => {
    const currentPath = location.pathname;
    const stepIndex = steps.findIndex(step => step?.href === currentPath);
    setCurrentStep(stepIndex);
    // if (session.stepIndex === 5) {
    //   navigate(steps[session?.stepIndex]?.href);
    //   return;
    // }
    if (session?.stepIndex != stepIndex && ![3, 4].includes(stepIndex)) {
      console.log('step', stepIndex, session.stepIndex)
      navigate(steps[session?.stepIndex]?.href);
    }
  }, [location.pathname, steps]);

  if (session?.stepIndex > 1 && (currentStep === 0 || currentStep === 1)) {
    navigate(steps[session?.stepIndex].href);
  }


  return (
    (session.isSingle !== true) ? (<div className="container mx-auto mt-5">
      {/* Horizontal Steps for larger screens */}
      <div className="hidden md:block">
        <Steps current={currentStep}>
          {steps.map((step, index) => (
            <Steps.Item
              key={index}
              title={step.name}
              onClick={() => handleStepClick(index, step.href)}
            />
          ))}
        </Steps>
      </div>
      {/* Vertical Steps for smaller screens */}
      <div className="block md:hidden">
        <Steps current={currentStep} vertical>
          {steps.map((step, index) => (
            <Steps.Item
              key={index}
              title={step.name}
              onClick={() => handleStepClick(index, step.href)}
            />
          ))}
        </Steps>
      </div>
    </div>) : (<></>)
  );
};

export default StepProcessBar;