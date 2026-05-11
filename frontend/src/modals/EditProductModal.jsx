import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";

const EditProductModal = ({ openModal, setOpenModal, product }) => {
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (openModal && product) {
            reset({
                productName: product.productName || "",
                price: product.price || "",
                image: product.image || "",
                description: product.description || "",
            });
        }
    }, [openModal, product, reset]);

    if (!openModal) return null;

    const onSubmit = async (data) => {
        console.log(data);
    };

    return (
        <div
            onClick={() => setOpenModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
                <button
                    onClick={() => setOpenModal(false)}
                    className="absolute right-5 top-5 text-2xl text-gray-500 hover:text-black transition">
                    <IoClose />
                </button>

                <div className="mb-6">
                    <h2 className="text-3xl font-bold">Edit Product</h2>
                    <p className="mt-2">
                        Update product information below.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="mb-1 block font-semibold">Product Name</label>
                        <input
                            className="w-full rounded-xl border px-4 py-2 outline-none focus:border-primary"
                            {...register("productName", { required: true })}
                        />
                    </div>
                    <div>
                        <label className="mb-1 block font-semibold">Price</label>
                        <input
                            type="number"
                            className="w-full rounded-xl border px-4 py-2 outline-none focus:border-primary"
                            {...register("price", { required: true })}
                        />
                    </div>
                    <div>
                        <label className="mb-1 block font-semibold">Image URL</label>
                        <input
                            className="w-full rounded-xl border px-4 py-2 outline-none focus:border-primary"
                            {...register("image", { required: true })}
                        />
                    </div>
                    <div>
                        <label className="mb-1 block font-semibold">Description</label>
                        <textarea
                            rows="4"
                            className="w-full resize-none rounded-xl border px-4 py-2 outline-none focus:border-primary"
                            {...register("description", { required: true })}
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setOpenModal(false)}
                            className="px-5 py-2 border rounded-xl hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition"
                        >
                            Update Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;