import { MdOutlineAddTask } from "react-icons/md";
import ProductTableRow from "../components/ProductTableRow";
import { useContext, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import AddProductModal from "../modals/AddProductModal";
import useGetAllProducts from "../hooks/useGetAllProducts";
import EditProductModal from "../modals/EditProductModal";
import AuthContext from "../providers/authContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Products = () => {
    const [page, setPage] = useState(1);
    const limit = 4;
    const [search, setSearch] = useState("");
    const [debounced, setDebounced] = useState('');
    const [priceRange, setPriceRange] = useState("");

    const [isAddProduct, setIsAddProduct] = useState(false);
    const [isEditProduct, setIsEditProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const { user, loading } = useContext(AuthContext);
    const { data, isLoading } = useGetAllProducts({ page, limit, search: debounced, priceRange });

    const products = data?.data || [];
    const totalPages = data?.totalPages || 1;
    const navigate = useNavigate();

    const handleAddProductss = async () => {
        if (!user) {
            const result = await Swal.fire({
                title: "Login Required!",
                text: "You must have to login first to Add a new product.",
                icon: "warning",

                width: "400px",
                padding: "2rem",
                confirmButtonColor: "#0fab74",
                showCancelButton: true,
                confirmButtonText: "Login",
                cancelButtonText: "Cancel"
            });

            if (result.isConfirmed) {
                navigate("/login");
            }
            return
        }

        setIsAddProduct(true);
    }


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounced(search);
        }, 1000);
        return () => clearTimeout(timer);
    }, [search]);


    if (isLoading || loading) {
        return (
            <div className="flex items-center justify-center">
                <p>Loading...</p>
            </div>
        )
    }


    return (
        <div className="container mx-auto px-4 md:px-10 lg:px-16 py-5">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-6 bg-primary/10 p-6 rounded-2xl">
                <div>
                    <h2 className="text-3xl font-bold">All Products</h2>
                    <p className="mt-2">Manage all products easily.</p>
                </div>

                {/* search and filter */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    {/* SEARCH */}
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="w-full  sm:w-64 rounded-full border border-gray-200 bg-white px-4 py-3 outline-none focus:border-primary"
                    />
                    <select
                        value={priceRange}
                        onChange={(e) => {
                            setPriceRange(e.target.value);
                            setPage(1);
                        }}
                        className="w-full sm:w-auto rounded-full border bg-white border-gray-300 px-4 py-3 outline-none focus:border-primary"
                    >
                        <option value="">All Prices</option>
                        <option value="100-200">$100 - $200</option>
                        <option value="200-350">$200 - $350</option>
                        <option value="350-500">$350 - $500</option>
                        <option value="500-1000">$500 - $1000</option>
                        <option value="1000-2000">$1000 - $2000</option>
                    </select>

                    {/*add product*/}

                    <button
                        onClick={handleAddProductss}
                        className="flex items-center gap-2 px-6 py-3 cursor-pointer bg-primary/90 hover:bg-primary text-white rounded-full font-semibold transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 shadow-md hover:shadow-xl"
                    >
                        <MdOutlineAddTask className="text-2xl font-extrabold" />
                        Add Product
                    </button>

                </div>
            </div>


            {
                products.length === 0 ? (
                    <p className="text-black text-center font-medium text-xl">
                        No products available. Login to add your first product.
                    </p>
                ) : (
                    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <table className="w-full text-sm text-left">

                            <thead className="bg-primary text-white">
                                <tr>
                                    <th className="px-4 py-4 uppercase font-semibold">#</th>
                                    <th className="px-4 py-4 uppercase font-semibold">Image</th>
                                    <th className="px-4 py-4 uppercase font-semibold">Name</th>
                                    <th className="px-4 py-4 uppercase font-semibold">Price</th>
                                    <th className="px-4 py-4 uppercase font-semibold">Description</th>
                                    <th className="px-4 py-4 uppercase font-semibold text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    products.map((product, idx) => (
                                        <ProductTableRow
                                            key={product._id}
                                            product={product}
                                            idx={idx}
                                            setSelectedProduct={setSelectedProduct}
                                            setIsEditProduct={setIsEditProduct}
                                        />
                                    ))}


                            </tbody>

                        </table>
                    </div>
                )
            }

            {
                products.length !== 0 && (<div className="flex items-center justify-center gap-4 mt-6">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="group flex items-center justify-center w-11 h-11 rounded-full border border-gray-300 bg-white shadow-sm hover:shadow-md transition-all duration-300 ease-out hover:bg-primary/10 active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed">
                        <FaArrowLeft className="text-black group-hover:text-primary transition" />
                    </button>

                    <span className="font-medium">
                        Page {page} of {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="group flex items-center justify-center w-11 h-11 rounded-full border border-gray-300 bg-white shadow-sm hover:shadow-md transition-all duration-300 ease-out hover:bg-primary/10 active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed">
                        <FaArrowRight className="text-black group-hover:text-primary transition" />
                    </button>
                </div>)
            }

            {/* add a product here */}
            <AddProductModal
                openModal={isAddProduct}
                setOpenModal={setIsAddProduct}
            />

            {/* update a product here */}
            <EditProductModal
                openModal={isEditProduct}
                setOpenModal={setIsEditProduct}
                product={selectedProduct}
            />
        </div>
    );
};

export default Products;