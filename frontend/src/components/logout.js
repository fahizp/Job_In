import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = () => {
            localStorage.removeItem("accessToken");
            toast.success("Logged out successfully.");
            navigate("/");
        };

        handleLogout();
    }, [navigate]);

    return null;
};

export default Logout;
