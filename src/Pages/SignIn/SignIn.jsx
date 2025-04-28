import React, { useState } from "react";
import axiosInstance from "../../Helper/axiosInstance";
import logo from "../../assets/images/logo_250.png";
import toast from "react-hot-toast";
import { useSession } from "../../components/ProtectedPath/SessionContext";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import Header from "../../components/Header/Header";
import ReCAPTCHA from "react-google-recaptcha";
import { Alert } from "@mui/material";
import { Captcha } from "../../components/CAPTACH/Captcha";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { updateSession } = useSession();



  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required.";
      setVerified(false);
      setShowCaptcha(true);
    } else if (!/^[a-zA-Z0-9._%+-]+@nitj\.ac\.in$/.test(email)) {
      setVerified(false);
      setShowCaptcha(true);
      newErrors.email = "Email address must be in the format name@nitj.ac.in.";
    }
    if (!password) {
      setVerified(false);
      setShowCaptcha(true);
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      setVerified(false);
      setShowCaptcha(true);
      newErrors.password = "Password must be at least 6 characters long.";
    }
    return newErrors;
  };


  const sendToCaptchaForValidation = (e) => {
    setVerified(e);
  };
  function onChange(value) {
    // console.log("Captcha value:", value);
    setVerified(true);
  }
  const sendForm = async () => {
    const data = {
      email,
      password,
    };

    try {
      let res = axiosInstance.post(`/sign_in.php`, data);

      await toast.promise(res, {
        loading: "Logging you In...",
        success: (data) => {
          console.log(data?.data);
          return data?.response?.data.message;
        },
        error: (data) => {
          // console.log(data?.response?.data);
          setVerified(false);
          setShowCaptcha(true);
          return data?.response?.data.message;
        },
      });
      res = await res;

      if (res?.data?.status === "success") {
        // setSession(res.data.user);
        function splitCourseSem(courseSem) {
          // Define the regular expression to match the pattern
          const regex = /^([a-z]+)(\d+)$/;

          // Execute the regex on the courseSem string
          const matches = courseSem.match(regex);

          if (matches && matches.length === 3) {
            // Return the course and semester as an object
            return {
              course: matches[1], // course is the first part
              semester: matches[2] // semester is the second part
            };
          } else {
            // Return null if the string doesn't match the expected format
            return null;
          }
        }
        const session = {};

        session.email = data?.email;
        session.roll = res?.data.rollno;
        // session.isSingle = Boolean(reisSingleisSingles?.data?.);
        // session.isSingle = res?.data?.course_sem === "btech7";


        session.isSingle = false;
        const course_sem = splitCourseSem(res?.data?.course_sem);
        session.course = course_sem?.course;
        session.sem = course_sem?.semester;

        session.form_uploaded = res?.data.form_uploaded;
        session.doc_uploaded = res?.data.doc_uploaded;
        session.role = "user";
        // session.stepIndex = session.form_uploaded + session.doc_uploaded;
        session.step = Number(res?.data?.step);

        updateSession(session);
        // navigate("/RegistrationForm");
      }
    } catch (error) {
      console.error("Error Logging In the user.", error);
      setVerified(false);
      setShowCaptcha(true);
    }
  };

  const handleSubmit = async (event) => {
    setShowCaptcha(true);
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    sendForm();
  };

  return (
    <>
      {/* <Steps /> */}

      <section className="my-28 flex items-center justify-center bg-white px-4 py-8 md:py-0">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white border-1 border-blue-600 rounded-lg shadow-md overflow-hidden relative">
          <button
            onClick={() => navigate('/')}
            className="absolute top-4 left-4 text-blue-600 hover:text-blue-800 focus:outline-none"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-center mb-6">
              <img className="w-24 h-24 md:w-32 md:h-32" src={logo} alt="Logo" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight text-blue-900 text-center">
              Login
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-blue-900"
                >
                  Official email Id
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`bg-white border ${errors.email ? "border-red-500" : "border-blue-300"
                    } text-blue-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
                  placeholder=""

                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-blue-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`bg-white border ${errors.password ? "border-red-500" : "border-blue-300"
                    } text-blue-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
                  placeholder="••••••••"

                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* <ReCAPTCHA
                sitekey="6LfRgw4qAAAAAP_zMCUwjPmP46Cd0t3Je630SLnt"
                onChange={onChange}
              /> */}
              {/*               
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Login to your account
              </button> */}
              {verified && (
                <Alert variant="outlined" sx={{ marginBottom: "10px" }}>
                  Captcha Validated Successful
                </Alert>
              )}
              {showCaptcha && <Captcha setVerification={sendToCaptchaForValidation} setShowCaptcha={setShowCaptcha} />}


              <button
                type="submit"
                className={`w-full text-white ${verified ? "bg-blue-700" : "bg-blue-400"
                  } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                disabled={!verified}
              >
                Login to your account
              </button>


              <p className="text-sm font-light text-blue-500 text-center">
                Forgot Password?{" "}
                <Link
                  to="/ForgotPassword"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Reset Password
                </Link>
              </p>
              <p className="text-sm font-light text-blue-500 text-center">
                Don't have an account?{" "}
                <Link
                  to="/SignUp"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Sign up here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
