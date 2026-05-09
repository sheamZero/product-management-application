import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { RiMenu2Line } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import NavSidebar from "./NavSidebar";

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    console.log(isSidebarOpen)

    // const user = { name: "John Doe", email: "john.doe@example.com" };
    const user = false;

    return (
        <nav className="sticky top-0 left-0 bg-white shadow border-b border-b-gray-200 z-50">
            <div className="container mx-auto px-4 md:px-10 py-5 flex items-center justify-between">

                {/* logo */}
                <div className="flex items-center gap-4">
                    <RiMenu2Line
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="text-2xl block md:hidden cursor-pointer"
                    />

                    <Link className="text-xl font-semibold cursor-pointer" to="/">
                        <span className="text-primary">Weero</span>
                        Products
                    </Link>
                </div>

                {/* links */}
                <div className="hidden md:flex items-center gap-6">
                    <NavLink
                        to="/"
                        className={({ isActive }) => ` gap-3 my-1  rounded-xl text-base font-medium transition-all ${isActive ? "text-primary" : "text-black"}`}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/products"
                        className={({ isActive }) => `my-1  rounded-xl text-base font-medium transition-all ${isActive ? "text-primary" : "text-black"}`}
                    >
                        Products
                    </NavLink>
                </div>

                {/* profile and auth buttons */}
                <div className="flex items-center gap-6">
                    {
                        user ? (
                            <div className="flex items-center gap-3">
                                <div className="hidden md:flex flex-col items-end">
                                    <span className="text-sm font-semibold">
                                        {user?.name}
                                    </span>

                                    <span className="text-xs">
                                        {user?.email}
                                    </span>
                                </div>

                                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold overflow-hidden">
                                    {
                                        user?.image ? (
                                            <img
                                                src={user?.image}
                                                alt={user?.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            user?.name?.slice(0, 2)?.toUpperCase()
                                        )
                                    }
                                </div>

                                <button
                                    className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <FiLogOut /> Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-base font-medium bg-primary px-4 py-2 text-white rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    Login
                                </Link>

                                {/* <Link
                                    to="/register"
                                    className="text-base font-medium hover:text-primary"
                                >
                                    Register
                                </Link> */}
                            </>
                        )
                    }
                </div>


            </div>

            {/* sidebar */}
            <NavSidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                user={user}
            />
        </nav>
    );
};

export default Navbar;