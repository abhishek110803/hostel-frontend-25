import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../Helper/axiosInstance';
import toast from 'react-hot-toast';
import Header from '../../components/Header/Header';

const SetNewPassword = () => {
    const { code } = useParams();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const sendForm = async () => {
        const data = {
            code,
            email,
            password
        }
        try {
            let res = axiosInstance.post(`/forgot_verify.php`, data);

           //console.log('data hai :', data);

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

           //console.log(res?.data?.status === 'success');
            if (res?.data?.status === 'success') {
                setMessage(res.data.message);
                navigate('/SignIn');
            }

        } catch (error) {
            console.error("Error resetting password.", error);
            setMessage('An error occurred. Please try again.');
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }
        sendForm();
    };

    return (
        <>
            {/* <Header /> */}
            <section className="bg-white dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-gray-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Set New Password
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Enter your registered email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex w-full items-center justify-center">
                                    <button
                                        type="submit"
                                        className="dark:text-white bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-600 flex items-center justify-center w-[20%] py-3 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-gray-300 dark:border-gray-700 hover:border-purple-400 focus:ring-purple-400 dark:hover:border-purple-600"
                                    >
                                        Submit
                                    </button>
                                </div>
                                {message && (
                                    <div className="text-sm text-center text-gray-900 dark:text-white mt-4">
                                        {message}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SetNewPassword;
