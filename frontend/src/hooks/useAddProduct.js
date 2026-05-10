
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAddProduct = () => {
    const axiosSecure = useAxiosSecure();

    return useMutation({
        mutationFn: async (productData) => {
            const res = await axiosSecure.post("/products", productData);
            return res.data;
        }
    })
};

export default useAddProduct;