import React, { useState } from "react";
import StepProcessBar from "../StepProcessBar/StepProcessBar";
import ProcessBar from "../StepProcessBar/ProcessBar";
import FirstYear from "../StepProcessBar/FirstYearProcessBar";
import Steps from "../Steps/Steps";
import SelfVerificationTable from "../FinalVerification/FinalVerificationTable";
import { useSession } from "../ProtectedPath/SessionContext";
export default function FinalVerification() {

  const { session } = useSession();
  return (
    <>
      <Steps />
      <div className="hidden md:block">
        <FirstYear />
      </div>
      <SelfVerificationTable />
    </>
  );
}
