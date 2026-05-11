import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useGetAllProducts = ({ page, limit, search, priceRange }) => {
    const axiosPublic = useAxiosPublic();

    return useQuery({
        queryKey: ["product", page, search, priceRange],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products?page=${page}&limit=${limit}&search=${search}&price=${priceRange}`);
            return res.data;
        }
    })
};

export default useGetAllProducts;