
import { FiEdit, FiTrash2 } from "react-icons/fi";

const ProductTableRow = ({ product, idx }) => {
    return (
        <tr className="border-t border-gray-100 hover:bg-primary/5 transition-colors">

            <td className="px-4 py-4 font-medium text-gray-600">                {idx + 1}            </td>

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
            <td className="px-4 py-4 text-gray-500 max-w-xs truncate">{product.description}</td>

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
    );
};

export default ProductTableRow;