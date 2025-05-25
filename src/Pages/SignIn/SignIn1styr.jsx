// import React, { useState } from "react";
// import axiosInstance from "../../Helper/axiosInstance";
// import logo from "../../assets/images/logo_250.png";
// import toast from "react-hot-toast";
// import { useSession } from "../../components/ProtectedPath/SessionContext";
// import { Link, useNavigate } from "react-router-dom";
// import { ArrowLeftIcon } from "@heroicons/react/solid";
// import Header from "../../components/Header/Header";
// import ReCAPTCHA from "react-google-recaptcha";
// import { Alert } from "@mui/material";
// import { Captcha } from "../../components/CAPTACH/Captcha";
// const SignIn = () => {
//   const [applicationId, setapplicationId] = useState("");
//   const [password, setPassword] = useState("");
//   const [verified, setVerified] = useState(false);
//   const [showCaptcha, setShowCaptcha] = useState(true);
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const { updateSession } = useSession();

//   const validateForm = () => {
//     const newErrors = {};
//     if (!applicationId) {
//       newErrors.applicationId = "Application ID is required.";
//       setVerified(false);
//       setShowCaptcha(true);
//     }
//     else if (applicationId.length < 6) {
//       setVerified(false);
//       setShowCaptcha(true);
//       newErrors.applicationId = "Application ID is too short.";
//     }
//     if (!password) {
//       setVerified(false);
//       setShowCaptcha(true);
//       newErrors.password = "Password is required.";
//     } else if (password.length < 6) {
//       setVerified(false);
//       setShowCaptcha(true);
//       newErrors.password = "Password must be at least 6 characters long.";
//     }
//     return newErrors;
//   };

//   const sendToCaptchaForValidation = (e) => {
//     setVerified(e);
//   };
//   function onChange(value) {
//     // console.log("Captcha value:", value);
//     setVerified(true);
//   }

//   const sendForm = async () => {
//     const data = {
//       application_id: applicationId,
//       password,
//     };

//     try {
//       let res = axiosInstance.post(`/sign_in.php`, data);

//       await toast.promise(res, {
//         loading: "Logging you In...",
//         success: (data) => {
//           // console.log(data?.data);
//           return data?.data?.message;
//         },
//         error: (data) => {
//           // console.log(data?.response?.data);
//           setVerified(false);
//           setShowCaptcha(true);
//           return data?.response?.data.message;
//         },
//       });
//       res = await res;

//       if (res?.data?.status === "success") {
//         const session = {};

//         session.code = res?.data?.code;
//         session.application_id = data.application_id;
//         session.password_changed = res?.data?.password_changed;
//         session.mobile_verified = res?.data?.mobile_verified;

//         session.role = "user";
//         session.stepIndex = session.password_changed + session.mobile_verified;

//         updateSession(session);
//         navigate("/FirstYearChangePassword");
//       }
//     } catch (error) {
//       console.error("Error Logging In the user.", error);
//       setVerified(false);
//       setShowCaptcha(true);
//     }
//   };

//   const handleSubmit = async (event) => {
//     setShowCaptcha(true);
//     event.preventDefault();

//     const validationErrors = validateForm();

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
//     setErrors({});
//     sendForm();
//   };

//   return (
//     <>
//       {/* <Steps /> */}

//       <section className="my-28 flex items-center justify-center bg-white px-4 py-8 md:py-0">
//         <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white border-1 border-blue-600 rounded-lg shadow-md overflow-hidden relative">
//           <button
//             onClick={() => navigate('/')}
//             className="absolute top-4 left-4 text-blue-600 hover:text-blue-800 focus:outline-none"
//           >
//             <ArrowLeftIcon className="h-6 w-6" />
//           </button>
//           <div className="p-6 md:p-8 space-y-6">
//             <div className="flex items-center justify-center mb-6">
//               <img className="w-24 h-24 md:w-32 md:h-32" src={logo} alt="Logo" />
//             </div>
//             <h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight text-blue-900 text-center">
//               Login
//             </h1>
//             <form className="space-y-4" onSubmit={handleSubmit}>
//               <div>
//                 <label
//                   htmlFor="applicationId"
//                   className="block mb-2 text-sm font-medium text-blue-900"
//                 >
//                   Application Id
//                 </label>
//                 <input
//                   type="applicationId"
//                   name="applicationId"
//                   id="applicationId"
//                   value={applicationId}
//                   onChange={(e) => setapplicationId(e.target.value)}
//                   className={`bg-white border ${errors.applicationId ? "border-red-500" : "border-blue-300"
//                     } text-blue-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
//                   placeholder=""

