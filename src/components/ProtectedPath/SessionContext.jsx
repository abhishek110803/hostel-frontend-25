import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Helper/axiosInstance';
import toast from 'react-hot-toast';

const SessionContext = createContext();

export const useSession = () => {
    return useContext(SessionContext);
};

export const SessionProvider = ({ children }) => {

    const [session, setSession] = useState(JSON.parse(localStorage.getItem('session5')));

    const updateSession = (newData) => {
        const updatedSession = { ...session, ...newData };
        setSession((data) => ({ ...data, ...newData }));
        localStorage.setItem('session5', JSON.stringify(updatedSession));
    };

    const navigate = useNavigate();

    const logout = async () => {
        try {
            let res = axiosInstance.get('/logout.php');
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
                localStorage.removeItem('session5');
                navigate('/');
            }
        } catch (error) {
            console.error("Error fetching data.", error);
        }
    }

    const checkSession = async () => {
        const ss = await JSON.parse(localStorage.getItem('session5'));
        //console.log('session09', ss, session);
        if ((ss)) {
            setSession(ss);
        }
    };

    // const [request, setRequest] = useState(null);

    // const [index, setIndex] = useState(0);

    const getRequest = async () => {
        // if (!session?.roll) return
        try {
            let res = axiosInstance.post('/check_flags.php', {
                application_id: session?.application_id,
                code: session.code,
            });
            await toast.promise(res, {
                loading: "Fetching data.",
                success: (data) => {
                    // console.log(data?.data);
                    return data?.data?.message;
                },
                error: (data) => {
                    //console.log(data?.response?.data);
                    return data?.response?.data.message;
                }
            });
            res = await res;
            // console.log('res ka data from session', res?.data);
            if (res?.data?.status === "success") {
                const data = res?.data;
                const s = {}

                s.password_changed = data?.password_changed;
                s.mobile_verified = data?.mobile_verified;
                s.form_uploaded = data?.form_uploaded;
                s.docs_uploaded = data?.docs_uploaded;
                s.self_verification = data?.self_verification;
                s.alloted = data?.alloted;

                const flags = [
                    { key: 'password_changed', value: data?.password_changed },
                    { key: 'mobile_verified', value: data?.mobile_verified },
                    { key: 'form_uploaded', value: data?.form_uploaded },
                    { key: 'docs_uploaded', value: data?.docs_uploaded },
                    { key: 'self_verification', value: data?.self_verification },
                    { key: 'alloted', value: data?.alloted }
                ];

                // Find the first 0 and set the write index
                let cnt = 0;
                for (let i = 0; i < flags.length; i++) {
                    console.log('f(i)', i, flags[i]);
                    cnt = i;
                    if (flags[i].value == 0 || flags[i].value == null) {
                        console.log('first')
                        // setIndex(i);
                        s.stepIndex = i;
                        cnt = -1;
                        break;
                    }
                }
                console.log('han vro', cnt)
                if (cnt === 5) {
                    s.stepIndex = 6;
                    // setIndex(6);
                } else if (cnt > 0) {
                    console.log('hn mai bhi', cnt);
                    s.stepIndex = cnt;
                    // setIndex(cnt);
                }
                updateSession(s);
            }
        } catch (error) {
            console.error("Error fetching data.", error);
        }
    };

    // useEffect(() => {
    //     if (session) {
    //         updateSession({ stepIndex: (session.mobile_verified + session.password_changed) });
    //     }
    // }, [index, setIndex]);


    useEffect(() => {
        checkSession();
    }, [])

    useEffect(() => {
        // if (session && session?.role === 'user' && session?.stepIndex > 1) {
        if (session && session?.role === 'user' ) {
            getRequest();
        }
    }, [session?.application_id, session?.stepIndex]);

    return (
        <SessionContext.Provider value={{ session, setSession, updateSession, logout, getRequest }}>
            {children}
        </SessionContext.Provider>
    );
};
