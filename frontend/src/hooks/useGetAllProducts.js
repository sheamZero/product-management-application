import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useGetAllProducts = ({page,limit}) => {
    const axiosPublic = useAxiosPublic();

    return useQuery({
        queryKey: ["product", page,limit],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products?page=${page}&limit=${limit}`);
            return res.data;
        }
    })
};

export default useGetAllProducts;