//                 />
//                 {errors.applicationId && (
//                   <p className="mt-2 text-sm text-red-600">{errors.applicationId}</p>
//                 )}
//               </div>
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block mb-2 text-sm font-medium text-blue-900"
//                 >
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   id="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className={`bg-white border ${errors.password ? "border-red-500" : "border-blue-300"
//                     } text-blue-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
//                   placeholder="••••••••"

//                 />
//                 {errors.password && (
//                   <p className="mt-2 text-sm text-red-600">{errors.password}</p>
//                 )}
//               </div>

//               {verified && (
//                 <Alert variant="outlined" sx={{ marginBottom: "10px" }}>
//                   Captcha Validated Successful
//                 </Alert>
//               )}
//               {showCaptcha && <Captcha setVerification={sendToCaptchaForValidation} setShowCaptcha={setShowCaptcha} />}

//               <button
//                 type="submit"
//                 className={`w-full text-white ${verified ? "bg-blue-700" : "bg-blue-400"
//                   } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
//                 disabled={!verified}
//               >
//                 Login to your account
//               </button>

//               <p className="text-sm font-light text-blue-500 text-center">
//                 Forgot Password?{" "}
//                 <Link
//                   to="/ForgotPassword"
//                   className="font-medium text-blue-600 hover:underline"
//                 >
//                   Reset Password
//                 </Link>
//               </p>

//             </form>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default SignIn;

import React, { useState } from "react";
import axiosInstance from "../../Helper/axiosInstance";
import logo from "../../assets/images/logo_250.png";
import toast from "react-hot-toast";
import { useSession } from "../../components/ProtectedPath/SessionContext";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { Alert } from "@mui/material";
import { Captcha } from "../../components/CAPTACH/Captcha";

