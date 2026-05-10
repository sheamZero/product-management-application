import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../providers/authContext";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

const useAxiosSecure = () => {
    const { signOutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {

        const interceptor = axiosSecure.interceptors.response.use(

            (response) => response,
            async (error) => {

                const status = error?.response?.status;

                // Unauthorized
                if (status === 401) {

                    await signOutUser();

                    navigate("/login", {
                        replace: true,
                    });
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.response.eject(interceptor);
        };

    }, [navigate, signOutUser]);

    return axiosSecure;
};

export default useAxiosSecure;