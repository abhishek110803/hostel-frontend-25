import React, { useState } from "react";
import logo from "../../assets/images/logo_250.png";
import axiosInstance from "../../Helper/axiosInstance";
import toast from "react-hot-toast";
import { useSession } from "../../components/ProtectedPath/SessionContext";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import Header from "../../components/Header/Header";
import ReCAPTCHA from "react-google-recaptcha";
import { Captcha } from "../../components/CAPTACH/Captcha";
import {Alert } from "@mui/material";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [rollno, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [verified, setVerified] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(true);

  const sendToCaptchaForValidation = (e) => {
    setVerified(e);
  };

  const navigate = useNavigate();
  const { setSession } = useSession();

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required.";
      setVerified(false);
      setShowCaptcha(true);
    } else if (!/^[a-zA-Z0-9._%+-]+@nitj\.ac\.in$/.test(email)) {
      newErrors.email = "Email address must be in the format name@nitj.ac.in.";
      setVerified(false);
      setShowCaptcha(true);
    }
    if (!rollno) {
      newErrors.rollno = "Roll number is required.";
      setVerified(false);
      setShowCaptcha(true);
    } else if (!/^\d{8}$/.test(rollno)) {
      newErrors.rollno = "Roll number must be exactly 8 digits.";
      setVerified(false);
      setShowCaptcha(true);
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
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
      setVerified(false);
      setShowCaptcha(true);
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match.";
      setVerified(false);
      setShowCaptcha(true);
    }
    return newErrors;
  };

  const sendForm = async () => {
    const data = {
      email,
      rollno,
      password,
    };

    try {
      let res = axiosInstance.post(`/sign_up.php`, data);

      await toast.promise(res, {
        loading: "Creating...",
        success: (data) => {
          return data?.data?.message;
        },
        error: (data) => {
          return data?.response?.data.message;
          setVerified(false);
          setShowCaptcha(true);
        },
      });
      res = await res;

      if (res?.data?.status === "success") {
        navigate("/SignIn");
        setSession(res.data.user);
      }
    } catch (error) {
      console.error("Error while creating your account.", error);
    }
  };

  const handleSubmit = async (event) => {
    setVerified(false);
    setShowCaptcha(true);
    event.preventDefault();
    const validationErrors = validateForm(); // Call validateForm function
    if (Object.keys(validationErrors).length > 0) {
      sendToCaptchaForValidation(false);
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    sendForm();
  };

  const onChange = (value) => {
    setVerified(true);
  };

  return (
    <>
      <section className="min-h-max lg:m-10 flex items-center justify-center bg-white px-4 py-4 mt-8 md:py-0">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white border-1 border-blue-600 rounded-lg shadow-md overflow-hidden relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 text-blue-600 hover:text-blue-800 focus:outline-none"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-center mb-6">
              <img className="w-24 h-24 md:w-32 md:h-32" src={logo} alt="Logo" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight text-blue-900 text-center">
              Create  Account
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit} method="POST">
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
                  htmlFor="rollno"
                  className="block mb-2 text-sm font-medium text-blue-900"
                >
                  Roll No.
                </label>
                <input
                  type="text"
                  name="rollno"
                  id="rollno"
                  value={rollno}
                  onChange={(e) => setRollNo(e.target.value)}
                  className={`bg-white border ${errors.rollno ? "border-red-500" : "border-blue-300"
                    } text-blue-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
                  placeholder="12345678"

                />
                {errors.rollno && (
                  <p className="mt-2 text-sm text-red-600">{errors.rollno}</p>
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
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-blue-900"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`bg-white border ${errors.confirmPassword ? "border-red-500" : "border-blue-300"
                    } text-blue-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
                  placeholder="••••••••"

                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              {verified && (
                <Alert variant="outlined" sx={{ marginBottom: "10px" }}>
                  Captcha Validated Successful
                </Alert>
              )}
               {showCaptcha && <Captcha setVerification={sendToCaptchaForValidation} setShowCaptcha={setShowCaptcha} />}

              <button
                type="submit"
                className={`w-full text-white ${verified ? "bg-blue-700" : "bg-blue-400"
                  } 
                  
                  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                disabled={!verified}
              >
                Create Account
              </button>

              

              <p className="text-sm font-light text-blue-500 text-center">
                Already have an account?{" "}
                <Link
                  to="/SignIn"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
