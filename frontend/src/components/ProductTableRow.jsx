
import { FiEdit, FiTrash2 } from "react-icons/fi";
import useDeleteProduct from "../hooks/useDeleteProduct";
import Swal from 'sweetalert2'
import { useContext } from "react";
import AuthContext from "../providers/authContext";
import { useNavigate } from "react-router-dom";

const ProductTableRow = ({ product, idx, setIsEditProduct, setSelectedProduct }) => {
    const navigate = useNavigate();
    const { mutateAsync, isPending } = useDeleteProduct();
    const { user, loading } = useContext(AuthContext);


    const handleEditProduct = async (product) => {
        if (!user) {
            const result = await Swal.fire({
                title: "Login Required!",
                text: "You need to login first to edit this product.",
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

        setSelectedProduct(product);
        setIsEditProduct(true)
    }

    const handleDeleteProduct = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                await mutateAsync(id);
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    if (loading) {
        <div className="flex items-center justify-center">
            <p>Loading...</p>
        </div>
    }

    return (
        <>
            <tr className="border-t border-gray-100 hover:bg-primary/5 transition-colors">

                <td className="px-4 py-4 font-medium">{idx + 1}</td>

                <td className="px-4 py-4">
                    <img
                        src={product.image}
                        alt={product.productName}
                        className="w-14 h-14 rounded-2xl object-cover border"
                    />
                </td>

                <td className="px-4 py-4 font-medium">
                    {product.productName}
                </td>

                <td className="px-4 py-4 font-semibold text-primary whitespace-nowrap">${product.price}</td>
                <td className="px-4 py-4 max-w-xs truncate">{product.description}</td>

                <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                        <button
                            onClick={() => handleEditProduct(product)}
                            className="flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-white hover:bg-primary/90 cursor-pointer transition"
                        >
                            <FiEdit size={16} />
                            Edit
                        </button>
                        <button
                            onClick={() => handleDeleteProduct(product._id)}
                            disabled={isPending}
                            className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-2 cursor-pointer text-white hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FiTrash2 size={16} />
                            Delete
                        </button>
                    </div>
                </td>

            </tr>


        </>
    );
};

export default ProductTableRow;