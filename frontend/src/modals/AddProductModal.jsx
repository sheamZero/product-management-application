import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import uploadImage from "../utils/uploadImage";
import useAddProduct from "../hooks/useAddProduct";
import toast from "react-hot-toast"
import { useState } from "react";

const AddProductModal = ({ openModal, setOpenModal }) => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const { mutateAsync, isPending } = useAddProduct();
    const [isAddingProduct, setIsAddingProduct] = useState(false);

    if (!openModal) return null;

    const onSubmit = async (data) => {
        setIsAddingProduct(true);
        try {
            const imageFile = data.image[0];
            const imageUrl = await uploadImage(imageFile);

            const product = {
                productName: data.productName,
                price: data.price,
                image: imageUrl,
                description: data.description,
            };

            const res = await mutateAsync(product);
            console.log(res.result)
            if (res.result?.insertedId) {
                toast.success("Product Added Successfully");
            }

            reset();
            setOpenModal(false);

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
        finally {
            setIsAddingProduct(false);
        }
    };

    const handleOutsideClick = (e) => {
        if (e.target.id === "modal-overlay") {
            setOpenModal(false);
        }
    };
    return (
        <div
            id="modal-overlay"
            onClick={handleOutsideClick}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        >
            {/* modal */}
            <div className="relative w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">
                <button
                    onClick={() => setOpenModal(false)}
                    className="absolute right-5 top-5 text-2xl text-gray-500 hover:text-black transition"
                >
                    <IoClose />
                </button>

                <div className="mb-6">
                    <h2 className="text-3xl font-bold">
                        Add New Product
                    </h2>
                    <p className="mt-2">
                        Fill all product details below.
                    </p>
                </div>


                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-base font-semibold">
                            Product Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter product name"
                            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:border-primary"
                            {...register("productName", {
                                required: "Product name is required",
                            })}
                        />
                        {errors.productName && (
                            <p className="mt-1 text-sm text-red-500">{errors.productName.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-base font-semibold">
                            Price
                        </label>
                        <input
                            type="number"
                            placeholder="Enter product price"
                            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:border-primary"
                            {...register("price", {
                                required: "Price is required",
                            })}
                        />
                        {errors.price && (
                            <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-base font-semibold">
                            Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:border-primary"
                            {...register("image", {
                                required: "Image is required",
                            })}
                        />
                        {errors.image && (
                            <p className="mt-1 text-sm text-red-500">{errors.image.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-base font-semibold">
                            Description
                        </label>
                        <textarea
                            rows="4"
                            placeholder="Enter product description"
                            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-primary"
                            {...register("description", {
                                required: "Description is required",
                            })}
                        ></textarea>
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setOpenModal(false)}
                            className="rounded-xl border border-gray-300 px-5 py-2.5 font-medium hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isAddingProduct}
                            className="rounded-xl bg-primary px-6 py-2.5 font-medium text-white hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPending ? "Adding..." : "Add Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;