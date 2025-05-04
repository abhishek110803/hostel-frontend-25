import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo_250.png";
import axiosInstance from "../../Helper/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";

const EmailVerify = () => {
    const { code } = useParams(); // Get the verification code from the URL parameters
    const navigate = useNavigate();

    const sendForm = async () => {
        ////console.log("data is:", { email, code })
        try {
            let res = axiosInstance.post(`/verify.php`, { verificationCode: code });

            await toast.promise(res, {
                loading: "Verifying...",
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
            navigate('/SignIn');
        } catch (error) {
            console.error("Error Verifying email.", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        sendForm();
    };

    useEffect(() => {
        if (code) {
            sendForm();
        }
    }, []);

    return (
        <>
            <section className="my-36 mx-10 flex items-center justify-center bg-cover bg-center">
                <div className="w-full max-w-md bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <div className="p-6 space-y-6">
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <button
                                type="submit"
                                className="w-full text-lg text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Click to Verify
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default EmailVerify;
