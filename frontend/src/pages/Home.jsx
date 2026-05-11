import { Link } from "react-router-dom";
import { MdVerifiedUser } from "react-icons/md";

const Home = () => {
    return (
        <div className="container mx-auto px-4 md:px-10 lg:px-16">
            <section className="min-h-[80vh] flex items-center justify-center py-6">

                <div className="text-center">
                    <h2 className="inline-block px-6 py-2 bg-primary/15 text-primary font-medium rounded-full text-sm mb-6">
                        Full Stack Product Management Application
                    </h2>

                    <h1 className="text-4xl md:text-6xl font-bold text-black leading-tight">
                        Manage Products <br />
                        <span className="text-primary/90"> Smarter & Faster</span>
                    </h1>

                    <p className="mt-6 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
                        A modern product management platform where users can add, update, view, and delete products with secure authentication and a clean user experience.
                    </p>

                    <div className="mt-8 inline-flex flex-col sm:flex-row items-center gap-2 bg-primary/10 border border-gray-200 px-5 py-3 rounded-xl">
                        <MdVerifiedUser className="text-green-600 text-xl" />
                        <p className="text-sm md:text-base">
                            Login required for adding, updating, and deleting products.
                        </p>

                    </div>

                    {/* Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

                        <Link to="/products">
                            <button className="px-7 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition duration-300">
                                Explore Products
                            </button>
                        </Link>

                        <Link to="/login">
                            <button className="px-7 py-3 border border-primary/50 rounded-xl hover:bg-primary/5 transition duration-300">
                                Login Now
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;