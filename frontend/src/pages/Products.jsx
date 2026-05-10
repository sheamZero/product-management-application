import { MdOutlineAddTask } from "react-icons/md";
import ProductTableRow from "../components/ProductTableRow";
import { useState } from "react";
import AddProductModal from "../modals/AddProductModal";

const Products = () => {
    const [isAddProduct, setIsAddProduct] = useState(false);
    // console.log(isAddProduct)
    const products = [
        {
            _id: 1,
            productName: "Gaming Mechanical Keyboard",
            price: 4590,
            image: "https://i.ibb.co.com/zVPshSsH/headphone.jpg",
            description:
                "RGB mechanical gaming keyboard with blue switches.",
        },
        {
            _id: 2,
            productName: "Wireless Bluetooth Headphones",
            price: 2499,
            image: "https://i.ibb.co/8g1dK5G/headphone.jpg",
            description:
                "Noise cancellation wireless headphones.",
        },
    ];

    return (
        <div className="container mx-auto px-4 md:px-10 lg:px-16 py-10">

            <div className="flex items-center justify-between">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold">
                        All Products
                    </h2>

                    <p className=" mt-2">
                        Manage all products easily.
                    </p>
                </div>

                <button
                    onClick={() => setIsAddProduct(!isAddProduct)}
                    className="flex items-center gap-2 px-6 py-3 bg-primary/90 hover:bg-primary text-white rounded-full font-semibold">
                    <MdOutlineAddTask className="text-2xl font-extrabold" />
                    Add Product
                </button>
            </div>

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
                                />
                            ))}
                    </tbody>

                </table>
            </div>

            {/* add a product here */}
            <AddProductModal
                openModal={isAddProduct}
                setOpenModal={setIsAddProduct}
            />
        </div>
    );
};

export default Products;