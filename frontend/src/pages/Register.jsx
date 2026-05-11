import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { validatePassword } from "../utils/validatePassword";
import { useContext } from "react";
import axios from 'axios'
import AuthContext from "../providers/authContext";
import toast from "react-hot-toast";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Register = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { emailPasswordRegister, updateUserProfile, googleLogin, loading } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // register user
    const onSubmit = async (data) => {
        const passwordError = validatePassword(data.password, data.confirmPassword);

        if (passwordError) {
            return toast.error(passwordError);
        }

        try {
            const result = await emailPasswordRegister(data.email, data.password);
            await updateUserProfile(data.name);
            // console.log(result)
            const userInfo = {
                email: data.email,
                displayName: data.name,
                photoURL: null | result?.user?.photoURL
            };

            const userForToken = {
                email: result.user.email,
            };

            if (result.user) {
                await axiosPublic.post("/user", userInfo);
                // generate jwt token
                await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/generate-token`, userForToken, {
                    withCredentials: true,
                }
                );
                toast.success("Registration Successful");
                navigate("/")
            }
            reset();
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await googleLogin();
            const user = result.user;
            // console.log(user);

            const userInfo = {
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            };

            await axiosPublic.post("/user", userInfo);
            // generate jwt token
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/generate-token`, { email: user.email }, {
                withCredentials: true,
            });

            toast.success("Login Successful");
            navigate("/")

        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    };


    return (
        <div className="h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-6">

                <div className="text-center mb-5">
                    <h2 className="text-3xl font-bold">
                        Create Account
                    </h2>

                    <p className="text-sm mt-2">
                        Fill in the details to create your account
                    </p>
                </div>

                {/* form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    {/* name */}
                    <div>
                        <label className="text-base font-medium block mb-1">
                            Full Name
                        </label>
                        <div className="relative">
                            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                {...register("name", { required: "Name is required", })}
                                type="text"
                                placeholder="Enter your full name"
                                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                        {
                            errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message} </p>
                        }
                    </div>

                    {/* email */}
                    <div>
                        <label className="text-base font-medium  block mb-1">
                            Email
                        </label>
                        <div className="relative">
                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                {...register("email", { required: "Email is required" })}
                                type="email"
                                placeholder="Enter your email"
                                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* password */}
                    <div>
                        <label className="text-base font-medium  block mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                })}
                            />
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* confirm password */}
                    <div>
                        <label className="text-base font-medium block mb-1">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                placeholder="Confirm your password"
                                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
                                {...register("confirmPassword", { required: "Confirm Password is required", })}
                            />
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    {/* submit button */}
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full py-2 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Register
                    </button>
                </form>

                {/* divider */}
                <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-sm text-gray-400">OR</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* google login */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-2.5 font-medium hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FcGoogle className="text-xl" />
                    Continue with Google
                </button>

                {/* register link */}
                <p className="text-sm text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-primary font-medium hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;