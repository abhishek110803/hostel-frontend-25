// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../Helper/axiosInstance";
// import toast from "react-hot-toast";
// import Steps from "../../components/Steps/Steps";
// import Header from "../../components/Header/Header";

// const Otp = () => {
//     const [mobileNo, setmobileNo] = useState("1234567890");
//     const [message, setMessage] = useState("");
//     const navigate = useNavigate();

//     const sendForm = async () => {
//         try {
//             let res = axiosInstance.post(`/`, { mobileNo });

//             await toast.promise(res, {
//                 loading: "Loading...",
//                 success: (data) => {
//                     //console.log(data?.data);
//                     return data?.data?.message;
//                 },
//                 error: (data) => {
//                     //console.log(data?.response?.data);
//                     return data?.response?.data.message;
//                 },
//             });
//             res = await res;

//             //console.log(res?.data?.status === "success");
//         } catch (error) {
//             console.error("Error In Sending OTP.", error);
//         }
//     };

//     const handlePhoneSubmit = (event) => {
//         event.preventDefault();
//         sendForm();

//         //console.log("mobileNo submitted:", mobileNo);
//         // setMessage(
//         //   "If an account with that mobileNo exists, a password reset link has been sent."
//         // );
//     };


//     return (
//         <>

//             {/* <Steps /> */}
//             <section className="min-h-screen flex items-center justify-center bg-white px-4 py-8 md:py-0">
//                 <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white border-1 border-blue-600 rounded-lg shadow-md overflow-hidden relative">
//                     <div className="p-6 md:p-8 space-y-6">
//                         <h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight text-blue-900 text-center">
//                             Mobile No Verification
//                         </h1>
//                         <form className="space-y-4 md:space-y-6" onSubmit={handlePhoneSubmit}>
//                             <div>
//                                 <label
//                                     htmlFor="mobileNo"
//                                     className="block mb-2 text-sm font-medium text-blue-900"
//                                 >
//                                     Enter Your Mobile No:
//                                 </label>
//                                 <input
//                                     type="mobileNo"
//                                     name="mobileNo"
//                                     id="mobileNo"
//                                     className="bg-white border border-blue-300 text-blue-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
//                                     placeholder="Enter 10 Digit Mobile No"
//                                     value={mobileNo}
//                                     onChange={(e) => setmobileNo(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div className="flex w-full items-center justify-center">
//                                 <button
//                                     type="submit"
//                                     className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//                                 >
//                                     Get OTP
//                                 </button>
//                             </div>
//                             {message && (
//                                 <div className="text-sm text-center text-blue-900 mt-4">
//                                     {message}
//                                 </div>
//                             )}
//                         </form>
//                         <div>
//                          <p className="text-xl font-bold">A 6 Digit OTP has been Sent on {mobileNo}</p>

//                         </div>

//                         <form className="space-y-4 md:space-y-6" onSubmit={handlePhoneSubmit}>
//                             <div>
//                                 <label
//                                     htmlFor="mobileNo"
//                                     className="block mb-2 text-sm font-medium text-blue-900"
//                                 >
//                                     Enter OTP:
//                                 </label>
//                                 <input
//                                     type="mobileNo"
//                                     name="mobileNo"
//                                     id="mobileNo"
//                                     className="bg-white border border-blue-300 text-blue-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
//                                     placeholder="Enter 6 Digits OTP"
//                                     value={mobileNo}
//                                     onChange={(e) => setmobileNo(e.target.value)}
//                                     required
//                                 />
//                             </div>

//                             <div className="flex w-full items-center justify-around">
//                                 <button
//                                     type="submit"
//                                     className="text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//                                 >
//                                     Resend OTP
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//                                 >
//                                     Verify OTP
//                                 </button>
//                             </div>
//                             {message && (
//                                 <div className="text-sm text-center text-blue-900 mt-4">
//                                     {message}
//                                 </div>
//                             )}
//                         </form>
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// };

// export default Otp;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import FirstYearProcessBar from '../../components/StepProcessBar/FirstYearProcessBar'
import { useSession } from "../../components/ProtectedPath/SessionContext";
import axiosInstance from "../../Helper/axiosInstance";
import toast from "react-hot-toast";

import NavBar1 from '../../components/Steps/Steps'

