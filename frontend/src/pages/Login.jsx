import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import AuthContext from "../providers/authContext";

const Login = () => {
    const { googleLogin, loading } = useContext(AuthContext)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await googleLogin();
            console.log("from login", result.user);
        } catch (error) {
            console.log(error.message)
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">

                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Welcome Back
                    </h2>

                    <p className="text-sm mt-2">
                        Login to continue to your account
                    </p>
                </div>

                {/* form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    {/* email */}
                    <div>
                        <label className="text-base font-medium  block mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
                                {...register("email", { required: "Email is required" })}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
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

                    {/* submit button */}
                    <button
                        type="submit"
                        className="w-full py-2 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition"
                    >
                        Login
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
                    disabled={loading}
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-2.5 font-medium hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FcGoogle className="text-xl" />
                    Continue with Google
                </button>

                {/* register link */}
                <p className="text-sm text-center text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-primary font-medium hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;