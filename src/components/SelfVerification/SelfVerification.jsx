import React, { useState } from "react";
import StepProcessBar from "../StepProcessBar/StepProcessBar";
import ProcessBar from "../StepProcessBar/ProcessBar";
import FirstYear from "../StepProcessBar/FirstYearProcessBar";
import Steps from "../Steps/Steps";
import SelfVerificationTable from "./SelfVerificationTable";
import { useSession } from "../ProtectedPath/SessionContext";
export default function SelfVerification() {
  
  const { session } = useSession();
  
  return (
    <>
      <Steps />
      <div className="hidden md:block">
        {/* {
          (session.isSingle === false) ?
            <StepProcessBar /> :
            <>
              <ProcessBar />
              <FirstYear />
            </>
        } */}
        <FirstYear />

      </div>
      <SelfVerificationTable />
    </>
  );
}
