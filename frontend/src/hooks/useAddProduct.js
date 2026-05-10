
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAddProduct = () => {
    const axiosPublic = useAxiosPublic();

    return useMutation({
        mutationFn: async (productData) => {
            const res = await axiosPublic.post("/products", productData);
            return res.data;
        }
    })
};

export default useAddProduct;