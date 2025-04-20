import React, { useState } from "react";
import axiosInstance from "../../Helper/axiosInstance";
import logo from "../../assets/images/logo_250.png";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { useSession } from "../../components/ProtectedPath/SessionContext";
import Header from "../../components/Header/Header";

const AdminSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { updateSession } = useSession();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[a-zA-Z0-9._%+-]+@nitj\.ac\.in$/.test(email)) {
      newErrors.email = "Email address must be in the format name@nitj.ac.in.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    return newErrors;
  };

  const sendForm = async () => {
    const data = {
      email,
      password,
    };

    try {
      let res = axiosInstance.post(`/admin_sign_in.php`, data);

      await toast.promise(res, {
        loading: "Logging you In...",
        success: (data) => {
         //console.log(data?.data);
          return data?.data?.message;
        },
        error: (data) => {
         //console.log(data?.response?.data);
          return data?.response?.data.message;
        },
      });
      res = await res;

      if (res?.data?.status === "success") {
        var session = {};

        session.email = res?.data?.username;
        session.role = res?.data?.role;
        session.hostel = res?.data?.hostel;

        updateSession(session);
        navigate("/HostelSummary");


      }
    } catch (error) {
      console.error("Error Logging In the user.", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    sendForm();
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <>
    
      <section className="my-28 flex items-center justify-center bg-white px-4 lg:py-8 md:py-0">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white border-1 border-blue-600 rounded-lg shadow-md overflow-hidden relative">
          <button
            onClick={handleBack}
            className="absolute top-4 left-4 text-blue-600 hover:text-blue-800 focus:outline-none"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-center mb-6">
              <img className="w-24 h-24 md:w-32 md:h-32" src={logo} alt="Logo" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight text-blue-900 text-center">
              Admin Login
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-blue-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`bg-white border ${errors.email ? "border-red-500" : "border-blue-300"
                    } text-blue-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
                  placeholder="name@nitj.ac.in"
                  required
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
                  required
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminSignIn;
