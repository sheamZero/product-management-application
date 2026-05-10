import { FiEdit, FiTrash2 } from "react-icons/fi";
import { MdOutlineAddTask } from "react-icons/md";

const Products = () => {

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

            {/* heading */}
            <div className="flex items-center justify-between">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold">
                        All Products
                    </h2>

                    <p className=" mt-2">
                        Manage all products easily.
                    </p>
                </div>

                <button className="flex items-center gap-2 px-6 py-3 bg-primary/90 hover:bg-primary text-white rounded-full font-semibold">
                    <MdOutlineAddTask className="text-2xl font-extrabold" />
                    Add Product
                </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
                <table className="w-full text-sm text-left">

                    {/* table head */}
                    <thead className="bg-primary text-white">
                        <tr>
                            <th className="px-4 py-4 uppercase font-semibold">#</th>
                            <th className="px-4 py-4 uppercase font-semibold">Image</th>
                            <th className="px-4 py-4 uppercase font-semibold">Name</th>
                            <th className="px-4 py-4 uppercase font-semibold">Price</th>
                            <th className="px-4 py-4 uppercase font-semibold">Description</th>
                            <th className="px-4 py-4 uppercase font-semibold text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    {/* table body */}
                    <tbody>
                        {products.map((product, idx) => (
                            <tr
                                key={product._id}
                                className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                            >

                                {/* serial */}
                                <td className="px-4 py-4 font-medium text-gray-600">
                                    {idx + 1}
                                </td>

                                {/* image */}
                                <td className="px-4 py-4">
                                    <img
                                        src={product.image}
                                        alt={product.productName}
                                        className="w-14 h-14 rounded-lg object-cover border"
                                    />
                                </td>

                                {/* product name */}
                                <td className="px-4 py-4 font-medium text-gray-800">
                                    {product.productName}
                                </td>

                                {/* price */}
                                <td className="px-4 py-4 font-semibold text-primary whitespace-nowrap">
                                    ${product.price}
                                </td>

                                {/* description */}
                                <td className="px-4 py-4 text-gray-500 max-w-xs truncate">
                                    {product.description}
                                </td>

                                {/* actions */}
                                <td className="px-4 py-4">
                                    <div className="flex items-center justify-center gap-2">

                                        <button
                                            className="flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-white hover:bg-primary/90 transition"
                                        >
                                            <FiEdit size={16} />
                                            Edit
                                        </button>

                                        <button
                                            className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-2 text-white hover:bg-red-600 transition"
                                        >
                                            <FiTrash2 size={16} />
                                            Delete
                                        </button>

                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Products;