const Otp = () => {
    const [mobileNo, setMobileNo] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [showOtpForm, setShowOtpForm] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isResendAllowed, setIsResendAllowed] = useState(false);

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        } else {
            setIsResendAllowed(true);
        }

        return () => clearInterval(interval);
    }, [timer]);

    const { session, updateSession } = useSession();

    const verifyOTP = async () => {
        const data = {
            otp,
            code: session?.code,
            mobile_number: mobileNo
        }
        try {
            let res = axiosInstance.post(`/first_year_otp_verify.php`, data);
            await toast.promise(res, {
                loading: "Verifying OTP.",
                success: (data) => {
                    console.log('a', data?.data);
                    return data?.data?.message;
                },
                error: (data) => {
                    console.log('b', data?.response?.data);
                    return data?.response?.data.message;
                },
            });
            res = await res;
            if (res?.data?.status === "success") {
                updateSession({ stepIndex: 2 });
            }
        } catch (error) {
            console.error("Error Verifying OTP.", error);
        }
    };


    const sendOTP = async () => {
        const data = {
            mobile_number: mobileNo,
            code: session?.code
        }
        try {
            let res = axiosInstance.post(`/first_year_send_otp.php`, data);
            await toast.promise(res, {
                loading: "Sending OTP.",
                success: (data) => {
                    // console.log('a',data?.data);
                    return data?.data?.message;
                },
                error: (data) => {
                    // console.log('b',data?.response?.data);
                    return data?.response?.data.message;
                },
            });
            res = await res;
            if (res?.data?.status === "success") {
                setError("");
                setShowOtpForm(true);
                setTimer(5);
                setIsResendAllowed(false);
            }
        } catch (error) {
            console.error("Error sending OTP.", error);
        }
    };




    const handlePhoneSubmit = (event) => {
        event.preventDefault();
        if (mobileNo.length !== 10 || isNaN(mobileNo)) {
            setError("Please enter a valid 10-digit mobile number.");
            return;
        }
        // console.log("OTP sent to:", mobileNo);
        sendOTP();
    };

    const handleOtpSubmit = (event) => {
        event.preventDefault();
        if (otp.length !== 6 || isNaN(otp)) {
            setError("Please enter a valid 6-digit OTP.");
            return;
        }
        // console.log("OTP submitted:", otp);
        verifyOTP();
    };

    const handleResendOtp = () => {
        if (!isResendAllowed) {
            setError("Please wait until the timer expires before resending OTP.");
            return;
        }
        setError("");
        setOtp("");
        sendOTP();
        // setShowOtpForm(false);
        setIsResendAllowed(false);
        console.log("OTP resent to:", mobileNo);
    };

    const handleChangeMobileNo = () => {
        setShowOtpForm(false);
        setMobileNo("");
        setOtp("");
        setError("");
    };

    return (
        <>
            <NavBar1 />
            <FirstYearProcessBar />
            <section className="min-h-[500px] flex items-center justify-center bg-white px-4 py-2 md:py-0">
                <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white border-1 border-blue-600 rounded-lg shadow-md overflow-hidden relative">
                    <div className="p-6 md:p-8 space-y-6">
                        <h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight text-blue-900 text-center">
                            Mobile No Verification
                        </h1>
                        <div className="transition-opacity duration-500">
                            {!showOtpForm ? (
                                <form
                                    className="space-y-4 md:space-y-6"
                                    onSubmit={handlePhoneSubmit}
                                >
                                    <label
                                        htmlFor="mobileNo"
                                        className="block mb-2 text-sm font-medium text-blue-900"
                                    >
                                        Enter Your Mobile No:
                                    </label>
                                    <input
                                        type="text"
                                        name="mobileNo"
                                        id="mobileNo"
                                        className="bg-white border border-blue-300 text-blue-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                        placeholder="Enter 10 Digit Mobile No"
                                        value={mobileNo}
                                        onChange={(e) => setMobileNo(e.target.value)}
                                        required
                                    />
                                    {error && <div className="text-red-600">{error}</div>}
                                    <div className="flex w-full items-center justify-center mt-4">
                                        <button
                                            type="submit"
                                            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        >
                                            Get OTP
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <form
                                    className="space-y-4 md:space-y-6"
                                    onSubmit={handleOtpSubmit}
                                >
                                    <div className="text-xl font-bold mb-4">
                                        A 6 Digit OTP has been sent to {mobileNo}
                                    </div>
                                    <label
                                        htmlFor="otp"
                                        className="block mb-2 text-sm font-medium text-blue-900"
                                    >
                                        Enter OTP:
                                    </label>
                                    <input
                                        type="text"
                                        name="otp"
                                        id="otp"
                                        className="bg-white border border-blue-300 text-blue-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                        placeholder="Enter 6 Digits OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                    />
                                    {error && <div className="text-red-600">{error}</div>}
                                    <div className="flex w-full items-center justify-around mt-4">
                                        <button
                                            type="button"
                                            className="text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                            onClick={handleResendOtp}
                                            disabled={!isResendAllowed} // Disable button until timer ends
                                        >
                                            Resend OTP
                                        </button>
                                        <button
                                            type="submit"
                                            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        >
                                            Verify OTP
                                        </button>
                                    </div>
                                    {timer > 0 && (
                                        <div className="text-sm text-blue-500 text-center mt-4">
                                            You can resend OTP in {timer} seconds
                                        </div>
                                    )}
                                    <p className="text-sm font-light text-blue-500 text-center mt-4">
                                        Wrong Mobile No.?{" "}
                                        <Link
                                            to="#"
                                            onClick={handleChangeMobileNo}
                                            className="font-medium text-blue-600 hover:underline"
                                        >
                                            Change Mobile No.
                                        </Link>
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};


export default Otp;
