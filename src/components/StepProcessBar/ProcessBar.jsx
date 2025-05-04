import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Steps } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { useSession } from "../ProtectedPath/SessionContext";
import toast from "react-hot-toast";

const ProcessBar = () => {
  const navigate = useNavigate();

  const steps = [
    { name: "Application Form", href: "/RegistrationForm" }, //0
    { name: "Upload Documents", href: "/DocumentUpload" },    //1
    { name: "Self Verification", href: "/SelfVerification" },   //2
    { name: "Room Booking", href: "/Allotment" },     //3
    { name: "Confirmation Page", href: "/confirmationPage" },   //4
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
      navigate(steps[session?.stepIndex].href);
    }
  }, [session?.stepIndex]);

  useEffect(() => {
    const currentPath = location.pathname;
    const stepIndex = steps.findIndex((step) => step.href === currentPath);
    setCurrentStep(stepIndex);
    if (session?.stepIndex != stepIndex) {
      navigate(steps[session?.stepIndex].href);
    }
  }, [location.pathname, steps]);



  return (
    (session.isSingle===true) ?(<div className="container mx-auto mt-5">
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
    </div>):(<></>)
  );
};

export default ProcessBar;
