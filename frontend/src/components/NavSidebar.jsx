import { Link, NavLink } from "react-router-dom";
import { FiHome, FiLogOut, FiPackage } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";


const NavSidebar = ({ isSidebarOpen, setIsSidebarOpen, user,signOutUser }) => {
    return (
        <>
            {
                isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/40 z-40 md:hidden" />
            }

            <div
                className={`fixed top-0 left-0 h-screen w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 md:hidden ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* logo */}

                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                    <Link to="/" onClick={() => setIsSidebarOpen(false)} className="text-xl font-semibold">
                        <span className="text-primary">Weero</span>
                        Products
                    </Link>

                    <button onClick={() => setIsSidebarOpen(false)}>
                        <MdOutlineClose className="text-2xl" />
                    </button>
                </div>

                {/*  links */}
                <div className="flex flex-col p-4">
                    <NavLink
                        to="/"
                        onClick={() => setIsSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                            ${isActive
                                ? "bg-primary text-white"
                                : "hover:bg-primary/10"
                            }`
                        }
                    >
                        <FiHome className="text-lg" />
                        Home
                    </NavLink>

                    <NavLink
                        to="/products"
                        onClick={() => setIsSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 my-1 px-4 py-3 rounded-xl text-sm font-medium transition-all
                            ${isActive
                                ? "bg-primary text-white"
                                : "hover:bg-primary/10"
                            }`
                        }
                    >
                        <FiPackage className="text-lg" />
                        Products
                    </NavLink>


                </div>

                {/* auth buttons */}
                <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-200 bg-white">
                    {
                        user ? (
                            <button
                            onClick={signOutUser}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                            >
                                <FiLogOut />
                                Logout
                            </button>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <Link
                                    to="/login"
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="w-full text-center px-4 py-3 rounded-xl bg-primary text-white text-sm font-medium"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="w-full text-center  px-4 py-3 rounded-xl border text-sm font-medium hover:bg-gray-50"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                </div>
            </div>
        </>
    );
};

export default NavSidebar;