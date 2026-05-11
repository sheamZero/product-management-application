import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import toast from "react-hot-toast"

const useDeleteProduct = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/products/${id}`)
            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message);
            // console.log("ddata", data)
            queryClient.invalidateQueries(["products"]);
        },

        onError: (error) => {
            toast.error(error.message);
        },
    })
};

export default useDeleteProduct;