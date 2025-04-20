import React, { useState } from "react";
import axiosInstance from "../../Helper/axiosInstance";
import toast from "react-hot-toast";
import { useSession } from "../../components/ProtectedPath/SessionContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import FirstYearProcessBar from "../../components/StepProcessBar/FirstYearProcessBar";
import NavBar from "../../components/Navbar/Steps";

const Changepassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    return newErrors;
  };

  const { session, updateSession } = useSession();

  const sendForm = async () => {
    const data = {
      new_password: password,
      code: session?.code,
    };

    try {
      let res = axiosInstance.post(`/change_password.php`, data);

      await toast.promise(res, {
        loading: "Changing you password...",
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
        updateSession({ stepIndex: 1 })
      }
    } catch (error) {
      console.error("Error creating user.", error);
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

  return (
    <>
      <NavBar/>
      <FirstYearProcessBar />

      <section className="min-h-max lg:m-10 flex items-center justify-center bg-white px-4 py-4 mt-8 md:py-0">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white border-1 border-blue-600 rounded-lg shadow-md overflow-hidden relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 text-blue-600 hover:text-blue-800 focus:outline-none"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <div className="p-6 md:p-8 space-y-6">
            {/* <div className="flex items-center justify-center mb-6">
              <img className="w-24 h-24 md:w-32 md:h-32" src={logo} alt="Logo" />
            </div> */}
            <h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight text-blue-900 text-center">
              Change Password
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit} method='POST'  >


              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-blue-900"
                >
                  New Password
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
                  required
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Update Password
              </button>

            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Changepassword;
