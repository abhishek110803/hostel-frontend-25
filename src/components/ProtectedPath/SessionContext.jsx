import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../Helper/axiosInstance";
import toast from "react-hot-toast";

const SessionContext = createContext();

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(
    JSON.parse(localStorage.getItem("session5"))
  );

  const updateSession = (newData) => {
    if (!session) {
      // First-time session init
      setSession(newData);
      localStorage.setItem("session5", JSON.stringify(newData));
      return;
    }

    let hasChanged = false;

    for (const key in newData) {
      if (!(key in session) || session[key] !== newData[key]) {
        hasChanged = true;
        break;
      }
    }

    if (!hasChanged) return;

    const updatedSession = { ...session, ...newData };
    setSession(updatedSession);
    localStorage.setItem("session5", JSON.stringify(updatedSession));
  };



  const navigate = useNavigate();

  const logout = async () => {
    try {
      let res = axiosInstance.get("/logout.php");
      await toast.promise(res, {
        loading: "Logging you out.",
        success: (data) => {
          // console.log(data?.data);
          return data?.data?.message;
        },
        error: (data) => {
          // console.log(data?.response?.data);
          return data?.response?.data.message;
        },
      });
      res = await res;
      if (res?.data?.status === "success") {
        setSession(null);
        localStorage.removeItem("session5");
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching data.", error);
    }
  };

  const checkSession = async () => {
    const ss = await JSON.parse(localStorage.getItem("session5"));
    //console.log('session09', ss, session);
    if (ss) {
      setSession(ss);
    }
  };

  // const [request, setRequest] = useState(null);

  // const [index, setIndex] = useState(0);

  // const getRequest = async () => {
  //     // if (!session?.roll) return
  //     try {
  //         let res = axiosInstance.post('/check_flags.php', {
  //             application_id: session?.application_id,
  //             code: session.code,
  //         });
  //         await toast.promise(res, {
  //             loading: "Fetching data.",
  //             success: (data) => {
  //                 // console.log(data?.data);
  //                 return data?.data?.message;
  //             },
  //             error: (data) => {
  //                 //console.log(data?.response?.data);
  //                 return data?.response?.data.message;
  //             }
  //         });
  //         res = await res;
  //         // console.log('res ka data from session', res?.data);
  //         if (res?.data?.status === "success") {
  //             const data = res?.data;
  //             const s = {}

  //             s.password_changed = data?.password_changed;
  //             s.mobile_verified = data?.mobile_verified;
  //             s.form_uploaded = data?.form_uploaded;
  //             s.docs_uploaded = data?.docs_uploaded;
  //             s.self_verification = data?.self_verification;
  //             s.alloted = data?.alloted;

  //             const flags = [
  //                 { key: 'password_changed', value: data?.password_changed },
  //                 { key: 'mobile_verified', value: data?.mobile_verified },
  //                 { key: 'form_uploaded', value: data?.form_uploaded },
  //                 { key: 'docs_uploaded', value: data?.docs_uploaded },
  //                 { key: 'self_verification', value: data?.self_verification },
  //                 { key: 'alloted', value: data?.alloted }
  //             ];

  //             // Find the first 0 and set the write index
  //             let cnt = 0;
  //             for (let i = 0; i < flags.length; i++) {
  //                 console.log('f(i)', i, flags[i]);
  //                 cnt = i;
  //                 if (flags[i].value == 0 || flags[i].value == null) {
  //                     console.log('first')
  //                     // setIndex(i);
  //                     s.stepIndex = i;
  //                     cnt = -1;
  //                     break;
  //                 }
  //             }
  //             console.log('han vro', cnt)
  //             if (cnt === 5) {
  //                 s.stepIndex = 6;
  //                 // setIndex(6);
  //             } else if (cnt > 0) {
  //                 console.log('hn mai bhi', cnt);
  //                 s.stepIndex = cnt;
  //                 // setIndex(cnt);
  //             }
  //             updateSession(s);
  //         }
  //     } catch (error) {
  //         console.error("Error fetching data.", error);
  //     }
  // };

  // useEffect(() => {
  //     if (session) {
  //         updateSession({ stepIndex: (session.mobile_verified + session.password_changed) });
  //     }
  // }, [index, setIndex]);

  useEffect(() => {
    checkSession();
  }, []);

  // useEffect(() => {
  //     // if (session && session?.role === 'user' && session?.stepIndex > 1) {
  //     if (session && session?.role === 'user' ) {
  //         getRequest();
  //     }
  // }, [session?.application_id, session?.stepIndex]);

  const location = useLocation();

  useEffect(() => {
    if (!session?.step && session?.step !== 0) return;
    if (!session || session?.role !== "user") return;

    const firstYearSteps = [
      {
        stepNumber: 0,
        name: "Change Password",
        href: "/FirstYearChangePassword",
      },
      { stepNumber: 1, name: "Mobile Verification", href: "/Otp" },
      { stepNumber: 2, name: "Application Form", href: "/RegistrationForm" },
      { stepNumber: 3, name: "Upload Documents", href: "/DocumentUpload" },
      { stepNumber: 4, name: "Self Verification", href: "/SelfVerification" },
      { stepNumber: 5.2, name: "Room Booking", href: "/Allotment" },
      { stepNumber: 6, name: "Confirmation Page", href: "/confirmationPage" },
    ];

    const seniorSteps = [
      { stepNumber: 2, name: "Application Form", href: "/RegistrationForm" },
      { stepNumber: 3, name: "Upload Documents", href: "/DocumentUpload" },
      { stepNumber: 4, name: "Self Verification", href: "/SelfVerification" },
      { stepNumber: 5.1, name: "Room-mate Selection", href: "/RoomMate" },
      //5.2 is for when roommate is selected, and both are agreed.
      { stepNumber: 5.2, name: "Room Booking", href: "/Allotment" },
      { stepNumber: 6, name: "Confirmation Page", href: "/confirmationPage" },
    ];

    const stepsArray = session?.sem === "1" ? firstYearSteps : seniorSteps;

    const allowedPaths = stepsArray.map((step) => step.href);

    const matchedStep = stepsArray.find(
      (step) => step.stepNumber === parseFloat(session?.step)
    );
    // console.log('matched ;',matchedStep)

    if (matchedStep) {
      if (allowedPaths.includes(location.pathname)) {
        if (
          (location.pathname !== matchedStep.href) &&
          !((session?.step === 5.2) && (location.pathname === "/RoomMate"))
        ) {
          navigate(matchedStep.href);
        } else {
          console.log(location.pathname,matchedStep )
        }
      }
    }
  }, [session?.step, session?.stepIndex, location.pathname]);
  return (
    <SessionContext.Provider
      value={{ session, setSession, updateSession, logout }}
    >
      {children}
    </SessionContext.Provider>
  );
};
