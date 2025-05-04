import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Helper/axiosInstance";
import toast from "react-hot-toast";
import Steps from "../../components/Steps/Steps";
import Header from "../../components/Header/Header";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const sendForm = async () => {
    try {
      let res = axiosInstance.post(`/forgot.php`, { email });

      await toast.promise(res, {
        loading: "Loading...",
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

     //console.log(res?.data?.status === "success");
    } catch (error) {
      console.error("Error forgot password.", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendForm();

   //console.log("Email submitted:", email);
    setMessage(
      "If an account with that email exists, a password reset link has been sent."
    );
  };


  return (
    <>
     
      {/* <Steps /> */}
      <section className="min-h-screen flex items-center justify-center bg-white px-4 py-8 md:py-0">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white border-1 border-blue-600 rounded-lg shadow-md overflow-hidden relative">
          <div className="p-6 md:p-8 space-y-6">
            <h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight text-blue-900 text-center">
              Forgot Password
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                  className="bg-white border border-blue-300 text-blue-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="name@nitj.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex w-full items-center justify-center">
                <button
                  type="submit"
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Submit
                </button>
              </div>
              {message && (
                <div className="text-sm text-center text-blue-900 mt-4">
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
