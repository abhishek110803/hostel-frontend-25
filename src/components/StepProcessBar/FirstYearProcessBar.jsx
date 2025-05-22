import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Steps } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { useSession } from "../ProtectedPath/SessionContext";
import toast from "react-hot-toast";

const FirstYearProcessBar = () => {
  const navigate = useNavigate();

  /**
   * 
   * 
   * 
   *  change pass - 		      0
      mobile verification -   1
      applicantion form - 	  2
      upload docx - 		      3
      self verification - 	  4
      roommate selection -    5.1
      room booking - 		      5.2
      confirmation page -   	6
   */

  const steps = [
    { name: "Change Password", href: "/FirstYearChangePassword" }, //0
    { name: "Mobile Verification", href: "/Otp" }, //1
    { name: "Application Form", href: "/RegistrationForm" }, //2
    { name: "Upload Documents", href: "/DocumentUpload" }, //3
    { name: "Self Verification", href: "/SelfVerification" }, //4
    { name: "Room Booking", href: "/Allotment" }, //5.3
    { name: "Confirmation Page", href: "/confirmationPage" }, //6
  ];

  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(
    steps.findIndex((step) => step.href === location.pathname)
  );

  const handleStepClick = (index, href) => {
    return toast.error("Complete all the steps in a single flow.");
  };

  const { session } = useSession();

  useEffect(() => {
    if (session) {
      const currentPath = location.pathname;
      const stepIndex = steps.findIndex((step) => step.href === currentPath);
      setCurrentStep(stepIndex);
      if (session?.stepIndex != stepIndex) {
        navigate(steps[session?.stepIndex]?.href);
      }
    } else {
      toast.error("Please login first");
      navigate("/");
    }
  }, [session?.stepIndex, location.pathname, steps]);

  return (
    <div className="container mx-auto mt-5">
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
    </div>
  );
};

export default FirstYearProcessBar;
