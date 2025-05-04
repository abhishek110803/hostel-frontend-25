import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from './SessionContext';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ role }) => {
    const { session } = useSession();

    ////console.log(session);

    if (!session) {
        if (role.includes("user")) {
            return <Navigate to="/SignIn" />;
        }
        return <Navigate to="/AdminSignIn" />;
    }
    // else {
    //     ////console.log('session hai', session);
    // }

    if (role && !role.includes(session.role)) {
        toast.error("Unauthorized access");
        return <Navigate to="/" />;
    }

    return <>
        {/* <div></div> */}

        {/**
         * This <div> is just a placeholder , 
         * and we will pass the navbar of 
         * that year into this, and then i
         * t will added for that particular year student.
         */}
        
        <Outlet />
    </>;
};

export default ProtectedRoute;
