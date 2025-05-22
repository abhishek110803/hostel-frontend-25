import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Steps } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { useSession } from "../ProtectedPath/SessionContext";
import toast from "react-hot-toast";

const StepProcessBar = () => {
  const navigate = useNavigate();
  const { session } = useSession();
  const location = useLocation();

  const steps = [
    { stepNumber: 2, name: "Application Form", href: "/RegistrationForm" },
    { stepNumber: 3, name: "Upload Documents", href: "/DocumentUpload" },
    { stepNumber: 4, name: "Self Verification", href: "/SelfVerification" },
    { stepNumber: 5.1, name: "Room-mate Selection", href: "/RoomMate" }, //5.2 is for when roommate is selected, and both are aggreed.
    { stepNumber: 5.2, name: "Room Booking", href: "/Allotment" },
    { stepNumber: 6, name: "Confirmation Page", href: "/confirmationPage" },
  ];

  const [currentStep, setCurrentStep] = useState(
    steps.findIndex((step) => step.href === location.pathname)
  );

  const handleStepClick = (index, href, stepNumber) => {
    if (parseInt(session?.step) >= 5) {
      console.log(stepNumber);
      if ([5.1, 5.2].includes(stepNumber) && stepNumber <= session?.step) {
        // if (stepNumber === session?.step) {
        //   return toast.error("You are on same step.");
        // }
        setCurrentStep(index);
        navigate(href);
      } else {
        toast.error("You can't navigate to other steps now.");
      }
      return;
    }

    if (stepNumber != session.stepIndex) {
      console.log(session.stepIndex);
      return toast.error("Complete all steps in order.");
    }

    if (stepNumber < 2) {
      return toast.error(`You can't go back now.`);
    }

    setCurrentStep(index);
    navigate(href);
  };

  useEffect(() => {
    if (session) {
      const foundStep = steps.find(
        (step) => step.stepNumber === session?.stepIndex
      );
      if (foundStep) {
        navigate(foundStep.href);
      }
    }
  }, [session?.stepIndex]);

  useEffect(() => {
    const currentPath = location.pathname;
    const stepIndex = steps.findIndex((step) => step.href === currentPath);
    setCurrentStep(stepIndex);

    const matchedStep = steps[stepIndex];
    if (
      matchedStep &&
      matchedStep.stepNumber !== session?.stepIndex &&
      ![5.1, 5.2].includes(matchedStep.stepNumber)
    ) {
      const sessionStep = steps.find(
        (step) => step.stepNumber === session?.stepIndex
      );
      if (sessionStep) {
        navigate(sessionStep.href);
      }
    }
  }, [location.pathname, session?.stepIndex]);

  useEffect(() => {
    if (session?.stepIndex > 1 && currentStep >= 0 && currentStep <= 1) {
      const sessionStep = steps.find(
        (step) => step.stepNumber === session?.stepIndex
      );
      if (sessionStep) {
        navigate(sessionStep.href);
      }
    }
  }, [currentStep, session?.stepIndex]);

  return session?.isSingle !== true ? (
    <div className="container mx-auto mt-5">
      {/* Horizontal Steps for larger screens */}
      <div className="hidden md:block">
        <Steps current={currentStep}>
          {steps.map((step, index) => (
            <Steps.Item
              key={index}
              title={step.name}
              onClick={() => handleStepClick(index, step.href, step.stepNumber)}
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
              onClick={() => handleStepClick(index, step.href, step.stepNumber)}
            />
          ))}
        </Steps>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default StepProcessBar;
