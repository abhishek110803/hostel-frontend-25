import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Steps } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { useSession } from "../ProtectedPath/SessionContext";
import toast from "react-hot-toast";

const FirstYearProcessBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { session } = useSession();

  const steps = [
    { stepNumber: 0, name: "Change Password", href: "/FirstYearChangePassword" },
    { stepNumber: 1, name: "Mobile Verification", href: "/Otp" },
    { stepNumber: 2, name: "Application Form", href: "/RegistrationForm" },
    { stepNumber: 3, name: "Upload Documents", href: "/DocumentUpload" },
    { stepNumber: 4, name: "Self Verification", href: "/SelfVerification" },
    { stepNumber: 5.2, name: "Room Booking", href: "/Allotment" },
    { stepNumber: 6, name: "Confirmation Page", href: "/confirmationPage" },
  ];

  const [currentStep, setCurrentStep] = useState(
    steps.findIndex((step) => step.href === location.pathname)
  );

  const handleStepClick = (index) => {
    if (index !== currentStep) {
      toast.error("Complete all steps in a single flow.");
    }
  };

  useEffect(() => {
    if (!session) {
      toast.error("Please login first");
      navigate("/");
      return;
    }

    const matchedStep = steps.find(step => step.stepNumber === session.step);
    if (matchedStep && matchedStep.href !== location.pathname) {
      navigate(matchedStep.href);
    }
  }, [session?.step]);

  useEffect(() => {
    const index = steps.findIndex((step) => step.href === location.pathname);
    setCurrentStep(index);
  }, [location.pathname]);

  return (
    <div className="container mx-auto mt-5">
      {/* Horizontal Steps for larger screens */}
      <div className="hidden md:block">
        <Steps current={currentStep}>
          {steps.map((step, index) => (
            <Steps.Item
              key={index}
              title={step.name}
              onClick={() => handleStepClick(index)}
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
              onClick={() => handleStepClick(index)}
            />
          ))}
        </Steps>
      </div>
    </div>
  );
};

export default FirstYearProcessBar;