const UnifiedSignIn = () => {
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [password, setPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { updateSession } = useSession();

  // Validate based on selection
  const validateForm = () => {
    const newErrors = {};
    if (!year) {
      newErrors.year = "Please select your year.";
    }

    if (year === "1st year") {
      if (!applicationId) {
        newErrors.applicationId = "Application ID is required.";
        setVerified(false);
        setShowCaptcha(true);
      } else if (applicationId.length < 6) {
        newErrors.applicationId = "Application ID is too short.";
        setVerified(false);
        setShowCaptcha(true);
      }
    } else if (year) {
      if (!email) {
        newErrors.email = "Email is required.";
        setVerified(false);
        setShowCaptcha(true);
      } else if (!/^[a-zA-Z0-9._%+-]+@nitj\.ac\.in$/.test(email)) {
        newErrors.email =
          "Email address must be in the format name@nitj.ac.in.";
        setVerified(false);
        setShowCaptcha(true);
      }
    }

    if (!password) {
      newErrors.password = "Password is required.";
      setVerified(false);
      setShowCaptcha(true);
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      setVerified(false);
      setShowCaptcha(true);
    }
    return newErrors;
  };

  const sendToCaptchaForValidation = (flag) => setVerified(flag);

  const sendForm = async () => {
    try {
      let payload = {};
      let endpoint = "/sign_in.php";
      if (year === "1st year") {
        payload = { application_id: applicationId, password };
        endpoint = "/first_year_sign_in.php"
      } else {
        payload = { email, password };
      }

      let resPromise = axiosInstance.post(endpoint, payload);
      await toast.promise(resPromise, {
        loading: "Logging you In...",
        success: (data) => data?.data?.message,
        error: (err) => {
          setVerified(false);
          setShowCaptcha(true);
          return err?.response?.data?.message;
        },
      });

      const res = await resPromise;
      if (res?.data?.status === "success") {
        const session = {};
        if (year === "1st year") {
          session.code = res.data.code;
          session.application_id = applicationId;
          session.password_changed = res.data.password_changed;
          session.mobile_verified = res.data.mobile_verified;
          session.role = "user";
          session.stepIndex =
            session.password_changed + session.mobile_verified;
          // session.course = matches[1] || null;
          session.sem = '1';
          updateSession(session);
          navigate("/FirstYearChangePassword");
        } else {
          // split course_sem like 'btech7'
          const regex = /^([a-z]+)(\d+)$/;
          const matches = res.data.course_sem?.match(regex) || [];
          session.email = email;
          session.roll = res.data.rollno;
          session.isSingle = false;
          session.course = matches[1] || null;
          session.sem = matches[2] || null;
          session.form_uploaded = res.data.form_uploaded;
          session.doc_uploaded = res.data.doc_uploaded;
          session.role = "user";
          session.step = Number(res.data.step);
          updateSession(session);
          navigate("/RegistrationForm");
        }
      }
    } catch (error) {
      console.error("Error logging in.", error);
      setVerified(false);
      setShowCaptcha(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowCaptcha(true);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    sendForm();
  };

  return (
    <section className="my-28 flex items-center justify-center bg-white px-4 py-8 md:py-0">
      <div className="w-full max-w-md bg-white border border-blue-600 rounded-lg shadow-md overflow-hidden relative">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 text-blue-600 hover:text-blue-800 focus:outline-none"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-center mb-6">
            <img src={logo} alt="Logo" className="w-24 h-24 md:w-32 md:h-32" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-blue-900 text-center">
            Login
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="year"
                className="block mb-2 text-sm font-medium text-blue-900"
              >
                Select Year
              </label>
              <select
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="bg-white border border-blue-300 text-blue-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              >
                <option value="">-- Choose --</option>
                <option value="1st year">1st Year</option>
                <option value="2nd year">2nd Year</option>
                <option value="3rd year">3rd Year</option>
                <option value="4th year">4th Year</option>
              </select>
              {errors.year && (
                <p className="mt-2 text-sm text-red-600">{errors.year}</p>
              )}
            </div>

            {/* Conditional Fields */}
            {year === "1st year" ? (
              <div>
                <label
                  htmlFor="applicationId"
                  className="block mb-2 text-sm font-medium text-blue-900"
                >
                  Application ID
                </label>
                <input
                  id="applicationId"
                  value={applicationId}
                  onChange={(e) => setApplicationId(e.target.value)}
                  className={`bg-white border ${
                    errors.applicationId ? "border-red-500" : "border-blue-300"
                  } text-blue-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
                />
                {errors.applicationId && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.applicationId}
                  </p>
                )}
              </div>
            ) : year ? (
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-blue-900"
                >
                  Official Email Id
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`bg-white border ${
                    errors.email ? "border-red-500" : "border-blue-300"
                  } text-blue-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            ) : null}

            {/* Password Field */}
            {year && (
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-blue-900"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`bg-white border ${
                    errors.password ? "border-red-500" : "border-blue-300"
                  } text-blue-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            )}

            {/* Captcha & Submit */}
            {verified && (
              <Alert variant="outlined" sx={{ marginBottom: "10px" }}>
                Captcha Validated Successful
              </Alert>
            )}
            {showCaptcha && year && (
              <Captcha
                setVerification={sendToCaptchaForValidation}
                setShowCaptcha={setShowCaptcha}
              />
            )}
            <button
              type="submit"
              disabled={!verified || !year}
              className={`w-full text-white ${
                verified && year ? "bg-blue-700" : "bg-blue-400"
              } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
            >
              Login to your account
            </button>

            {/* Links */}
            <p className="text-sm font-light text-blue-500 text-center">
              Forgot Password?{" "}
              <Link
                to="/ForgotPassword"
                className="font-medium text-blue-600 hover:underline"
              >
                Reset Password
              </Link>
            </p>
            {year !== "1st year" && (
              <p className="text-sm font-light text-blue-500 text-center">
                Don't have an account?{" "}
                <Link
                  to="/SignUp"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Sign up here
                </Link>
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default UnifiedSignIn;
